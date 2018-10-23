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
import {  Table,
          TableBody,
          TableCell,
          TableFooter,
          TableHead,
          TablePagination,
          TableRow,
          Typography,
          withStyles
        } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import Rows from './Rows';
import Search from './Search';

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

class Content extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      page: 0, /* pagination: the page number */
      pageSize: 0, /* pagination: the number of rows per page */
      total: 0, /* total: number of total rows */
    }

    this.getPagerTotal = this.getPagerTotal.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getPagerTotal();
  }

  /* componentDidUpdate() */
  componentDidUpdate(prevProps) {
    // if any of the props has changed, fetch the new data
    if (this.props.klass !== prevProps.klass || this.props.pageSize !== prevProps.pageSize || this.props.page !== prevProps.page) {
      this.getPagerTotal();
    }
  }

  /* getPagerTotal */
  getPagerTotal() {
    const fetchAudits = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get('metadataAudits', {'fields': 'null', 'klass': this.props.klass, 'page': 1, 'pageSize': 10});
      this.setState({
        page: response.pager.page - 1, // set state page number
        pageSize: response.pager.pageSize, // set state pageSize
        total: response.pager.total, // set state total
      });
    }

    fetchAudits();
  }

  /* handleChangePage() */
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  /* handleChangeRowsPerPage() */
  handleChangeRowsPerPage = event => {
    this.setState({ pageSize: event.target.value });
  }

  /* render() */
  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <main className={classes.content}>
          <div className={classes.title}>
            <Title klass={this.props.klass} />
            <Search />
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
                <Rows page={this.state.page + 1} pageSize={this.state.pageSize} klass={this.props.klass} />
                {/* END OF ROW DATA */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    /**
                     * PAGINATION WILL WORK WHEN API FIXES THE BUG
                     */
                    colSpan={5}
                    count={this.state.total}
                    rowsPerPage={this.state.pageSize}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
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
