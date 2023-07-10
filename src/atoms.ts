import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const DEFAULT_CATEGORIES = ["To do", "Doing", "Done"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const { persistAtom } = recoilPersist();

export const categoriesAtom = atom<string[]>({
  key: "categories",
  default: DEFAULT_CATEGORIES,
  effects_UNSTABLE: [persistAtom],
});

export const todosAtom = atom<IToDo[]>({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategoryAtom = atom({
  key: "selectedCategory",
  default: DEFAULT_CATEGORIES[0],
  effects_UNSTABLE: [persistAtom],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    return get(todosAtom).filter(
      (todo) => todo.category === get(selectedCategoryAtom)
    );
  },
});
