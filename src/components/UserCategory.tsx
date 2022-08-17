import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {IUserCategories, userCategoryState} from "../atoms";

interface IFormData {
    userCategory: string;
}

function UserCategory() {
    const {register, handleSubmit, setValue} = useForm<IFormData>();
    const setUserCategory = useSetRecoilState(userCategoryState);
    const handleValid = ({userCategory}: IFormData) => {
        setUserCategory(currVal => {
            const newUserCategory = [...currVal, {userCategory: userCategory, id: Date.now()} as IUserCategories];
            console.log(newUserCategory);
            return newUserCategory;
        });
        setValue("userCategory", "");
    };


    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input type="text"
                   {...register("userCategory", {required: "Please write a category"})}
                   placeholder="write a category"/>
            <button>Add</button>
        </form>
    );
}

export default UserCategory;