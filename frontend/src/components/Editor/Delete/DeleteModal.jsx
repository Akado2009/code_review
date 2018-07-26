import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'


import { moduleName, deleteTest, closeModal } from '../../../ducks/editorDelete'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      openModal: state[moduleName].openModal,
      currentTestToDelete: state[moduleName].currentTestToDelete
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
})

class DeleteModal extends React.Component {

    deleteItem = event => {
        this.props.deleteTest(this.props.deleteTest(this.props.currentTestToDelete))
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
            <Dialog
                open={this.props.openModal}
                onClose={this.props.closeModal}
                >
                <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete test {this.props.currentTestToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="primary" autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={this.deleteItem} color="primary">
                        Delete
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }
}

DeleteModal.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { deleteTest, closeModal })(DeleteModal)
)