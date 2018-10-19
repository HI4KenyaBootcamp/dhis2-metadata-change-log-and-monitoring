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
import {  IconButton,
          TableCell,
          TableRow 
        } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import MetadataName from './MetadataName';
import UserName from './UserName';
import Date from './Date';

const styles = theme => ({
  // CSS
});

class Rows extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      rows: null, /* rows: the rows of data */
    }

    this.getMetadataAudits = this.getMetadataAudits.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getMetadataAudits();
  }

  /* componentDidUpdate() */
  componentDidUpdate(prevProps) {
    // if any of the props has changed, fetch the new data
    if (this.props.klass !== prevProps.klass || this.props.page !== prevProps.page || this.props.pageSize !== prevProps.pageSize) {
      this.getMetadataAudits();
    }
  }

  /* getMetadataAudits() */
  getMetadataAudits() {
    let klass = this.props.klass; // props.klass

    const fetchAudits = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get('metadataAudits', {'fields': 'uid,createdBy,type,createdAt', 'klass': this.props.klass, 'page': this.props.page, 'pageSize': this.props.pageSize, /*'order': 'uid:idesc'*/});
      let audits = response.metadataAudits; // assign only the metadataAudits
      let rows = audits.map( function(audit) {
        let uid = audit.uid;
        let createdAt = audit.createdAt;
        let createdBy = audit.createdBy;
        let type = audit.type;
        return (
          <TableRow key={createdAt}>
            <TableCell><MetadataName uid={uid} klass={klass} /></TableCell>
            <TableCell><UserName username={createdBy} /></TableCell>
            <TableCell>{type}</TableCell>
            <TableCell><Date date={createdAt} /></TableCell>
            <TableCell>
              <IconButton aria-label="Delete">
                <HistoryIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
      this.setState({rows}); // set state -> row
    };

    fetchAudits(); // run the fetchAudits function
  }
  
  /* render() */
  render() {
    return this.state.rows;
  }
}

export default withStyles(styles)(Rows);