/**
 * Metadata Audit  Copyright (C) 2018  University of Nairobi Health IT
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { withStyles } from '@material-ui/core';
import { getInstance } from 'd2/lib/d2';

const styles = theme => ({
  deletedTextGrey: {
    color: '#666',
  },
  deletedTextRed: {
    color: '#d90000',
  },
});

class MetadataName extends React.Component {
  /* constructor */
  constructor(props) {
    super(props);
    this.state = {
      metadataName: null,
    }

    this.getMetadataName = this.getMetadataName.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getMetadataName();
  }

  /* componentDidUpdate() */
  componentDidUpdate(prevProps) {
    // if any of the props has changed, fetch the new data
    if (this.props.klass !== prevProps.klass || this.props.uid !== prevProps.uid) {
      this.getMetadataName();
    }
  }

  /* getMetadataName() */
  getMetadataName() {
    const { classes } = this.props;
    
    /* get api url to metadata */
    let uri = this.props.klass.split('.');
    uri = uri[4];
    uri = uri.charAt(0).toLowerCase() + uri.substr(1) + 's';
    
    const fetchMetadata = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get(uri + '/' + this.props.uid, {'fields': 'displayName'}).catch((error) => {
        console.log(error);
      });
      
      if (response) {
        this.setState({ // set state to displayName
          metadataName: response.displayName,
        });
      } else {
        /* format deletedText */
        let deletedText = (
          <React.Fragment>
            <span className={classes.deletedTextGrey}>{this.props.uid}</span>
            &nbsp;&mdash;&nbsp;
            <span className={classes.deletedTextRed}>DELETED</span>
          </React.Fragment>
        );

        this.setState({ // set state to deletedText
          metadataName: deletedText,
        });
      }
    }

    fetchMetadata();
  }

  /* render() */
  render() {
    return this.state.metadataName;
  }
}

export default withStyles(styles)(MetadataName);
