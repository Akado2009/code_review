import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';


import { withStyles } from '@material-ui/core/styles'


import { moduleName, closeAddDialog, changeNewQuestionName, changeNewQuestionText, addQuestion } from '../../../ducks/editorEdit'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
      openAddDialog: state[moduleName].openAddDialog,
      newQuestionName: state[moduleName].newQuestionName,
      newQuestionText: state[moduleName].newQuestionText,
      currentTest: state[moduleName].currentTest
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


class AddDialog extends React.Component {

    addDialog = event => {
        this.props.addQuestion(this.props.currentTest, this.props.newQuestionName, this.props.newQuestionText)
    }

    onNameChange = event => {
        this.props.changeNewQuestionName(event.target.value)
    }

    onTextChange = event => {
        this.props.changeNewQuestionText(event.target.value)
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.openAddDialog}
                    onClose={this.props.closeAddDialog}
                    >
                    <DialogTitle id="alert-dialog-title">{"Add question"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            className={classes.textField}
                            value={this.props.newQuestionName}
                            onChange={this.onNameChange}
                            margin="normal"
                        />
                        <TextField
                            label="Text"
                            className={classes.textField}
                            value={this.props.newQuestionText}
                            onChange={this.onTextChange}
                            margin="normal"
                            multiline={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeAddDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.addDialog} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


AddDialog.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { closeAddDialog, changeNewQuestionName, changeNewQuestionText, addQuestion })(AddDialog)
)

