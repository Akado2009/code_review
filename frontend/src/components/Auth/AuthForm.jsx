import React from 'react'

import { connect } from 'react-redux'

import Header from './Header'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'



const mapStateToProps = state => {
    return {
        mode: state.authMode
    }
}


const ConnectedAuthForm = (props) => {

    return (
        <div className="container">
            <Header />
            {props.mode === 'login' ?
                <LoginForm />
                :
                <RegisterForm/>
            }
        </div>
    )
}

const AuthForm = connect(mapStateToProps, null)(ConnectedAuthForm)


export default AuthForm