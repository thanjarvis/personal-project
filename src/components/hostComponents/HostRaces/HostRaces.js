import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios';

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

        if (prevState !== proxState){
            this.setState({
                hostRaces: proxState
            })
            // console.log('we want to rerender')
            // console.log('prevstate', prevState)
            // console.log('proxstate', proxState)
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

    deleteRace= (raceId) => {
        console.log(raceId)
        axios.delete(`/api/deletSpecificRace/${raceId}`)    
    }

    // each object on the all races array in state contain this
    //     comments: "test"
    // date: "test"
    // distance: "test"
    // elevation_change: "test"
    // host_email: "test"
    // host_id: 1
    // host_name: "test"
    // host_phone: "test"
    // image: "test"
    // location: "test"
    // map: "test"
    // name: "test race 1"
    // race_id: 1

    render(){
        // console.log(proxState)
        return(
            <div>
                {this.state.hostRaces.map(element => {
                    return(
                        <div key={element.race_id}>
                            <div>
                                <img src={element.image} height='100px' width='150px'/>
                                <button>Edit</button>
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
export default connect(mapStateToProps)(HostRaces)
