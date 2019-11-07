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
    }

    render(){
        // console.log(this.props.userReducer.race[0].race_id)
        return(
            <div className='race-main-div'>
                <div className='race-buttons-div'>
                        <button className='button'>Contact Director</button>
                        <button
                            className='button'
                            onClick={this.controlRegister}
                        >Register</button>
                </div>
                <div className='race-info-button-comments-div'>
                    <div className='race-info-div'>
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
                <div className='race-map-div'>
                    {this.props.userReducer.race[0].map}
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

export default connect(mapStateToProps)(Race)