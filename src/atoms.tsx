import {atom, selector} from "recoil";


export const LOCAL_STORAGE_KEY = "toDos";

// export const minuteState = atom({
//     key: "minutes",
//     default: 0,
// });
// export const hourSelector = selector<number>({
//     key: "hours",
//     get: ({get}) => {
//         const minutes = get(minuteState);
//         return minutes / 60;
//     },
//     set: ({set}, newValue) => {
//         const minutes = Number(newValue) * 60;
//         set(minuteState, minutes);
//     },
// });


export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export interface IUserCategories {
    userCategory: string;
    id: number;
}

export const userCategoryState = atom<IUserCategories[]>({
    key: "userCategoryState",
    // default: [{userCategory: "TO_DO"}, {userCategory: "DOING"}, {userCategory: "DONE"}]
    default: []
});


export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO

});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});


export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        //console.log(toDos, category, typeof category);

        return toDos.filter(value => value.category === category);
    },
    set: ({set}, newValue) => {
        // console.log(newValue);
        set(toDoState, newValue);
    },
});