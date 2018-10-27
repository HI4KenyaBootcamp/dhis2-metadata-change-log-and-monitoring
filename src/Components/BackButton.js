/**
 *  Metadata Audit  Copyright (C) 2018  University of Nairobi Health IT
 *  
 *  Written by Kevin Marekia Kiringu (kmarekia@students.uonbi.ac.ke)
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
import {  Button,
          withStyles 
        } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const theme = createMuiTheme ({
  palette: {
    primary: { main: '#276696' },
    secondary: { main: '#ff9800' },
  }
});

class BackButton extends React.Component {
  /* const contextTyes */
  static contextTypes = {
    router: () => true,
  }

  /* render() */
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.button}
            onClick={this.context.router.history.goBack}
          >
            Back
          </Button>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(BackButton);
