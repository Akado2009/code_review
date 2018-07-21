import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import MonacoEditor from 'react-monaco-editor'
import { moduleName, changeLanguage, changeCode, saveAnswer, closeSnack, saveAllAnswers } from '../../../ducks/test'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        answers: state[moduleName].answers,
        language: state[moduleName].language,
        languages: state[moduleName].languages,
        currentQuestion: state[moduleName].currentQuestion,
        snackOpen: state[moduleName].snackOpen,
        snackText: state[moduleName].snackText
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        width: 350
    },
    editorDiv: {
        textAlign: 'left'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        '&:hover': {
            color: '#fff',
            textDecoration: 'none'
        }
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    }
})

const Editor = (props) => {

    const changeCode = (code, event) => {
        props.changeCode(code)
    }

    const changeLanguage = event => {
        props.changeLanguage(event.target.value)
    }

    const saveAnswer = () => {
        props.saveAnswer(props.answers[props.currentQuestion].id, props.answers[props.currentQuestion].content)
    }

    const saveAllAnswers = () => {
        props.saveAllAnswers(props.answers)
    }

    const options = {
        selectOnLineNumbers: true
    }

    const { classes, currentQuestion, answers } = props

    const code = answers[currentQuestion].content

    return (
        <div>
            <Button color="secondary" onClick={saveAllAnswers} variant="contained" className={classes.button}>SAVE ALL</Button>
            <Button color="secondary" onClick={saveAnswer} variant="contained" className={classes.button}>SAVE</Button>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Language</InputLabel>
                <Select
                    value={props.language}
                    onChange={changeLanguage}
                >
                    {props.languages.map((language, i) => {
                        return (
                            <MenuItem value={language} key={i}>{language}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <div className={classes.editorDiv}>
                <MonacoEditor
                    height="600"
                    language="python"
                    value={code}
                    options={options}
                    onChange={changeCode}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={props.snackOpen}
                    autoHideDuration={6000}
                    onClose={props.closeSnack}
                    message={<span id="message-id">{props.snackText}</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.closeSnack}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </div>
        </div>
    )

}

Editor.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, { changeCode, changeLanguage, saveAnswer, saveAllAnswers, closeSnack })(Editor)
)