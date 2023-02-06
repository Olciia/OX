PLAYER0 = prompt("podaj nick (gracz kółka)");
PLAYERX = prompt("podaj nick (gracz krzyżyka)");

const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;
const board =[
    ['','',''],
    ['','',''],
    ['','','']
];
const combinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));

function pick(event) {
    const { row, column } = event.target.dataset;
    const turn = round % 2 === 0 ? PLAYER2 : PLAYER1;
    if (board[row][column] !== '') return;
    event.target.classList.add(turn);
    board[row][column] = turn;
    round++;
    check();
}

function check(){
    const result = board.reduce((total, row) => total.concat(row));
    let moves ={
        'fa-circle-o': [],
        'fa-times': []
    };
    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null);
    combinations.forEach(combinations =>{
        if(combinations.every(index => moves[PLAYER1].indexOf(index) > -1)){
            winner = 'WINNER: Player1'; 
            alert(PLAYER0 +" "+"WGRAŁ/A");
            location.reload();
        } 
        if(combinations.every(index => moves[PLAYER2].indexOf(index) > -1)){
            winner = 'WINNER: Player2'; 
            alert(PLAYERX +" "+"WGRAŁ/A"); 
            location.reload();
        } 
    });
    if(round >=10){
        winner = 'NIKT'; 
        confirm("JEST REMIS ZAGRAJ PONOWNIE ABY POZNAC ZWYCIĘSCE");
        location.reload();
    }
    return winner;
}
