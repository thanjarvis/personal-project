import React from 'react';
import './App.css';
import routes from './routes'
import {withRouter} from 'react-router'
import NavBarUser from './components/nav/NavBarUser';
import NavBarHost from './components/nav/NavBarHost';

function App(props) {

  const navDisplay = () =>{
    if(props.location.pathname === '/host/form1' || props.location.pathname === '/host/form2' || props.location.pathname === '/host/hostRaces'){
      return(
        <NavBarHost/>
      )
    }else if(props.location.pathname === '/dashboard' || props.location.pathname === '/race' || props.location.pathname === '/userRaces'){
      return(
        <NavBarUser/>
      )
    }
  }



  return (
    <div className="App">
      {navDisplay()}
      {routes}
    </div>
  );
}

export default withRouter(App);
