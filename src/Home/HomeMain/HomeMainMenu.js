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
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class MainMenu extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Data Elements" />
            <Tab label="Organisation Unit" />
            <Tab label="Category" />
            <Tab label="Indicator" />


          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer href="#">Data Elements</TabContainer>}
       {value === 0 && <TabContainer href="#">Data Element Group</TabContainer>}
       {value === 0 && <TabContainer href="#">Data Element Group Set</TabContainer>}

       {value === 1 && <TabContainer href ="#">Organisation Unit</TabContainer>}
       {value === 1 && <TabContainer href ="#">Organisation Unit Group</TabContainer>}
       {value === 1 && <TabContainer href ="#">Organisation Unit Group Set</TabContainer>}
       {value === 1 && <TabContainer href ="#">Organisation Unit Level</TabContainer>}
       {value === 1 && <TabContainer href ="#">Hierachy Operations</TabContainer>}


       {value === 2 && <TabContainer href="#">Category Option</TabContainer>}
       {value === 2 && <TabContainer href="#">Category </TabContainer>}
       {value === 2 && <TabContainer href="#">Category Combination</TabContainer>}
       {value === 2 && <TabContainer href="#">Category Option Combination</TabContainer>}
       {value === 2 && <TabContainer href="#">Category Option Group</TabContainer>}
       {value === 2 && <TabContainer href="#">Category Option Group Set</TabContainer>}

       {value === 3 && <TabContainer href="">Indicator</TabContainer>}
       {value === 3 && <TabContainer href="">Indicator Type</TabContainer>}
       {value === 3 && <TabContainer href="">Indicator Group</TabContainer>}
       {value === 3 && <TabContainer href="">Indicator Group Set</TabContainer>}
       {value === 3 && <TabContainer href="">Program Indicator</TabContainer>}
       {value === 3 && <TabContainer href=""> Program Indicator Group </TabContainer>}
      </div>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);

