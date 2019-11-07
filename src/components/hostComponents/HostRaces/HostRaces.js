import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRaceForEditing, clearState} from '../../../redux/raceReducer'
import axios from 'axios';
import {Link} from 'react-router-dom'
import './host-races-styling.css'

class HostRaces extends Component{
    constructor(props){
        super(props)
        this.state = {
            hostRaces: []
            
        }
    }

    componentDidMount = () => {
        this.getAllRaces()
    }
    componentDidUpdate = async (prevState) => {
        prevState = this.state.hostRaces
        let proxState = []
        let id = this.props.hostId
        await axios.get(`/api/getAllHostRaces/${id}`)
        .then(res => proxState = res.data)

        if (prevState.length !== proxState.length){
            this.getAllRaces()
        }
    }

    getAllRaces = () => {
        let id = this.props.hostId
        axios.get(`/api/getAllHostRaces/${id}`)
        .then(res => this.setState({
            hostRaces:res.data
        }))
        .catch(err => console.log(err))
    }

    deleteRace= async (raceId) => {
        // console.log(raceId)
        await axios.delete(`/api/deletSpecificRace/${raceId}`)
        this.getAllRaces()
    }

    render(){
        console.log(this.state)
        return(
            <div className='body-div race-container-div' id='host-races-main-div'>
                {this.state.hostRaces.map(element => {
                    console.log(element)
                    return(
                        <div className='race-div' key={element.race_id}>
                            <div className='img-div' id='host-races-img-div'>
                                <img className='race=img' id='host-races-img' src={element.image}/>
                                <Link to='/host/form1'><button
                                    className='view-race-button'
                                    id='host-races-edit-button'
                                    onClick={() => this.props.getRaceForEditing(
                                        element.image,
                                        element.name,
                                        element.date,
                                        element.location,
                                        element.distance,
                                        element.elevation_change,
                                        element.host_phone,
                                        element.comments,
                                        element.map,
                                        element.race_id
                                    )}
                                >Edit</button></Link>
                                <button
                                    id='host-races-delete-button'
                                    className='view-race-button'
                                    onClick={() => this.deleteRace(element.race_id)}
                                >Delete</button>
                            </div>
                            <div className='race-info-div'>
                                <h4 className='race-text'>Name: {element.name}</h4>
                                <h4 className='race-text'>When: {element.date}</h4>
                                <h4 className='race-text'>Where: {element.location}</h4>
                                <h4 className='race-text'>Distance: {element.distance}</h4>
                            </div>

                        </div>
                    )
                })}

                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const{hostId, hostName} = reduxState.raceReducer
    return{
        hostId: hostId,
        hostName: hostName
    }
}
export default connect(mapStateToProps, {getRaceForEditing, clearState})(HostRaces)
