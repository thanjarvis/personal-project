import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm2, editRace, clearState} from '../../../redux/raceReducer'

class Form2 extends Component{
    constructor(){
        super()
        this.state = {
            raceMap: ''
            
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveRace = async () => {
        await this.props.sendForm2(this.state.raceMap)
        this.props.history.push('/host/hostRaces')
    }

    editRace = async () => {
        await this.props.editRace(this.state.raceMap)
        this.props.history.push('/host/hostRaces')
    }

    

    render(){
        return(
            <div className='body-div'>
                <input
                    name='raceMap'
                    value={this.state.raceMap}
                    placeholder='Race Map test'
                    onChange={(e) => this.handleChange(e)}
                />
                <Link to='/host/hostRaces'><button
                    onClick={this.saveRace}
                >Save</button></Link>

                <Link to='/host/hostRace'><button
                    onClick={this.editRace}
                >saveEditedTest</button></Link>

                <Link to='/host/hostRaces'><button>Cancel</button></Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        raceReducer: state.raceReducer
    }
}

export default connect(mapStateToProps,{sendForm2, editRace, clearState})(Form2)