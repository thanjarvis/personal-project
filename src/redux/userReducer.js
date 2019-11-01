// import axios from 'axios'
import {GET_USER_INFO, GET_SPECIFIC_RACE} from './actionTypes'

const initialState = {
    userId: '',
    username: '',
    email: '',
    race: {}
}

export const getUserInfo = (userId, username, email) => {
    return{
        type: GET_USER_INFO,
        userId,
        username,
        email
    }
}

export const getSpecificRace = (race) => {
    return{
        type: GET_SPECIFIC_RACE,
        race,
    }
}

export default function userReducer(state = initialState, action){
    const {type} = action
    switch(type){
        case GET_USER_INFO:
            return{
                ...state,
                userId: action.userId,
                username: action.username,
                email: action.username
            }
        case GET_SPECIFIC_RACE:
            return{
                ...state,
                race: action.race
            }
        default:
            return state
    }
}