let currentMoleTile;
let currentPlantTile1;
let currentPlantTile2;
let currentPlantTile3;
let previousMoleTile;
let previousPlantTile1;
let previousPlantTile2;
let previousPlantTile3;
let score = 0;
let gameOver = false;

let restartButton = document.getElementById("restart");

window.onload = function start() {
    document.getElementById("score").innerText = "Score: 0";
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i += 1) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("game-board").appendChild(tile);
    }

    setInterval(setMole, 1000);
    setInterval(setPlant1, 2000);
    setInterval(setPlant2, 2000);
    setInterval(setPlant3, 2000);
}

function getRandomTile(excludeTiles = []) {
    let num;
    do {
        num = Math.floor(Math.random() * 9).toString();
    } while (excludeTiles.includes(num));
    return num;
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./src/monty-mole.png";
    let num = getRandomTile([currentPlantTile1?.id, currentPlantTile2?.id, currentPlantTile3?.id, previousMoleTile]);
    previousMoleTile = num;
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant1() {
    if (gameOver) {
        return;
    }
    if (currentPlantTile1) {
        currentPlantTile1.innerHTML = "";
    }

    let plant1 = document.createElement("img");
    plant1.src = "./src/piranha-plant.png";
    let num = getRandomTile([currentMoleTile?.id, currentPlantTile2?.id, currentPlantTile3?.id, previousPlantTile1]);
    previousPlantTile1 = num;
    currentPlantTile1 = document.getElementById(num);
    currentPlantTile1.appendChild(plant1);
}

function setPlant2() {
    if (gameOver) {
        return;
    }
    if (currentPlantTile2) {
        currentPlantTile2.innerHTML = "";
    }

    let plant2 = document.createElement("img");
    plant2.src = "./src/piranha-plant.png";
    let num = getRandomTile([currentMoleTile?.id, currentPlantTile1?.id, currentPlantTile3?.id, previousPlantTile2]);
    previousPlantTile2 = num;
    currentPlantTile2 = document.getElementById(num);
    currentPlantTile2.appendChild(plant2);
}

function setPlant3() {
    if (gameOver) {
        return;
    }
    if (currentPlantTile3) {
        currentPlantTile3.innerHTML = "";
    }

    let plant3 = document.createElement("img");
    plant3.src = "./src/piranha-plant.png";
    let num = getRandomTile([currentMoleTile?.id, currentPlantTile1?.id, currentPlantTile2?.id, previousPlantTile3]);
    previousPlantTile3 = num;
    currentPlantTile3 = document.getElementById(num);
    currentPlantTile3.appendChild(plant3);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currentMoleTile) {
        currentMoleTile.firstChild.style.backgroundColor = "lightgreen";
        currentMoleTile.firstChild.style.borderRadius = "50%";
        currentMoleTile.firstChild.style.border = "1px solid black";
        score += 10;
        document.getElementById("score").innerText = `Score: ${score.toString()}`;
    } else if (this === currentPlantTile1 || this === currentPlantTile2 || this === currentPlantTile3) {
        this.firstChild.style.backgroundColor = "red";
        this.firstChild.style.borderRadius = "50%";
        this.firstChild.style.border = "1px solid black";
        document.getElementById("score").innerText = "GAME OVER " + "\n" + `Your Score: ${score.toString()}`;
        document.getElementById("score").style.color = "red";
        gameOver = true;
        restartButton.style.display = "block";
    }
}

restartButton.addEventListener("click", function() {
    location.reload();
});