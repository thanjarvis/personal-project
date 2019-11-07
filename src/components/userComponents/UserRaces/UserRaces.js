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
            <div className='body-div'>
                <div className='race-container-div'>
                    {this.state.userRaces.map(e => {
                        return(
                            <div className='race-div' key={e.race_id}>
                                <div className='img-div'>
                                    <img className='race-img' src={e.image}/>
                                    <button
                                        className='view-race-button'
                                        onClick={() => this.getRace(e.race_id)}
                                    >View Race</button>
                                </div>
                                <div className='race-info-div'>
                                    <h4 className='race-text'>Name: {e.name}</h4>
                                    <h4 className='race-text'>When: {e.date}</h4>
                                    <h4 className='race-text'>Where: {e.location}</h4>
                                    <h4 className='race-text'>Distance: {e.distance}</h4>
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