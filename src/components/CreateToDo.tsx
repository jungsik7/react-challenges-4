import React from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, useSetRecoilState} from "recoil";
import {toDoState} from "../atoms";

type IFormData = {
    toDo: string;
};

function CreateToDo() {
    const {register, handleSubmit, setValue} = useForm<IFormData>();
    const setToDos = useSetRecoilState(toDoState);

    const handleValid = ({toDo}: IFormData) => {
        setToDos(currVal => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...currVal])
        setValue("toDo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {required: "Please write a To Do"})} type="text"
                   placeholder="Write a to do"/>
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;