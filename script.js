console.log("Script is loaded");

// function to shuffle the paired cards
//makes new pairs after reload
function shuffleArray(arrayValue) {
  for (let u = arrayValue.length - 1; u > 0; u--) {
    const j = Math.floor(Math.random() * (u + 1));
    [arrayValue[u], arrayValue[j]] = [arrayValue[j], arrayValue[u]];
  }
}
//a function to create a pair for each element for reusability
function Pairingarray(CardVal) {
  const pairedCards = [];
  CardVal.forEach((ValueOnCard) => {
    pairedCards.push(ValueOnCard, ValueOnCard);
  });
  return pairedCards;
}

document.addEventListener("DOMContentLoaded", () => {
  const gameboard = document.getElementById("game-board");
  const cardsValue = ["A", "B", "C", "D", "E", "F", "G", "H"];
  //can hardcode second elements but function is more convinient
  const cardsElement = Pairingarray(cardsValue);
  shuffleArray(cardsElement);

  // using this methords helps to avoid hardcode each card value on the html code
  cardsElement.forEach((Value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = ` 
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${Value}</div>
      </div> `;
    gameboard.appendChild(card);
  });
  let flippedCards = []; // array to store flipped cards
  // waits for a click to flip card
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      if (flippedCards.length === 2) return; // prevent flipping more cards
      card.classList.toggle("flip");
      flippedCards.push(card); // adding flipped cards to the array
      //making sure only two cards are opened per time
      if (flippedCards.length === 2) {
        const flippedcard1 = flippedCards[0];
        const flippedcard2 = flippedCards[1];

        //checking for a pair
        if (
          flippedcard1.querySelector(".card-back").textContent ===
          flippedcard2.querySelector(".card-back").textContent
        ) {
          flippedCards = []; //if pair keep open
        } else {
          // if not pair flip with a timer
          setTimeout(() => {
            flippedcard1.classList.remove("flip");
            flippedcard2.classList.remove("flip");
            flippedCards = []; // this will clear the array of flipped cards
          }, 1000);
        }
      }
    });
  });
});
