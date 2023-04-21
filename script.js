const valeursCartes = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R'];
const couleursCartes = ['coeur', 'pique', 'carreau', 'trefle'];
const valeursNumeriques = {
  'A': 11,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'V': 10,
  'D': 10,
  'R': 10,
};
let cartesTirees = [];

function masquerBouton() {
  document.getElementById("bouton-commencer").style.display = "none";
}


function initialiserPartie() {
    let croupierCartes = [];
    let joueurCartes = [];
  
  let croupierCartesContainer = document.createElement("div");
  croupierCartesContainer.classList.add("croupier-container");
  document.body.appendChild(croupierCartesContainer);
  
  // Distribue 2 cartes au croupier
  for (let i = 0; i < 2; i++) {
    let valeur = choisirCarte();
    let couleur = choisirCouleur();
    croupierCartes.push({ valeur: valeur, couleur: couleur });

    let carte = document.createElement("img");
    carte.classList.add("card");
    if (i === 0) {
      carte.src = "cartes/dos-bleu.png"; // Carte face cachée
    } else {
      carte.src = "cartes/"+valeur+"-"+couleur+".png";
    }
    croupierCartesContainer.appendChild(carte);
  }
  let croupierText = document.createElement("h2");
  croupierText.innerText = "Cartes du croupier";
  croupierCartesContainer.appendChild(croupierText);

  let joueurCartesContainer = document.createElement("div");
  joueurCartesContainer.classList.add("joueur-container");
  document.body.appendChild(joueurCartesContainer);

  // Distribue 2 cartes au joueur
  for (let i = 0; i < 2; i++) {
    let valeur = choisirCarte();
    let couleur = choisirCouleur();
    joueurCartes.push({ valeur: valeur, couleur: couleur });

    let carte = document.createElement("img");
    carte.classList.add("card");
    carte.src = "cartes/"+valeur+"-"+couleur+".png";
    joueurCartesContainer.appendChild(carte);
  }

  let joueurText = document.createElement("h2");
  joueurText.innerText = "Cartes du joueur";
  joueurCartesContainer.appendChild(joueurText);
  
  console.log("Cartes du croupier : ", croupierCartes);
  console.log("Cartes du joueur : ", joueurCartes);

}

// Fonction pour choisir une carte aléatoire
function choisirCarte() {
  let cartes = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "V", "D", "R"];
  let index = Math.floor(Math.random() * cartes.length);
  let carte = cartes[index];
  
  // Vérifier si la carte a déjà été tirée
  if (cartesTirees.includes(carte)) {
    // Si oui, tirer une nouvelle carte
    return choisirCarte();
  } else {
    // Sinon, ajouter la carte aux cartes déjà tirées et la renvoyer
    cartesTirees.push(carte);
    return carte;
  }
}


// Fonction pour choisir une couleur aléatoire
function choisirCouleur() {
  let couleurs = ["coeur", "pique", "carreau", "trefle"];
  return couleurs[Math.floor(Math.random() * couleurs.length)];
}
