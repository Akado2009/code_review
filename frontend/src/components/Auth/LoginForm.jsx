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

import { changeLoginInfo } from '../../actions/index'

const mapStateToProps = state => {
    return {
        loginInfo: state.loginInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLoginInfo: (field, value) => dispatch(changeLoginInfo(field, value))
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

const LoginForm = (props) => {
    const { classes } = props

    const changeValue = value => event => {
        props.changeLoginInfo(value, event.target.value)
    }

    const loginUser = () => {
        console.log(props.loginInfo)
    }

    return (
        <div>
            <Grid container spacing={40}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Card className={classes.root} elevation={1}>
                            {props.loginInfo.fields.map((fieldName, i) => {
                                let isPassword = fieldName.includes('password')
                                return (
                                    <FormControl key={i} className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="adornment-password">{fieldName}</InputLabel>
                                        <Input
                                            type={isPassword ? 'password' : 'text'}
                                            value={props.loginInfo[fieldName]}
                                            onChange={changeValue(fieldName)}
                                        />
                                        {props.loginInfo.loginError && isPassword &&
                                            <FormHelperText id="name-error-text">
                                                {props.loginInfo.logingErrorMessage}
                                            </FormHelperText>
                                        }
                                    </FormControl>
                                )
                            })}
                            <center>
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
    connect(mapStateToProps, mapDispatchToProps)(LoginForm)
)