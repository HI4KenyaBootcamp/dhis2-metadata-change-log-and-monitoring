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
import { withStyles } from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
  // CSS
});

class Date extends React.Component {
  /* constructor */
  constructor(props) {
    super(props);
    
    this.state = {
      date: moment(this.props.date).startOf('day').fromNow(),
    }
  }

  /* render() */
  render() {
    return (
      <React.Fragment>{this.state.date}</React.Fragment>
    );
  }
}

export default withStyles(styles)(Date);
