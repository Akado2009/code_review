import React from 'react'

import { connect } from 'react-redux'

import Header from './Header'
import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'

import { moduleName } from '../../ducks/login'

const mapStateToProps = state => {
    return {
        mode: state[moduleName].authMode
    }
}


const ConnectedAuthForm = (props) => {
    return (
        <div className="container">
            <Header />
            {props.mode === 'login' ?
                <LoginForm />
                :
                <div> shit</div>
                // <RegisterForm/>
            }
        </div>
    )
}

const AuthForm = connect(mapStateToProps, null)(ConnectedAuthForm)


export default AuthForm