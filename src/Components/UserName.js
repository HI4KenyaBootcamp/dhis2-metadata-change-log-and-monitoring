/**
 *  Metadata Change Log & Monitoring
 *  
 *  Copyright (C) 2018  University of Nairobi Health IT
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
import { withStyles } from '@material-ui/core';
import { getInstance } from 'd2/lib/d2';

const styles = theme => ({
  deletedTextGrey: {
    color: '#666',
  },
  deletedTextRed: {
    color: '#d90000',
  },
});

class UserName extends React.Component {
  /* constructor */
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    }

    this.getUserName = this.getUserName.bind(this);
  }

  /* componentDidMount() */
  componentDidMount() {
    this.getUserName();
  }

  /* componentDidUpdate() */
  componentDidUpdate(prevProps) {
    // if any of the props has changed, fetch the new data
    if (this.props.username !== prevProps.username) {
      this.getUserName();
    }
  }

  /* getUserName() */
  getUserName() {
    const { classes } = this.props;
    
    const fetchMetadata = async () => {
      const d2 = await getInstance();
      const api = await d2.Api.getApi();
      const response = await api.get('users', {'fields': 'firstName, surname', 'filter': 'userCredentials.username:eq:' + this.props.username}).catch((error) => {
        console.log(error);
      });
      
      let index = 0; // act as unique key during map iteration
      
      let userName = response.users.map( function(user) {
        let firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.substr(1);
        let surname = user.surname.charAt(0).toUpperCase() + user.surname.substr(1);
        
        index = index + 1; // unique key
        
        if (firstName || surname) {
          return ( // return user firstName & surname
            <React.Fragment key={index}>
              {firstName} {surname}
            </React.Fragment>
          );
        } else {
          return ( // return username deleted
            <React.Fragment key={index}>
              <span className={classes.deletedTextGrey}>{this.props.username}</span>
              &nbsp;&mdash;&nbsp;
              <span className={classes.deletedTextRed}>DELETED</span>
            </React.Fragment>
          );
        }
      });
      
      this.setState({userName}); // set state -> userName
    }

    fetchMetadata();
  }

  /* render() */
  render() {
    return this.state.userName;
  }
}

export default withStyles(styles)(UserName);
