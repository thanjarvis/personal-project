import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm2, editRace, clearState} from '../../../redux/raceReducer'
import './form-two-styling.css'
import {v4 as randomString} from 'uuid'
import axios from 'axios'

class Form2 extends Component{
    constructor(){
        super()
        this.state = {
            raceMap: '',
            url: '',
            testURL: '',
            raceMapUrl: ''
            
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveRace = async () => {
        await this.props.sendForm2(this.state.raceMapUrl)
        this.props.history.push('/host/hostRaces')
    }

    editRace = async () => {
        await this.props.editRace(this.state.raceMapUrl)
        this.props.history.push('/host/hostRaces')
    }

    handleImage = () => {
        const file = document.getElementById('image-file').files[0]
        console.log(file)
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        
        axios.get('/api/signs3',{
            params:{
                'file-name': fileName,
                'file-type': file.type
            }
        })
        .then(res => {
            console.log('res.data', res.data)
            const{signedRequest, url} = res.data
            console.log('signed request', signedRequest)
            console.log('url', url)
            this.setState({
                raceMapUrl: signedRequest 
            })
            this.upLoadFile(file, signedRequest, url)
        })
        .catch(err => console.log(err))        
    }

    upLoadFile = (file, signedRequest, url) => {
        console.log(url)
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        this.setState({
            raceMapUrl: url
        })
        axios.put(signedRequest, file, options)
        .then(res => {
            console.log('bouble check here', res.data)
        })
        .catch(err => console.log(err))
    }

    

    render(){
        console.log(this.state.raceMapUrl)
        return(
            <div className='body-div' id='form2-main-div'>
                <input
                    multiple={false}
                    accept='image/*'
                    type='file'
                    className='input'
                    name='raceMap'
                    id='image-file'
                    value={this.state.raceMap}
                    placeholder='Race Map test'
                    onChange={(e) => this.handleChange(e)}
                />

                <button
                    className='button'
                    onClick={() => this.handleImage(this.state.raceMap)}
                >Upload Photo</button>
                
                <div className='form2-button-container'>
                    <Link to='/host/hostRaces'><button
                        className='button'
                        onClick={this.saveRace}
                    >Save</button></Link>

                    <Link to='/host/hostRace'><button
                        className='button'
                        onClick={this.editRace}
                    >Save Edited Race</button></Link>

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