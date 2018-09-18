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

import Grid from '@material-ui/core/Grid';

import HomeMain from './HomeMain';
import HomeRecent from './HomeRecent';
import HomePopular from './HomePopular';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <HomeRecent />
          </Grid>
          <Grid item xs={12} md={6}>
            <HomePopular />
          </Grid>
          <Grid item xs={12}>
            <HomeMain />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
