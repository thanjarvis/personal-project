import axios from 'axios'
import {GET_RACE_FOR_EDITING, SEND_FORM1, SEND_FORM2, SEND_INITIAL_INFO, SEND_HOST_DATA, EDIT_RACE, GET_RACE_ID, CLEAR_STATE} from './actionTypes'

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
    raceId: '',
    hostRaces: []
}

export const clearState = () => {
    return{
        type: CLEAR_STATE,
        raceImg: '',
        raceName: '',
        raceDate: '',
        raceLocation: '',
        raceDistance: '',
        raceElevationChange: '',
        raceHostPhone: '',
        raceComments: '',
        raceMap: '',
        raceId: ''

    }
}


export const getRaceForEditing = (raceImg, raceName, raceDate, raceLocation, raceDistance, raceElevationChange, raceHostPhone, raceComments, raceMap, raceId) => {
    return{
        type: GET_RACE_FOR_EDITING,
        raceImg,
        raceName,
        raceDate,
        raceLocation,
        raceDistance,
        raceElevationChange,
        raceHostPhone,
        raceComments,
        raceMap,
        raceId
    }
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

const editInDb = (dbState) => {
    const raceImg = dbState.raceImg
    const raceName = dbState.raceName
    const raceDate = dbState.raceDate
    const raceLocation = dbState.raceLocation
    const raceDistance = dbState.raceDistance
    const raceElevationChange = dbState.raceElevationChange
    const raceHostPhone = dbState.raceHostPhone
    const raceComments = dbState.raceComments
    const raceMap = dbState.raceMap
    const id = dbState.raceId

    return axios.put('/api/editRace', {raceImg, raceName, raceDate, raceLocation, raceDistance, raceElevationChange, raceHostPhone, raceComments, raceMap, id})
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


export const editRace = (raceMap) => {
    return{
        type: EDIT_RACE,
        raceMap
    }
}

export const sendHostData = () => {
    return{
        type: SEND_HOST_DATA
    }
}

export default function raceReducer(state = initialState, action){
    const {type} = action
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
        case GET_RACE_ID:
            return{
                ...state,
                raceId: action.raceId
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
        case EDIT_RACE:
            const editingState = {
                ...state,
                raceMap: action.raceMap
            }
            const dbEditingPromise = editInDb(editingState)
            return{...editingState, dbEditingPromise}
        case GET_RACE_FOR_EDITING:
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
                raceMap: action.raceMap,
                raceId: action.raceId

            }
        case CLEAR_STATE:
            return{
                raceImg: '',
                raceName: '',
                raceDate: '',
                raceLocation: '',
                raceDistance: '',
                raceElevationChange: '',
                raceHostPhone: '',
                raceComments: '',
                raceMap: '',
                raceId: ''
            }
        default:
            return state
    }
}
