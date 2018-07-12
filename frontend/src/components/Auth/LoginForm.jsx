import React from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
      width: '50%',
      marginTop: 100,
      padding: 50
    },
})

const LoginForm =(props) => {
    const { classes } = props
    return (
        <div>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={16}>
                    <Card className={classes.root} elevation={1}>
                        <Typography variant="headline" component="h3">
                        This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                        </Typography>
                    </Card>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(null, null)(LoginForm)
  )