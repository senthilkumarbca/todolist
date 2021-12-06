let inputBox = document.querySelector("#inputBox");
let addBtn = document.querySelector("#addBtn");
let todoList = document.querySelector("#todoList");
let styleSheets = document.querySelector("#styleSheets");
let theme = document.querySelector("#theme");
let themeIcon = document.querySelector("#themeIcon");
let dellAll = document.querySelector("#dellAll");

let todoArr=[];

function addTodo(){
    if(inputBox.value === "") return alert("Please enter some task...");

    let count = 0;
    for(i in inputBox.value){
        if(inputBox.value[i] === " ") count++;
    }
    if(inputBox.value.length === count) return alert("Please enter valid task...");

    let todoObj = {
        id : Math.random(),
        todo : inputBox.value,
        done : false
    };

    todoArr.push(todoObj);
    storeTodo();

    createElement(todoObj.id , todoObj.todo , todoObj.done);

    inputBox.value="";
}

function createElement(id , todo , done)
{
    const DONE = (done) ? "fa-check-circle" : "fa-circle-notch" ;
    const done1 = (done) ? "done" : "" ;

    let todoElement = document.createElement("div");
    todoElement.classList.add("col-md-6");
    todoElement.innerHTML = `
        <div class="todo ${done1}" id="${id}">
            <i class="fa ${DONE}" job="doneTodo"></i>
            <p job="doneTodo" class="">${todo}</p>
            <i class="fa fa-pen" job="editTodo"></i>
            <i class="fa fa-trash-alt" job="delTodo"></i>
        </div>
    `;

    todoList.appendChild(todoElement);

    todoElement.addEventListener("click",function (e){
        let job = e.target.attributes.job.value;
        
        if(job == "doneTodo") doneTodo(e.target);
        else if(job == "delTodo") delTodo(e.target);
        else if(job == "editTodo") editTodo(e.target);
    });
}

function doneTodo(element)
{
    element.parentNode.children[0].classList.toggle("fa-circle-notch");   
    element.parentNode.children[0].classList.toggle("fa-check-circle");   
    element.parentNode.classList.toggle("done");   

    let a = element.parentNode;
    for(data of todoArr)
    {
        if(data.id == a.id) data.done = !data.done;
    }
    storeTodo();
}

function delTodo(element)
{
    element.parentNode.parentNode.remove();

    let a =element.parentNode;
    for(i in todoArr)
    {
        if(todoArr[i].id == a.id) todoArr.splice(i,1);
    }
    storeTodo();
}

function editTodo(element)
{
    let x = prompt("Edit",element.parentNode.children[1].innerHTML);
    if(x)
    {
        element.parentNode.children[1].innerHTML=x;
        
        let a =element.parentNode;
        for(i in todoArr)
        {
            if(todoArr[i].id == a.id) todoArr[i].todo=x;
        }
        storeTodo();
    } 
    
}

function storeTodo()
{
    let todoList = JSON.stringify(todoArr);
    localStorage.setItem("MyTodos",todoList);
}

function readTodo()
{
    let datas = localStorage.getItem("MyTodos");
    let todoList = JSON.parse(datas);
    if(todoList)
    {
        for(todos of todoList)
        {
            todoArr.push(todos);
            createElement(todos.id , todos.todo , todos.done);
        }
    }
    else
    {
        storeTodo();
    }
    
}
function storeTheme()
{
    let myTheme = styleSheets.getAttribute("href");
    localStorage.setItem("MyTodosTheme",myTheme);   
}
function readTheme()
{
    let myTheme = localStorage.getItem("MyTodosTheme");
    if(myTheme)
    {
    styleSheets.setAttribute("href",myTheme);
    if(myTheme == "./assests/css/intex.css") themeIcon.setAttribute("class","fas fa-moon");
    else themeIcon.setAttribute("class","fas fa-sun");
    }
    else
    {
        localStorage.setItem("MyTodosTheme","./assests/css/intex.css");
        styleSheets.setAttribute("href",localStorage.getItem("MyTodosTheme")); 
    }
}
function themeFun()
{
    if(styleSheets.getAttribute("href") == "./assests/css/intex.css"){
        styleSheets.setAttribute("href","./assests/css/index1.css");
        themeIcon.setAttribute("class","fas fa-sun");
        storeTheme();
    }
    else{
        styleSheets.setAttribute("href","./assests/css/intex.css");
        themeIcon.setAttribute("class","fas fa-moon");
        storeTheme();
    }
}
function dellAllFun()
{
    todoArr=[];
    storeTodo();
    document.location.reload();
}

readTodo();

readTheme();

addBtn.addEventListener("click",addTodo);
inputBox.addEventListener("keyup",function(e){
    if(e.keyCode === 13) addTodo();
});

theme.addEventListener("click",themeFun);
dellAll.addEventListener("click",dellAllFun);
