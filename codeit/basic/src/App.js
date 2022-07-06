import Dice from './Dice';
import Button from "./Button";
import {useState} from 'react';

function App() {
    const [num, setNum] = useState(1);

    function random(n) {
        return Math.ceil(Math.random() * n);
    }

    const handlerRollClick = () => {
        const nextNum = random(6)
        setNum(nextNum);
    }

    const handlerClearClick = () => {
        setNum(1);
    }

    return (
        <div>
            <div>
                <Button onClick={handlerRollClick}>던지기</Button>
                <Button onClick={handlerClearClick}>처음부터</Button>
            </div>
            <Dice color="red" num={num} />
        </div>
    );
}

export default App;
