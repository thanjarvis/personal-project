import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Form1 extends Component{
    constructor(){
        super()
        this.state = {
            raceName: '',
            raceDate: '',
            raceLocation: '',
            raceDistance: '',
            raceElevationChange: '',
            raceHostEmail: '',
            raceHostPhone: '',
            raceComments: '',
            hostId: ''
            
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                <div>
                    <input
                        name='raceName'
                        value={this.state.raceName}
                        placeholder='Race Name'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceDate'
                        value={this.state.raceDate}
                        placeholder='Race date'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceLocation'
                        value={this.state.raceLocation}
                        placeholder='RaceLocation'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceDistance'
                        value={this.state.raceDistance}
                        placeholder='Race Distance'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceElevationChange'
                        value={this.state.raceElevationChange}
                        placeholder='Elevation Change'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceHostEmail'
                        value={this.state.raceHostEmail}
                        placeholder='Host Email'
                        onChange={(e) => this.handleChange(e)}             
                    />
                   <input
                        name='raceHostPhone'
                        value={this.state.raceHostPhone}
                        placeholder='Host Phone'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        name='raceComments'
                        value={this.state.raceComments}
                        placeholder='Race comments or details'
                        onChange={(e) => this.handleChange(e)}             
                    />
                </div>
                <div>
                    <Link to='/host/hostRaces'><button>Cancel</button></Link>
                    <Link to='/host/form2'><button>Step 2</button></Link>
                </div>
            </div>
        )
    }
}

export default Form1