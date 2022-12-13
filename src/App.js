import './App.css';
import {useEffect, useState} from "react";
import Floors from "./floors/floors";
import img1 from "./img/arrow-up.png"
import img2 from "./img/arrow-down.png"


export default function App(){
    const [position, setPosition] = useState(1)
    const [transition, setTransition] = useState(1)
    const [queueCommon, setQueueCommon] = useState([])
    const [queueElevator, setQueueElevator] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [isArrowUp, setIsArrowUp] = useState(true)
    const countFloors = [5, 4, 3, 2, 1]

    const addToQueueCommon = (numberOfFloor) => {
        if(numberOfFloor !== position) {
            if(!queueCommon.includes(numberOfFloor)){
                setQueueCommon(prev => [...prev, numberOfFloor])
            }
        }
    }
    const createTransition = (nextPosition, currentPosition) => {
        if (nextPosition > currentPosition) {
            console.log("Следующая позиция выше, чем текущий этаж")
            return (nextPosition - currentPosition)
        } else if (nextPosition < currentPosition) {
            console.log("Текущая позиция выше, чем следующий этаж")
            return (currentPosition - nextPosition)
        }
    }
    const frame = () => {
        const element = document.getElementById("elevatorId")
        if (element.style.backgroundColor === "red"){
            element.style.backgroundColor = "aqua"
        } else {
            element.style.backgroundColor = "red"
        }
    }
    const callElevator = (nextPosition, currentPosition) => {
        const newTransition = createTransition(nextPosition, currentPosition)
        setQueueElevator([nextPosition])
        setTransition(newTransition)
        setIsArrowUp(nextPosition > currentPosition)
        setPosition(nextPosition)
        setTimeout(() => {
            setQueueCommon(prev => [...prev.filter(item => item !== prev[0])])
            setQueueElevator(prev => [...prev.filter(item => item !== prev[0])])
            setIsPending(true)
            console.log(Date())
        }, newTransition * 1000)
    }
    useEffect(() => {
        console.log(isPending, "- задержка")
        if (queueCommon.length !== 0 && queueElevator.length === 0 && !isPending) {
            callElevator(queueCommon[0], position)
        }
        console.log(queueCommon)
    }, [queueCommon, isPending])
    useEffect(() => {
        if (isPending) {
            const timer = setInterval(frame, 300)
            setTimeout(() => {
                clearInterval(timer)
            }, 1800)
            setTimeout(() => {
                console.log(Date())
                setIsPending(false)
            }, 3000)
        }
    }, [isPending])

    const getArrow = () => {
        if(isArrowUp) return <img src={img1} alt="arrow-up.png"/>
        return <img src={img2} alt="arrow-down.png"/>
    }
    return (
        <div className="App">
            <main className="block">
                <div className="elevator__shaft">
                    <div id="elevatorId" className={`elevator position__${position}`}
                         style={{transition: `transform ${transition}s linear, background-color 1s linear`}}>
                        <div className="elevator__info">
                            {queueElevator[0] && getArrow()}
                            {queueElevator[0] && queueElevator[0]}
                        </div>
                    </div>
                </div>
                <Floors countFloors={countFloors}
                        position={position}
                        setPosition={setPosition}
                        queueCommon={queueCommon}
                        addToQueueCommon={addToQueueCommon}/>
            </main>
        </div>
    );
}
