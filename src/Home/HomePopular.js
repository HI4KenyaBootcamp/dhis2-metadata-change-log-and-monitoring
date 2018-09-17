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
<<<<<<< HEAD
import axios from 'axios';

/* some code goes here */

class HomePopular extends React.Component {
  return axios.get(URLConstants.USER_URL, { headers: { Authorization: `Bearer ${data.
  constructor(props){
    super(props)
    this.state = {
      metadata: [],
      store: []
    }
  }

  componentDidMount(){
    axios.get('http://41.89.94.123:8080/dhis/api/metadataAudits.json')
    .then(json => console.log(json))
  }
  /* most code goes here */
  render() {
    return (
      <React.Fragment>
        {/* more render code goes here */} 
      </React.Fragment>
    );
  }
=======
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
>>>>>>> f9fce9f6a4d34ea43a2aa42e2c437bcd43fb8ebc
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function HomePopular(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
        <Typography variant="title" id="tableTitle">
            Popular/Most Edited
          </Typography>
          <TableRow>
            <TableCell>MetaData </TableCell>
            <TableCell numeric >Value</TableCell>
            <TableCell numeric>User</TableCell>
            <TableCell numeric>Action</TableCell>
            <TableCell numeric>Number of Edits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric href="#">{row.calories}</TableCell>
                <TableCell numeric href="#">{row.fat}</TableCell>
                <TableCell numeric href="#">{row.carbs}</TableCell>
                <TableCell numeric href="#">{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <Button variant="contained" color="primary">
        View All
      </Button>
      </Table>
    </Paper>
  );
}

HomePopular.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePopular);


