import React from "react";
import {useRecoilValue} from "recoil";
import {IToDo, toDoState} from "../atoms";



function ToDo({text}: IToDo) {
    const toDos = useRecoilValue(toDoState);
    return (
        <li>
            {text}
            <button>To Do</button>
            <button>Doing</button>
            <button>Done</button>
        </li>

    );
}

export default ToDo;