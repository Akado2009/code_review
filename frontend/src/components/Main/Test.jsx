import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'


import { moduleName, fetchTestInfo } from '../../ducks/test'
import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core'


const styles = theme => ({

})

const mapStateToProps = state => {
  return {
    loading: state[moduleName].loading,
    questions: state[moduleName].questions
  }
}
class Test extends React.Component {

  componentWillMount = () => {
    this.props.fetchTestInfo(this.props.match.params.number)
  }

  render () {
    const { classes } = this.props
    console.log(this.props.questions)
    return (
      <div>
        {this.props.loading &&
          <center>
            <CircularProgress size={40} color="primary" />
          </center>
        }
        <Link to='/'>BACK</Link>
      </div>
    )
  }
}

Test.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(mapStateToProps, { fetchTestInfo })(Test)
)