import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NavBarHost extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    
    logout = () => {
        axios.post('/api/logout')
    }

    render(){
        return(
            <div>
                <Link to='/host/hostRaces'><button>My Races</button></Link>
                <Link to='/register'><button>Edit Profile</button></Link>
                <Link to='/host/form1'><button>Make New Race</button></Link>
                <Link to='/'><button
                    onClick={this.logout}
                >Logout</button></Link>
            </div>
        )
    }
}

export default NavBarHost