import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSpecificRace} from '../../../redux/userReducer'

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
    }

    searchRaces = (search) => {
        axios.get(`/api/getSearchedRaces/${search}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                allRaces: res.data
            })
        })
    }

    getRace = (id) => {
        axios.get(`/api/getSpecificRace/${id}`)
        .then(res => {
            // console.log(res.data)
            this.props.getSpecificRace(res.data)
            this.props.history.push('/race')

        })
    }

    render(){ 
        // console.log(this.state.searchInput)       
        return(
            <div>
                <div>
                    <input
                        placeholder='Search Races'
                        name='searchInput'
                        value={this.state.input}
                        onChange={(e) => this.handleInput(e)}
                    />
                    <button
                        onClick={() => this.searchRaces(this.state.searchInput)}
                    >Search</button>
                </div>
                <div>
                    {this.state.allRaces.map(e => {
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

function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps, {getSpecificRace})(Dashboard)