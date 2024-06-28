let currentMoleTile;
let currentPlantTile;
let score = 0;
let level = 1;
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
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if(currentMoleTile) {
    currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./src/monty-mole.png";
    let num = getRandomTile();
    if(currentPlantTile && currentPlantTile.id === num) {
        return;
    }
    currentMoleTile = document.getElementById(num);
    currentMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if(currentPlantTile) {
        currentPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./src/piranha-plant.png";
    let num = getRandomTile();
    if (currentMoleTile && currentMoleTile.id === num) {
        return;
    }
    currentPlantTile = document.getElementById(num);
    currentPlantTile.appendChild(plant);
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
        if (score >= 30) {
            gameOver = true;
            document.getElementById("game-board").classList.add("level-two");
            document.getElementById("game-board").innerHTML = "<h2>LEVEL 2</h2>";
            setTimeout(nextLevel, 3000);
        }
    } else if (this === currentPlantTile) {
        currentPlantTile.firstChild.style.backgroundColor = "red";
        currentPlantTile.firstChild.style.borderRadius = "50%";
        currentPlantTile.firstChild.style.border = "1px solid black";
        document.getElementById("score").innerText = "GAME OVER " + "\n" + `Your Score: ${score.toString()}`;
        document.getElementById("score").style.color = "red";
        gameOver = true;
        restartButton.style.display = "block";
    }
}

function nextLevel () {
    location.reload();
}

restartButton.addEventListener("click", function() {
    location.reload();
});
