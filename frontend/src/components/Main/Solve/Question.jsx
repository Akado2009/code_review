import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


import { moduleName, nextQuestion, previousQuestion } from '../../../ducks/test'
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        questions: state[moduleName].questions,
        currentQuestion: state[moduleName].currentQuestion
    }
 }

 const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: '100%',
    }
})


const Question = (props) => {

    const nextQuestion = () => {
        props.nextQuestion(props.currentQuestion)
    }

    const previousQuestion = () => {
        props.previousQuestion(props.currentQuestion)
    }
    const { classes, questions, currentQuestion } = props

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {questions[currentQuestion] && questions[currentQuestion].name}
                    </Typography>
                    <Typography component="p">
                        {questions[currentQuestion] && questions[currentQuestion].text}
                    </Typography>
                </CardContent>
                <CardActions>
                    {currentQuestion > 0 &&
                    <Button size="small" color="primary" onClick={previousQuestion}>
                        Previous
                    </Button> }
                    {currentQuestion < questions.length - 1 &&
                    <Button size="small" color="primary" onClick={nextQuestion}>
                        Next
                    </Button> }
                </CardActions>
            </Card>
        </div>
    )
}

Question.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, { nextQuestion, previousQuestion })(Question)
)
