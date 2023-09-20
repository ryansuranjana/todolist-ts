import store from "./store";
import Todos from "./store/Todos";

const { state, save, update, destroy } = store;
const table = document.querySelector<HTMLTableElement>(".tbody");
const inputTodo = document.querySelector<HTMLInputElement>("#todo");
const formTodo = document.querySelector<HTMLFormElement>("#form-todo");

const updateTable = (): void => {
    const todos: Todos[] = state();

    if (table) {
        table.innerHTML = "";

        table.innerHTML = todos
            .map(
                (todo) => `
            <tr>
                <td><input class="form-check-input" type="checkbox" data-id="${todo.id}" ${todo.done ? 'checked' : ''}></td>
                <td class="${todo.done ? 'text-decoration-line-through' : ''}">${todo.todo}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-button" data-id="${todo.id}">Delete</button>
                </td>
            </tr>
        `
            )
            .join("");

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const id = parseInt(button.getAttribute("data-id") || "0", 10);
                deleteTodo(id);
            });
        });

        const checkboxes = document.querySelectorAll(".form-check-input");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", (e) => {
                const id = parseInt(checkbox.getAttribute("data-id") || "0", 10);
                const checked = (e.target as HTMLInputElement).checked;
                updateDone(id, checked);
            });
        });
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

// const updateDone = (e: MouseEvent, todo: Todos): void => {
//     if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
//         const checked = e.target.checked;
//         update(todo.id, { todo: todo.todo, done: checked });
//         updateTable();
//     }
// };

const updateDone = (id: number, done: boolean): void => {
    const todos: Todos[] = state()
    const todo = todos.find((todo) => todo.id === id);
    if(todo) {
        todo.done = done
        update(todo.id, { todo: todo.todo, done: todo.done })
    }
    updateTable()
}

const deleteTodo = (id: number): void => {
    destroy(id);
    updateTable();
};

window.addEventListener("load", () => {
    updateTable();
    formTodo?.addEventListener("submit", addTodo);
});
