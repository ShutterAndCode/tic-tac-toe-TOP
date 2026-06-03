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
const player2=createPlayer(`shagun`,`o`)

function gameController(player1,player2,currentPlayer){

    let board=gameboard.getBoard();
    let gameOver=false;


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
        if(!checkWinner() && !(board.includes(`_`))){
            return true;
        }
        return false;
    }

     function resetGame(){
        currentPlayer=player1;
        gameOver=false;
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
            resetGame();
            return ;
        }

        if (board[position]!=`_`){
            console.error("overwrite is not allowed");
            return;
        }
        console.log(`The current Player is : `,currentPlayer.playerName);
        gameboard.placeMarker(position,currentPlayer.marker);
        const winner=checkWinner();
        const tie=tieDetection();
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



    return {playRound,getCurrentPlayer}
 
}


const game=gameController(player1,player2,player1);




game.playRound(0);
game.playRound(7);
game.playRound(1);
game.playRound(3);
game.playRound(2);
game.playRound(4);





// TODO:

// - Add tie detection
// - Connect winner detection to game flow
// - Build DOM display controller
