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
import { getInstance } from 'd2/lib/d2';
import {  Card,
          CardContent,
          Table,
          TableBody,
          TableCell,
          TableHead,
          TableFooter,
          TableRow,
          Typography, 
          withStyles } from '@material-ui/core';

const styles = theme => ({
  /**
   * const: styles = func: theme()
   * 
   * css for the component being rendered
   */
  card: {
    display: 'flex',
    minWidth: '100%',
    minHeight: '100%',
    overflowX: 'auto',
  },
  cardContent: {
    minWidth: 600,
    margin: theme.spacing.unit,
  },
  historyCard: {
    margin: theme.spacing.unit,
  },
  historyCardCreate: {
    backgroundColor: '#e2ffe2',
  },
  historyCardUpdate: {
    backgroundColor: '#f1e2ff',
  },
  historyCardDelete: {
    backgroundColor: '#ffe2f1',
  },
  root: {
    margin: theme.spacing.unit,
  },
  title: {
    padding: theme.spacing.unit*2,
  },
});

class History extends React.Component {
  /**
   * func: constructor() 
   * 
   * initialization function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.id, // element uid
      history: [], // get all the metadata audit records for a single metadata
    }
  }

  /**
   * func: componentWillMount()
   * 
   * in-built ReactJS function, executed before rendering
   * 
   * this section should render the default view for each tab
   */
  componentWillMount() {
    const { classes } = this.props;

    // get d2 library instance
    getInstance().then(d2 => {
      const api = d2.Api.getApi();

      // send get request for /api/metadataAudits history
      api.get('metadataAudits', {'fields': ':all', 'uid': this.state.uid})
      .then(resources => {
        // save the values of each metadata audit entry
        let history = resources.metadataAudits.map( function(metadataAudit) {
          // get the value, convert to JSON format
          let value = JSON.parse(metadataAudit.value);
          console.log(value);

          // get value for category combination
          let catCombo = '';
          if (value.categoryCombo) {
            catCombo = value.categoryCombo;
          }

          // get data & time
          let createAt = metadataAudit.createdAt;
          let date = createAt.split("T")
          let time = date[1].split(".")
          date = date[0].split(".")

          if (metadataAudit.type === 'CREATE') {
            /* CREATE operation */
            return(
              <div className={classes.cardContent}>
                <Card className={classes.historyCard}>
                  <CardContent className={classes.historyCardCreate}>
                    <Typography variant="title" gutterBottom>
                      User: {metadataAudit.createdBy}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                      {date} {time}
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Field</TableCell>
                          <TableCell>Content</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">name</TableCell>
                          <TableCell>{value.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">shortName</TableCell>
                          <TableCell>{value.shortName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">domainType</TableCell>
                          <TableCell>{value.domainType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">valueType</TableCell>
                          <TableCell>{value.valueType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">aggregationType</TableCell>
                          <TableCell>{value.aggregationType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">categoryCombination</TableCell>
                          <TableCell>{catCombo.name}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell>
                            {metadataAudit.klass}
                          </TableCell>
                          <TableCell>
                            {metadataAudit.uid}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            );
          } else if (metadataAudit.type === 'DELETE') {
            /* DELETE operation */
            return(
              <div className={classes.cardContent}>
                <Card className={classes.historyCard}>
                  <CardContent className={classes.historyCardDelete}>
                  <Typography variant="title" gutterBottom>
                      User: {metadataAudit.createdBy}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                      {date} {time}
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Field</TableCell>
                          <TableCell>Content</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">name</TableCell>
                          <TableCell>{value.name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">shortName</TableCell>
                          <TableCell>{value.shortName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">domainType</TableCell>
                          <TableCell>{value.domainType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">valueType</TableCell>
                          <TableCell>{value.valueType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">aggregationType</TableCell>
                          <TableCell>{value.aggregationType}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">categoryCombination</TableCell>
                          <TableCell>{catCombo.name}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell>
                            {metadataAudit.klass}
                          </TableCell>
                          <TableCell>
                            {metadataAudit.uid}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            );
          } else {
            /* UPDATE operation */

            // get value for mutations
            let mutations = value.mutations.map( function(mutation) {
              return(
                <React.Fragment>  
                  <TableRow>
                    <TableCell component="th" scope="row">{mutation.path}</TableCell>
                    <TableCell>{mutation.operation}</TableCell>
                    <TableCell>{mutation.value}</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            });

            return(
              <div className={classes.cardContent}>
                <Card className={classes.historyCard}>
                  <CardContent className={classes.historyCardUpdate}>
                  <Typography variant="title" gutterBottom>
                      User: {metadataAudit.createdBy}
                    </Typography>
                    <Typography variant="subheading" gutterBottom>
                      {date} {time}
                    </Typography>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Path</TableCell>
                          <TableCell>Operation</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mutations}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={2}>
                            {metadataAudit.klass}
                          </TableCell>
                          <TableCell>
                            {metadataAudit.uid}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            );
          }
        });

        // update state.history to the value picked
        this.setState({
          history: history,
        });
      });
    });
  }

  /**
   * func: render()
   */
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.title}>
          <Typography variant="title">{this.state.uid} Timeline</Typography>
        </div>

        <section className={classes.card}>
          {this.state.history}
        </section>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(History);
