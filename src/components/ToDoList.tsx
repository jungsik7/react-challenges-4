import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import CreateToDo from "./CreateToDo";
import {Categories, categoryState, LOCAL_STORAGE_KEY, toDoSelector, toDoState, userCategoryState} from "../atoms";
import ToDo from "./ToDo";
import UserCategory from "./UserCategory";


function ToDoList() {
    const [allToDos, setAllToDos] = useRecoilState(toDoState);

    const [toDos] = useRecoilState(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);

    const userCategory = useRecoilValue(userCategoryState);


    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        console.log("onInput", event.currentTarget.value);
        setCategory(currVal => event.currentTarget.value as Categories);
    };

    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        if (isLoad) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allToDos));
        }
    }, [allToDos]);

    useEffect(() => {
        const localStorageToDos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localStorageToDos) {
            setAllToDos(JSON.parse(localStorageToDos));
        }
        setIsLoad(true);
    }, []);


    return (
        <div>
            <UserCategory/>
            <hr/>
            <h1>To Dos</h1>
            <hr/>
            <select onInput={onInput} value={category}>
                <option value={Categories.TO_DO}>TO DO</option>
                <option value={Categories.DOING}>DOING</option>
                <option value={Categories.DONE}>DONE</option>
                {userCategory.map(value => (
                    <option key={value.id} value={value.userCategory}>{value.userCategory}</option>
                ))}
            </select>
            <CreateToDo/>

            {toDos?.map(value => <ToDo key={value.id} {...value}/>)}

        </div>
    );
};

export default ToDoList;