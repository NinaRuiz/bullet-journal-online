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
const getNotebooks = () => {
    $.get(baseUrl + 'notebooks', (response) => {

    });
};


//Document ready method
$(document).ready( () => {
    createNotebookAction();

});
