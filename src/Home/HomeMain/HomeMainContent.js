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

// initialize d2 library - local
init({ baseUrl: 'https://test.hiskenya.org/kenya/api' });

// get an instance of d2
getInstance().then(d2 => {
  // returns the api object
  const api = d2.Api.getApi();

  // do a get request for /api/resources
  api.get('dataElements.json', {'fields': ':all', 'pageSize': '5'})
  .then(resources => {
    // for each object
    resources.dataElements.forEach(consolePrint);
  });
});

function consolePrint(item, index) {
  console.log(item.id + ' | ' + item.displayName + ' | ' + item.valueType);
}

class HomeMainContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>I am HomeMainContent</p>
      </React.Fragment>
    );
  }
}

export default HomeMainContent;
