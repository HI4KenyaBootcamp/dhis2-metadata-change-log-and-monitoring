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
  singleTab: {
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
    <Typography component="div">
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
      categoryTitle: '',
      categoryResource: [],
      categorySelectedIndex: 0,
      dataElementTitle: '',
      dataElementResource: [],
      dataElementSelectedIndex: 6,
      value: 0,
    };
  }

  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   * 
   * this section should render the default view of for each tab
   */
  componentWillMount() {
    // on mount, show data elements
    this.showResource('category', 'Category Option', 'category', 'CategoryOption');
    this.showResource('data-element', 'Data Element', 'dataelement', 'DataElement');
  }

  /**
   * func: showResource()
   * 
   * variables:
   * @title - this is the title to be displayed on the tab e.g. Data Element
   * @parent - this is the metadata parent group name e.g. Data Element (dataelement)
   * @child - this is the metadata child group name e.g. Data Element Group (DataElementGroup)
   * 
   * sets state 'resource' to specific resource
   */
  showResource(tab, title, parent, child) {
    // get d2 library instance
    getInstance().then(d2 => {
      // return the api object
      const api = d2.Api.getApi();
      let klass = 'org.hisp.dhis.' + parent + '.' + child;
      // send get request for /api/metadataAudits
      api.get('metadataAudits', {'fields': 'uid,klass,createdAt,createdBy,type', 'pageSize': '10', 'klass': klass})
      .then(resources => {
        console.log(resources);
        // assign value to variable
        let value = resources.metadataAudits.map((metadataAudit) =>
          <TableRow key={(metadataAudit.createdAt)}>
            <TableCell component="th" scope="row">{metadataAudit.klass}</TableCell>
            <TableCell>{metadataAudit.createdAt}</TableCell>
          </TableRow>
        );

        if (tab === 'data-element') {
          // set this.state.dataElementResource
          this.setState({
            dataElementTitle: title,
            dataElementResource: value
          });
        }
        else if (tab === 'category') {
          // set this.state.categoryResource
          this.setState({
            categoryTitle: title,
            categoryResource: value
          });
        }
      });
    });
  }

  /**
   * func: handleChange()
   * 
   * variables:
   * @event - this is an event listener, listens for click
   * @value - this is the horizontal tab value that should be displayed e.g. 1
   * 
   * changes tabs when appbar link is clicked
   */
  handleChange = (event, value) => {
    this.setState({ value });
  };

  /**
   * func: handleListItemClick()
   * 
   * variables:
   * @event - this is an event listener, listens for click
   * @index - this is the vertical tab value that should be displayed e.g. 1
   * @tab - this is the value, tab, that will be passed to showResource() for determining the horizontal tab
   * @title - this is the value, title, that will be passed to showResource() for setting the tab title
   * @parent - this is the value, parent, that will be passed to showResource() for determinig the klass
   * @child - this is the value, child, that will be passed to showResource() for determinig the klass
   * 
   * changes select item on list
   */
  handleListItemClick = (event, index, tab, title, parent, child) => {
    if (tab === 'category') {
      this.setState({ categorySelectedIndex: index });
    }
    else if (tab === 'data-element') {
      this.setState({ dataElementSelectedIndex: index });
    }
    this.showResource(tab, title, parent, child);
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
          {value === 0 && <TabContainer>

            {/* CATEGORY TAB - index 0 to 5 */}
            
            <section className={classes.singleTab}>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <List>
                  <ListItem 
                    button
                    selected={this.state.categorySelectedIndex === 0}
                    onClick={event => this.handleListItemClick(event, 0,'category', 'Category Option', 'category', 'CategoryOption')}
                  >
                    Category Option
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.categorySelectedIndex === 1}
                    onClick={event => this.handleListItemClick(event, 1,'category', 'Category', 'category', 'Category')}
                  >
                    Category
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.categorySelectedIndex === 2}
                    onClick={event => this.handleListItemClick(event, 2,'category', 'Category Combination', 'category', 'CategoryCombo')}
                  >
                    Category Combination
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.categorySelectedIndex === 3}
                    onClick={event => this.handleListItemClick(event, 3,'category', 'Category Option Combination', 'category', 'CategoryOptionCombo')}
                  >
                    Category Option Combination
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.categorySelectedIndex === 4}
                    onClick={event => this.handleListItemClick(event, 4,'category', 'Category Option Group', 'category', 'CategoryOptionGroup')}
                  >
                    Category Option Group
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.categorySelectedIndex === 5}
                    onClick={event => this.handleListItemClick(event, 5,'category', 'Category Option Group Set', 'category', 'CategoryOptionGroupSet')}
                  >
                    Category Option Group Set
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.categoryTitle}</Typography>
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
                      {this.state.categoryResource}
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
          {value === 1 && <TabContainer>

            {/* DATA ELEMENT TAB - index 6 to 8 */}

            <section className={classes.singleTab}>
              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <List>
                  <ListItem 
                    button
                    selected={this.state.dataElementSelectedIndex === 6}
                    onClick={event => this.handleListItemClick(event, 6,'data-element', 'Data Element', 'dataelement', 'DataElement')}
                  >
                    Data Element
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.dataElementSelectedIndex === 7}
                    onClick={event => this.handleListItemClick(event, 7,'data-element', 'Data Element Group', 'dataelement', 'DataElementGroup')}
                  >
                    Data Element Group
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.dataElementSelectedIndex === 8}
                    onClick={event => this.handleListItemClick(event, 8, 'data-element', 'Data Element Group Set', 'dataelement', 'DataElementGroupSet')}
                  >
                    Data Element Group Set
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.dataElementTitle}</Typography>
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
                      {this.state.dataElementResource}
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
