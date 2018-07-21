import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

import { moduleName, fetchTests } from '../../ducks/test'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    loading: state[moduleName].loading,
    available: state[moduleName].available,
    disabled: state[moduleName].disabled
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  flex: {
      flex: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class TestsForm extends React.Component {

  componentWillMount = () => {
    this.props.fetchTests()
  }

  render () {
    const { classes } = this.props
    return (
      <div classes={classes.root}>
      {!this.props.loading ?
        <div>
          <Typography variant="headline">
            Available
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            {
              this.props.available.map((test, i) => {
                return (
                  <Grid item xs={4} key={i}>
                      <Paper className={classes.paper}>
                        <Typography variant="subheading">
                          {test.name}
                        </Typography>
                        <Typography variant="caption">
                          {test.author}
                        </Typography>
                        <Typography variant="caption">
                          {test.created_at}
                        </Typography>
                        <Link to={`/test/${test.id}`}> CHECK </Link>
                      </Paper>
                    </Grid>
                )
              })
            }
          </Grid>
          <Typography variant="headline">
            Previous
          </Typography>
          <Grid container className={classes.root} spacing={16}>
            {
              this.props.disabled.map((test, i) => {
                return (
                  <Grid item xs={4} key={i}>
                    <Paper className={classes.paper}>
                      <Typography variant="subheading">
                        {test.name}
                      </Typography>
                      <Typography variant="caption">
                        {test.author}
                      </Typography>
                      <Typography variant="caption">
                        {test.created_at}
                      </Typography>
                      <Link to={`/test/${test.id}`}> CHECK </Link>
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
        :
        <center>
          <CircularProgress color="primary" size={50} />
        </center>
      }
      </div>
    )
  }
}

TestsForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, { fetchTests })(TestsForm)
)