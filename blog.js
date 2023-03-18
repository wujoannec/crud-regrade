let selectedRowToEdit = null;

export function repopulateTable() {
	//Populate table with data from localstorage 
	let count2 = 0;
	let tableBody = document.querySelector("#blog-posts").getElementsByTagName('tbody')[0];
	removal();
	Object.keys(localStorage).forEach((key) => {
		let newRow = tableBody.insertRow(-1);
		let col0 = newRow.insertCell(0);
		let col1 = newRow.insertCell(1);
		let col2 = newRow.insertCell(2);
		let col3 = newRow.insertCell(3);
		col0.innerHTML = key;
		col1.innerHTML = JSON.parse(localStorage.getItem(key))[0];
		col2.innerHTML = JSON.parse(localStorage.getItem(key))[1];
		col3.innerHTML = 
		`<a class = "edit-click"><i class="fa-solid fa-pen-to-square"></i></a>
		<a class = "delete-click"><i class="fa-solid fa-trash"></i></a>`;
		let editClick = document.getElementsByClassName("edit-click")[count2];
		editClick.addEventListener("click", ()=> {fillFormForEdit(editClick)});
		let deleteClick = document.getElementsByClassName("delete-click")[count2];
		deleteClick.addEventListener("click", ()=> {remove(deleteClick)});
		count2++;
	});
}

function removal(){
	let table = document.querySelector("#blog-posts")
	while(table.rows.length > 0) {
		table.deleteRow(0);
	}
}

export function crudOnSubmit() {
	const form = document.getElementById("formy");
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		if (nonEmptyTitle()) {
			let formData = {};
			formData["title"] = document.querySelector("#title").value;
			formData["date"] = document.querySelector("#date").value;
			formData["summary"] = document.querySelector("#summary").value;
			if (selectedRowToEdit != null){
				updatePost(formData);
			}
			else{
				createPost(formData);
			}
			repopulateTable();
			blankForm();
		}
	})
}

function nonEmptyTitle() {
    let nonEmptyTitle = true;
    let formTitle = document.querySelector("#title");
    formTitle.value == "" ? (nonEmptyTitle = false, alert("Invalid: Must input title")):(nonEmptyTitle = true);
    return nonEmptyTitle;
}

function createPost(formData) {
	let arr = [formData.date, formData.summary];
	localStorage.setItem(formData.title, JSON.stringify(arr));
}

function updatePost(formData) {
	localStorage.removeItem(selectedRowToEdit.cells[0]);
	createPost(formData);
}

function blankForm() {
    let formTitle = document.querySelector("#title");
    formTitle.value = "";
    let formDate = document.querySelector("#date");
    formDate.value = "";
    let formSummary = document.querySelector("#summary");
    formSummary.value = "";
    selectedRowToEdit = null;
}

function fillFormForEdit(selectedEdit) {
	let selectedRowToEdit = selectedEdit.parentElement.parentElement;
	let confirmationText= `Edit post titled "${selectedRowToEdit.cells[0].innerHTML}"?\nAll contents of the current form will be replaced.`
	if (confirm(confirmationText) == true) {
		document.querySelector("#title").value = selectedRowToEdit.cells[0].innerHTML;
		document.querySelector("#date").value = selectedRowToEdit.cells[1].innerHTML;
		document.querySelector("#summary").value = selectedRowToEdit.cells[2].innerHTML;
	}
}


function remove(selectedRemove) {
	let rowToDelete = selectedRemove.parentElement.parentElement;
	let confirmationText= `Delete post titled "${rowToDelete.cells[0].innerHTML}" permanently?`
	if (confirm(confirmationText) == true) {
		localStorage.removeItem(rowToDelete.cells[0].innerHTML);
	}
	repopulateTable();
}
