import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Form2 extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        return(
            <div>
                <Link to='/host/hostRaces'><button>Save</button></Link>
                <Link to='/host/hostRaces'><button>Cancel</button></Link>
            </div>
        )
    }
}

export default Form2