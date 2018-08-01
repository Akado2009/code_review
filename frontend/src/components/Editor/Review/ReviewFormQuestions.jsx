import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
// import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'

import IconButton from '@material-ui/core/IconButton'
import RateReviewIcon from '@material-ui/icons/RateReview'
import Button from '@material-ui/core/Button'

import { moduleName as editModule, fetchQuestions } from '../../../ducks/editorEdit'
import { fetchAnswer } from '../../../ducks/editorCheck'
import { connect } from 'react-redux'

import ReviewDialog from './ReviewDialog'


const mapStateToProps = state => {
    return {
        questionIds: state[editModule].questionIds,
        questionNames: state[editModule].questionNames,
        questionTexts: state[editModule].questionTexts,
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

class ReviewFormQuestions extends React.Component {

    componentWillMount () {
        this.props.fetchQuestions(this.props.match.params.testId)
    }

    reviewQuestion = (i) => {
        console.log(i)
        console.log(this.props.questionIds)
        console.log(this.props.questionNames)
        // console.log(this.props.questionNames[i])
        // console.log(this.props.questionTexts[i])
        // console.log(this.props.questionIds[i])
        // console.log(this.props.match.params)
        // console.log('clicked')

        this.props.fetchAnswer(this.props.questionIds[i], this.props.match.params.userId, this.props.questionNames[i], this.props.questionTexts[i])
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
                                            <IconButton aria-label="Review">
                                                <RateReviewIcon onClick={() => this.reviewQuestion(i)} />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            })}
                        </List>

                        <ReviewDialog />

                        <Link to={`/editor/review/${this.props.match.params.userId}`} className={classes.link}>
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

export default withStyles(styles)(
    connect(mapStateToProps, { fetchQuestions, fetchAnswer })(ReviewFormQuestions)
)