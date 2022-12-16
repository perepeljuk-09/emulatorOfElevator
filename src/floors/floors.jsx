import React from 'react';
import "./floors.css"
import {useDispatch, useSelector} from "react-redux";
import {addToQueueCommon, choiceElevatorAC, setIsActiveBtn} from "../store/reducers/CommonReducer";

const Floors = () => {

    const countFloors = useSelector(state => state.CommonReducer.countFloors)
    const dispatch = useDispatch()
    return (
        <div className="floors">
            {countFloors.map(floor => {
               return <div key={floor.id} className="floor" style={{height:`(calc(100vh/${countFloors.length}))`}}>
                   <div className="block__info">
                       <span>{floor.id}</span>
                       <div className={floor.isActiveBtn ? "active btn" : "btn"}
                            onClick={() => {
                                dispatch(addToQueueCommon(floor.id))
                                dispatch(choiceElevatorAC(floor.id))
                                dispatch(setIsActiveBtn(floor.id, true))
                            }}
                       >
                           <div className={floor.isActiveBtn ? "active btn__inner" : "btn__inner"}></div>
                       </div>
                   </div>
               </div>
            })}
        </div>
    )
}


export default Floors;