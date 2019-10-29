import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
class NavBarUser extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    logout = () => {
        axios.post('/logout')
    }

    render(){
        return(
            <div>
                <Link to='/dashboard'><button>Races</button></Link>
                <Link to='/userRaces'><button>My Races</button></Link>
                <Link to='/register'><button>Edit Profile</button></Link>
                <Link to='/'><button
                    onClick={this.logout}
                >Logout</button></Link>
            </div>
        )
    }
}

export default NavBarUser