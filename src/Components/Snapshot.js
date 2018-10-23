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
import classnames from 'classnames';
import {  Card,
          CardActions,
          CardContent,
          CardHeader,
          Collapse,
          IconButton,
          Table,
          TableBody,
          TableCell,
          TableFooter,
          TableHead,
          TableRow,
          withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MetadataName from './MetadataName';
import UserName from './UserName';
import Date from './Date';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const custom = createMuiTheme ({
  palette: {
    primary: { main: '#276696' },
    secondary: { main: '#ff9800' },
  },
});

const WithMutations = (props) => {
  /* component: withMutation */
  let audit = props.audit;
  let value = JSON.parse(audit.value);
  
  /* get all mutations */
  let index = 0;
  let mutations = value.mutations.map( function(mutation) {
    index = index + 1;

    /* get the path */
    let path = mutation.path;
    /* get the operation */
    let operation = mutation.operation;
    /* get the value */
    let value;
    
    if (typeof mutation.value === 'string') {
      value = mutation.value;
    } else {
      value = JSON.stringify(mutation.value);
    }

    return(  
      <TableRow key={index}>
        <TableCell component="th" scope="row">{path}</TableCell>
        <TableCell>{operation}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  });

  return(
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Path</TableCell>
            <TableCell>operation</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mutations /* these are all the rows recorded in the value property */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              These are the full records of this entry.
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardContent>
  );
};

const WithoutMutations = (props) => {
  /* component: withoutMutation */
  let audit = props.audit;
  let value = JSON.parse(audit.value);
  
  let rows;
  for (var key in value) {
    if (!value.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
    
    /* get the field */
    let field = key;
    /* get the content */
    let content;
    if (typeof value[key] === 'string') {
      content = value[key];
    } else {
      content = JSON.stringify(value[key]);
    }

    rows = ( // generate row
      <React.Fragment>
        {rows}
        <TableRow>
          <TableCell component="th" scope="row">{field}</TableCell>
          <TableCell>{content}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return(
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows /* these are all the rows recorded in the value property */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              These are the full records of this entry.
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardContent>
  );
};

class Snapshot extends React.Component {
  /* constructor() */
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  /* handleExpandClick() */
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  /* render() */
  render() {
    const{ classes, audit} = this.props;
    let createdAt = <Date date={audit.createdAt} />;

    let details; // audit details
    if (audit.type === 'CREATE' || audit.type === 'DELETE') {
      details =  <WithoutMutations audit={audit} />
    }
    else if (audit.type === 'UPDATE') {
      details =  <WithMutations audit={audit} />
    }

    return (
      <React.Fragment>
        <MuiThemeProvider theme={custom}>
          <Card className={classes.card}>
            <CardHeader
              title={audit.type} // title -> the type of audit i.e. CREATE, UPDATE, DELETE
              subheader={createdAt} // subheader -> the time of the audit e.g. 15 hours ago, 1 week ago, etc.
            />
            <CardContent>
              <Table className={classes.table}>
                <TableBody>
                  {/* the name of the metadata object */}
                  <TableRow>
                    <TableCell>Metadata Name</TableCell>
                    <TableCell><MetadataName uid={audit.uid} klass={audit.klass} /></TableCell>
                  </TableRow>
                  {/* endOf name */}
                  
                  {/* the name of the user who made the audit */}
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell><UserName username={audit.createdBy} /></TableCell>
                  </TableRow>
                  {/* endOf username */}

                  {/* the name of the user who made the audit */}
                  <TableRow>
                    <TableCell>Klass</TableCell>
                    <TableCell>{audit.klass}</TableCell>
                  </TableRow>
                  {/* endOf username */}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Click below to view the details.</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              {details /* conditional rendering that renders the audit details  */}
            </Collapse>
          </Card>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Snapshot);
