import React from 'react';
import {useSelector} from "react-redux";

const ADD_TO_QUEUE_COMMON = 'ADD_TO_QUEUE_COMMON';
const CHOICE_ELEVATOR = 'CHOICE_ELEVATOR';

const createElevatorShafts = (count) => {
    const shafts = []
    for(let i = 0; i < count; i++) {
        shafts.push({
            id: i+1,
            position: 1,
            transition: 1,
            queueElevator: [],
            isPending: false,
            isArrowUp: true,
        })
    }
    return shafts
}
const createFloors = (count) => {
    const floors = []
    for(let i = 0; i < count; i++){
        floors.unshift(i + 1)
    }
    return floors
}

let initialState = {
    queueCommon: [],
    countElevators: createElevatorShafts(3),
    countFloors: createFloors(6),
    currentElevator: 1,
}
const choiceElevator = (nextFloor, state) => {
    let currentElevator = 1
    let difference = state.countFloors.length
    state.countElevators.forEach(el => {
        if(!el.isPending) {
            if(el.position !== nextFloor) {
                const newDifference = ((el.position - nextFloor) < 0) ? ((el.position - nextFloor) * -1) : (el.position - nextFloor)
                if (newDifference < difference){
                    difference = newDifference
                    currentElevator = el.id
                }
            } else {
                return
            }
        }
    })
    return currentElevator
}
const QueueCommonReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_TO_QUEUE_COMMON:
            if(!state.queueCommon.includes(action.payload)) {
              return  {...state, queueCommon: [...state.queueCommon, action.payload]}
            }
        case CHOICE_ELEVATOR:
            return {...state, currentElevator: choiceElevator(action.payload, state)}
        default:
        return state
    }

};

export const addToQueueCommon = (numberOfFloor) => ({type: ADD_TO_QUEUE_COMMON, payload: numberOfFloor})
const choiceElevatorAC = (nextFloor) => ({type: CHOICE_ELEVATOR, payload: nextFloor})



export const callElevator = (nextFloor) => (dispatch) => {
    dispatch(choiceElevatorAC(nextFloor))
    // Анализ всех лифтов, и подбор близжашего
    // после, этого берутся данные от него его позиция как текущая и происходит диспатчи
}

export default QueueCommonReducer;
