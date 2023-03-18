let rowToEdit = null;
let count = 0;
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
                updatePost(formData);
                blankForm();
            }
            else{
                createPost(formData);
                blankForm();
            }
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
      `<a class = "edit-click"><i class="fa-solid fa-pen-to-square"></i></a>
      <a class = "delete-click"><i class="fa-solid fa-trash"></i></a>`;
    let editClick = document.getElementsByClassName("edit-click")[count-1];
    editClick.addEventListener("click", ()=> {fillFormForEdit(editClick)});
    let deleteClick = document.getElementsByClassName("delete-click")[count-1];
    deleteClick.addEventListener("click", ()=> {remove(deleteClick)});
}

function updatePost(formData) {
    console.log("here");
    let col0 = rowToEdit.cells[0];
    col0.innerHTML = formData.title;
    let col1 = rowToEdit.cells[1];
    col1.innerHTML = formData.date;
    let col2 = rowToEdit.cells[2];
    col2.innerHTML = formData.summary;
}


function blankForm() {
    let formTitle = document.querySelector("#title");
    formTitle.value = "";
    let formDate = document.querySelector("#date");
    formDate.value = "";
    let formSummary = document.querySelector("#summary");
    formSummary.value = "";
    rowToEdit = null;
}

function fillFormForEdit(selectedEdit) {
    let rowToEdit = selectedEdit.parentElement.parentElement;
    let confirmationText= `Edit post titled "${rowToEdit.cells[0].innerHTML}"?\nAll contents of the current form will be replaced.`
    if (confirm(confirmationText) == true) {
        document.querySelector("#title").value = rowToEdit.cells[0].innerHTML;
        document.querySelector("#date").value = rowToEdit.cells[1].innerHTML;
        document.querySelector("#summary").value = rowToEdit.cells[2].innerHTML;
    }
}


function remove(selectedRemove) {
    let rowToDelete = selectedRemove.parentElement.parentElement;
    let confirmationText= `Delete post titled "${rowToDelete.cells[0].innerHTML}" permanently?`
    if (confirm(confirmationText) == true) {

        let blogTable = document.querySelector("#blog-posts");
        blogTable.deleteRow(rowToDelete.rowIndex);
        count--;
    }
}
