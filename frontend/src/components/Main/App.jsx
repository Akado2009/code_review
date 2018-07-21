import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import TestsForms from './TestsDashboard'
import Test from './Test'
import Error from './Error'


const MainForm = () => {
    return (
        <div className="container">
            <Header />
            <Switch>
                <Route exact path='/' component={TestsForms}/>
                <Route path='/test/:number' component={Test}/>
                <Route component={Error} />
            </Switch>
        </div>
    )
}


export default MainForm