import axios from 'axios'
import {GET_RACE_FOR_EDITING, SEND_FORM1, SEND_FORM2, SEND_RACE_TO_SERVER, SEND_INITIAL_INFO, SEND_HOST_DATA} from './actionTypes'

const initialState = {
    raceImg: '',
    raceName: '',
    raceDate: '',
    raceLocation: '',
    raceDistance: '',
    raceElevationChange: '',
    raceHostEmail: '',
    raceHostPhone: '',
    raceComments: '',
    hostId: '',
    hostName: '',
    raceMap: '',
    hostRaces: []
}

const sendToDb = (dbState) => {
    const img = dbState.raceImg
    const name = dbState.raceName
    const date = dbState.raceDate
    const location = dbState.raceLocation
    const distance = dbState.raceDistance
    const elevationChange = dbState.raceElevationChange
    const email = dbState.raceHostEmail
    const phone = dbState.raceHostPhone
    const comments = dbState.raceComments
    const hostId = dbState.hostId
    const hostName = dbState.hostName
    const map = dbState.raceMap

    return axios.post('/api/newRace', {name, date, location, distance, elevationChange, email, phone, comments, map, hostId, img, hostName})
}

export const sendInitialInfo = (hostId, hostName, raceHostEmail) => {
    return{
        type: SEND_INITIAL_INFO,
        hostId,
        hostName,
        raceHostEmail
    }
}


export const sendForm1 = (raceImg, raceName, raceDate, raceLocation, raceDistance, raceElevationChange, raceHostPhone, raceComments) => {
    return{
        type: SEND_FORM1,
        raceImg,
        raceName,
        raceDate,
        raceLocation,
        raceDistance,
        raceElevationChange,
        raceHostPhone,
        raceComments,
    }
}

export const sendForm2 = (raceMap) => {
    return{
        type: SEND_FORM2,
        raceMap
    }
}

export const sendHostData = () => {
    return{
        type: SEND_HOST_DATA
    }
}

export default function raceReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SEND_INITIAL_INFO:
            return{
                ...state,
                hostId: action.hostId,
                hostName: action.hostName,
                raceHostEmail: action.raceHostEmail
            }
        case SEND_HOST_DATA:
            return{
                hostId: state.hostId,
                hostName: state.hostName
            }
        case SEND_FORM1:
            return{
                ...state,
                raceImg: action.raceImg,
                raceName: action.raceName,
                raceDate: action.raceDate,
                raceLocation: action.raceLocation,
                raceDistance: action.raceDistance,
                raceElevationChange: action.raceElevationChange,
                raceHostPhone: action.raceHostPhone,
                raceComments: action.raceComments,
            }
        case SEND_FORM2:
            const newState = {
                ...state,
                raceMap: action.raceMap
            }
            const dbPromise = sendToDb(newState)
            return{...newState, dbPromise}
        default:
            return state
    }
}
