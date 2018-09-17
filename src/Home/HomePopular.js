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
import axios from 'axios';

/* some code goes here */

class HomePopular extends React.Component {
  return axios.get(URLConstants.USER_URL, { headers: { Authorization: `Bearer ${data.
  constructor(props){
    super(props)
    this.state = {
      metadata: [],
      store: []
    }
  }

  componentDidMount(){
    axios.get('http://41.89.94.123:8080/dhis/api/metadataAudits.json')
    .then(json => console.log(json))
  }
  /* most code goes here */
  render() {
    return (
      <React.Fragment>
        {/* more render code goes here */} 
      </React.Fragment>
    );
  }
}

export default HomePopular;
