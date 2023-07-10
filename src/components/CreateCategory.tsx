import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesAtom, selectedCategoryAtom, todosAtom } from "../atoms";

interface FormData {
  category: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const setCategories = useSetRecoilState(categoriesAtom);

  const handleValid = (data: FormData) => {
    console.log("Add category", data.category);
    setCategories((old) => [...old, data.category]);
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a category",
        })}
        placeholder="Add a new category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
