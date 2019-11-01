import React, {Component} from 'react'
import {connect} from 'react-redux'

class Race extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        console.log(this.props.userReducer.race[0])
        return(
            <div>
                {/* background image */}
                <div>
                    {this.props.userReducer.race[0].map}
                </div>

                <div>
                    <div>
                        <p>{this.props.userReducer.race[0].name}</p>
                        <p>{this.props.userReducer.race[0].date}</p>
                        <p>{this.props.userReducer.race[0].distance}</p>
                        <p>{this.props.userReducer.race[0].location}</p>
                        <p>{this.props.userReducer.race[0].elevation_change}</p>
                        <p>{this.props.userReducer.race[0].host_name}</p>
                        <p>{this.props.userReducer.race[0].host_email}</p>
                    </div>
                    <div>
                        <p>{this.props.userReducer.race[0].comments}</p>
                    </div>
                    <div>
                        <button>Contact Director</button>
                        <button>Register</button>
                    </div>
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

export default connect(mapStateToProps)(Race)