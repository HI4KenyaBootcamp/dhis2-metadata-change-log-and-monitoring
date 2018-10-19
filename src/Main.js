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
import {  AppBar,
          Grid,
          Paper,
          Tab,
          Tabs,
          Typography, 
          withStyles 
        } from '@material-ui/core/';
import Sidebar from './Components/Sidebar';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
  },
});

const TabContainer = (props) => (
  /* component: TabContainer */
  <Typography component="div">
    {props.children}
  </Typography>
);

class Main extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      value: 1, /* this is the value of the tab that's preselected on default */
    };
  }

  /* handlechange() - this is the method that changes the tabs onClick */
  handleChange = (event, value) => {
    this.setState({ value });
  };

  /* render() */
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <AppBar position="static">
                <Tabs 
                  value={value}
                  onChange={this.handleChange}
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab label="Category" disabled />
                  <Tab label="Data Element" />
                  <Tab label="Data Set" disabled />
                  <Tab label="Indicator" disabled />
                  <Tab label="Organisation Unit" disabled />
                  <Tab label="Program" disabled />
                  <Tab label="Validation" disabled />
                  <Tab label="Other" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer>
                <Sidebar tab="category"/>
              </TabContainer>}
              {value === 1 && <TabContainer>
                <Sidebar default="org.hisp.dhis.dataelement.DataElement" tab="dataElement"/>
              </TabContainer>}
              {value === 2 && <TabContainer>
                <Sidebar tab="dataSet"/>
              </TabContainer>}
              {value === 3 && <TabContainer>
                <Sidebar tab="indicator"/>
              </TabContainer>}
              {value === 4 && <TabContainer>
                <Sidebar tab="organisationUnit"/>
              </TabContainer>}
              {value === 5 && <TabContainer>
                <Sidebar tab="program"/>
              </TabContainer>}
              {value === 6 && <TabContainer>
                <Sidebar tab="validation"/>
              </TabContainer>}
              {value === 7 && <TabContainer>
                <Sidebar tab="other"/>
              </TabContainer>}
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);
