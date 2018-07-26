import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { signOut } from '../../ducks/login'
import { connect } from 'react-redux'
import * as utils from '../../utils.js'


const styles = {
    root: {
      flexGrow: 1,
      paddingTop: 10,
      paddingBottom: 10
    },
    flex: {
        flex: 1,
    },
    link: {
        cursor: 'pointer',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'none'
        }
    },
    logout: {
        float: 'right',
        color: 'white'
    }
}

const Header = (props) => {
    const { classes } = props

    const signUserOut = () => {
        props.signOut(utils.getCookie('csrftoken'))
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <a href="/" className={classNames(classes.link, classes.flex)}>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            FBB Algorithmics
                        </Typography>
                    </a>
                    <Link to='/' className={classes.link}>
                        <Button className={classes.link}>TESTS</Button>
                    </Link>
                    <Button onClick={signUserOut} className={classes.logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(null, {signOut})(Header)
);