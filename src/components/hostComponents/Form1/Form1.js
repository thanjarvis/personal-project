import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm1, clearState} from '../../../redux/raceReducer'
import './form1-styling.css'

// there are two paths here, the first is when the user wants to create a new race, the second is when the user wants to edit an existing race. in both cases they navigate to this component, but when it is to edit a new race the inputs are already populated with the existing information, which is pulled from the redux state. in the redux state it is updated and returned to the database

// when they make a new race they enter in all of the info which on the button click is sent to the redux state and then to the database.

class Form1 extends Component{
    constructor(){
        super()
        this.state = {
            raceImg: '',
            raceName: '',
            raceDate: '',
            raceLocation: '',
            raceDistance: '',
            raceElevationChange: '',
            raceHostPhone: '',
            raceComments: '',
            hostId: '',
            race: {}  
            //state holds all of the race infor as well as the specific values in each input     
        }
    }
    componentDidMount = () => {
        //checks if the user is making or editing a race, and then populates the inputs with the desired data if they are editing

        if(this.props.raceReducer.raceId !== ''){
            const {raceImg, raceName, raceDate, raceLocation, raceDistance,     raceElevationChange, raceHostPhone, raceComments, hostId} =     this.props.raceReducer
            this.setState({
                raceImg,
                raceName,
                raceDate,
                raceLocation,
                raceDistance,
                raceElevationChange,
                raceHostPhone,
                raceComments,
                hostId,

            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //function to update the values in state, works with each input becaused we used the input names to connect to the state names.
    }

    render(){
        // console.log(this.state.race)
        return(
            <div className='body-div' id='form-one-main'>
                <div id='race-input-container'>
                    <input
                        className='input'
                        name='raceImg'
                        value={this.state.raceImg}
                        placeholder='Paste img URL here'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceName'
                        value={this.state.raceName}
                        placeholder='Race Name'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceDate'
                        value={this.state.raceDate}
                        placeholder='Race date'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceLocation'
                        value={this.state.raceLocation}
                        placeholder='RaceLocation'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceDistance'
                        value={this.state.raceDistance}
                        placeholder='Race Distance'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceElevationChange'
                        value={this.state.raceElevationChange}
                        placeholder='Elevation Change'
                        onChange={(e) => this.handleChange(e)}             
                    />
                   <input
                        className='input'
                        name='raceHostPhone'
                        value={this.state.raceHostPhone}
                        placeholder='Host Phone'
                        onChange={(e) => this.handleChange(e)}             
                    />
                    <input
                        className='input'
                        name='raceComments'
                        value={this.state.raceComments}
                        placeholder='Race comments or details'
                        onChange={(e) => this.handleChange(e)}             
                    />
                </div>
                <div className='form1-button-container'>
                    <Link to='/host/hostRaces'><button
                        className='button'
                        id='race-button'
                    >Cancel</button></Link>
                    {/* cancel button just navigates to the host landing page */}
                    <Link to='/host/form2'><button
                        id='race-button'
                        className='button'
                        onClick={() => this.props.sendForm1(
                            this.state.raceImg,
                            this.state.raceName,
                            this.state.raceDate,
                            this.state.raceLocation,
                            this.state.raceDistance,
                            this.state.raceElevationChange,
                            this.state.raceHostPhone,
                            this.state.raceComments,
                        )}
                    >Step 2</button></Link>
                    {/* step2 button navigates to form 2 and updates the races values on the redux state in preparation to be sent to the database */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        raceReducer: state.raceReducer
    }
}

export default connect(mapStateToProps, {sendForm1, clearState})(Form1)
// here redux is only getting the existing race info if it is that the host want to edit the race. in the case of making a new race redux only recieves the values