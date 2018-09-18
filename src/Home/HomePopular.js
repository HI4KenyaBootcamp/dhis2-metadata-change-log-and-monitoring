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
<<<<<<< HEAD

import React from 'react';

import { AppBar, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, withStyles } from '@material-ui/core/';

import { init, getInstance } from 'd2/lib/d2';
=======

import React from 'react';
>>>>>>> 7f906b23592570732620cfafcb0bd97b7ab669f6

import { Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  /**
   * const: styles = func: theme()
   * 
   * css for the component being rendered
   */
  root: {
    margin: theme.spacing.unit,
<<<<<<< HEAD
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 540,
  },
=======
  },
>>>>>>> 7f906b23592570732620cfafcb0bd97b7ab669f6
  title: {
    padding: theme.spacing.unit*2,
  },
});

<<<<<<< HEAD
/**
 * func: TabContainer
 * 
 * container for the tabs
 */
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


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
      api.get('metadataAudits.json', {'fields': 'klass,uid,createdBy,type', 'pageSize': '5' , 'klass': 'org.hisp.dhis.metadataAudits.metadataAudits'})
      .then(resources => {
        console.log(resources);
        // assign metadataAudits to variable
        let metadataAudits = resources.metadataAudits.map((metadataAudits) =>
        <TableRow key={metadataAudits.klass}>
            <TableCell component="th" scope="row">{metadataAudits.klass}</TableCell>
            <TableCell>{metadataAudits.uid}</TableCell>
            <TableCell>{metadataAudits.createdBy}</TableCell>
            <TableCell>{metadataAudits.type}</TableCell>
            <TableCell>{metadataAudits.version}</TableCell>
          </TableRow>
        );
        // set this.state.metadataAudits
        this.setState({
          metadataAudits: metadataAudits
        });
      });
    });
  }


  
  
  render() {
    return (
      <React.Fragment>
         <Paper>
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
        {/* more render code goes here */} 
      </React.Fragment>
    );
  }
}

export default HomePopular;
=======
class HomePopular extends React.Component {
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

          { /* your render code will go here  */}

        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePopular);
>>>>>>> 7f906b23592570732620cfafcb0bd97b7ab669f6
