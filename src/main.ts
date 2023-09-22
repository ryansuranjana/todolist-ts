import store, { Todo } from "./store";

const { state, save, update, destroy } = store;
const table = document.querySelector<HTMLTableElement>(".tbody");
const inputTodo = document.querySelector<HTMLInputElement>("#todo");
const formTodo = document.querySelector<HTMLFormElement>("#form-todo");

const updateTable = (): void => {
    const todos: Todo[] = state();

    if (table) {
        table.innerHTML = "";

        table.innerHTML = todos
            .map(
                (todo) => `
            <tr>
                <td><input class="form-check-input" type="checkbox" data-id="${todo.id}" ${todo.done ? "checked" : ""}></td>
                <td class="${todo.done ? "text-decoration-line-through" : ""}">${todo.todo}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-button" data-id="${todo.id}">Delete</button>
                </td>
            </tr>
        `
            )
            .join("");

        setupDeleteButtonListeners();
        setupCheckboxListeners();
    }
};

const addTodo = (e: Event): void => {
    e.preventDefault();
    if (inputTodo) {
        save(inputTodo.value);
        updateTable();
        inputTodo.value = "";
    }
};

const updateDone = (id: number, done: boolean): void => {
    const todos: Todo[] = state();
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.done = done;
        update(todo.id, { todo: todo.todo, done: todo.done });
    }
    updateTable();
};

const deleteTodo = (id: number): void => {
    destroy(id);
    updateTable();
};

const setupDeleteButtonListeners = (): void => {
    const deleteButtons = document.querySelectorAll<HTMLButtonElement>(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id: number = parseInt(button.getAttribute("data-id") || "0", 10);
            deleteTodo(id);
        });
    });
}

const setupCheckboxListeners = (): void => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".form-check-input");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
            const id: number = parseInt(checkbox.getAttribute("data-id") || "0", 10);
            const checked: boolean = (e.target as HTMLInputElement).checked;
            updateDone(id, checked);
        });
    });
}

window.addEventListener("load", (): void => {
    updateTable();
    formTodo?.addEventListener("submit", addTodo);
});
