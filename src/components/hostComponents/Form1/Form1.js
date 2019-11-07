import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm1, clearState} from '../../../redux/raceReducer'
import './form1-styling.css'

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
        }
    }
    componentDidMount = () => {

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