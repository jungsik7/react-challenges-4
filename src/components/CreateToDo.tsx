import React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, LOCAL_STORAGE_KEY, toDoState} from "../atoms";
import styled from "styled-components";

const TodoInput = styled.input`
  width: 200px;
`;

type IFormData = {
    toDo: string;
};

function CreateToDo() {
    const {register, handleSubmit, setValue} = useForm<IFormData>();
    const [toDos, setToDos] = useRecoilState(toDoState);

    const category = useRecoilValue(categoryState);

    const handleValid = ({toDo}: IFormData) => {

        setToDos(currVal => {
            const newValue = [{text: toDo, id: Date.now(), category: category as any}, ...currVal];
            return newValue;
        });
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <TodoInput {...register("toDo", {required: "Please write a To Do"})} type="text"
                   placeholder="Write a to do"/>
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;