import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { moduleName, fetchTestInfo, nextQuestion, previousQuestion } from '../../../ducks/test'
import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core'

import Question from './Question'
import Editor from './Editor'



const mapStateToProps = state => {
  return {
    loading: state[moduleName].loading,
    questions: state[moduleName].questions,
    currentQuestion: state[moduleName].currentQuestion
  }
}

class TestSolve extends React.Component {

  componentWillMount = () => {
    this.props.fetchTestInfo(this.props.match.params.number)
  }

  nextQuestion = () => {
    this.props.nextQuestion(this.props.currentQuestion)
  }

  previousQuestion = () => {
    this.props.previousQuestion(this.props.currentQuestion)
  }

  render () {
    const { currentQuestion, questions } = this.props
    return (
      <div>
        {this.props.loading &&
          <center>
            <CircularProgress size={40} color="primary" />
          </center>
        }
        {
          questions[currentQuestion] &&
          <center>
            {/* <Link to='/'>BACK</Link> */}
            <br />
            <Question />
            <br />
            <Editor />
          </center>
        }
      </div>
    )
  }
}


export default (
  connect(mapStateToProps, { fetchTestInfo, previousQuestion, nextQuestion })(TestSolve)
)