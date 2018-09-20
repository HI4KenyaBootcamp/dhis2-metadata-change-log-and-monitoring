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

import React from "react";
import { init, getInstance } from "d2/lib/d2";

// import { Paper, Typography, withStyles } from "@material-ui/core";
import {
  AppBar,
  List,
  ListItem,
  Drawer,
  Tabs,
  Tab,
  Table,
  TableBody,
  p,
  TableHead,
  TableCell,
  TableRow,
  TableFooter,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core/";

const styles = theme => ({
  /**
   * const: styles = func: theme()
   *
   * css for the component being rendered
   */
  root: {
    margin: theme.spacing.unit
  },
  title: {
    padding: theme.spacing.unit * 2
  },

  tableWrapper: {
    overflowresourceName: "auto"
  },
  table: {
    minWidth: 540
  },
  title: {
    padding: theme.spacing.unit * 2
  },
  tab: {
    fleresourceNameGrow: 1,
    minHeight: 100,
    zInderesourceName: 1,
    overflow: "hidden",
    position: "relative",
    display: "fleresourceName"
  },
  drawerPaper: {
    position: "relative",
    width: 240
  },
  content: {
    fleresourceNameGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0
  }
});

class HomeRecent extends React.Component {
  /**
   * func: constructor()
   *
   * initialization function
   * @param {*} props
   */

  constructor(props) {
    super(props);
    this.state = {
      recents: [],
      value: 0
    };
  }

  componentWillMount() {
    init({ baseUrl: process.env.REACT_APP_DOMAIN });
    // get d2 library instance
    getInstance().then(d2 => {
      // return the api object
      const api = d2.Api.getApi();

      // send get request for /api/dataElements
      api
        .get("metadataAudits", {
          fields: "uid,klass,createdAt,createdBy,type",
          pageSize: "5"
          // klass: "org.hisp.dhis.dataelement.DataElement"
        })

        .then(response => {
          console.log(response);
          // assign dataElemets to variable
          let recents = response.metadataAudits.map(function test(
            recentAction
          ) {
            var metadataType = recentAction.klass.split(".")[4];
            var resourceName = metadataType.charAt(0).toLowerCase();
            resourceName = resourceName + metadataType.slice(1) + "s";

            let metadataName;
            api
              .get(resourceName + "/" + recentAction.uid, {
                fields: "displayName",
                pageSize: "5"
                // klass: "org.hisp.dhis.dataelement.DataElement"
              })
              .then(myRes => {
                metadataName = myRes.displayName;
                return metadataName;
              });
            console.log(metadataName);
            return (
              <TableHead>
                <TableRow>
                  {/* key={recentAction.createdAt}> */}
                  <TableCell component="th" scope="row">
                    {metadataType}
                    <br />
                    <br />
                    {recentAction.uid}
                    <br />
                    <br />
                    {recentAction.createdBy}
                    <br />
                    <br />
                    {recentAction.type}
                    <br />
                    <br />
                    {recentAction.createdAt}
                  </TableCell>
                </TableRow>
              </TableHead>
            );
          });

          // set this.state.recents
          this.setState({
            recents: recents
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
      // <React.Fragment>
      <Paper className={classes.root}>
        <div className={classes.title}>
          <Typography variant="title">Recent</Typography>
        </div>

        {/* your render code will go here  */}
        <div className={classes.tableWrapper}>
          {/* <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* key={recentAction.createdAt}> */}
          {/* <TableCell component="th" scope="row">
                  {metadataType}
                  <br />
                  {recentAction.uid}
                  <br />
                  {recentAction.createdBy}
                  <br />
                  {recentAction.type}
                  <br />
                  {recentAction.createdAt}
                </TableCell>
              </TableRow>
            </TableHead> */}{" "}
          <TableBody>{this.state.recents}</TableBody>
          {/* // </Table> */}
        </div>
      </Paper>
      // {/* </React.Fragment> */}
    );
  }
}

export default withStyles(styles)(HomeRecent);
