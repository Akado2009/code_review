import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import MonacoEditor from 'react-monaco-editor'
import { moduleName, changeLanguage, changeCode } from '../../../ducks/test'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        answers: state[moduleName].answers,
        language: state[moduleName].language,
        languages: state[moduleName].languages,
        currentQuestion: state[moduleName].currentQuestion
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '800'
    },
    editorDiv: {
        textAlign: 'left'
    }
})

const Editor = (props) => {

    const changeCode = (code, event) => {
        props.changeCode(code)
    }

    const changeLanguage = event => {
        props.changeLanguage(event.target.value)
    }

    const options = {
        selectOnLineNumbers: true
    }

    const { classes, currentQuestion, answers } = props

    const code = answers[currentQuestion]

    return (
        <div>
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
            </div>
        </div>
    )

}

Editor.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, { changeCode, changeLanguage })(Editor)
)