import React from 'react';
import "./floors.css"

const Floors = ({countFloors, addToQueueCommon, queueCommon}) => {
    return (
        <div className="floors">
            {countFloors.map(floor => {
               return <div key={floor} className="floor">
                   <div className="block__info">
                       <span>{floor}</span>
                       <div className={queueCommon.includes(floor) ? "active btn" : "btn"}
                            onClick={() => addToQueueCommon(floor)}
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