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
      
      dataSetTitle: '',
      dataSetResource: [],
      dataSetSelectedIndex: 9,

      indicatorTitle: '',
      indicatorResource: [],
      indicatorSelectedIndex: 11,

      organisationUnitTitle: '',
      organisationUnitResource: [],
      organisationUnitSelectedIndex: 17,

      programTitle: '',
      programResource: [],
      programSelectedIndex: 20,

      validationTitle: '',
      validationResource: [],
      validationSelectedIndex: 26,
      
      value: 0,
    };
  }

  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   * 
   * this section should render the default view for each tab
   */
  componentWillMount() {
    // on mount, show metadata
    this.showResource('category', 'Category Option', 'category', 'CategoryOption');
    this.showResource('data-element', 'Data Element', 'dataelement', 'DataElement');
    this.showResource('data-set', 'Data Set', 'dataset', 'DataSet');
    this.showResource('indicator', 'Indicator', 'indicator', 'Indicator');
    this.showResource('organisation-unit', 'Organisation Unit', 'organisationunit', 'OrganisationUnit');
    this.showResource('program', 'Program', 'program', 'Program');
    this.showResource('validation', 'Validation Rule', 'validation', 'ValidationRule');
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
        } else if (tab === 'category') {
          // set this.state.categoryResource
          this.setState({
            categoryTitle: title,
            categoryResource: value
          });
        } else if (tab === 'data-set') {
          // set this.state.dataSetResource
          this.setState({
            dataSetTitle: title,
            dataSetResource: value
          });
        } else if (tab === 'indicator') {
          // set this.state.indicatorResource
          this.setState({
            indicatorTitle: title,
            indicatorResource: value
          });
        } else if (tab === 'organisation-unit') {
          // set this.state.organisationUnitResource
          this.setState({
            organisationUnitTitle: title,
            organisationUnitResource: value
          });
        } else if (tab === 'program') {
          // set this.state.program
          this.setState({
            programTitle: title,
            programResource: value
          });
        } else if (tab === 'validation') {
          // set this.state.validation
          this.setState({
            validationTitle: title,
            validationResource: value
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
    } else if (tab === 'data-element') {
      this.setState({ dataElementSelectedIndex: index });
    } else if (tab === 'data-set') {
      this.setState({ dataSetSelectedIndex: index });
    } else if (tab === 'indicator') {
      this.setState({ indicatorSelectedIndex: index });
    } else if (tab === 'organisation-unit') {
      this.setState({ organisationUnitSelectedIndex: index });
    } else if (tab === 'program') {
      this.setState({ programSelectedIndex: index });
    } else if (tab === 'validation') {
      this.setState({ validationSelectedIndex: index });
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
              <Tab label="Organisation Unit" />
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
          {value === 2 && <TabContainer> 

            {/* DATASET TAB - index 9 to 10 */}
            
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
                    selected={this.state.dataSetSelectedIndex === 9}
                    onClick={event => this.handleListItemClick(event, 9,'data-set', 'Data Set', 'dataset', 'DataSet')}
                  >
                    Data Set
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.dataSetSelectedIndex === 10}
                    onClick={event => this.handleListItemClick(event, 10,'data-set', 'Data Set Notifications', 'dataset', 'notifications.DataSetNotificationTemplate')}  
                  >
                    Data Set Notifications
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.dataSetTitle}</Typography>
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
                      {this.state.dataSetResource}
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
          {value === 3 && <TabContainer> 

            {/* INDICATOR TAB - index 11 to 16 */}
            
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
                    selected={this.state.indicatorSelectedIndex === 11}
                    onClick={event => this.handleListItemClick(event, 11,'indicator', 'Indicator', 'indicator', 'Indicator')}
                  >
                    Indicator
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.indicatorSelectedIndex === 12}
                    onClick={event => this.handleListItemClick(event, 12,'indicator', 'Indicator Type', 'indicator', 'IndicatorType')}
                  >
                    Indicator Type
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.indicatorSelectedIndex === 13}
                    onClick={event => this.handleListItemClick(event, 13,'indicator', 'Indicator Group', 'indicator', 'IndicatorGroup')}
                  >
                    Indicator Group
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.indicatorSelectedIndex === 14}
                    onClick={event => this.handleListItemClick(event, 14,'indicator', 'Indicator Group Set', 'indicator', 'IndicatorGroupSet')}
                  >
                    Indicator Group Set
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.indicatorSelectedIndex === 15}
                    onClick={event => this.handleListItemClick(event, 15,'indicator', 'Program Indicator', 'program', 'ProgramIndicator')}
                  >
                    Program Indicator
                  </ListItem>
                  <ListItem
                    button
                    selected={this.state.indicatorSelectedIndex === 16}
                    onClick={event => this.handleListItemClick(event, 16,'indicator', 'Program Indicator Group', 'program', 'ProgramIndicatorGroup')}
                  >
                    Program Indicator Group
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.indicatorTitle}</Typography>
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
                      {this.state.indicatorResource}
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
          {value === 4 && <TabContainer> 
            
            {/* ORGANISATION UNIT TAB - index 17 to 19 */}
            
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
                    selected={this.state.organisationUnitSelectedIndex === 17}
                    onClick={event => this.handleListItemClick(event, 17,'organisation-unit', 'Organisation Unit', 'organisationunit', 'OrganisationUnit')}
                  >
                    Organisation Unit
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.organisationUnitSelectedIndex === 18}
                    onClick={event => this.handleListItemClick(event, 18,'organisation-unit', 'Organisation Unit Group', 'organisationunit', 'OrganisationUnitGroup')}
                  >
                    Organisation Unit Group
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.organisationUnitSelectedIndex === 19}
                    onClick={event => this.handleListItemClick(event, 19,'organisation-unit', 'Organisation Unit Group Set', 'organisationunit', 'OrganisationUnitGroupSet')}
                  >
                    Organisation Unit Group Set
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.organisationUnitTitle}</Typography>
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
                      {this.state.organisationUnitResource}
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
          {value === 5 && <TabContainer> 
            
            {/* PROGRAM TAB - index 20 to 25 */}
            
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
                    selected={this.state.programSelectedIndex === 20}
                    onClick={event => this.handleListItemClick(event, 20,'program', 'Program', 'program', 'Program')}
                  >
                    Program
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.programSelectedIndex === 21}
                    onClick={event => this.handleListItemClick(event, 21,'program', 'Tracked Entity Attribute', 'trackedentity', 'TrackedEntityAttribute')}
                  >
                    Tracked Entity Attribute
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.programSelectedIndex === 22}
                    onClick={event => this.handleListItemClick(event, 22,'program', 'Relationship Type', 'relationship', 'RelationshipType')}
                  >
                    Relationship Type
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.programSelectedIndex === 23}
                    onClick={event => this.handleListItemClick(event, 23,'program', 'Tracked Entity Type', 'trackedentity', 'TrackedEntityType')}
                  >
                    Tracked Entity Type
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.programSelectedIndex === 24}
                    onClick={event => this.handleListItemClick(event, 24,'program', 'Program Rule', 'programrule', 'ProgramRule')}
                  >
                    Program Rule
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.programSelectedIndex === 25}
                    onClick={event => this.handleListItemClick(event, 25,'program', 'Program Rule Variable', 'programrule', 'ProgramRuleVariable')}
                  >
                    Program Rule Variable
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.programTitle}</Typography>
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
                      {this.state.programResource}
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
          {value === 6 && <TabContainer> 
            
            {/* PROGRAM TAB - index 26 to 28 */}
            
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
                    selected={this.state.validationSelectedIndex === 26}
                    onClick={event => this.handleListItemClick(event, 26,'validation', 'Validation Rule', 'validation', 'ValidationRule')}
                  >
                    Validation Rule
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.validationSelectedIndex === 27}
                    onClick={event => this.handleListItemClick(event, 27,'validation', 'Validation Rule Group', 'validation', 'ValidationRuleGroup')}
                  >
                    Validation Rule Group
                  </ListItem>
                  <ListItem 
                    button
                    selected={this.state.validationSelectedIndex === 28}
                    onClick={event => this.handleListItemClick(event, 28,'validation', 'Validation Notification', 'validation', 'notification.ValidationNotificationTemplate')}
                  >
                    Validation Notification
                  </ListItem>
                </List>
              </Drawer>

              <main className={classes.content}>
                <div className={classes.title}>
                  <Typography variant="title">{this.state.validationTitle}</Typography>
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
                      {this.state.validationResource}
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
          {value === 7 && <TabContainer> {/* other */} </TabContainer>}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomeMain);
