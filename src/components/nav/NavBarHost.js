import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './navBarHost.css'


class NavBarHost extends Component{
    constructor(){
        super()
        this.dropdown=React.createRef()
        this.state = {
            showDropdown:false
            
        }
    }

    changeState = () => {
        this.setState({
            showDropdown: !this.state.showDropdown
        })
    }
  

    
    logout = () => {
        axios.post('/api/logout')
    }

    render(){
        // console.log(this.props)
        return(
            <div id='main-container'>
                <nav>
                    <h1 className='text'>{this.props.hostName}</h1>
                    <i className='fas fa-bars fa-2x' id='hamburger-icon' onClick={this.changeState}/>  
                    <div id='button-container'>
                        <Link to='/host/hostRaces'><button  className='button'>My Races</button></Link>
                        <Link to='/host/form1'><button className='button'>Make  New Race</button></ Link>
                        <Link to='/'><button
                            className='button'
                            onClick={this.logout}
                        >Logout</button></Link>
                    </div>
                

                {this.state.showDropdown? (
                    <div className='dropdown'>
                        <Link to='/host/hostRaces'><button      className='dropdown-button, button'>My Races</button></Link>
                         <Link to='/host/form1'><button     className='dropdown-button, button'>Make  New Race</button></   Link>
                        <Link to='/'><button
                            className='dropdown-button, button'
                            onClick={this.logout}
                        >Logout</button></Link>
                    </div>

                ): null}
                </nav>

            </div>
        )
    }
}

function mapStateToProps(state){
    const{hostName} = state.raceReducer
    return{
        hostName: hostName
    }
}
export default connect(mapStateToProps)(NavBarHost)