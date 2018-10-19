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
import {  Grid,
          List,
          ListItem,
          ListItemText,
          withStyles 
        } from '@material-ui/core';
import Content from './Content';

/**
 * constant variables with the sidebar section data
 */
const dataElement = { //dataElement sidebar section data
  "dataElement": {
    displayName: "Data Element",
    klass: "org.hisp.dhis.dataelement.DataElement",
  },
  "dataELementGroup": {
    displayName: "Data Element Group",
    klass: "org.hisp.dhis.dataelement.DataElementGroup",
  },
  "dataElementGroupSet":  {
    displayName: "Data Element Group Set",
    klass: "org.hisp.dhis.dataelement.DataElementGroupSet",
  },
};

const styles = theme => ({
  sidebar: {
    backgroundColor: '#fff',
    padding: theme.spacing.unit * 1.5,
    minWidth: 0, // So the Typography noWrap works
  },
});

class Sidebar extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = { 
      index: 0,
      klass: this.props.default,
    }

    this.getSidebar = this.getSidebar.bind(this);  // determine the props.tab passed and load the relevant sidebar information
    this.handleSidebarLinkClick = this.handleSidebarLinkClick.bind(this);  // fire when list item link is clicked
    this.getLinks = this.getLinks.bind(this);  // create a list of links using the sidebar objects
  }

  /* getSidebar() */
  getSidebar () {
    if (this.props.tab === "dataElement") { return dataElement; }
  };

  /* getLinks() */
  getLinks() {
    let sidebar = this.getSidebar(); // generate new sidebar
    
    let link; // variable holding the link structure
    let index = 0; // variable holding the link index value
    
    for (var key in sidebar) { // for each object in sidebar, generate link
      if (!sidebar.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
      
      /* get variables for use in generating link */
      let displayName = sidebar[key]['displayName'];
      let klass = sidebar[key]['klass'];
      let i = index;
      
      link = ( // generate link and append to previous links
        <React.Fragment>
          {link}
          <ListItem button selected={this.state.index === i} onClick={(e) => this.handleSidebarLinkClick(e, i, klass)}>
            <ListItemText primary={displayName} />
          </ListItem>
        </React.Fragment>
      );

      index = index + 1; // index increment
    }
    
    return link;
  }

  /* handleSidebarLinkClick() */
  handleSidebarLinkClick(e, index, klass) {
    this.setState({ index: index, klass: klass }); /* update the selected sidebar link */
  }

  render() {
    const { classes } = this.props;

    let sidebar = this.getLinks(); // get the list of links
    
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3}>
            <List className={classes.sidebar} component="nav">
              {sidebar}
            </List>
          </Grid>
          <Grid item xs={12} md={9}>
            <Content klass={this.state.klass} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Sidebar);
