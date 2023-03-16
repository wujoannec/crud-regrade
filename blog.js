var rowToEdit = null;
var count = 0;
export function crudOnSubmit() {
    const form = document.getElementById("formy");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (uniqueTitle()) {
            let formData = {};
            formData["title"] = document.querySelector("#title").value;
            formData["date"] = document.querySelector("#date").value;
            formData["summary"] = document.querySelector("#summary").value;
            if (rowToEdit != null){
                // console.log("EDIT STREAM")
                updatePost(formData);
                blankForm();
            }
            else{
                // console.log("CREATE STREAM")
                createPost(formData);
                blankForm();
            }
            return;
        }
    })
}


function uniqueTitle() {
    let uniqueTitle = true;
    let formTitle = document.querySelector("#title");
    formTitle.value == "" ? (uniqueTitle = false, alert("Invalid: Must input title")):(uniqueTitle = true);
    return uniqueTitle;
}

function createPost(data) {
    let tableBody = document.querySelector("#blog-posts").getElementsByTagName('tbody')[0];
    let newRow = tableBody.insertRow(-1);
    count++;
    let col0 = newRow.insertCell(0);
    let col1 = newRow.insertCell(1);
    let col2 = newRow.insertCell(2);
    let col3 = newRow.insertCell(3);
    col0.innerHTML = data.title;
    col1.innerHTML = data.date;
    col2.innerHTML = data.summary;
    col3.innerHTML = 
    `&nbsp&nbsp&nbsp<a class = "edit-click"><em><u>Edit</u></em></a>&nbsp&nbsp&nbsp
    <a class = "delete-click"><em><u>Delete</u></em></a>`;
    let editClick = document.getElementsByClassName("edit-click")[count-1];
    editClick.onmouseover = function() {editClick.style.color = "#3598c6";};
    editClick.onmouseout = function() {editClick.style.color = "black";};
    editClick.addEventListener("click", ()=> {fillFormForEdit(editClick)});
    
    let deleteClick = document.getElementsByClassName("delete-click")[count-1];
    deleteClick.onmouseover = function() {deleteClick.style.color = "#3598c6";};
    deleteClick.onmouseout = function() {deleteClick.style.color = "black";};
    deleteClick.addEventListener("click", ()=> {remove(deleteClick)});
    return;
}

function updatePost(formData) {
    // console.log("INSIDE UPDATE POST")
    let col0 = rowToEdit.cells[0];
    col0.innerHTML = formData.title;
    let col1 = rowToEdit.cells[1];
    col1.innerHTML = formData.date;
    let col2 = rowToEdit.cells[2];
    col2.innerHTML = formData.summary;
    return;
}

function blankForm() {
    let formTitle = document.querySelector("#title");
    formTitle.value = "";
    let formDate = document.querySelector("#date");
    formDate.value = "";
    let formSummary = document.querySelector("#summary");
    formSummary.value = "";
    rowToEdit = null;
    return;
}

function fillFormForEdit(selectedEdit) {
    // console.log("FILL FORM TO EDIT")
    rowToEdit = selectedEdit.parentElement.parentElement;
    document.querySelector("#title").value = rowToEdit.cells[0].innerHTML;
    document.querySelector("#date").value = rowToEdit.cells[1].innerHTML;
    document.querySelector("#summary").value = rowToEdit.cells[2].innerHTML;
    return;
}


function remove(selectedRemove) {
    if (confirm('Delete record?') == true) {
        let rowToDelete = selectedRemove.parentElement.parentElement;
        let blogTable = document.querySelector("#blog-posts");
        blogTable.deleteRow(rowToDelete.rowIndex);
        count--;
        blankForm();
    }
    return;
}
