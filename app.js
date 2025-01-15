const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todoInput');
const todoListUL = document.getElementById('todoList');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

const addTodo = () =>{
    const todoText = todoInput.value.trim();
    if (todoText.length >0){
        allTodos.push(todoText);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

const updateTodoList = () => {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

const createTodoItem = (todo, todoIndex) => {
    const todoID = `todo${todoIndex}`;
    const todoLI = document.createElement('li');
    todoLI.id = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label class="customCheckbox" for="${todoID}">
            <svg fill= transparent xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoID}" class="todoText">
            ${todo}
        </label>
        <button class="deleteButton">
            <svg fill="var(--accent-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `
    const deleteButton = todoLI.querySelector('.deleteButton');
    deleteButton.addEventListener('click', () => {
        deleteTodo (todoIndex);
    })
    return todoLI;
}

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
}

const getTodos = () => {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

const deleteTodo = (todoIndex) => {
    allTodos = allTodos.filter((_,i)=> i !== todoIndex);
    updateTodoList();
    saveTodos();
}


let allTodos = getTodos();
updateTodoList();