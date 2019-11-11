import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import './race-styling.css'

class Race extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    controlRegister = () => {
        axios.post('/api/verifyRegistration', {raceId: this.props.userReducer.race[0].race_id, userId: this.props.userReducer.userId})
        .then(res => {
            if(res.data.length === 0){
                this.props.history.push('/pay')
            }else{
                alert('already registered for race')
            }
        })
        .catch(err => {
            console.log(err)
        })
        // verifies if the user is already registered for the race and then allows sthem to continue to pay if they are not yet registered
    }

    contactDirector = (num) => {
        alert(`Director's phone number: ${num}`)
        // could be replaced with and automatic text message or email
    }

    render(){
        return(
            // displays race info and the option to register or contact the race director
            <div className='race-main-div'>
                <div className='race-buttons-div'>
                        <button className='button'
                            onClick={() => this.contactDirector(this.props.userReducer.race[0].host_phone)}
                        >Contact Director</button>
                        <button
                            className='button'
                            onClick={this.controlRegister}
                        >Register</button>
                </div>
                <div className='race-info-button-comments-div'>
                    <div className='big-race-info-div'>
                        <p className='race-info'>Name: {this.props.userReducer.race[0].name}</p>
                        <p className='race-info'>Date: {this.props.userReducer.race[0].date}</p>
                        <p className='race-info'>Distance: {this.props.userReducer.race[0].distance}</p>
                        <p className='race-info'>Location: {this.props.userReducer.race[0].location}</p>
                        <p className='race-info'>Elevation Change: {this.props.userReducer.race[0].elevation_change}</p>
                        <p className='race-info'>Director: {this.props.userReducer.race[0].host_name}</p>
                        <p className='race-info'>Director's email: {this.props.userReducer.race[0].host_email}</p>
                    </div>
                    <div className='race-comments-div'>
                        <p className='comments-title'>Director's comments:</p>
                        <div className='comments'>
                            <p className='race-comments'> {this.props.userReducer.race[0].comments}</p>
                        </div>
                    </div>
                </div>
                <div className='race-map-container'>
                    <img
                        className='race-map-img'
                        src={this.props.userReducer.race[0].map}
                    ></img>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}
//pulls all of the information for that specific from the redux state and then displays it for the user to view and then decide of they want to register for the race.
export default connect(mapStateToProps)(Race)