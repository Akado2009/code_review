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

import { changeRegisterInfo } from '../../actions/index'

const mapStateToProps = state => {
    return {
        registerInfo: state.registerInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeRegisterInfo: (field, value) => dispatch(changeRegisterInfo(field, value))
    }
}

const styles = theme => ({
    root: {
      width: '50%',
      marginTop: 100,
      padding: 50
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
        console.log(props.registerInfo)
    }

    return (
        <div>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Card className={classes.root} elevation={1}>
                            {props.registerInfo.fields.map((fieldName, i) => {
                                let isPassword = fieldName.includes('password')
                                return (
                                    <FormControl key={i} className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="adornment-password">{fieldName}</InputLabel>
                                        <Input
                                            type={isPassword ? 'password' : 'text'}
                                            value={props.registerInfo[fieldName]}
                                            onChange={changeValue(fieldName)}
                                        />
                                        {props.registerInfo.registerError && isPassword &&
                                            <FormHelperText id="name-error-text">
                                                {props.registerInfo.registerErrorMessage}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                )
                            })}
                            <center>
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