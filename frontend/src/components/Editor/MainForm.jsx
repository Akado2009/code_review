import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'



const styles = theme => ({
    link: {
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'none'
        }
    },
    button: {
        textDecoration: 'none',
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    flex: {
          flex: 1,
    },
    card: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: 300
    },
})


const MainForm = (props) => {

    const { classes } = props
    return (
        <div>
            <Grid className={classes.root} spacing={16} container>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                Add a test
                            </Typography>
                            <Typography component="p">
                                Add a new test by subsequently adding questions and options.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to='/editor/add/' className={classes.link}>
                                <Button variant="contained" color="primary" className={classes.button}>ADD</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                Edit a test
                            </Typography>
                            <Typography component="p">
                                Edit an existing text, questions and etc.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to='/editor/edit/' className={classes.link}>
                                <Button variant="contained" color="primary" className={classes.button}>EDIT</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                Delete a test
                            </Typography>
                            <Typography component="p">
                                Delete an existing text, questions and etc.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to='/editor/delete/' className={classes.link}>
                                <Button variant="contained" color="primary" className={classes.button}>DELETE</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="headline" component="h2">
                                Review a test
                            </Typography>
                            <Typography component="p">
                                Review an existing text, questions and etc.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to='/editor/review/' className={classes.link}>
                                <Button variant="contained" color="primary" className={classes.button}>REVIEW</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            {/* <br />
            <Link to='/editor/edit' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>EDIT</Button>
            </Link>
            <br />
            <Link to='/editor/check' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>CHECK</Button>
            </Link>
            <br />
            <Link to='/editor/delete' className={classes.link}>
                <Button variant="contained" color="primary" className={classes.button}>DELETE</Button>
            </Link> */}
        </div>
    )
}

MainForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainForm)