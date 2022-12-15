import './App.css';
import Floors from "./floors/floors";
import ElevatorShafts from "./elevators/elevatorShafts";


function App() {
    return (
        <div className="App">
            <main className="block">
                <ElevatorShafts/>
                <Floors/>
            </main>
        </div>
    );
}

export default App;
