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
import { getInstance } from 'd2/lib/d2';
import {  IconButton,
          Table,
          TableBody,
          TableCell,
          TableFooter,
          TableHead,
          TableRow,
          Typography,
          withStyles
        } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  table: {
    minWidth: 540,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  title: {
    padding: theme.spacing.unit*2,
  },
});

const Title = (props) => {
  /* component: Title */

  /* function to format title from camelCase */
  const getTitle = (camelCase) => camelCase
  .replace(/([A-Z])/g, (match) => ` ${match}`)
  .replace(/^./, (match) => match.toUpperCase());

  /* get the title for the section from the klass prop */
  let klass = props.klass;
  let path = klass.split('.');
  let title = getTitle(path[4]);

  return (
    <Typography component="h3" variant="display1" gutterBottom>{title}</Typography>
  );
};

class Rows extends React.Component {
  /* component: Rows */

  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      rows: null, /* rows: the rows of data */
    }

    this.getMetadataAudits = this.getMetadataAudits.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getMetadataAudits();
  }

  /* componentDidUpdate() */
  componentDidUpdate(prevProps) {
    // if any of the props has changed, fetch the new data
    if (this.props.klass !== prevProps.klass || this.props.page !== prevProps.page || this.props.pageSize !== prevProps.pageSize) {
      this.getMetadataAudits();
    }
  }

  /* getMetadataAudits() */
  getMetadataAudits() {
    let klass = this.props.klass; // props.klass

    const fetchAudits = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get('metadataAudits', {'fields': 'uid,createdBy,type,createdAt', 'klass': this.props.klass, 'page': this.props.page, 'pageSize': this.props.pageSize, /*'order': 'uid:idesc'*/});
      let audits = response.metadataAudits; // assign only the metadataAudits
      let rows = audits.map( function(audit) {
        let uid = audit.uid;
        let createdAt = audit.createdAt;
        let createdBy = audit.createdBy;
        let type = audit.type;
        return (
          <TableRow key={createdAt}>
            <TableCell><MetadataName uid={uid} klass={klass} /></TableCell>
            <TableCell><UserName username={createdBy} /></TableCell>
            <TableCell>{type}</TableCell>
            <TableCell><Date date={createdAt} /></TableCell>
            <TableCell>
              <IconButton aria-label="Delete">
                <HistoryIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      });
      this.setState({rows}); // set state -> row
    };

    fetchAudits(); // run the fetchAudits function
  }
  
  /* render() */
  render() {
    return this.state.rows;
  }
};

const MetadataName = (props) => {
  /* component: Row */
  return (
    <React.Fragment>{props.klass} - {props.uid}</React.Fragment>
  );
}

const UserName = (props) => {
  /* component: Row */
  return (
    <React.Fragment>{props.username}</React.Fragment>
  );
}

const Date = (props) => {
  /* component: Row */
  return (
    <React.Fragment>{props.date}</React.Fragment>
  );
}

class Content extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      page: 1, /* pagination: the page number */
      pageSize: 10, /* pagination: the number of rows per page */
    }
  }

  /* render() */
  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <main className={classes.content}>
          <div className={classes.title}>
            <Title klass={this.props.klass} />
          </div>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* START OF ROW DATA */}
                <Rows page={this.state.page} pageSize={this.state.pageSize} klass={this.props.klass} />
                {/* END OF ROW DATA */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>The following data depends on the Metadata Audit feauture</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Content);
