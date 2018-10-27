/**
 *  Metadata Audit  Copyright (C) 2018  University of Nairobi Health IT
 *  
 *  Written by Kevin Marekia Kiringu (kmarekia@students.uonbi.ac.ke)
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
import { getInstance } from 'd2/lib/d2';
import { withStyles } from '@material-ui/core';
import BackButton from './Components/BackButton';
import Snapshot from './Components/Snapshot';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit,
    marginBotton: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  },
});

class History extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.id, // get uid passed through react-router
      timeline: null,
    }

    this.getHistory = this.getHistory.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getHistory();
  }

  /* getHistory() */
  getHistory() {
    let uid = this.state.uid;

    const fetchHistory = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get('metadataAudits', {'fields': ':all', 'uid': uid, 'order': 'createdAt:idesc'});
      let audits = response.metadataAudits;
      let timeline = audits.map( function(audit) {
        return(
          <Snapshot key={audit.createdAt} audit={audit} />
        );
      });
      this.setState({timeline}); // set state -> timeline
    };

    fetchHistory();
  }

  /* render() */
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <section className={classes.container}>
          <BackButton />
          {this.state.timeline}
        </section>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(History);
