
const ADD_TO_QUEUE_COMMON = 'ADD_TO_QUEUE_COMMON';
const CHOICE_ELEVATOR = 'CHOICE_ELEVATOR';
const SET_IS_PENDING = 'SET_IS_PENDING';
const SET_POSITION = 'SET_POSITION';
const SET_TRANSITION = 'SET_TRANSITION';
const SET_QUEUE_ELEVATOR = 'SET_QUEUE_ELEVATOR';
const DELETE_FIRST_QUEUE_COMMON = 'DELETE_FIRST_QUEUE_COMMON';
const CLEAR_QUEUE_ELEVATOR = 'CLEAR_QUEUE_ELEVATOR';
const SET_IS_ARROW_UP = 'SET_IS_ARROW_UP';
const SET_IS_ACTIVE_BTN = 'SET_IS_ACTIVE_BTN';

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
        floors.unshift({id: i + 1, isActiveBtn: false})
    }
    return floors
}

let initialState = {
    queueCommon: [],
    countElevators: createElevatorShafts(4),
    countFloors: createFloors(8),
    currentElevator: 1,
}

const choiceElevator = (nextFloor, state) => {
    let currentElevator = 1
    let difference = state.countFloors.length
    state.countElevators.forEach(el => {
        if(el.position !== nextFloor) {
            if(!el.isPending) {
                if(el.queueElevator.length === 0) {
                    const newDifference = (el.position - nextFloor) < 0 ? nextFloor - el.position : el.position - nextFloor;
                    if(newDifference < difference) {
                        difference = newDifference;
                        currentElevator = el.id;
                    }
                }
            }
        } else {
            return currentElevator
        }
        // if(!el.isPending) {
        //     if(el.position !== nextFloor) {
        //         const newDifference = ((el.position - nextFloor) < 0) ? ((el.position - nextFloor) * -1) : (el.position - nextFloor)
        //         if (newDifference < difference){
        //             difference = newDifference
        //             currentElevator = el.id
        //         }
        //     } else {
        //         return
        //     }
        // }
    })
    return currentElevator
}
const createTransition = (nextPosition, currentPosition) => {
        if (nextPosition > currentPosition) {
            return (nextPosition - currentPosition)
        } else if (nextPosition < currentPosition) {
            return (currentPosition - nextPosition)
        }
    }
const QueueCommonReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_TO_QUEUE_COMMON:
            if (!state.countElevators.find(elev => elev.position === action.nextFloor)){
                if (!state.queueCommon.includes(action.nextFloor)) {
                    return {...state, queueCommon: [...state.queueCommon, action.nextFloor]}
                }
            }
            return state
        case CHOICE_ELEVATOR:
            return {...state, currentElevator: choiceElevator(action.payload, state)}
        case SET_IS_PENDING:
            return {...state, countElevators: [...state.countElevators.map(el => el.id === action.numberElevator
                    ? {...el, isPending: action.status}
                    : {...el}
                )]}
        case SET_QUEUE_ELEVATOR:
            return {...state,
                countElevators: [...state.countElevators.map(el => el.id === state.currentElevator
                    ? {...el, queueElevator: [...el.queueElevator, action.nextFloor]}
                    : {...el}
                )]}
        case SET_POSITION:
            return {...state,
            countElevators: [...state.countElevators.map(el => el.id === state.currentElevator
                ? {...el, position: action.nextPosition}
                : {...el}
            )]}
        case SET_TRANSITION:
            return {
                ...state,
                countElevators: [...state.countElevators.map(el => el.id === state.currentElevator
                    ? {...el, transition: action.transition}
                    : {...el}
                )]
            }
        case DELETE_FIRST_QUEUE_COMMON:
            return {
                ...state,
                queueCommon: [...state.queueCommon.filter(item => item !== state.queueCommon[0])]
            }
        case CLEAR_QUEUE_ELEVATOR:
            return {
                ...state,
                countElevators: [...state.countElevators.map(el => el.id === action.numberOfElevator
                ? {...el,
                    queueElevator: [...el.queueElevator.filter(elev => elev !== state.countElevators[action.numberOfElevator - 1].queueElevator[0]
                    )]}
                : {...el}
                )]
            }
        case SET_IS_ARROW_UP:
            return {
                ...state,
                countElevators: [...state.countElevators.map(el => el.id === state.currentElevator
                ? {...el, isArrowUp: action.value}
                : {...el}
                )]
            }
        case SET_IS_ACTIVE_BTN:
            if(!state.countElevators.find(elev => elev.position === action.numberOfBtn)){
                return {
                ...state,
                countFloors: [...state.countFloors.map(floor => floor.id === action.numberOfBtn
                    ? {...floor, isActiveBtn: true}
                    : {...floor}
                )]
            }
            } else {
                if (action.boolean === true) return {...state}
                return {
                    ...state,
                    countFloors: [...state.countFloors.map(floor => floor.id === action.numberOfBtn
                        ? {...floor, isActiveBtn: false}
                        : {...floor}
                    )]
                }
            }
        default:
        return state
    }

};

export const addToQueueCommon = (nextFloor) => ({type: ADD_TO_QUEUE_COMMON, nextFloor})
export const setIsPending = (numberElevator, status) => ({type: SET_IS_PENDING, numberElevator, status})
export const setPosition = (nextPosition, numberOfElevator) => ({type: SET_POSITION, nextPosition, numberOfElevator})
export const setTransition = (transition) => ({type: SET_TRANSITION, transition})
export const setQueueElevator = (nextFloor) => ({type: SET_QUEUE_ELEVATOR, nextFloor})
export const deleteFirstQueueCommon = () => ({type: DELETE_FIRST_QUEUE_COMMON})
export const clearQueueElevator = (numberOfElevator) => ({type: CLEAR_QUEUE_ELEVATOR, numberOfElevator})
export const setIsArrowUp = (value) => ({type: SET_IS_ARROW_UP, value})
export const setIsActiveBtn = (numberOfBtn, boolean) => ({type: SET_IS_ACTIVE_BTN, numberOfBtn, boolean})
export const choiceElevatorAC = (nextFloor) => ({type: CHOICE_ELEVATOR, payload: nextFloor})


export const callElevator = (nextFloor, currentFloor, dispatch, numberOfElevator) => {
    const newTransition = createTransition(nextFloor, currentFloor)
    dispatch(setTransition(newTransition))
    dispatch(setQueueElevator(nextFloor))
    dispatch(setIsArrowUp((nextFloor > currentFloor)))
    dispatch(setPosition(nextFloor, numberOfElevator))
    dispatch(deleteFirstQueueCommon())
    setTimeout(() => {
        dispatch(clearQueueElevator(numberOfElevator))
        dispatch(setIsPending(numberOfElevator, true))
        dispatch(setIsActiveBtn(nextFloor))
    }, newTransition * 1000)
}

export default QueueCommonReducer;
