function $(el){
    let element = el
   return {
    element: element,
        css: function (property, value){
            element.style.setProperty(property,value)
            console.log(this)
                return this
        }
    }
}

function handleAddTodo(event){
    let todoInput = document.getElementById("todo").value
    if(todoInput == ""){
        alert('Add Todo in order to add it to the list!')
        return false
    }
    document.getElementById("todo").value = ""
    const ul = document.getElementById('todo-list')
    const li = document.createElement('li')
    const div = document.createElement('div')
    const text = document.createTextNode(todoInput)

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.addEventListener("click",handelEdit)
    function handelEdit(){
        const editInput = document.createElement('input')
        editInput.value = text.textContent
        text.replaceWith(editInput)

        const saveBtn = document.createElement('button')
        saveBtn.textContent = 'Save'
        $(saveBtn).css("border","none").css("background-color","#0d6efd").css("color","white")
        editBtn.replaceWith(saveBtn)
        saveBtn.addEventListener("click", handleSave)
        function handleSave(){
            const updatedTodo = editInput.value
            if(updatedTodo == ""){
                alert('Add Todo in order to add it to the list!')
                return false
            }
            saveBtn.replaceWith(editBtn)
            editInput.replaceWith(updatedTodo)
        }
    }

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener("click",handelDelete)
    function handelDelete(){
        li.remove()
    }

    //styling
    $(li).css("padding","10px")
    $(div).css("display","grid").css("grid-template-columns","1fr repeat(2, minmax(200px,auto))").css("gap","10px")
    $(editBtn).css("border","none").css("background-color","#0d6efd").css("color","white").css("grid-column",2)
    $(deleteBtn).css("border","none").css("background-color","#0d6efd").css("color","white").css("grid-column",3)
    div.append(text,editBtn,deleteBtn)
    li.appendChild(div)
    ul.appendChild(li)
}

