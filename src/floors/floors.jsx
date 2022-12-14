import React from 'react';
import "./floors.css"
import {useDispatch, useSelector} from "react-redux";
import QueueCommonReducer, { addToQueueCommon, callElevator} from "../store/reducers/queueCommonReducer";

const Floors = () => {

    const queueCommon = useSelector(state => state.QueueCommonReducer.queueCommon)
    const countFloors = useSelector(state => state.QueueCommonReducer.countFloors)
    const currentElevator = useSelector(state => state.QueueCommonReducer.currentElevator)
    const dispatch = useDispatch()
    console.log(queueCommon, currentElevator)
    return (
        <div className="floors">
            {countFloors.map(floor => {
               return <div key={floor} className="floor" style={{height:`(calc(100vh/${countFloors.length}))`}}>
                   <div className="block__info">
                       <span>{floor}</span>
                       <div className={queueCommon.includes(floor) ? "active btn" : "btn"}
                            onClick={() => dispatch(callElevator(floor))}
                       >
                           <div className={queueCommon.includes(floor) ? "active btn__inner" : "btn__inner"}></div>
                       </div>
                   </div>
               </div>
            })}
        </div>
    )
}


export default Floors;