import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSpecificRace} from '../../../redux/userReducer'
import './styling.css'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            searchInput: '',
            allRaces: []
            
        }
    }
    componentDidMount = () => {
        this.getAllRaces()
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getAllRaces = () => {
        axios.get('/api/getAllRaces')
        .then(res => {
            this.setState({
                allRaces: res.data
            })
        })
        //gets all races puts them onto the state where they are then mapped through and displayed dashboard style         
    }

    searchRaces = (search) => {
        axios.get(`/api/getSearchedRaces/${search}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                allRaces: res.data
            })
        })
        //searches for a specific race based on the search input. searches through race comments.
    }

    getRace = (id) => {
        axios.get(`/api/getSpecificRace/${id}`)
        .then(res => {
            // console.log(res.data)
            this.props.getSpecificRace(res.data)
            this.props.history.push('/race')
        })
        // when the race is clicked on this gets that specific race and puts it up on the redux state so that the user can see all of the race information and then register for the race
    }

    render(){ 
        // console.log(this.state.searchInput)       
        return(
            <div className='body-div'>
                <div>
                    <input
                        className='input'
                        placeholder='Search Races'
                        name='searchInput'
                        value={this.state.input}
                        onChange={(e) => this.handleInput(e)}
                    />
                    <button
                        className='button'
                        onClick={() => this.searchRaces(this.state.searchInput)}
                    >Search</button>
                </div>
                <div className='race-container-div'>
                    {/* maps through the races, and displays them */}
                    {this.state.allRaces.map(e => {
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

function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}
// sends the specific race up to the redux state
export default connect(mapStateToProps, {getSpecificRace})(Dashboard)