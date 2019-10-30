import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {sendInitialInfo} from '../../redux/raceReducer'

class Landing extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginUser = () => {
        axios.post('/api/loginUser', {username: this.state.username, password: this.state.password})
        .then(res => {
            console.log(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    loginHost = () => {
        axios.post('/api/loginHost', {username: this.state.username, password: this.state.password})
        .then(res => {
            console.log(res.data)
            this.props.sendInitialInfo(res.data.id, res.data.username, res.data.email)
            this.props.history.push('/host/hostRaces')
        })
        .catch(err => console.log(err))
    }

    render(){
        // console.log('password', this.state.password)
        // console.log('username', this.state.username)
        return(
            <div>
                <div>
                    <input
                        placeholder='Username'
                        value={this.state.username}
                        name='username'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        placeholder='Password'
                        value={this.state.password}
                        name='password'
                        onChange={(e) => this.handleChange(e)}
                        type='password'
                    />
                </div>
                <div>
                    <button
                        onClick={this.loginHost}
                    >Login As Host</button>
                    <button
                        onClick={this.loginUser}
                    >Login As Runner</button>
                    <Link to='/register'><button>Register</button></Link>
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

export default connect(mapStateToProps, {sendInitialInfo})(Landing)