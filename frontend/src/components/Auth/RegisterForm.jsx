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
import CircularProgress from '@material-ui/core/CircularProgress'

import * as utils from '../../utils.js'

import { moduleName as registerModule, signUp, changeRegisterInfo } from '../../ducks/register'
import { changeMode} from '../../ducks/login'

const mapStateToProps = state => {
    return {
        registerInfo: state[registerModule],
        registerError: state[registerModule].registerError,
        registerErrorMessage: state[registerModule].registerErrorMessage
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
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
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

            props.signUp(props.registerInfo.username, props.registerInfo.password,
                         props.registerInfo.name,  props.registerInfo.surname,
                         utils.getCookie('csrftoken'))
        }
    }

    const switchToLogin = () => {
        props.changeMode('login')
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
                                <div className={classes.wrapper}>
                                    <Button
                                        onClick={registerUser}
                                        color="primary"
                                        variant="contained"
                                        disabled={props.loading}
                                    >
                                        Register
                                    </Button>
                                    {props.loading && <CircularProgress size={40} className={classes.buttonProgress} />}
                                </div>
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
    connect(mapStateToProps, {changeRegisterInfo, changeMode, signUp})(RegisterForm)
)