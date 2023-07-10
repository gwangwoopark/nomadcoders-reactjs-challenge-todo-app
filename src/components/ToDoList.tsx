import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesAtom, selectedCategoryAtom, todoSelector } from "../atoms";
import ToDo from "./ToDo";
import CreateToDo from "./CreateToDo";
import CreateCategory from "./CreateCategory";

function ToDoList() {
  const selectedTodos = useRecoilValue(todoSelector);
  const categories = useRecoilValue(categoriesAtom);
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(selectedCategoryAtom);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>To Dos</h1>

      <hr />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <select
          style={{ marginRight: "24px" }}
          onInput={onInput}
          defaultValue={selectedCategory}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <CreateCategory />
      </div>
      <hr />
      <CreateToDo />
      <ul style={{ padding: "10px 0px" }}>
        {selectedTodos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
