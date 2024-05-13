let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function(){
    startGame();
}

function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];  // 0-5.99 
}

function startGame(){
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
            // <img id = "0-0" src = "./Images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./Images/" + randomCandy() + ".png";

            // Drag & Drop Functionality
            tile.addEventListener("dragstart", dragStart);  // Click on a Candy, Initialize Drag Process
            tile.addEventListener("dragover", dragOver);  // Clicking on Candy, Moving Mouse to Drag the Candy
            tile.addEventListener("dragenter", dragEnter);  // Dragging Candy onto Another Candy
            tile.addEventListener("dragleave", dragLeave);  // Leave Candy over Anoter Candy
            tile.addEventListener("drop", dragDrop);  // Dropping a Candy over Another Candy
            tile.addEventListener("dragend", dragEnd);  // After Drag Process Completed, We Swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart(){
    // this refers to Tile that we Clicked on for Dragging
    currTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
}

function dragDrop(){
    // this refers to the Target that was Dropped on 
    otherTile = this;
}

function dragEnd(){
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
}