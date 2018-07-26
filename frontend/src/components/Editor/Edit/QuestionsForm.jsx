import React from 'react'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

import { CircularProgress } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import BuildIcon from '@material-ui/icons/Build'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'

import { Link } from 'react-router-dom'

import { moduleName, fetchQuestions, openAddDialog, closeSnack, openDeleteDialog, openEditDialog } from '../../../ducks/editorEdit'
import { connect } from 'react-redux'

import AddDialog from './AddDialog'
import DeleteDialog from './DeleteDialog'
import EditDialog from './EditDialog'


const mapStateToProps = state => {
    return {
        loading: state[moduleName].loading,
        questionNames: state[moduleName].questionNames,
        questionTexts: state[moduleName].questionTexts,
        questionIds: state[moduleName].questionIds,
        snackOpen: state[moduleName].snackOpen,
        snackMessage: state[moduleName].snackMessage
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

class QuestionsForm extends React.Component {

    componentWillMount () {
        this.props.fetchQuestions(this.props.match.params.id)
    }

    openDeleteDialog = index => event => {
        this.props.openDeleteDialog(index)
    }

    openEditDialog = index => event => {
        this.props.openEditDialog(this.props.questionIds[index], this.props.questionNames[index], this.props.questionTexts[index])
    }

    openAddDialog = () => {
        this.props.openAddDialog()
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                {!this.props.loading ?
                    <Paper className={classes.root} elevation={1}>
                        <List dense={true}>
                        {this.props.questionNames.map((question, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={question}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Edit">
                                            <BuildIcon onClick={this.openEditDialog(i)}/>
                                        </IconButton>
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon onClick={this.openDeleteDialog(i)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                        </List>

                        <AddDialog />
                        <DeleteDialog />
                        <EditDialog />

                        <Link to='/editor/edit' className={classes.link}>
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
                            onClick={this.openAddDialog}
                        >
                            Add
                        </Button>
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
                    onClose={this.props.closeSnack}
                    message={<span id="message-id">{this.props.snackMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.props.closeSnack}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

QuestionsForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchQuestions, openAddDialog, closeSnack, openDeleteDialog, openEditDialog })(QuestionsForm)
)