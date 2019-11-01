import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import './navBarUser.css'

class NavBarUser extends Component{
    constructor(){
        super()
        this.state = {
            showDropdown: false
            
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
                    <h1 className='text'>{this.props.username}</h1>
                    <i className='fas fa-bars fa-2x' id='hamburger-icon' onClick={this.changeState}/>
                    <div id='button-container'>
                        <Link to='/dashboard'><button className='button'>Races</button></Link>
                        <Link to='/userRaces'><button className='button'>My Races</button></Link>
                        <Link to='/'><button
                            className='button'
                            onClick={this.logout}
                        >Logout</button></Link>
                    </div>
                </nav>

                {this.state.showDropdown? (
                    <div className='dropdown'>
                        <Link to='/dashboard'><button className='button'>Races</button></Link>
                        <Link to='/userRaces'><button className='button'>My Races</button></Link>
                        <Link to='/'><button
                            className='button'
                            onClick={this.logout}
                        >Logout</button></Link>

                    </div>

                ): null}
            </div>
        )
    }
}

function mapStateToProps(state){
    const{username} = state.userReducer
    return{
        username: username
    }
}

export default connect(mapStateToProps)(NavBarUser)