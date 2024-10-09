// JavaScript for typing and erasing words
const words = ["Live Feed", "Charting", "Heatmaps", "News", "Calendar"];
const typingSpeed = 100; // Speed of typing
const erasingSpeed = 50; // Speed of erasing
const newWordDelay = 2000; // Delay before starting to erase

let currentIndex = 0;

function typeWord(word, callback) {
    let index = 0;
    const element = document.getElementById("typewriter-text");
    element.textContent = ''; // Clear any existing text
    
    function type() {
        if (index < word.length) {
            element.textContent += word.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(callback, newWordDelay);
        }
    }
    
    type();
}

function eraseWord(callback) {
    const element = document.getElementById("typewriter-text");
    
    function erase() {
        if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(erase, erasingSpeed);
        } else {
            callback();
        }
    }
    
    erase();
}

function cycleWords() {
    eraseWord(() => {
        currentIndex = (currentIndex + 1) % words.length;
        typeWord(words[currentIndex], cycleWords);
    });
}

// Start typing the first word
typeWord(words[currentIndex], cycleWords);