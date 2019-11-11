import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendForm2, editRace, clearState} from '../../../redux/raceReducer'
import './form-two-styling.css'
import {v4 as randomString} from 'uuid'
//for the implementation of  AW s3 storage, which stores the images of the race course.
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
        // function contained in redux that takes the info from this component and the previous form and then sends it via axios to the backend and database
    }

    editRace = async () => {
        await this.props.editRace(this.state.raceMapUrl)
        this.props.history.push('/host/hostRaces')
        // redux function that edits the race using the changed values in redux. called from here passing in the data from this form as well
    }

    handleImage = () => {
        const file = document.getElementById('image-file').files[0]

        //makes it so that if we upload the same image twice they wont have conflicting names
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        
        //here it makes the file and then calls upLoadFile which sends the file to s3 storage.
        axios.get('/api/signs3',{
            params:{
                'file-name': fileName,
                'file-type': file.type
            }
        })
        .then(res => {
            const{signedRequest, url} = res.data
            this.setState({
                raceMapUrl: signedRequest 
            })
            // makes the value of raceMapUrl on state to be the URL of the image in the s3 storage. through this url is how it is accessed later on the runner side.
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
        //this put request goes and edits the file giving it an acutal value
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
                        //calls the redux function to save the race and send everything to the back end
                    >Save</button></Link>

                    <Link to='/host/hostRace'><button
                        className='button'
                        onClick={this.editRace}
                        //calls the redux function to save edited the race and send everything to the back end
                    >Save Edited Race</button></Link>

                    <Link to='/host/hostRaces'><button
                        className='button'
                        //just a simple redirect
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
// the redux funcitons to save the race or to make a new race.