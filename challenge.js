// listen for document loading 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    listenButton();
});
// start the counter and display in 1 second increments

let counter = document.getElementById("counter")

let interval = null;  
let seconds = 0;  

function incrementSeconds() {
    seconds += 1;
    counter.innerText = seconds;
}

function startTimer(func, time) {
    interval = setInterval(incrementSeconds, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

const buttonPlus = document.getElementById("+")
const buttonMinus = document.getElementById("-")
const buttonLike = document.getElementById("<3")
const buttonPause = document.getElementById("pause")
const buttonSubmit = document.getElementById("submit")
const buttons = [buttonPlus, buttonMinus, buttonLike, buttonPause, buttonSubmit]
const buttonsDisable = [buttonPlus, buttonMinus, buttonLike, buttonSubmit]

const likes = document.querySelector('.likes')
let likesTotal = {}

function listenButton() {
    startTimer()
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let time = parseInt(counter.innerText)
            switch(e.target.id) {
                case `-`:
                    seconds = time - 1
                    counter.innerText = seconds
                    // create function to increment second display
                    break;
                case `+`:
                    seconds = time + 1
                    counter.innerText = seconds
                    // create function to increment display
                    break;
                case `<3`:
                    // create a like function
                    let likes = document.querySelector('.likes')

                    if (counter.innerText in likesTotal) {
                        create()
                    } else {
                        likesTotal[counter.innerText] = 1
                        li = document.createElement("li")
                        li.id = counter.innerText
                        li.innerText = `${counter.innerText} has been liked ${likesTotal[counter.innerText]} times.`
                        likes.appendChild(li)
                    }
                    break;
                case 'pause':
                    if(buttonPause.innerText === "resume") {
                        enable()
                        this.innerText = "pause"
                        startTimer() 
                    } else {
                        disable()
                        stopTimer()
                        this.innerText = "resume"
                    }
                    break;
                case 'submit':
                    e.preventDefault()
                    commentInput = document.querySelector("input")
                    commentList = document.getElementsByClassName("comments")
                    commentP = document.createElement('p')
                    text = commentInput.value
                    commentP.innerText = text
                    commentList[0].append(commentP)
                    commentInput.value = ""
                    break;
            }
        })
    })
}

const disable = function() {
    buttonsDisable.forEach(function(button) {
        button.disabled = true
    })
}

const enable = function() {
    buttonsDisable.forEach(function(button) {
        button.disabled = false 
    })
}

const create = function() {
    // remove all children 
    allLi = likes.querySelectorAll('li')

    allLi.forEach(function(li) {
        likes.removeChild(li)
    })

    likesTotal[counter.innerText] += 1;

    Object.keys(likesTotal).forEach(function(key) {
        li = document.createElement("li")
        li.id = counter.innerText
        li.innerText = `${key} has been liked ${likesTotal[key]} times.`
        likes.appendChild(li)
      });
}
