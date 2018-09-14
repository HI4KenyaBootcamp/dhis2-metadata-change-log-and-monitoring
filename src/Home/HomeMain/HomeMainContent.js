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
import { init, getInstance } from 'd2/lib/d2';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class HomeMainContent extends React.Component {
  /**
   * func: constructor() 
   * 
   * initialization function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      dataElements: []
    };
  }

  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   */
  componentWillMount() {
    // initialize d2 library baseURL
    init({ baseUrl: 'https://test.hiskenya.org/kenya/api' });

    // get d2 library instance
    getInstance().then(d2 => {
      // return the api object
      const api = d2.Api.getApi();
    
      // send get request for /api/dataElements
      api.get('dataElements.json', {'fields': 'id,name,valueType,domainType,lastUpdated', 'pageSize': '20'})
      .then(resources => {
        // assign dataElemets to variable
        let dataElements = resources.dataElements.map((dataElement) =>
          <TableRow key={dataElement.id}>
            <TableCell component="th" scope="row">{dataElement.name}</TableCell>
            <TableCell>{dataElement.lastUpdated}</TableCell>
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
   * func: render()
   * 
   * renders the component table
   */
  render() {
    return (
      <React.Fragment>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dataElements}
            </TableBody>
          </Table>
        </Paper>
      </React.Fragment>
    );
  }
}

export default HomeMainContent;
