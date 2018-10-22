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
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { init } from 'd2/lib/d2';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main';
import History from './History';

class App extends React.Component {
  /* constructor() */
  constructor() {
    super();
    init({ baseUrl: process.env.REACT_APP_API });
  }

  /* render() */
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path={"/"} component={Main} exact/>
            <Route path={"/index.html"} component={Main}/>
            <Route path={"/history/:id"} component={History}/>
            <Route component={Main}/>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
