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
            //allows mobule responsivenes
        })
    }

    logout = () => {
        axios.post('/api/logout')
        // destorys the users session
    }

    render(){
        // console.log(this.props)
        return(
            <div id='main-container'>
                <nav>
                    <h1 className='text'>{this.props.username}</h1>
                    <i className='fas fa-bars fa-3x' id='hamburger-icon' onClick={this.changeState}/>
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
                    // when it is a certain size it shows this dropdown instead of the traditional horizontal navigation bar
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
// pulls the users username from the redux state so that it can display it in the nav bar
export default connect(mapStateToProps)(NavBarUser)