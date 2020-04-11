const enterText = () => {
    const button = $('#add-button');
    const input = $('#input-notes');
    const notes = $('#notes');
    const todo = $('#todo-list');

    button.click(function () {
        const enterNote = input[0].value;
        const regEx = /#[A-Za-z].*/gm;
        if (regEx.test(enterNote)){
            const fragment = $('<li></li>');
            fragment[0].innerText = enterNote;
            todo.append(fragment);
            input[0].value = "";
        }else{
            const fragment = $('<p></p>');
            fragment[0].innerText = enterNote;
            notes.append(fragment);
            input[0].value = "";
        }
    });
};

$(document).ready(function () {
    enterText();
});
