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

import { AppBar, List, ListItem, Drawer, Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper, Typography, withStyles } from '@material-ui/core/';

import { getInstance } from 'd2/lib/d2';

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
  tab: {
    flexGrow: 1,
    minHeight: 100,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
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
    // get d2 library instance
    getInstance().then(d2 => {
      // return the api object
      const api = d2.Api.getApi();
    
      // send get request for /api/dataElements
      api.get('metadataAudits', {'fields': 'uid,klass,createdAt,createdBy,type', 'pageSize': '10', 'klass': 'org.hisp.dhis.dataelement.DataElement'})
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
            <Tabs 
              value={value} 
              onChange={this.handleChange}
              scrollable
              scrollButtons="auto"
            >
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
            <section className={classes.tab}>
              
              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <List>
                  <ListItem button>
                    Data Element
                  </ListItem>
                  <ListItem button>
                    Data Element Group
                  </ListItem>
                  <ListItem button>
                    Data Element Group Set
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">Data Elements</Typography>
                </div>
                <div className={classes.tableWrapper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Last Audit Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.dataElements}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>You have authorization to view this data.</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </main>

            </section>
          </TabContainer>}
          {value === 2 && <TabContainer> {/* data set */} </TabContainer>}
          {value === 3 && <TabContainer> {/* indicator */} </TabContainer>}
          {value === 4 && <TabContainer> {/* organization unit */} </TabContainer>}
          {value === 5 && <TabContainer> {/* program */} </TabContainer>}
          {value === 6 && <TabContainer> {/* validation */} </TabContainer>}
          {value === 7 && <TabContainer> {/* other */} </TabContainer>}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomeMain);
