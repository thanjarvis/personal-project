import React, {Component} from 'react'
import {withRouter} from 'react-router'
import axios from 'axios'

class Register extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resgisterUser = () => {
        axios.post('/registerUser', {username: this.state.username, email: this.state.email, password:this.state.password})
        .then(res => {
            console.log(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    registerHost = () => {
        axios.post('/registerHost', {username: this.state.username, email: this.state.email, password:this.state.password})
        .then(res => {
            console.log(res.data)
            this.props.history.push('/host/hostRaces')
        })
        .catch(err => console.log(err))
    }

    render(){
        // console.log(this.props)
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
                        placeholder='Email'
                        value={this.state.email}
                        name='email'
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        placeholder='Password'
                        value={this.state.password}
                        name='password'
                        onChange={(e) => this.handleChange(e)}                        
                    />
                </div>
                <div>
                    <button
                        onClick={this.resgisterUser}
                    >Register as Runner</button>
                    <button
                        onClick={this.registerHost}
                    >Register as Host</button>                    
                </div>
            </div>
        )
    }
}

export default withRouter(Register)