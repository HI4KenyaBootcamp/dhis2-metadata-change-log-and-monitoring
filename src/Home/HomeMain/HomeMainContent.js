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

import { AppBar, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, withStyles } from '@material-ui/core/';

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
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: 540,
  },
  title: {
    padding: theme.spacing.unit*2,
  },
});

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


class HomeMain extends React.Component {
  /**
   * func: constructor() 
   * 
   * initialization function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      dataElements: [],
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
    
      // send get request for /api/dataElements
      api.get('metadataAudits.json', {'fields': 'uid,klass,createdAt,createdBy,type', 'pageSize': '10', 'klass': 'org.hisp.dhis.dataelement.DataElement'})
      .then(resources => {
        console.log(resources);
        // assign dataElemets to variable
        let dataElements = resources.metadataAudits.map((metadataAudit) =>
          <TableRow key={(metadataAudit.createdAt)}>
            <TableCell component="th" scope="row">{metadataAudit.klass}</TableCell>
            <TableCell>{metadataAudit.createdAt}</TableCell>
          </TableRow>
        );
        // set this.state.dataElements
        this.setState({
          dataElements: dataElements
        });
      });
    });
  }

  /**
   * func: handleChange()
   * 
   * changes tabs
   */
  handleChange = (event, value) => {
    this.setState({ value });
  };

  /**
   * func: render()
   * 
   * renders the table
   */
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Category" />
              <Tab label="Data Element" />
              <Tab label="Data Set" />
              <Tab label="Indicator" />
              <Tab label="Organization Unit" />
              <Tab label="Program" />
              <Tab label="Validation" />
              <Tab label="Other" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer> {/* category */} </TabContainer>}
          {value === 1 && <TabContainer>
              <div className={classes.title}>
                <Typography variant="title">Data Elements</Typography>
              </div>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.dataElements}
                  </TableBody>
                </Table>
              </div>
          </TabContainer>}
          {value === 2 && <TabContainer> {/* data set */} </TabContainer>}
          {value === 3 && <TabContainer> {/* indicator */} </TabContainer>}
          {value === 3 && <TabContainer> {/* organization unit */} </TabContainer>}
          {value === 3 && <TabContainer> {/* program */} </TabContainer>}
          {value === 3 && <TabContainer> {/* validation */} </TabContainer>}
          {value === 3 && <TabContainer> {/* other */} </TabContainer>}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomeMain);