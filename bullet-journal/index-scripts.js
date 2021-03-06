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
            $('#exampleModal').modal('toggle');
            loadNotebooks();
            deleteNotebook();
        });
    });
};

//Pagination
const loadPages = () =>{
    $.get(baseUrl + 'notebooks/1', (response) => {
        const pages = response.pages;
        let fragment = document.createDocumentFragment();

        let previous = document.createDocumentFragment();
        $(previous).append('<li class="page-item"><button id="previou-button" class="page-link">Previous</button></li>');

        let next = document.createDocumentFragment();
        $(next).append('<li class="page-item"><button id="next-button" class="page-link">Next</button></li>');

        fragment.appendChild(previous);
        for(let i = 1; i <= pages; i++) {
            let link = document.createDocumentFragment();
            $(link).append('<li class="page-item"><button class="page-link">'+i+'</button></li>');
            fragment.appendChild(link);
        };
        fragment.appendChild(next);
        $('#pagination').append(fragment);
        loadPage();
    });
};

//Load page
const loadPage = () => {
    $('.page-link').click( function (e) {
        e.preventDefault();
        const pageNumber = this.innerHTML;

        $('#notebooks').html('');

        $.get(baseUrl + 'notebooks/'+ pageNumber, (response) => {
            $(response.notebooks).each( function() {
                    const name = this.name;
                    const id = this._id;
                    $('#notebooks').append(
                        '<div class="card-deck notebook-card">'+
                        '<div class="card" style="width: 10px;">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">'+ name + '</h5>' +
                        '<button type="button" class="btn btn-primary" id="notebook-button">Open</button>' +
                        '<button type="button" class="btn btn-danger delete-button" id="delete-notebook-button" data-id="'+ id +'">Delete</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
                }
            );
            deleteNotebook();
        });
    });
};

//Get created notebooks
const loadNotebooks = () => {
    $('#notebooks').html('LOADING...');
    $.get(baseUrl + 'notebooks/1', (response) => {
        $('#notebooks').html('');
        $(response.notebooks).each( function() {
                const name = this.name;
                const id = this._id;
                $('#notebooks').append(
                    '<div class="card-deck notebook-card">'+
                    '<div class="card" style="width: 10px;">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">'+ name + '</h5>' +
                    '<button type="button" class="btn btn-primary" id="notebook-button">Open</button>' +
                    '<button type="button" class="btn btn-danger delete-button" id="delete-notebook-button" data-id="'+ id +'">Delete</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        );
        deleteNotebook();
    });
    };

//Delete Button
const deleteNotebook = () => {
    $('.delete-button').click( function () {
            if(confirm('¿Eliminar cuaderno?')) {
                const id = $(this).attr('data-id');
                console.log(id);
                $.ajax({
                    method: "DELETE",
                    url: baseUrl + "notebook/" + id
                })
                    .done( function () {
                        alert("Data deleted");
                        loadNotebooks();
                    })
                    .fail( function (error) {
                        console.log(error);
                        alert('There was a problem trying to delete the notebook.');
                        loadNotebooks();
                    });
            }
        });
};


//Document ready method
$(document).ready( () => {
    createNotebookAction();
    loadNotebooks();
    loadPages();

});
