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
import AssignmentIcon from '@material-ui/icons/Assignment'
import BuildIcon from '@material-ui/icons/Build'


import { moduleName, fetchAllTestnames } from '../../../ducks/editorDelete'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      loading: state[moduleName].loading,
      testNames: state[moduleName].testNames,
      testIds: state[moduleName].testIds
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

class EditForm extends React.Component {

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
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete">
                                            <Link to={`/editor/edit/${this.props.testIds[i]}`}>
                                                <BuildIcon />
                                            </Link>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                        </List>
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

EditForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchAllTestnames })(EditForm)
)