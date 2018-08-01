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
import RateReviewIcon from '@material-ui/icons/RateReview'
import Button from '@material-ui/core/Button'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'


import { moduleName, fetchAllStudents, changeValue } from '../../../ducks/editorCheck'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
      loading: state[moduleName].loading,
      studentNames: state[moduleName].studentNames,
      studentIds: state[moduleName].studentIds,
      filteredStudentNames: state[moduleName].filteredStudentNames,
      searchValue: state[moduleName].searchValue
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
    margin: {
        margin: theme.spacing.unit,
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

class ReviewForm extends React.Component {

    componentWillMount () {
        this.props.fetchAllStudents()
    }

    changeSearchValue = (event) => {
        this.props.changeValue(event.target.value)
    }

    render () {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                {!this.props.loading ?
                    <Paper className={classes.root} elevation={1}>
                        <TextField
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            label="Username"
                            value={this.props.searchValue}
                            onChange={this.changeSearchValue}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <List dense={true}>
                        {this.props.filteredStudentNames.map((test, i) => {
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
                                            <Link to={`/editor/review/${this.props.studentIds[this.props.studentNames.indexOf(test)]}`}>
                                                <RateReviewIcon />
                                            </Link>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                        </List>
                        <Link to='/editor/' className={classes.link}>
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

ReviewForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
    connect(mapStateToProps, { fetchAllStudents, changeValue })(ReviewForm)
)