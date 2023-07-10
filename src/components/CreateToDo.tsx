import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCategoryAtom, todosAtom } from "../atoms";

interface FormData {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const setTodos = useSetRecoilState(todosAtom);
  const selectedCategory = useRecoilValue(selectedCategoryAtom);

  const handleValid = (data: FormData) => {
    console.log("Add to do", data.todo);
    setTodos((old) => [
      ...old,
      { text: data.todo, id: Date.now(), category: selectedCategory },
    ]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("todo", {
          required: "Please write a todo",
        })}
        placeholder="Write a todo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
