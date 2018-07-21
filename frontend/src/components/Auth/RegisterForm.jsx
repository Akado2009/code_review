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

import { changeRegisterInfo, changeAuth } from '../../actions/index'
import $ from 'jquery'

const mapStateToProps = state => {
    return {
        registerInfo: state.registerInfo,
        registerError: state.registerError,
        registerErrorMessage: state.registerErrorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeRegisterInfo: (field, value) => dispatch(changeRegisterInfo(field, value)),
        changeAuth: (mode) => dispatch(changeAuth(mode))
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

const RegisterForm = (props) => {

    const { classes } = props

    const changeValue = value => event => {
        props.changeRegisterInfo(value.toLowerCase(), event.target.value)
    }

    const registerUser = () => {
        if (props.registerInfo.password !== props.registerInfo['password again']) {
            props.changeRegisterInfo('registerError', true)
            props.changeRegisterInfo('registerErrorMessage', 'Passwords must be the same. If you still have this error, contact your admin.')
        } else {
            let data = {
                username: props.registerInfo.username,
                password: props.registerInfo.password,
                name: props.registerInfo.name,
                surname: props.registerInfo.surname,
                csrfmiddlewaretoken: utils.getCookie('csrftoken')
            }
            $.post('/users/register/', data, (response) => {
                if (response.response === 'success') {
                    props.changeRegisterInfo('registerError', false)
                    // window.location = '/'
                } else {
                    props.changeRegisterInfo('registerError', true)
                    if (response.data === 'exists') {
                        props.changeRegisterInfo('registerErrorMessage', response.text)
                    } else {
                        props.changeRegisterInfo('registerErrorMessage', response.text)
                    }
                }
            })
        }
    }

    const switchToLogin = () => {
        props.changeAuth('login')
    }

    return (
        <div>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Card className={classes.root} elevation={1}>
                            {props.registerInfo.fields.map((fieldName, i) => {
                                let isPassword = fieldName.includes('Password')
                                if (isPassword) {
                                    return (
                                        <FormControl key={i} className={classNames(classes.margin, classes.textField)} error={props.registerError}>
                                        <InputLabel htmlFor="adornment-password">{fieldName}</InputLabel>
                                        <Input
                                            type={'password'}
                                            value={props.registerInfo[fieldName]}
                                            onChange={changeValue(fieldName)}
                                        />
                                        {props.registerError &&
                                            <FormHelperText id="name-error-text">
                                                {props.registerErrorMessage}
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
                                                value={props.registerInfo[fieldName]}
                                                onChange={changeValue(fieldName)}
                                            />
                                        </FormControl>
                                    )
                                }
                            })}
                            <center>
                                <Button onClick={switchToLogin} color="primary">Login</Button>
                                <Button onClick={registerUser} color="primary" variant="contained">Register</Button>
                            </center>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    )
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
)