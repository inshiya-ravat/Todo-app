function $(el){
    let element = el
   return {
    element: element,
        css: function (property, value){
            element.style.setProperty(property,value)
                return this
        }
    }
}
function idGenerator(){
    let id = 0
    return function(){
        return id++
    }
}
const id= idGenerator()
todos=[]

function handleEnter(key){
    if(key == "Enter"){
        handleAddTodo()
    }
}

function handleDelete(todoItem){
    //removing todo from array
   todos = todos.filter(todo=> todo.id !== todoItem.id)
   //removing todo from DOM
   todoItem.ref.parentElement.remove()
}

function handleEdit(todoItem){
    const editBtn = todoItem.ref.children[1]
    const input = todoItem.ref.children[0]
    input.disabled = false
    input.focus()
    editBtn.textContent = 'Save'
    editBtn.addEventListener("click",()=>handleSave(todoItem))
}

function handleSave(todoItem){    
    const saveBtn = todoItem.ref.children[1]
    const input = todoItem.ref.children[0]
    if(input.value.trim() == ""){
        alert('Add Todo in order to add it to the list!')
        return false
    }
    input.disabled = true
    saveBtn.textContent = 'Edit'
    saveBtn.removeEventListener("click",()=>handleSave(todoItem))
    saveBtn.addEventListener("click",()=>handleEdit(todoItem))
}
function handleAddTodo(){
    let todoInput = document.getElementById("todo").value.trim()
    
    //handle if empty todo added by user
    if(todoInput == ""){
        alert('Add Todo in order to add it to the list!')
        return false
    }
    document.getElementById("todo").value = ""

    //creating new elements to be added in the todo list UI
    const ul = document.getElementById('todo-list')
    const li = document.createElement('li')
    const div = document.createElement('div')
    const input = document.createElement('input')
    input.value = todoInput
    input.disabled = true

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'

    //styling the new elements
    $(li).css("padding","10px")
    $(div).css("display","grid").css("grid-template-columns","1fr repeat(2, minmax(200px,auto))").css("gap","10px").css("padding","0px 20px")
    $(input).css("background-color","inherit").css("color","black").css("grid-column",1).css("border","none")
    $(editBtn).css("border","none").css("background-color","#0d6efd").css("color","white").css("grid-column",2)
    $(deleteBtn).css("border","none").css("background-color","#CB0203").css("color","white").css("grid-column",3)

    //adding elements to DOM
    div.append(input,editBtn,deleteBtn)
    li.appendChild(div)
    ul.appendChild(li)

    //creating and adding new todo into todo list
    const todoItem = {
        id: id(),
        text: todoInput,
        inEditState: false,
        ref: Object.assign(div),
    }
    todos.push(todoItem)

    //add event listeners on edit and delete button
    editBtn.addEventListener("click",() => handleEdit(todoItem))
    deleteBtn.addEventListener("click",() => handleDelete(todoItem))
}
