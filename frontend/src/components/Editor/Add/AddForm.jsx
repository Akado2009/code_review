import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { moduleName as editorDelete, fetchAllTestnames,} from '../../../ducks/editorDelete'
import { moduleName as editorAdd, openAddDialog, closeSnackbar } from '../../../ducks/editorAdd'

import { connect } from 'react-redux'

import AddDialog from './AddDialog'

const mapStateToProps = state => {
    return {
      loading: state[editorDelete].loading,
      testNames: state[editorDelete].testNames,
      snackOpen: state[editorAdd].snackOpen,
      snackMessage: state[editorAdd].snackMessage
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit * 2
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
})

class AddForm extends React.Component {

    componentWillMount () {
        this.props.fetchAllTestnames()
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                {!this.props.loading ?
                    <Paper className={classes.root} elevation={1}>
                        <List dense={true}>
                        {this.props.testNames.map((test, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={test}
                                    />
                                </ListItem>
                            )
                        })}
                        </List>
                        <Link to='/editor/' className={classes.link}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                            >
                                Back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.props.openAddDialog}
                        >
                            Add
                        </Button>
                        <AddDialog />
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.props.snackOpen}
                            autoHideDuration={6000}
                            onClose={this.props.closeSnackbar}
                            message={<span id="message-id">{this.props.snackMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.props.closeSnackbar}
                                >
                                <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </Paper>
                    :
                    <center>
                        <CircularProgress color="primary" size={50} />
                    </center>
                }

            </div>
        )
    }
}

AddForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchAllTestnames, openAddDialog, closeSnackbar })(AddForm)
)