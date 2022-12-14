import React from 'react';
import {useSelector} from "react-redux";
import img1 from  "../img/arrow-up.png"
import img2 from  "../img/arrow-down.png"
import "./elevatorShafts.css"
const ElevatorShafts = () => {
    const countElevators = useSelector(state => state.QueueCommonReducer.countElevators)
    const countFloors = useSelector(state => state.QueueCommonReducer.countFloors.length)
    console.log(countFloors)

    return (
        <div className="shafts">
            {countElevators.map(elevator => {
                const getArrow = () => {
                    if (elevator.isArrowUp) return <img src={img1} alt="arrow-up.png"/>
                    return <img src={img2} alt="arrow-down.png"/>
                }
                return <div key={elevator.id} className="elevator__shaft">
                    <div id="elevatorId" className={`elevator position__${elevator.position}`}
                         style={{transition: `transform ${elevator.transition}s linear, background-color 1s linear`,
                                height: `calc(100vh/${countFloors})`,
                                transform: `translateY(calc(100vh - ((100vh/${countFloors})*${elevator.position})))`,
                         }}>
                        <div className="elevator__info">
                            {elevator.queueElevator[0] && getArrow()}
                            {elevator.queueElevator[0] && elevator.queueElevator[0]}
                        </div>
                    </div>
                </div>
            })}
        </div>
    );
};

export default ElevatorShafts;