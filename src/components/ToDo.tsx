import React from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {Categories, IToDo, toDoState} from "../atoms";
import styled from "styled-components";


const TodoItem = styled.span`
  width: 175px;
  display: inline-block;
`;

function ToDo({text, category, id}: IToDo) {
    const toDos = useRecoilValue(toDoState);
    const setToDos = useSetRecoilState(toDoState);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name: newCategory}} = event;
        setToDos(currVal => {
            const index = toDos.findIndex(value => value.id === id);

            return [
                ...currVal.slice(0, index),
                {text: text, id: Date.now(), category: newCategory as Categories},
                ...currVal.slice(index + 1)
            ];
        });
    };

    const onItemDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setToDos(currVal => {
            const index = toDos.findIndex(value => value.id === id);
            return [
                ...currVal.slice(0, index),
                ...currVal.slice(index + 1)
            ];
        });
    };

    return (
        <li>

            <TodoItem>{text}</TodoItem>
            <button onClick={onItemDeleteClick} style={{width:"80px"}}>delete</button>
            &nbsp;&nbsp;
            {category !== Categories.TO_DO ? <button name={Categories.TO_DO + ""} onClick={onClick}>To Do</button> : null}
            {category !== Categories.DOING ? <button name={Categories.DOING + ""} onClick={onClick}>Doing</button> : null}
            {category !== Categories.DONE ? <button name={Categories.DONE + ""} onClick={onClick}>Done</button> : null}
        </li>

    );
}

export default ToDo;