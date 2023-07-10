import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesAtom, todosAtom } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setTodos = useSetRecoilState(todosAtom);
  const categories = useRecoilValue(categoriesAtom);
  const onClick = (newCategory: string) => {
    setTodos((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      const newTodo = { ...todos[index], category: newCategory };
      return [...todos.slice(0, index), newTodo, ...todos.slice(index + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((value) => value !== category)
        .map((value) => (
          <button key={value} onClick={() => onClick(value)}>
            {value}
          </button>
        ))}
    </li>
  );
}

export default ToDo;
