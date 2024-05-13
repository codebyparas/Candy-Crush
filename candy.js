let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function(){
    startGame();
    window.setInterval(function(){
        crushCandy();
    }, 100);
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
    let currCoords = currTile.id.split("-");  // id = "0-0" -> ["0","0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }
}

function crushCandy(){
    // crushFive()
    // crushFour()
    crushThree();
}

function crushThree(){
    // Check Rows
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./Images/blank.png";
                candy2.src = "./Images/blank.png";
                candy3.src = "./Images/blank.png";
            }
        }
    }

    // Check Columns
    for(let c = 0; c < columns; c++){
        for(let r = 0; r < rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./Images/blank.png";
                candy2.src = "./Images/blank.png";
                candy3.src = "./Images/blank.png";
            }
        }
    }
}