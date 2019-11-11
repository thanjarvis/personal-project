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
        //makes sure that when the page loads that there are all the races in the dashboard
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
        //makes sure that the dashboard updates as races are added and deleted.
        //compares the lengths of the previous and currents states to know if it needs to update. hasn't presented bugs when the user edits a race, but its a posibility with other changes
    }

    getAllRaces = () => {
        let id = this.props.hostId
        axios.get(`/api/getAllHostRaces/${id}`)
        .then(res => this.setState({
            hostRaces:res.data
        }))
        .catch(err => console.log(err))
        //gets all the reaces that the specific user/host has made, then puts the races on state so that in the jsx they can be mapped through and displayed
    }

    deleteRace= async (raceId) => {
        // console.log(raceId)
        await axios.delete(`/api/deletSpecificRace/${raceId}`)
        this.getAllRaces()
        // deletes the specific race and then reloads the remaining races and puts them on state
    }

    render(){
        console.log(this.state)
        return(
            <div className='body-div race-container-div' id='host-races-main-div'>
                {this.state.hostRaces.map(element => {
                    // maps through the races on state and displays the components for each race.
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
                                {/* the edit button calls the getRaceForEditing function and simultaneously passes in the info for that specific race. each race div contains the function. */}
                                <button
                                    id='host-races-delete-button'
                                    className='view-race-button'
                                    onClick={() => this.deleteRace(element.race_id)}
                                >Delete</button>
                            </div>
                            <div className='race-info-div'>
                                {/* this is all of the race info that is displayed to the host */}
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
// in this case the redux state is sending the hosts information so that the component can identify who is logged in and get their specific races.
// as well as recieving the data from the component about which race the host wants to edit (which is then sent to populate the inputs in form1 and form2)