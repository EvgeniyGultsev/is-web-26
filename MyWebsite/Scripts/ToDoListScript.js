document.addEventListener("DOMContentLoaded", function() {
    // Добавление всех элементов на страницу
    let getArr = localStorage.getItem('active_items');
    getArr = JSON.parse(getArr);
    if (getArr != null){
        for (let i = 0; i < getArr.length; i++){
            let elementToAdd = document.createElement("li");
            elementToAdd.className = "to_watch_active_item"
            let firstButton = document.createElement("button");
            firstButton.className = "state_change_button_active"
            firstButton.innerText = getArr[i]
            elementToAdd.appendChild(firstButton);
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete_buttons"
            deleteButton.innerText = "Delete"
            elementToAdd.appendChild(deleteButton);
            document.getElementById("to_watch_films").appendChild(elementToAdd);
        }
    }

    getArr = localStorage.getItem('crossed_items');
    getArr = JSON.parse(getArr);
    if (getArr != null){
        for (let j = 0; j < getArr.length; j++){
            let elementToAdd = document.createElement("li");
            elementToAdd.className = "to_watch_active_item"
            let firstButton = document.createElement("button");
            firstButton.className = "state_change_button_crossed"
            firstButton.innerText = getArr[j]
            elementToAdd.appendChild(firstButton);
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete_buttons"
            deleteButton.innerText = "Delete"
            elementToAdd.appendChild(deleteButton);
            document.getElementById("to_watch_films").append(elementToAdd);
        }
    }

    // Добавление им возможность вычеркиваться
    let elements = document.querySelectorAll(".state_change_button_active,.state_change_button_crossed")

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = function (e){
            change_state(e)
        }
    }
    // Добавление удаления по клинку кнопки
    let delete_elements = document.querySelectorAll(".delete_buttons")

    for (let j = 0; j < delete_elements.length; j++) {
        delete_elements[j].onclick = function(e) {
            delete_buttons(e)
        }
    }

    // кнопки отображения
    document.querySelector(".display_all").onclick = function (){
        const el = document.querySelectorAll(".state_change_button_active,.state_change_button_crossed");

        for (let i = 0; i < el.length; i++) {
            el[i].parentElement.style.display = "grid";
        }

        document.querySelector(".display_all").classList.add("active");
        document.querySelector(".display_planned").classList.remove("active");
        document.querySelector(".display_watched").classList.remove("active");
    }

    document.querySelector(".display_planned").onclick = function (){
        let el = document.querySelectorAll(".state_change_button_active");
        for (let i = 0; i < el.length; i++) {
            el[i].parentElement.style.display = "grid";
        }
        el = document.querySelectorAll(".state_change_button_crossed")
        for (let i = 0; i < el.length; i++) {
            el[i].parentElement.style.display = "none";
        }

        document.querySelector(".display_planned").classList.add("active");
        document.querySelector(".display_watched").classList.remove("active");
        document.querySelector(".display_all").classList.remove("active");
    }

    document.querySelector(".display_watched").onclick = function (){
        let el = document.querySelectorAll(".state_change_button_active");
        for (let i = 0; i < el.length; i++) {
            el[i].parentElement.style.display = "none";
        }
        el = document.querySelectorAll(".state_change_button_crossed")
        for (let i = 0; i < el.length; i++) {
            el[i].parentElement.style.display = "grid";
        }

        document.querySelector(".display_watched").classList.add("active");
        document.querySelector(".display_all").classList.remove("active");
        document.querySelector(".display_planned").classList.remove("active");
    }
})
document.getElementById("form").addEventListener("submit", function(e) {
    // Добавление элемента
    e.preventDefault()
    const data = new FormData(e.target);

    let getActiveArr = localStorage.getItem('active_items');
    getActiveArr = JSON.parse(getActiveArr);

    if (getActiveArr == null){ getActiveArr = [] }

    let getCrossedArr = localStorage.getItem('crossed_items');
    getCrossedArr = JSON.parse(getCrossedArr);
    if (getCrossedArr == null){ getCrossedArr = [] }

    //Проверка, есть ли он уже в списке
    if (getActiveArr.indexOf([...data.entries()][0][1]) === -1 && getCrossedArr.indexOf([...data.entries()][0][1]) === -1){
        let elementToAdd = document.createElement("li");
        elementToAdd.className = "to_watch_active_item"
        let firstButton = document.createElement("button");
        firstButton.className = "state_change_button_active"
        firstButton.innerText = [...data.entries()][0][1]
        elementToAdd.appendChild(firstButton);
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete_buttons"
        deleteButton.innerText = "Delete"
        elementToAdd.appendChild(deleteButton);

        document.getElementById("to_watch_films").append(elementToAdd)

        // почему то, если добавлять новый on-click только одному, на всех остальных он сбрасывается
        let elements = document.querySelectorAll(".state_change_button_active,.state_change_button_crossed")

        for (let i = 0; i < elements.length; i++) {
            elements[i].onclick = function (e){
                change_state(e)
            }
        }

        let delete_elements = document.querySelectorAll(".delete_buttons")

        for (let j = 0; j < delete_elements.length; j++) {
            delete_elements[j].onclick = function(e) {
                delete_buttons(e)
            }
        }

        getActiveArr.push([...data.entries()][0][1]);
        getActiveArr = getActiveArr.sort()
        const array = JSON.stringify(getActiveArr);

        localStorage.setItem('active_items', array);
    }
    else {alert("Film is already in list")}

    e.target.reset();
})
    //Измменить состояние элемента(просмотрен или нет)
function change_state(e){
    e.preventDefault();
    const classname = e.target.className;
    const buttonText = e.target.firstChild.textContent;

    let activeArray = JSON.parse(localStorage.getItem('active_items'));
    if (activeArray == null){
        activeArray = []
    }
    let crossedArray = JSON.parse(localStorage.getItem('crossed_items'));
    if (crossedArray == null){
        crossedArray = []
    }

    if (classname === "state_change_button_active"){
        e.target.className = "state_change_button_crossed";

        crossedArray.push(buttonText);
        localStorage.setItem('crossed_items', JSON.stringify(crossedArray.sort()));

        activeArray = activeArray.filter((str) => str !== buttonText)
        localStorage.setItem('active_items', JSON.stringify(activeArray.sort()));

        if (localStorage.getItem('crossed_items') == null){}

        if (document.querySelector(".display_planned").classList.contains("active")){
            e.target.parentElement.style.display = "none";
        }
    }
    else{
        e.target.className = "state_change_button_active";

        activeArray.push(buttonText);
        localStorage.setItem('active_items', JSON.stringify(activeArray.sort()));

        crossedArray = crossedArray.filter((str) => str !== buttonText)
        localStorage.setItem('crossed_items', JSON.stringify(crossedArray.sort()));

        if (document.querySelector(".display_watched").classList.contains("active")){
            e.target.parentElement.style.display = "none";
        }
    }

}
// удаление элемента
function delete_buttons(e){
    e.preventDefault()
    const buttonText = e.target.parentNode.firstChild.textContent;

    let activeArray = JSON.parse(localStorage.getItem('active_items'));
    if (activeArray == null){
        activeArray = []
    }
    let crossedArray = JSON.parse(localStorage.getItem('crossed_items'));
    if (crossedArray == null){
        crossedArray = []
    }
    activeArray = activeArray.filter((str) => str !== buttonText)
    crossedArray = crossedArray.filter((str) => str !== buttonText)
    localStorage.setItem('active_items', JSON.stringify(activeArray.sort()));
    localStorage.setItem('crossed_items', JSON.stringify(crossedArray.sort()));
    e.target.parentElement.remove();
}