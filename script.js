
const colorBox = document.getElementById("color");
const generateButton = document.getElementById("generate");
const saveButton = document.getElementById("save");
const colorCode = document.getElementById("color-code");
const savedColorList = document.getElementById("saved-color-list");

generateButton.addEventListener("click", generateRandomColor);
saveButton.addEventListener("click", saveColor);

window.addEventListener("load", loadSavedColors);

function generateRandomColor() {
    const randomColor = getRandomColor();
    colorBox.style.backgroundColor = randomColor;
    colorCode.textContent = randomColor;
}

function saveColor() {
    const currentColor = colorCode.textContent;
 
    let savedColors = localStorage.getItem("savedColors");
    savedColors = savedColors ? JSON.parse(savedColors) : [];
    savedColors.push(currentColor);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));

    appendColorToList(currentColor);

}

function loadSavedColors(){
    let savedColors = localStorage.getItem("savedColors");
    savedColors = savedColors ? JSON.parse(savedColors) : [];

    savedColors.forEach((color) => {
        appendColorToList(color);
    });
}

function appendColorToList(color){
    const colorElement = document.createElement("div");
    colorElement.style.backgroundColor = color;
    colorElement.textContent = color;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "\u00d7";
    deleteButton.addEventListener("click", function () {
        savedColorList.removeChild(colorElement);

        let savedColors = localStorage.getItem("savedColors");
        savedColors = savedColors ? JSON.parse(savedColors) : [];
        const updatedColors = savedColors.filter((c) => c !== color);
        localStorage.setItem("savedColors", JSON.stringify(updatedColors));
    });

    colorElement.appendChild(deleteButton);
    savedColorList.appendChild(colorElement);
}


function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


generateRandomColor();
