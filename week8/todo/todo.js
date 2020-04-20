
function startTodo() {

}

function addTodo() {
    const container = document.getElementById("todoContainer");
    container.innerHTML += `
    <tr>
        <td><input type="text" value="empty"></td>
        <td><input type="checkbox"></td>
    </tr>
`
    
}
