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
let joueurCartes = [];
let croupierCartes = [];

function masquerBouton() {
  document.getElementById("bouton-commencer").style.display = "none";
  document.getElementById("bouton-tirer").style.display = "inline-block";
  document.getElementById("bouton-rester").style.display = "inline-block";
}

function recacherBouton(){
  document.getElementById("bouton-tirer").style.display = "none";
  document.getElementById("bouton-rester").style.display = "none";
  document.getElementById("bouton-recommencer").style.display = "inline-block";
}

function initialiserPartie() {
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

  let joueurPointsContainer = document.querySelector(".joueur-points");

  // Distribue 2 cartes au joueur
  for (let i = 0; i < 2; i++) {
    let valeur = choisirCarte();
    let couleur = choisirCouleur();
    joueurCartes.push({ valeur: valeur, couleur: couleur });

    let carte = document.createElement("img");
    carte.classList.add("card");
    carte.src = "cartes/"+valeur+"-"+couleur+".png";
    joueurCartesContainer.appendChild(carte);

    let totalPoints = calculerPoints(joueurCartes);
    joueurPointsContainer.innerText = "Points : "+totalPoints;
  }

  

  let joueurText = document.createElement("h2");
  joueurText.innerText = "Cartes du joueur";
  joueurCartesContainer.appendChild(joueurText);
  
  console.log("Cartes du croupier : ", croupierCartes);
  console.log("Cartes du joueur : ", joueurCartes);

  let croupierValeurMain = calculerPoints(croupierCartes);
  let joueurValeurMain = calculerPoints(joueurCartes);
  console.log("Valeur de la main du croupier : ", croupierValeurMain);
  console.log("Valeur de la main du joueur : ", joueurValeurMain);
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


function calculerPoints(cartes) {
  let totalPoints = 0;
  let nombreAs = 0;
  
  for (let i = 0; i < cartes.length; i++) {
    let valeur = cartes[i].valeur;
    totalPoints += valeursNumeriques[valeur];
    
    if (valeur === "A") {
      nombreAs++;
    }
  }
  
  // Traiter les As en tant que 1 si nécessaire
  while (nombreAs > 0 && totalPoints > 21) {
    totalPoints -= 10;
    nombreAs--;
  }
  
  return totalPoints;
}

function tirerCarte() {
  let joueurCartesContainer = document.querySelector(".joueur-container");
  let joueurPointsContainer = document.querySelector(".joueur-points");

  // Si le joueur a déjà perdu, on ne tire plus de carte
  if (joueurPointsContainer.innerText === "Perdu !") {
    return;
  }

  let valeur = choisirCarte();
  let couleur = choisirCouleur();
  let nouvelleCarte = { valeur: valeur, couleur: couleur };
  joueurCartes.push(nouvelleCarte);

  let carte = document.createElement("img");
  carte.classList.add("card");
  carte.src = "cartes/"+valeur+"-"+couleur+".png";
  joueurCartesContainer.appendChild(carte);

  let totalPoints = calculerPoints(joueurCartes);
  joueurPointsContainer.innerText = "Points : "+totalPoints;

  // Si le joueur a dépassé 21 points, il perd la partie
  if (totalPoints > 21) {
    joueurPointsContainer.innerText = "Perdu ! Vous avez dépassé 21";
    joueurPointsContainer.style.marginLeft="40%"; 
    document.getElementById("bouton-tirer").style.display = "none";
    document.getElementById("bouton-rester").style.display = "none";
    document.getElementById("bouton-recommencer").style.display = "inline-block";
    

    let carteCroupier = document.querySelector(".croupier-container .card:first-child");
    carteCroupier.src = "cartes/" + croupierCartes[0].valeur + "-" + croupierCartes[0].couleur + ".png";
  
    let croupierCartesContainer = document.querySelector(".croupier-container");
    let pointsCroupier = calculerPoints(croupierCartes);
    let croupierPointsText = document.createElement("h3");
    croupierPointsText.innerText = "Points du croupier: " + pointsCroupier;
    croupierCartesContainer.appendChild(croupierPointsText);
  
    let resultatText = document.createElement("h3");
  }
}

function Rester() {
  // Afficher la première carte du croupier
  let carteCroupier = document.querySelector(".croupier-container .card:first-child");
  carteCroupier.src = "cartes/" + croupierCartes[0].valeur + "-" + croupierCartes[0].couleur + ".png";

  let croupierCartesContainer = document.querySelector(".croupier-container");
  let pointsCroupier = calculerPoints(croupierCartes);
  let croupierPointsText = document.createElement("h3");
  croupierPointsText.innerText = "Points du croupier: " + pointsCroupier;
  croupierCartesContainer.appendChild(croupierPointsText);

  let resultatText = document.createElement("h3");

  if (pointsCroupier > calculerPoints(joueurCartes)){
    resultatText.style.marginLeft="33%"
    resultatText.innerText = "Vous avez perdu, le croupier a une meilleure main !";
  }
  else if(pointsCroupier == calculerPoints(joueurCartes)){
    resultatText.innerText = "C'est une égalité, aucun gagnant !";
  }
  else {
    resultatText.style.marginLeft="36%"
    resultatText.innerText = "Félicitations, vous avez battu le croupier !";
  }

  document.body.appendChild(resultatText);
}

function recommencerPartie(){
  location.reload();
}