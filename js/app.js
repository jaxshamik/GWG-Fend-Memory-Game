//Modal tutorial https://www.w3schools.com/howto/howto_css_modals.asp
/*
 * Create a list that holds all of your cards
 */
let cardArray = [];
let elapsed = '0';
let count = 0;
let classArray = ['badminton','badminton','football','football','bowling','bowling','puck','puck','soccer','soccer','tennis','tennis','curling','curling','basketball','basketball'];
let min = Math.floor(elapsed / 60);
let sec = elapsed - min * 60;
let timeSec = sec;
let timeMin = min;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*Shuffle function from http://stackoverflow.com/a/2450976
*   - reset function
*/
$(".restart").click(function() {
    window.location.reload(true);
});

$(".replay").click(function() {
    window.location.reload(true);
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
    }
    return array;
}
shuffle(classArray);
$(classArray).each(
    function() {
        $('.deck').append(`<li class="card"><div id="card-image" class= ${this} ></div></li>`);
    }
);
//end Reset function
//display card's symbol
$("li").each(function() {
       if (cardArray.length <= 2 ) {
        let $card = $( this );
        $card.click(function() {
            $card.toggleClass("show", "open" );
            $card.toggleClass("freeze");
            cardArray.push( this );
            console.log(cardArray);
            openCard();
            cardsMatched();
        });
    }
});
//Allows only 2 cards to be flipped and not closed
 function openCard() {
    if(cardArray.length === 2) {
        $(".deck li").addClass("freeze");
        moves();
//compares cards for match
    if(cardArray[0].firstChild.className === cardArray[1].firstChild.className) {
        cardArray[0].classList.add("animated", "tada");
        cardArray[1].classList.add("animated", "tada");
        doMatch();
   }
        else {
            cardArray[0].classList.add("animated", "wobble");
            cardArray[1].classList.add("animated", "wobble");
            noMatch();
       }
   }
}
//Cards match
function doMatch() {
    cardArray[0].classList.remove("show", "open");
    cardArray[1].classList.remove("show", "open");
    cardArray[0].classList.add("match", "freeze");
    cardArray[1].classList.add("match", "freeze");
    $(".deck li").removeClass("freeze");
    cardArray = [];
}
//Cards do not match
function noMatch(){
    setTimeout(function() {
        cardArray[0].classList.remove("animated", "wobble","show", "open", "freeze", "match");
        cardArray[1].classList.remove("animated", "wobble","show", "open", "freeze", "match");
        $(".deck li").removeClass("animated", "wobble","freeze");
        $(".deck li").removeClass("freeze");
        cardArray = [];
    },1000);
}
// count moves
function moves(){
    count++;
    $(".moves").html(`${count} Moves`);
    stars();
    if(count == 1){
 //Timer       
        function totalTime() {
            let timer = setInterval(totalTime, 1000);
            let t = new Date().getTime() - startTime;
            elapsed = Math.floor(t / 1000);
            if(Math.round(elapsed) == elapsed){
                elapsed += '.0';
            }
            let min = Math.floor(elapsed / 60);
            let sec = elapsed - min * 60;
            if(sec < 10){
                timeSec = "0" + sec;
            } else {
                timeSec = sec;
            }
            if(min < 10){
                timeMin = "0" + min;
            } else {
                timeMin = min;
            }
            let timeElapsed = timeMin + ":" + timeSec;
            $(".time").html(`Time Used ${timeElapsed}`);
        }
        let startTime = new Date().getTime();
            totalTime();
    }
}
//Scoring function
function stars() {
    if (count === 16 || count === 24)
    $("ul:first :last-child").remove();
}


//If all cards turned pop up Modal
function cardsMatched() {
    let matched = document.getElementsByClassName("match");
    matched.length;
        if  (matched.length === 16) {
            clearInterval(timer);
            statsModal();
    }
}
// Modal function
function statsModal() {
    let modal = document.getElementById('myModal');
    modal.style.display = "block";
    let finalScore = document.getElementsByClassName("star");
    if (finalScore.length < 2) {
        $("#score").html(`Your Score is ${finalScore.length} star.`);
    } else {
        $("#score").html(`Your Score is ${finalScore.length} stars.`);
    }
    let finalCount = document.getElementsByClassName("moves")["0"].textContent;
    $("#moves").text(`Your final Count is ${finalCount}`);
    let finalTime = document.getElementsByClassName("time")["0"].textContent;
    $("#time").text(finalTime);
    console.log(finalCount);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
