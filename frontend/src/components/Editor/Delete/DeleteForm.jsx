import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'


import { moduleName, fetchAllTestnames, deleteTest, openModal, closeSnackbar } from '../../../ducks/editorDelete'
import { connect } from 'react-redux'

import DeleteModal from './DeleteModal'

const mapStateToProps = state => {
    return {
      loading: state[moduleName].loading,
      testNames: state[moduleName].testNames,
      openModal: state[moduleName].openModal,
      snackMessage: state[moduleName].snackMessage,
      snackOpen: state[moduleName].snackOpen
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
    }
})

class DeleteForm extends React.Component {

    componentWillMount () {
        this.props.fetchAllTestnames()
    }

    openDialog = name => event => {
        this.props.openModal(name)
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
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon onClick={this.openDialog(test)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                        </List>
                        <DeleteModal />
                    </Paper>
                    :
                    <center>
                        <CircularProgress color="primary" size={50} />
                    </center>
                }
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
            </div>
        )
    }
}

DeleteForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchAllTestnames, deleteTest, openModal, closeSnackbar })(DeleteForm)
)