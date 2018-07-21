import React from 'react'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import * as utils from '../../utils.js'

import { moduleName, signIn, changeLoginInfo, changeMode } from '../../ducks/login'
import $ from 'jquery'

const mapStateToProps = state => {
    return {
        loginInfo: state[moduleName],
        loginError: state[moduleName].loginError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // changeLoginInfo: (field, value) => dispatch(changeLoginInfo(field, value)),
        // changeAuth: (mode) => dispatch(changeAuth(mode))
    }
}

const styles = theme => ({
    root: {
      width: '50%',
      marginTop: 100,
      padding: 50,
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    margin: {
        marginBottom: 40
    }
})

const LoginForm = (props) => {

    const { classes } = props

    const changeValue = value => event => {
        props.changeLoginInfo(value.toLowerCase(), event.target.value)
    }

    const loginUser = () => {
        props.signIn(props.loginInfo.username, props.loginInfo.password, utils.getCookie('csrftoken'))
    }

    const switchToRegister = () => {
        props.changeMode('register')
    }

    return (
        <div>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Card className={classes.root} elevation={1}>
                            {props.loginInfo.fields.map((fieldName, i) => {
                                let isPassword = fieldName.includes('Password')
                                if (isPassword) {
                                    return (
                                        <FormControl key={i} className={classNames(classes.margin, classes.textField)} error={props.loginError}>
                                        <InputLabel htmlFor="adornment-password">{fieldName}</InputLabel>
                                        <Input
                                            type={'password'}
                                            value={props.loginInfo[fieldName]}
                                            onChange={changeValue(fieldName)}
                                        />
                                        {props.loginError &&
                                            <FormHelperText id="name-error-text">
                                                {props.loginInfo.logingErrorMessage}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                    )
                                } else {
                                    return (
                                        <FormControl key={i} className={classNames(classes.margin, classes.textField)}>
                                            <InputLabel htmlFor="adornment-password">{fieldName}</InputLabel>
                                            <Input
                                                type={'text'}
                                                value={props.loginInfo[fieldName]}
                                                onChange={changeValue(fieldName)}
                                            />
                                        </FormControl>
                                    )
                                }
                            })}
                            <center>
                                <Button onClick={switchToRegister} color="primary">Register</Button>
                                <Button onClick={loginUser} color="primary" variant="contained">Login</Button>
                            </center>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, {signIn, changeLoginInfo, changeMode})(LoginForm)
)