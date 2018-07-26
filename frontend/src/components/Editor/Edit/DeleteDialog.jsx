import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'


import { moduleName, closeDeleteDialog, deleteQuestion } from '../../../ducks/editorEdit'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
      openDeleteDialog: state[moduleName].openDeleteDialog,
      questionToDelete: state[moduleName].questionToDelete,
      questionNames: state[moduleName].questionNames,
      questionIds: state[moduleName].questionIds
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    textField: {
        width: '100%'
    }
})


class DeleteDialog extends React.Component {

    deleteQuestion = () => {
        this.props.deleteQuestion(this.props.questionIds[this.props.questionToDelete])
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.openDeleteDialog}
                    onClose={this.props.closeDeleteDialog}
                    >
                    <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to delete test {this.props.questionNames[this.props.questionToDelete]}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeDeleteDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteQuestion} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


DeleteDialog.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { closeDeleteDialog, deleteQuestion })(DeleteDialog)
)

