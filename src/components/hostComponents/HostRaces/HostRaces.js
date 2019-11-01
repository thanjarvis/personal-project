import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRaceForEditing, clearState} from '../../../redux/raceReducer'
import axios from 'axios';
import {Link} from 'react-router-dom'

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
            <div>
                {this.state.hostRaces.map(element => {
                    console.log(element)
                    return(
                        <div key={element.race_id}>
                            <div>
                                <img src={element.image} alt='' height='100px' width='150px'/>
                                <Link to='/host/form1'><button
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
                                    onClick={() => this.deleteRace(element.race_id)}
                                >Delete</button>
                            </div>
                            <div>
                                <h4>Name: {element.name}</h4>
                                <h4>When: {element.date}</h4>
                                <h4>Where: {element.location}</h4>
                                <h4>Distance: {element.distance}</h4>
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
