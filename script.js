const gameboard=(()=>{
    let board=[];

    function createBoard(){
        board=[`_`,`_`,`_`,`_`,`_`,`_`,`_`,`_`,`_`,]
    }
    createBoard();

    function placeMarker(position,marker){
        if (0>position || position>=9){
            console.error("enter postion between 0 to 8"); 
            return; 
        }
            board[position]=`${marker}`;
        
    }

    function reset(){
        createBoard();
    }
    function getBoard(){
        return board;
    }

    return{getBoard,placeMarker,reset}

})();

function createPlayer(playerName,marker){
    return {playerName,marker}
}

const player1=createPlayer(`vishii`,`x`);
const player2=createPlayer(`chikipiki`,`o`)

function gameController(player1,player2,currentPlayer){

    let board=gameboard.getBoard();
    let gameOver=false;
    let winner=null;
    let tie=null;


     const winningPatterns=[ [0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6]
                        ]

    function tieDetection(){
        if(!winner && !(board.includes(`_`))){
            return true;
        }
        return false;
    }

     function resetGame(){
        currentPlayer=player1;
        gameOver=false;
        winner=null;
        tie=null;
        gameboard.reset();
        console.error(`Resettting Game`);
        
        board=gameboard.getBoard()
    }


    function checkWinner(){
        for (let i in winningPatterns){
            const currentPattern=winningPatterns[i];
            const a=currentPattern[0];
            const b=currentPattern[1];
            const c=currentPattern[2];
             if (board[a]!=`_` && board[a]===board[b] && board[b]===board[c]){
            return currentPlayer;
            }
        }
        return false;
        
    }


    function playRound(position){

        if (gameOver){
            console.log(`game over`);
            // stop it for the meantime
            //resetGame();
            return ;
        }

        if (board[position]!=`_`){
            console.error("overwrite is not allowed");
            return;
        }
        console.log(`The current Player is : `,currentPlayer.playerName);
        gameboard.placeMarker(position,currentPlayer.marker);
        winner=checkWinner();
        tie=tieDetection();
        if (tie){
            console.log(`its a tie babe`);
            gameOver=true;
            return;
            
        }
        if (winner){
            console.log(gameboard.getBoard());
            console.log(`The winner is ${winner.playerName}`);
            gameOver=true;
            return;
        }
        if (currentPlayer===player1){
        currentPlayer=player2
        }
        else currentPlayer=player1;
        console.log(`The next Player is : `,currentPlayer.playerName);
        console.log(gameboard.getBoard());
        
    }
    function getCurrentPlayer(){
        return currentPlayer;
    }
    function getWinner(){
        return winner;
    }
    function isGameOver(){
        return gameOver;
    }
    function isTie(){
        return tie;
    }


    return {playRound,getCurrentPlayer,getWinner,isGameOver,isTie,resetGame}
 
}


const game=gameController(player1,player2,player1);




 //game.playRound(0);
// game.playRound(7);
// game.playRound(1);
// game.playRound(3);
// game.playRound(2);
// game.playRound(4);



// - Build DOM display controller

const displayController = (()=>{

    const cellNodeList=document.querySelectorAll(".cell");
    const currentPlayerDisplay=document.querySelector('#currentPlayerDisplay');
    const winningPlayerDisplay=document.querySelector('#winningPlayerDisplay');
    const tieDisplay=document.querySelector('#tieDisplay');
    const winnerName=document.querySelector(".winnerName");
    const restartButton=document.createElement("button");
    restartButton.addEventListener("click",()=>{
        resetGameUI();
    })

    function displayPlayerChoice(i){
        game.playRound(i);
    }

        cellNodeList.forEach((cell,index) =>{
            cell.addEventListener("click",()=>{
                displayPlayerChoice(index);
                renderBoard();
                renderStatus();
                
            })
        })
    function renderBoard(){
        const sampleBoard=gameboard.getBoard();
        sampleBoard.forEach((value,index)=>{
            cellNodeList[index].textContent=value;
        })
    }
    
    function renderRestartButton(){
        if (game.getWinner() || game.isTie()){
            restartButton.textContent="Restart Game";
            restartButton.style.fontSize=`1em`;
            restartButton.style.display="block";
            winnerName.appendChild(restartButton);
        }
    }
    function resetGameUI(){
            game.resetGame();
            renderBoard();
            // renderStatus(); not needed now
            winningPlayerDisplay.textContent = "";
            tieDisplay.textContent = "";

            currentPlayerDisplay.textContent =`New game! ${game.getCurrentPlayer().playerName} starts`;
            
            restartButton.style.display="none";
    }

    // function renderStatus(){
    //     currentPlayerDisplay.textContent=`The Current Player is: ${game.getCurrentPlayer().playerName}`
    //     if (game.getWinner()){
    //         winningPlayerDisplay.textContent=`The Winner is : ${game.getWinner().playerName}`
    //         currentPlayerDisplay.textContent=``;
    //         renderRestartButton();
    //     }
    //     else winningPlayerDisplay.textContent=``;

    //     if (game.isTie()){
    //         tieDisplay.textContent=`The Game is Tie!!`
    //         currentPlayerDisplay.textContent=``;
    //         renderRestartButton();
    //     }
    //     else tieDisplay.textContent=``;
        
    // }

     function renderStatus(){
        if (game.getWinner()){
        currentPlayerDisplay.textContent = ``;
        winningPlayerDisplay.textContent =
            `The Winner is : ${game.getWinner().playerName}`;
        renderRestartButton();
        }
        else if (game.isTie()){
        currentPlayerDisplay.textContent = ``;
        tieDisplay.textContent = `The Game is Tie!!`;
        renderRestartButton();
        }
        else{
            currentPlayerDisplay.textContent =`The Current Player is: ${game.getCurrentPlayer().playerName}`;
            winningPlayerDisplay.textContent = ``;
            tieDisplay.textContent = ``;
        }
    }

    return {renderBoard,renderStatus}; 
})();

displayController.renderBoard();
displayController.renderStatus()
