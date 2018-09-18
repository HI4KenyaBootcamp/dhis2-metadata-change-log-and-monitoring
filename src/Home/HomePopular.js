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

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, withStyles } from '@material-ui/core/';

import { init, getInstance } from 'd2/lib/d2';

const styles = theme => ({
  /**
   * const: styles = func: theme()
   * 
   * css for the component being rendered
   */
  root: {
    margin: theme.spacing.unit,
  },
  title: {
    padding: theme.spacing.unit*2,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 540,
  },
});

class HomePopular extends React.Component {
  /**
   * func: constructor() 
   * 
   * initialization function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      metadataAudits: [],
      value: 0,
    };
  }

  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   */
  componentWillMount() {
    // initialize d2 library baseURL
    init({ baseUrl: process.env.REACT_APP_DOMAIN });

    // get d2 library instance
    getInstance().then(d2 => {
      // return the api object
      const api = d2.Api.getApi();
    
      // send get request for /api/metadataAudits
      api.get('metadataAudits')
      .then(resources => {
        console.log(resources);
        // assign metadataAudits to variable
        let metadataAudits = resources.metadataAudits.map((metadataAudit) =>
        <TableRow key={metadataAudit.createdAt}>
            <TableCell component="th" scope="row">{metadataAudit.klass}</TableCell>
            <TableCell>{metadataAudit.uid}</TableCell>
            <TableCell>{metadataAudit.createdBy}</TableCell>
            <TableCell>{metadataAudit.type}</TableCell>
            <TableCell>{metadataAudit.version}</TableCell>
          </TableRow>
        );
        // set this.state.metadataAudits
        this.setState({
          metadataAudits: metadataAudits
        });
      });
    });
  }

  /**
   * func: render()
   */
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <div className={classes.title}>
            <Typography variant="title">Popular</Typography>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>value</TableCell>
                <TableCell>user</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Number of edits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.metadataAudits}
            </TableBody>
          </Table>

        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePopular);
