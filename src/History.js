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
// import { getInstance } from 'd2/lib/d2';
import { withStyles } from '@material-ui/core';
import BackButton from './Components/BackButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  
});

const custom = createMuiTheme ({
  palette: {
    primary: { main: '#276696' },
    secondary: { main: '#ff9800' },
  }
});

class History extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.id, // get uid passed through react-router
    }
  }

  /* render() */
  render() {
    return (
      <React.Fragment>
        <BackButton />

        <MuiThemeProvider theme={custom}>
          <h1>History for {this.state.uid}</h1>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(History);
