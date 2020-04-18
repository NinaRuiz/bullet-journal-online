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

//Pagination
const loadPages = () =>{
    $.get(baseUrl + 'notebooks/1', (response) => {
        const pages = response.pages;
        let fragment = document.createDocumentFragment();

        let previous = document.createDocumentFragment();
        $(previous).append('<li class="page-item"><a class="page-link" href="#">Previous</a></li>');

        let next = document.createDocumentFragment();
        $(next).append('<li class="page-item"><a class="page-link" href="#">Next</a></li>');

        fragment.appendChild(previous);
        for(let i = 1; i <= pages; i++) {
            let link = document.createDocumentFragment();
            $(link).append('<li class="page-item"><a class="page-link" href="#">'+i+'</a></li>');
            fragment.appendChild(link);
        };
        fragment.appendChild(next);
        $('#pagination').append(fragment);
    });
};

//Get created notebooks
const loadNotebooks = () => {
    $.get(baseUrl + 'notebooks/1', (response) => {
        $(response.notebooks).each( function() {
                const name = this.name;
                $('#notebooks').append(
                    '<div class="card-deck notebook-card">'+
                    '<div class="card" style="width: 10px;">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">'+ name + '</h5>' +
                    '<button type="button" class="btn btn-primary" id="notebook-button">Open</button>' +
                    '<button type="button" class="btn btn-danger" id="delete-notebook-button">Delete</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        );
    });
    };


//Document ready method
$(document).ready( () => {
    createNotebookAction();
    loadNotebooks();
    loadPages();
});
