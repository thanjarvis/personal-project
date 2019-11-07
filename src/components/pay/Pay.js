import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {connect} from 'react-redux'

class Pay extends Component{
    constructor(){
        super()
        this.state = {
            amount: ''
        }
    }
    onOpened = () => {
        console.log('this is opened')
    }
    onClosed = () => {
        console.log('this is closed')
    }

    onToken = (token) => {
        console.log(token)
        let {amount} = this.state
        amount /=100
        // this makes it so that the amount is in cents
        console.log(amount)
        token.card = void 0
        axios.post('/api/pay', {token, amount: this.state.amount, raceId: this.props.userReducer.race[0].race_id, userId: this.props.userReducer.userId})
        .then(res => {
            if(res.data === 'already registered for race'){
                alert('already registered for race')
                this.props.history.push('/dashboard')
            }else{
                console.log(res)
                alert(`Payment of ${amount} processed`)
                this.props.history.push('/userRaces')
            }
        })

    }
    render(){
        console.log(this.props.userReducer.race[0].race_id)
        return(
            <div>
                <StripeCheckout
                    name='Registration Fee'
                    // description='goes under the header'
                    // stripeKey={process.env.STRIPE_KEY}
                    token={this.onToken}
                    amount={this.state.amount}
                    currency='USD'
                    panelLabel='Submit Payment'
                    locale='en'
                    opened={this.onOpened}
                    closed={this.onClosed}
                    allowRememberMe
                    billingAdress={false}
                    zipCode={false}
                    stripeKey='pk_test_8h7SJR7NhTuS4BZhdt1c7evV00ehPPCeec'
                ></StripeCheckout>
                <input
                    value={this.state.amount}
                    type='number'
                    onChange={e => this.setState({amount: +e.target.value})}
                />
                
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(Pay)