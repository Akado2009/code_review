import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import DateTimePicker from 'material-ui-pickers/DateTimePicker'

import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';


import { withStyles } from '@material-ui/core/styles'

import { moduleName, closeAddDialog, changeTestName, changeTestText, changeTestUntil, addTest } from '../../../ducks/editorAdd'

import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        newTestName: state[moduleName].newTestName,
        newTestText: state[moduleName].newTestText,
        newTestUntil: state[moduleName].newTestUntil,
        openAddDialog: state[moduleName].openAddDialog
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

    onNameChange = (event) => {
        this.props.changeTestName(event.target.value)
    }

    onTextChange = (event) =>{
        this.props.changeTestText(event.target.value)
    }

    onUntilChange = (date) => {
        this.props.changeTestUntil(date)
    }

    addTest = (event) => {
        this.props.addTest(this.props.newTestName, this.props.newTestText, this.props.newTestUntil)
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.openAddDialog}
                    onClose={this.props.closeAddDialog}
                    >
                    <DialogTitle id="alert-dialog-title">{"Add test"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            className={classes.textField}
                            value={this.props.newTestName}
                            onChange={this.onNameChange}
                            margin="normal"
                        />
                        <TextField
                            label="Text"
                            className={classes.textField}
                            value={this.props.newTestText}
                            onChange={this.onTextChange}
                            margin="normal"
                            multiline={true}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                value={this.props.newTestUntil}
                                onChange={this.onUntilChange}
                            />
                        </MuiPickersUtilsProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeAddDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.addTest} color="primary">
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
    connect(mapStateToProps, { closeAddDialog,  changeTestName, changeTestText, changeTestUntil, addTest })(AddDialog)
)

