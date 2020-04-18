const baseUrl = "http://localhost:4000/api/v1/";

//New Notebook Modal
const createNotebookAction = () => {
    $('#exampleModal').on('show.bs.modal', function (event) {
        const submit = $('#createNotebook');
        submit.click(() => {
            const input = $('#notebook-name');
            const name = input[0].value;
            $.post(baseUrl+'notebook', {name: name}, (response) => {
                console.log(response);
            }, 'JSON');
        });
    });
};

//Get created notebooks
const loadNotebooks = () => {
    $.get(baseUrl + 'notebooks/1', (response) => {
        $(response.notebooks).each( () => {
                console.log(this.name);
            });
    });
    };


//Document ready method
$(document).ready( () => {
    createNotebookAction();
    loadNotebooks();
});
