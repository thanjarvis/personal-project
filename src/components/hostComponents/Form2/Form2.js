import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm2, editRace, clearState} from '../../../redux/raceReducer'
import './form-two-styling.css'
import Dropzone from 'react-dropzone';

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
            <div className='body-div' id='form2-main-div'>
                {/* <input
                    className='input'
                    name='raceMap'
                    value={this.state.raceMap}
                    placeholder='Race Map test'
                    onChange={(e) => this.handleChange(e)}
                /> */}
                <Dropzone
                    // style={{
                    //     position:'relative',
                    //     width: 200,
                    //     height: 200,
                    //     borderWidth:7,
                    //     marginTop:100,
                    //     borderColor: 'rgb(102, 102, 102)',
                    //     borderStyle: 'dashed',
                    //     borderRadius: 5,
                    //     display: 'flex',
                    //     justifyContent: 'center',
                    //     alignItems: 'center',
                    //     fontSize: 28
                    // }}
                    // accept='image/*'
                    // multiple={false}
                >
                    {/* <p>drop file or click here</p> */}
                </Dropzone>
                <div className='form2-button-container'>
                    <Link to='/host/hostRaces'><button
                        className='button'
                        onClick={this.saveRace}
                    >Save</button></Link>

                    <Link to='/host/hostRace'><button
                        className='button'
                        onClick={this.editRace}
                    >saveEditedTest</button></Link>

                    <Link to='/host/hostRaces'><button
                        className='button'
                    >Cancel</button></Link>
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

export default connect(mapStateToProps,{sendForm2, editRace, clearState})(Form2)