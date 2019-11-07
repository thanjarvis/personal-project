import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/landing/Landing'
import Register from './components/register/Register'
import Dashboard from './components/userComponents/Dashboard/Dashboard'
import Race from './components/Race/Race'
import UserRaces from './components/userComponents/UserRaces/UserRaces'
import Form1 from './components/hostComponents/Form1/Form1'
import Form2 from './components/hostComponents/Form2/Form2'
import HostRaces from './components/hostComponents/HostRaces/HostRaces'
import Pay from './components/pay/Pay'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/race' component={Race}/>
        <Route path='/userRaces' component={UserRaces}/>
        <Route path='/host/form1' component={Form1}/>
        <Route path='/host/form2' component={Form2}/>
        <Route path='/host/hostRaces' component={HostRaces}/>
        <Route path='/pay' component={Pay}/>
    </Switch>
)