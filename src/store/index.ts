interface Todos {
    id: number;
    todo: string;
    done: boolean;
}

const state = (): Todos[] => {
    const storedData = localStorage.getItem("todos");

    if (storedData) {
        const todos: Todos[] = JSON.parse(storedData);
        return todos;
    } else {
        return [];
    }
};

const save = (todo: string): void => {
    const todos: Todos[] = state();
    const id: number = Date.now() + Math.random();

    todos.unshift({ id: id, todo: todo, done: false });
    localStorage.setItem("todos", JSON.stringify(todos));
};

const update = (id: number, data: { todo: string, done: boolean }): void => {
    const todos: Todos[] = state();
    const findIndex: number = todos.findIndex((todo) => todo.id === id);

    todos[findIndex] = { id, ...data };
    localStorage.setItem("todos", JSON.stringify(todos));
};

const find = (id: number): Todos | null => {
    const todos: Todos[] = state();
    return todos.find((todo) => todo.id === id) || null;
};

const destroy = (id: number): void => {
    const todos: Todos[] = state();
    const todosUpdate: Todos[] = todos.filter((todo) => todo.id !== id);

    localStorage.setItem("todos", JSON.stringify(todosUpdate));
};

export default { state, save, update, find, destroy };
