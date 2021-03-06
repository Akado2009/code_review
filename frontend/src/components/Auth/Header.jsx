import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


const styles = {
    root: {
      flexGrow: 1,
      paddingTop: 10,
      paddingBottom: 10
    },
    flex: {
        flex: 1,
    }
}

const Header = (props) => {
    const { classes } = props
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="title" color="inherit">
                    FBB Algorithmics
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);