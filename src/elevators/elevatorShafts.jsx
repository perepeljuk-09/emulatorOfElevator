import React from 'react';
import {useSelector} from "react-redux";
import "./elevatorShafts.css"
import Shaft from "./shaft";


const ElevatorShafts = () => {
    const countElevators = useSelector(state => state.QueueCommonReducer.countElevators)

    return (
        <div className="shafts">
            {countElevators.map(elevator => {
                return <Shaft key={elevator.id} elevator={elevator}/>
            })}
        </div>
    );
};

export default ElevatorShafts;