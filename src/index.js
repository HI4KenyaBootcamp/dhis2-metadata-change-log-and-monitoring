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
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './Home/Home';

import { init } from 'd2/lib/d2';

class MetadataAudit extends React.Component {
  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   */
  componentWillMount() {
    // initialize d2 library baseURL
    init({ baseUrl: process.env.REACT_APP_DOMAIN });
  }

  /**
   * func: render()
   * 
   * root render
   */
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Home />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<MetadataAudit />, document.getElementById('root'));
