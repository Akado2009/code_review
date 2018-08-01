import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'

import MonacoEditor from 'react-monaco-editor'


import { withStyles } from '@material-ui/core/styles'


import { moduleName, closeReviewDialog, changeMark, closeSnackBar, submitMark } from '../../../ducks/editorCheck'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
      openReviewDialog: state[moduleName].openReviewDialog,
      answerMark: state[moduleName].answerMark,
      answerContent: state[moduleName].answerContent,
      answerId: state[moduleName].answerId
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    editorDiv: {
        textAlign: 'left'
    },
    close: {
        float: 'right'
    }
})


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        ref={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
      />
    );
  }

class ReviewDialog extends React.Component {

    state = {
        value: 10
    }

    changeMark = event => {
        this.props.changeMark(event.target.value)
    }

    submitMark = event => {
        this.props.submitMark(this.props.answerId, this.props.answerMark)
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.openReviewDialog}
                    onClose={this.props.closeReviewDialog}
                    fullScreen
                    className={classes.root}
                    >
                    <DialogTitle id="alert-dialog-title">{"Review answer"}<CloseIcon className={classes.close} onClick={this.props.closeReviewDialog} /></DialogTitle>
                    <DialogContent>
                        <MonacoEditor
                            height="600"
                            language="python"
                            value={this.props.answerContent}
                            disabled={true}
                        />
                        <TextField
                            className={classes.formControl}
                            label="Mark"
                            value={this.props.answerMark}
                            onChange={this.changeMark}
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeReviewDialog} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.submitMark} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


ReviewDialog.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { closeReviewDialog, changeMark, closeSnackBar, submitMark })(ReviewDialog)
)

