const enterText = () => {
    const button = $('#add-button');
    const input = $('#input-notes');
    const notes = $('#notes');
    button.click(function () {
        const enterNote = input[0].value;
        const fragment = $('<p></p>');
        fragment[0].innerText = enterNote;
        notes.append(fragment);
    });
};

$(document).ready(function () {
    enterText();
});
