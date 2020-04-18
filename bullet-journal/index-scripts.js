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
                $('#notebooks').append(
                    '<div class="card-deck notebook-card">'+
                    '<div class="card" style="width: 10px;">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">Testing</h5>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
            });
    });
    };


//Document ready method
$(document).ready( () => {
    createNotebookAction();
    loadNotebooks();
});
