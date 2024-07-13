var board = [[0,0,0],[0,0,0],[0,0,0]];
var p1 = "X";
var p2 = "O";
var setting = 0;
var player = 1;
var token = ["", "X", "O"];
var internalToken = [0, 1, -1];

class Player{
    //bot
    constructor(name){
        this.name = name;
        this.type = "bot";
    }



    getMoves(){
        ;
    }

    myTurn(){
        this.getMoves();
        updateBoard(0, 0, this);
    }
}

class Human{
    //human
    constructor(name){
        this.name = name;
        this.type = "human";
    }

    getMoves(){
        ;
    }

    myTurn(){
        ;
    }
}


function setup(){
    var i, j;
    for (i=0 ; i<3; i++){
        for (j=0; j<3; j++){
            board[i][j]=0;
        }
    }
    clearBoard();
    enableCells();
    player = 1;
    showHeading("It is player 1's turn!")
}

function showInfo(info){
    document.getElementById("announcementid").textContent=info;
    //document.getElementById("announcementid").value=info;
}

function showHeading(info){
    document.getElementById("headingid").textContent = info;
}

function updateBoard(x, y, player){
    var id;
    if (board[x][y]!=0){
        //reject.
        showInfo("This box has already been selected. Please choose another box.");
        return -1;
    }
    else{
        //accept.
        id = "b"+x+y;
        document.getElementById(id).value = token[player];
        if (token[player] == 'X'){
            document.getElementById(id).style.color = "red";
        }else{
            document.getElementById(id).style.color = "blue";
        }
        board[x][y] = internalToken[player];
    }
    if (checkWinner()==0){
        nextPlayer();
    }

    return 0;
}





function enableCells(){
    //var cells = document.getElementsByClassName("cell");
    var i, j, id;
    for (i=0; i<3; i++){
        for (j=0; j<3; j++){
            id = "b"+i+j;
            showInfo(id);
            document.getElementById(id).setAttribute.disabled = false;
            document.getElementById(id).style.background="lightblue";
        }
    }
}

function disableCells(){
    //var cells = document.getElementsByClassName("cell");
    var i, j, id;
    for (i=0; i<3; i++){
        for (j=0; j<3; j++){
            id = "b"+i+j;
            showInfo(id);
            document.getElementById(id).setAttribute.disabled = true;
            document.getElementById(id).style.background="#999";
        }
    }
}

function clearBoard(){
    var i, j, id;
    for (i=0; i<3; i++){
        for (j=0; j<3; j++){
            id = "b"+i+j;
            showInfo(id);
            document.getElementById(id).value = ('');
        }
    }
}

function testFill(){
    //window.alert("sometext");
    showInfo("hello");
    var cells = document.getElementsByClassName("cell");
    showInfo(cells);
    var i, j, id;
    for (i=0; i<3; i++){
        for (j=0; j<3; j++){
            id = "b"+i+j;
            showInfo(id);
            document.getElementById(id).value = ('X');
            //document.getElementById(id).style.color = "blue";
        }
    }
}

function playerWins(player){
    //note:LOCAL player!
    showHeading("Player "+player+" wins!\nPress the reset button to play a new game")
    disableCells();

}
function draw(){
    showHeading("Draw!\nPress the reset button to play a new game");
    disableCells();
}

function checkWinner(){
    var i, j, s;
    for (i=0; i<3; i++){
        s = 0;

        //horizontal
        for (j=0; j<3; j++){
            s = s + board[i][j];
        }
        if (s==3){
            playerWins(1);
            return 1;
        }else if (s==-3){
            playerWins(2);
            return 1;
        }
        
    }
    for (i=0; i<3; i++){
        s = 0;

        //vertical
        for (j=0; j<3; j++){
            s = s + board[j][i];
        }
        if (s==3){
            playerWins(1);
            return 1;
        }else if (s==-3){
            playerWins(2);
            return 1;
        }
        
    }
    //diagonal
    s = board[0][0] + board[1][1] + board[2][2];
    if (s==3){
        playerWins(1);
        return 1;
    }else if (s==-3){
        playerWins(2);
        return 1;
    }
    //other diagonal
    s = board[0][2] + board[1][1] + board[2][0];
    if (s==3){
        playerWins(1);
        return 1;
    }else if (s==-3){
        playerWins(2);
        return 1;
    }

    s = 1;
    for (i=0; i<3; i++){
        for (j=0; j<3; j++){
            if (board[i][j]==0){
                s = 0;
            }
        }
    }
    if (s==1){
        draw();
        return 1;

    }
    return 0;
}

function nextPlayer(){
    //assume pvp now

    player = 3 - parseInt(player);
    showInfo("player = "+player);
    showHeading("It is player "+player+"\'s turn!")
}

function buttonClick(r, c){
    showInfo(r.toString() + " " +c.toString()+" "+player);
    updateBoard(r, c, player);
}