import React from 'react'
import { Link } from 'react-router-dom'

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
          <div>
            <br />
            <Question />
            <br />
            <Editor />
          </div>
        }
      </div>
    )
  }
}


export default (
  connect(mapStateToProps, { fetchTestInfo, previousQuestion, nextQuestion })(TestSolve)
)