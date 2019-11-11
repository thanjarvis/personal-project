import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {sendInitialInfo} from '../../redux/raceReducer'
import {getUserInfo} from '../../redux/userReducer'
import './landing.css'
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
            //updates state based on the name of the input that is being typed in
        })
    }

    loginUser = () => {
        axios.post('/api/loginUser', {username: this.state.username, password: this.state.password})
        //on the back end the app verifies first that the username exists and then that the hashed password matches the entered password,
        // then it sends it on to the respective dashboard
        .then(res => {
            console.log(res.data)
            this.props.getUserInfo(res.data.id, res.data.username, res.data.email)
            //sends user info to the redix state so that the following components can load the correct infor for that specific user
            this.props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
            alert('check your username and password')
        })
    }

    loginHost = () => {
        axios.post('/api/loginHost', {username: this.state.username, password: this.state.password})
        //verifies first that the user exists and then their password and if it comes back correct they are pushed to the dashboard
        .then(res => {
            console.log(res.data)
            this.props.sendInitialInfo(res.data.id, res.data.username, res.data.email)
            //sends host info to the redux state so that the races they have made come up and so that they can also make races that are specific to them.
            this.props.history.push('/host/hostRaces')
        })
        .catch(err => {
            console.log(err)
            alert('check your username and password')
        })
    }

    render(){
        return(
            <div id='main-div'>
                <div className='input-container'>
                    <input
                        className='input'
                        placeholder='Username'
                        value={this.state.username}
                        name='username'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        className='input'
                        placeholder='Password'
                        value={this.state.password}
                        name='password'
                        onChange={(e) => this.handleChange(e)}
                        type='password'
                    />
                </div>
                <div className='button-container'>
                    <button
                        className='button'
                        onClick={this.loginHost}
                    >Login As Host</button>
                    <button
                        className='button'
                        onClick={this.loginUser}
                    >Login As Runner</button>
                    <Link to='/register'><button
                        className='button'
                    >Register</button></Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        raceReducer: state.raceReducer,
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps, {sendInitialInfo, getUserInfo})(Landing)
// starts the redux interaction so that the other components know who they are interacting with and they can load the appropriate information.