import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSpecificRace} from '../../../redux/userReducer'
// import userReducer from '../../../redux/userReducer'

class UserRaces extends Component{
    constructor(){
        super()
        this.state = {
            userRaces: []
        }
    }

    componentDidMount = () => {
        this.getUserRaces(this.props.userId)
    }

    getUserRaces = (id) => {
        axios.get(`/api/getUserRaces/${id}`)
        .then(res => this.setState({
            userRaces: res.data
        }))
        .catch(err => err)
    }

    getRace = (id) => {
        axios.get(`/api/getSpecificRace/${id}`)
        .then(res => {
            console.log(res.data)
            this.props.getSpecificRace(res.data)
            this.props.history.push('/race')

        })
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <div>
                    {this.state.userRaces.map(e => {
                        return(
                            <div key={e.race_id}>
                                <div>
                                    <img src={e.image} height='100px' alt='' width='150px'/>
                                    <button
                                        onClick={() => this.getRace(e.race_id)}
                                    >View Race</button>
                                </div>
                                <div>
                                    <h4>Name: {e.name}</h4>
                                    <h4>When: {e.date}</h4>
                                    <h4>Where: {e.location}</h4>
                                    <h4>Distance: {e.distance}</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const{userId} = reduxState.userReducer
    return{
        userId,
    }
}
export default connect(mapStateToProps, {getSpecificRace})(UserRaces)