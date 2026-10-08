const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const noteList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function render() {
    noteList.textContent = "";

    notes.forEach((note) => {
        const listItem = document.createElement("li");

        listItem.classList.add(
            "note-card",
            `category-${note.category}`
        );

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const category = document.createElement("span");
        category.textContent = note.category;

        const createdAt = document.createElement("small");
        createdAt.textContent = note.createdAt;

        listItem.append(noteText, category, createdAt);

        noteList.appendChild(listItem);
    });
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
        id: Date.now(),
        text: noteInput.value,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    render();
});