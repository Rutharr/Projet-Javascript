function startGame() {
    deck = shuffleDeck(createDeck());
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    playerScore = calculateHand(playerHand);
    dealerScore = calculateHand(dealerHand);
    renderGame();
  }

  document.addEventListener('DOMContentLoaded', function() {
    startGame();
  });


let deck = [];
      const suits = ["coeur", "pique", "trefle", "carreau"];
      const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R","A" ];
      let dealerHand = [];
      let playerHand = [];
      let dealerScore = 0;
      let playerScore = 0;

      // Functions
      function createDeck() {
        deck = [];
        for (let i = 0; i < suits.length; i++) {
          for (let j = 0; j < values.length; j++) {
            let card = {
              suit: suits[i],
              value: values[j]
            };
            deck.push(card);
          }
        }
        shuffleDeck(deck);
        return deck;
      }
      

      function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = deck[i];
          deck[i] = deck[j];
          deck[j] = temp;
        }
      }

      function getCardImageUrl(card) {
        return `cartes/${card.value}-${card.suit}.png`;
      }

      function dealCards() {
        dealerHand = [getNextCard(), getNextCard()];
        playerHand = [getNextCard(), getNextCard()];
        dealerScore = calculateScore(dealerHand);
        playerScore = calculateScore(playerHand);
      }
      
      function renderGame() {
        dealerHandElement.innerHTML = '';
        playerHandElement.innerHTML = '';
        
        // Ajouter les cartes du croupier
        for (let i = 0; i < dealerHand.length; i++) {
          let cardElement = document.createElement("img");
          cardElement.setAttribute("src", getCardImageUrl(dealerHand[i]));
          cardElement.setAttribute("class", "card");
          dealerHandElement.appendChild(cardElement);
        }
        
        // Ajouter les cartes du joueur
        for (let i = 0; i < playerHand.length; i++) {
          let cardElement = document.createElement("img");
          cardElement.setAttribute("src", getCardImageUrl(playerHand[i]));
          cardElement.setAttribute("class", "card");
          playerHandElement.appendChild(cardElement);
        }
        
        if (playerScore < 21) {
          hitButton.style.display = "inline-block";
        }
        
        standButton.style.display = "inline-block";
      }
      
      
      function getNextCard() {
        return deck.shift();
      }

      function calculateScore(hand) {
        let score = 0;
        let hasAce = false;
        for (let i = 0; i < hand.length; i++) {
          let cardValue = hand[i].value;
          if (cardValue === "A") {
            hasAce = true;
          }
          score += getCardNumericValue(cardValue);
        }
        if (hasAce && score + 10 <= 21) {
          score += 10;
        }
        return score;
      }

      function getCardNumericValue(value) {
        switch(value) {
          case "A":
            return 1;
          case "02":
            return 2;
          case "03":
            return 3;
          case "04":
            return 4;
          case "05":
            return 5;
          case "06":
            return 6;
          case "07":
            return 7;
          case "08":
            return 8;
          case "09":
            return 9;
          default:
            return 10;
        }
      }

      function playerTurn() {
        let card = getNextCard();
        playerHand.push(card);
        playerScore = calculateScore(playerHand);
        renderGame();
        if (playerScore > 21) {
          endGame();
        }
      }

      function endGame() {
        if (playerScore > 21) {
          endMessage("Vous avez dépassé 21. Le croupier a gagné !");
        } else if (dealerScore > 21) {
          endMessage("Le croupier a dépassé 21. Vous avez gagné !");
        } else if (playerScore > dealerScore) {
          endMessage("Vous avez gagné !");
        } else if (dealerScore > playerScore) {
          endMessage("Le croupier a gagné !");
        } else {
          endMessage("Match nul !");
        }
      
        dealButton.style.display = "inline-block";
        hitButton.style.display = "none";
        standButton.style.display = "none";
      }
      
      function endMessage(message) {
        let messageElem = document.createElement("div");
        messageElem.textContent = message;
        messageElem.style.color = "white";
        messageElem.style.fontSize = "30px";
        messageElem.style.fontWeight = "bold";
        messageElem.style.textAlign = "center";
        messageElem.style.marginTop = "20px";
        blackjackTable.appendChild(messageElem);
      }
      
      // Select the elements
const blackjackTable = document.querySelector('#blackjack-table');
const dealerHandElement = document.getElementById("dealer-hand");
const playerHandElement = document.getElementById("player-hand");
const deckElement = document.querySelector('#deck');

// Create buttons
const dealButton = document.createElement('button');
dealButton.textContent = 'Distribuer';
const hitButton = document.createElement('button');
hitButton.textContent = 'Carte';
const standButton = document.createElement('button');
standButton.textContent = 'Rester';

// Add buttons to the document
blackjackTable.appendChild(dealerHandElement);
blackjackTable.appendChild(playerHandElement);
blackjackTable.appendChild(dealButton);
blackjackTable.appendChild(hitButton);
blackjackTable.appendChild(standButton);
blackjackTable.appendChild(deckElement);
