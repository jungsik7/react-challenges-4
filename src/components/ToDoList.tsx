import React from "react";
import {useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import {toDoState} from "../atoms";
import ToDo from "./ToDo";


function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <CreateToDo/>
            <ul>
                {toDos.map(value => <ToDo key={value.id} {...value}/>)}
            </ul>
        </div>
    );
};

export default ToDoList;