import React, {useEffect} from 'react';
import img1 from "../img/arrow-up.png";
import img2 from "../img/arrow-down.png";
import {useDispatch, useSelector} from "react-redux";
import {callElevator, choiceElevatorAC, setIsPending} from "../store/reducers/queueCommonReducer";

const Shaft = ({elevator}) => {
    const countFloors = useSelector(state => state.QueueCommonReducer.countFloors.length)
    const queueCommon = useSelector(state => state.QueueCommonReducer.queueCommon)
    const currentElevator = useSelector(state => state.QueueCommonReducer.currentElevator)
    const dispatch = useDispatch()

    const frame = () => {
        const element = document.getElementById(`elevatorId__ + ${elevator.id}`)
        if (element.style.backgroundColor === "red") {
            element.style.backgroundColor = "aqua"
        } else {
            element.style.backgroundColor = "red"
        }
    }

    const getArrow = () => {
        if (elevator.isArrowUp) return <img src={img1} alt="arrow-up.png"/>
        return <img src={img2} alt="arrow-down.png"/>
    }
    useEffect(() => {
        if (queueCommon.length !== 0 && elevator.queueElevator.length === 0 && !elevator.isPending && currentElevator === elevator.id) {
            callElevator(queueCommon[0], elevator.position, dispatch, elevator.id)
        }
    }, [queueCommon, elevator.queueElevator, elevator.isPending, currentElevator])
    useEffect(() => {
        if (elevator.isPending) {
            const timer = setInterval(frame, 300)
            setTimeout(() => {
                clearInterval(timer)
            }, 1800)
            setTimeout(() => {
                dispatch(setIsPending(elevator.id,false))
                dispatch(choiceElevatorAC(queueCommon[0]))
            }, 3000)
        }
    }, [elevator.isPending])
    return (
        <div key={elevator.id} className="elevator__shaft">
            <div id={`elevatorId__ + ${elevator.id}`} className={`elevator position__${elevator.position}`}
                 style={{
                     transition: `transform ${elevator.transition}s linear, background-color 1s linear`,
                     height: `calc(100vh/${countFloors})`,
                     transform: `translateY(calc(100vh - ((100vh/${countFloors})*${elevator.position})))`,
                 }}>
                <div className="elevator__info">
                    {elevator.queueElevator[0] && getArrow()}
                    {elevator.queueElevator[0] && elevator.queueElevator[0]}
                </div>
            </div>
        </div>
    )
}

export default Shaft;