const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const noteList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllButton = document.querySelector("#clear-all-button");

let notes = [];

function render(searchTerm = "") {
    noteList.textContent = "";

    const search  = searchTerm.toLowerCase();

    const filteredNotes = notes.filter((note) => 
        note.text.toLowerCase().includes(search)
);

    if (filteredNotes.length === 0 && search !== "") {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        noteList.appendChild(message);
        return;
    }
    filteredNotes.forEach((note) => {

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

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () =>
        {
            notes = notes.filter((item) => item.id !== note.id);
            saveNotes();
            render();
            updateCount();
        });

        listItem.append(noteText, category, createdAt, deleteButton);

        noteList.appendChild(listItem);
    });
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    saveNotes();
    render();
    updateCount();
    noteInput.value = "";
});

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

const savedNotes = localStorage.getItem("notes");

if (savedNotes !== null ) {
    notes = JSON.parse(savedNotes);
}

render();
updateCount();

searchInput.addEventListener("input", () => {
    render(searchInput.value);
});

clearAllButton.addEventListener("click", () => {
    const confirmed = confirm("Delete all notes?");

    if (!confirmed) {
        return;
    }

    notes = [];
    saveNotes();
    render();
    updateCount();
});
