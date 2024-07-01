import { WORDS } from "./words.js";


const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

console.log(rightGuessString) // log 

function init_board() {
    const game = document.getElementById("game")

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")

        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter"
            row.appendChild(box)
        }

        game.appendChild(row)
    }
}

init_board()

document.addEventListener("keydown", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        delete_letter();
        return;
    }

    if (pressedKey === "Enter") {
        check_guess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter (pressedKey) {
    if (nextLetter === 5) {
        return;
    }
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function check_guess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        toastr.error("Введены не все буквы!");
        return;
    }
    if (!WORDS.includes(guessString)) {
        toastr.error("Такого слова нет в списке!")
        return;
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = "#"
        }

        box.style.backgroundColor = letterColor;
    }
    if (guessString === rightGuessString) {
        alert("Вы выиграли!")
        guessesRemaining = 0;
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert("У вас не осталось попыток. Вы проиграли!");
            alert(`Загаданное слово: "${rightGuessString}"`)
        }
    }
}

function delete_letter() {
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
        let box = row.children[nextLetter - 1]
        box.textContent = ""
        box.classList.remove("filled-box")
        currentGuess.pop()
        nextLetter -= 1
}