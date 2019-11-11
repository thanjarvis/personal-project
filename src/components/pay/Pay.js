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
        //takes in all of the information necesary to make the payment. on the back end it checks if the user is already registered. if they are not they can then enterin their payment infor to complete the transaccion. when the payment is processed they recieve an alert and are then redirected to the component where they can see all of the races that they are registered for.
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
                {/* the stripe checkout component is just loaded from react-stripe-checkout */}
                <input
                    value={this.state.amount}
                    type='number'
                    onChange={e => this.setState({amount: +e.target.value})}
                />
                {/* the input here could easily be relaced with a preset value that the host decides. would require small changes in the redux state and backend, including the database. */}
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}
// gets user info from the redux state so that it knows which user to register the race to.
export default connect(mapStateToProps)(Pay)