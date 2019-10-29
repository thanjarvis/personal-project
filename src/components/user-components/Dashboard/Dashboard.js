import React, {Component} from 'react'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            searchInput: ''
            
        }
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        console.log(this.state.searchInput);
        
        return(
            <div>
                <div>
                    <input
                        placeholder='Search Races'
                        name='searchInput'
                        value={this.state.input}
                        onChange={(e) => this.handleInput(e)}
                    />
                    <button>Search</button>
                </div>
                <div>
                    {/* here we will map through all of the races and return each one as a RaceMini component */}
                </div>
            </div>
        )
    }
}

export default Dashboard