import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import MainForm from './MainForm'
import AddForm from './Add/AddForm'
import EditForm from './Edit/EditForm'
import ReviewForm from './Review/ReviewForm'
import ReviewFormTests from './Review/ReviewFormTests'
import ReviewFormQuestions from './Review/ReviewFormQuestions'
import DeleteForm from './Delete/DeleteForm'
import QuestionsForm from './Edit/QuestionsForm'
import Error from './Error'


const EditorForm = () => {
    return (
        <div className="container">
            <Header />
            <Switch>
                <Route exact path='/editor/' component={MainForm}/>
                <Route path='/editor/add' component={AddForm}/>
                <Route exact path='/editor/edit/' component={EditForm}/>
                <Route exact path='/editor/review/' component={ReviewForm}/>
                <Route exact path='/editor/review/:userId' component={ReviewFormTests}/>
                <Route path='/editor/review/:userId/:testId' component={ReviewFormQuestions}/>
                <Route path='/editor/delete' component={DeleteForm}/>
                <Route path='/editor/edit/:id' component={QuestionsForm}/>
                <Route component={Error} />
            </Switch>
        </div>
    )
}


export default EditorForm