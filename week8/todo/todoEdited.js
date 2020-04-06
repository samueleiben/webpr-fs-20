function startTodo() {}

function addTodo() {
  const todo =
    '<tr><td><input type="text" value="empty" /></td><td><input type="checkbox" /></td></tr>';
  const todoContainer = document.getElementById('todoContainer');
  todoContainer.innerHTML = todoContainer.innerHTML + todo;
}
