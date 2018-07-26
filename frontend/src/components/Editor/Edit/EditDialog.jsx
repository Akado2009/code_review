import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';


import { withStyles } from '@material-ui/core/styles'


import { moduleName, closeEditDialog, changeEditedQuestionName, changeEditedQuestionText, editQuestion } from '../../../ducks/editorEdit'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
      openEditDialog: state[moduleName].openEditDialog,
      editedQuestionName: state[moduleName].editedQuestionName,
      editedQuestionText: state[moduleName].editedQuestionText,
      currentTest: state[moduleName].currentTest,
      questionIds: state[moduleName].questionIds,
      questionToEdit: state[moduleName].questionToEdit
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


class EditDialog extends React.Component {

    submitQuestion = event => {
        this.props.editQuestion(this.props.questionToEdit, this.props.editedQuestionName, this.props.editedQuestionText)
    }

    onNameChange = event => {
        this.props.changeEditedQuestionName(event.target.value)
    }

    onTextChange = event => {
        this.props.changeEditedQuestionText(event.target.value)
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.openEditDialog}
                    onClose={this.props.closeEditDialog}
                    >
                    <DialogTitle id="alert-dialog-title">{"Edit question"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            className={classes.textField}
                            value={this.props.editedQuestionName}
                            onChange={this.onNameChange}
                            margin="normal"
                        />
                        <TextField
                            label="Text"
                            className={classes.textField}
                            value={this.props.editedQuestionText}
                            onChange={this.onTextChange}
                            margin="normal"
                            multiline={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeEditDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.submitQuestion} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


EditDialog.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { closeEditDialog, changeEditedQuestionName, changeEditedQuestionText, editQuestion })(EditDialog)
)

