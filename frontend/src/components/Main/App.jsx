import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import TestsForms from './TestsDashboard'
import TestSolve from './Solve/TestSolve'
import TestCheck from './Check/TestCheck'
import Error from './Error'


const MainForm = () => {
    return (
        <div className="container">
            <Header />
            <Switch>
                <Route exact path='/' component={TestsForms}/>
                <Route path='/test/solve/:number' component={TestSolve}/>
                <Route path='/test/check/:number' component={TestCheck}/>
                <Route component={Error} />
            </Switch>
        </div>
    )
}


export default MainForm