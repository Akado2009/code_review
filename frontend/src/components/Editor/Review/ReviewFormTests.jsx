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

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'

import RateReviewIcon from '@material-ui/icons/RateReview'

import { moduleName, fetchAllTestnames, } from '../../../ducks/editorDelete'

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

class ReviewFormTests extends React.Component {

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
                                        <IconButton aria-label="Review">
                                            <Link to={`/editor/review/${this.props.match.params.userId}/${this.props.testIds[i]}`}>
                                                <RateReviewIcon />
                                            </Link>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                        </List>
                        <Link to={`/editor/review/`} className={classes.link}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                            >
                                Back
                            </Button>
                        </Link>
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

ReviewFormTests.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchAllTestnames })(ReviewFormTests)
)