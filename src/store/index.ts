import Todo from "./Todo";

const state = (): Todo[] => {
    const storedData = localStorage.getItem("todos");

    if (storedData) {
        const todos: Todo[] = JSON.parse(storedData);
        return todos;
    } else {
        return [];
    }
};

const save = (todo: string): void => {
    const todos: Todo[] = state();
    const id: number = Date.now();

    todos.unshift({ id: id, todo: todo, done: false });
    localStorage.setItem("todos", JSON.stringify(todos));
};

const update = (id: number, data: { todo: string; done: boolean }): void => {
    const todos: Todo[] = state();
    const findIndex: number = todos.findIndex((todo) => todo.id === id);

    todos[findIndex] = { id, ...data };
    localStorage.setItem("todos", JSON.stringify(todos));
};

const find = (id: number): Todo | null => {
    const todos: Todo[] = state();
    return todos.find((todo) => todo.id === id) || null;
};

const destroy = (id: number): void => {
    const todos: Todo[] = state();
    const todosUpdate: Todo[] = todos.filter((todo) => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(todosUpdate));
};

export default { state, save, update, find, destroy };
