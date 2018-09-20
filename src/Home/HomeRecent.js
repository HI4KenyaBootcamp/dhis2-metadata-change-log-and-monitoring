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
  TableCell,
  TableHead,
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
    overflowX: "auto"
  },
  table: {
    minWidth: 540
  },
  title: {
    padding: theme.spacing.unit * 2
  },
  tab: {
    flexGrow: 1,
    minHeight: 100,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  drawerPaper: {
    position: "relative",
    width: 240
  },
  content: {
    flexGrow: 1,
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
          pageSize: "5",
          klass: "org.hisp.dhis.dataelement.DataElement"
        })
        .then(response => {
          console.log(response);
          // assign dataElemets to variable
          let recents = response.metadataAudits.map(recentAction => (
            <TableRow key={recentAction.createdAt}>
              <TableCell component="th" scope="row">
                {recentAction.klass}
              </TableCell>
              <TableCell>{recentAction.type}</TableCell>
              <TableCell>{recentAction.createdAt}</TableCell>
              <TableCell>{recentAction.createdAt}</TableCell>
              <TableCell>{recentAction.createdBy}</TableCell>
            </TableRow>
          ));
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
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Metadata Type</TableCell>
                <TableCell>Metadata Value</TableCell>
                <TableCell> Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell> Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.state.recents}</TableBody>
          </Table>
          {/* <div className={classes.tableWrapper}>
          { /* your rendered table will go here  */}
        </div>
      </Paper>
      // {/* </React.Fragment> */}
    );
  }
}

export default withStyles(styles)(HomeRecent);
