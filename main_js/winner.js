const checkWinner = () => {
    const computerChoice = houseSelection();

    if(userSelection === computerChoice ){
        decision(' draw!');
    }
    else if(
        userSelection === 'paper' 
        && computerChoice === 'rock' 
        || userSelection === 'rock' 
        && computerChoice === 'scissors' 
        || userSelection === 'scissors' 
        && computerChoice === 'paper'){
       decision(' win');
       updateScore(1);
    }
    else{
        decision(' lose');
        updateScore(-1);
    }

    pickUserHand(userSelection);
    pickHouse(computerChoice);
    resetClasses(user, userSelection);
    resetClasses(house, computerChoice);  

    
    game.style.display = 'none';
    play.style.display = 'flex';
    console.log('winner function call when game mode is normal');
}

export default checkWinner;