const buttons = document.querySelectorAll('.select');
const scoreElement = document.getElementById('score');
const game = document.getElementById('game');
const play = document.getElementById('start');
const reset = document.getElementById('reset');
const user = document.getElementById('user-result');
const house = document.getElementById('house-result');
const result = document.getElementById('show-result');
const user_image = document.getElementById('user-pick');
const computer_image = document.getElementById('computer-pick');
const normalLogo = document.getElementById('logo');
const bonusLogo = document.getElementById('bonus-logo');

const bonusLevel = document.getElementById('bonus');
const rulesButton = document.querySelector('.rules');
const modalBg = document.querySelector('.modal-bg');
const modal = document.querySelector('.modal');
const closeElement = document.querySelector('.close');
const howToPlay = document.getElementById('how-to-play');
const rulesTitle = document.querySelector('.title');
const playagainEl = document.getElementById('play-again');


const choices = ['paper', 'rock', 'scissors'];
const bonus = ['paper', 'rock', 'scissors', 'lizard', 'spock'];




let scores = 0;

let userSelection;

returnScoreFromStorage();


//user selection
buttons.forEach(button => {
	button.addEventListener('click', () => {
	    userSelection = button.getAttribute('data-choice');
	    console.log(userSelection);
	        
	    gameMode.advanced === false && gameMode.normal === true ? checkWinner(): checkBonusWinner();
	});

});

const fadeIn = () => {
    let opacity = 0;
    let intervalID = setInterval(()=>{
        if(opacity < 1){
            opacity += 0.05;
            playagainEl.style.opacity = opacity;
        }
        else{
            clearInterval(intervalID);
        }
    }, 100);
};

const fadeOut = () => {
    let opacity = 1.1;
    let intervalID = setInterval(() => {
        if(opacity > 1){
            opacity -= 0.1;
            playagainEl.style.opacity = opacity;
        }
        else{
            clearInterval(intervalID);
        }
    });
}


//toggle between modes
const gameMode = {
    advanced: false,
    normal: true,
    _advancedImage: 'images/logo-bonus.svg',
    _normalImage: 'images/logo.svg',
    _advancedContent: '/images/image-rules-bonus.svg',
    _normalContent: '/images/image-rules.svg',

    get normalContent() {
        return this._normalContent;
    },


    get advancedContent() {
        return this._advancedContent;
    },

    
    get normalImage() {
        return this._normalImage;
    },

    get advancedImage() {
        return this._advancedImage;
    },
    
}

const toggleMode = () => {
    if(gameMode.advanced === false && gameMode.normal === true){
        // bonusEl.src = gameMode.advancedImage;
        normalLogo.style.display = 'none';
        bonusLogo.style.display = 'inline-block';
        gameMode.advanced = true;
        gameMode.normal = false;
        bonusLevel.style.display = 'block';
        game.style.display = 'none';
        playagainEl.style.opacity = 0;


        console.log('advanced game mode set to:' + gameMode.advanced);
        console.log('normal game mode set to: ' + gameMode.normal);
    }else if(gameMode.advanced === true && gameMode.normal === false){
        normalLogo.style.display = 'inline-block';
        bonusLogo.style.display = 'none';
        gameMode.advanced = false;
        gameMode.normal = true;
        bonusLevel.style.display = 'none';
        game.style.display = 'flex';
        playagainEl.style.opacity = 0;

        console.log('advanced game mode set to:' + gameMode.advanced);
        console.log('normal game mode set to: ' + gameMode.normal);
        
    }

    play.style.display === 'grid'? 
        play.style.display = 'none': play.style.display = '';
    
}



normalLogo.addEventListener('click', toggleMode);
bonusLogo.addEventListener('click', toggleMode);






//play again button listener
reset.addEventListener('click', () =>{
    game.style.display = 'flex';
    play.style.display = 'none';
    playagainEl.style.opacity = 0;
    bonusLevel.style.display = 'none';
    if(gameMode.advanced === true){
        game.style.display = 'none';
        play.style.display = 'none';
        bonusLevel.style.display = 'block';
        playagainEl.style.opacity = 0;
    }
    
    
})

//function to check who wins
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
    play.style.display = 'grid';
    fadeIn();
    console.log('winner function call when game mode is normal');
}




//house selection
const houseSelection = () => {
    return choices[Math.floor(choices.length * Math.random())];
};

const bonusHouseSelection = () => {
    return bonus[Math.floor(bonus.length * Math.random())];
};

//updates score 
const updateScore = (value) => {
    scores += value;
    scoreElement.innerHTML = scores;
    window.localStorage.setItem('gameScore', scores);
};
//save to local storage
function returnScoreFromStorage(){
    const score = +window.localStorage.getItem('gameScore') || 0;
    scores = score;

}


const decision = (decide) =>{
    result.innerHTML = decide;
}


//results image selection
const imgSources = {
    'paper': "images/icon-paper.svg",
    'rock': "images/icon-rock.svg", 
    'scissors': "images/icon-scissors.svg",
    'spock': "images/icon-spock.svg",
    'lizard': "images/icon-lizard.svg"
}


const pickUserHand = (hand) => {
    document.getElementById('user-pick').src = imgSources[hand];
}

const pickHouse = (hand) => {
    document.getElementById('computer-pick').src = imgSources[hand];

}



const resetClasses = (clsEl, choice) => {
    clsEl.classList.remove('rock-btn');
    clsEl.classList.remove('paper-btn');
    clsEl.classList.remove('scissors-btn');
    clsEl.classList.remove('lizard-btn');
    clsEl.classList.remove('spock-btn');


    clsEl.classList.add(`${choice}-btn`);
}


//Hard Mode mode winner 
const checkBonusWinner = () => {
    const computerChoice = bonusHouseSelection();

    if(userSelection === computerChoice ){
        decision(' draw!');
    }
    else if(
        userSelection === 'paper' 
        && computerChoice === 'rock'

        || userSelection === 'rock' 
        && computerChoice === 'scissors'

        || userSelection === 'scissors' 
        && computerChoice === 'paper'
        //bonus
        || userSelection === 'lizard'
        && computerChoice === 'spock'

        || userSelection === 'spock'
        && computerChoice === 'scissors'

        || userSelection === 'rock'
        && computerChoice === 'lizard'

        || userSelection === 'scissors'
        && computerChoice === 'lizard'

        || userSelection === 'paper'
        && computerChoice === 'spock'

        || userSelection === 'lizard'
        && computerChoice === 'paper'

        || userSelection === 'spock'
        && computerChoice === 'rock'){
       decision(' win');
       updateScore(1);
    }
    else{
        decision(' lose');
        updateScore(-2);
    }
    
    pickUserHand(userSelection);
    pickHouse(computerChoice);
    resetClasses(user, userSelection);
    resetClasses(house, computerChoice);

    bonusLevel.style.display = 'none';
    play.style.display = 'grid';
    game.style.display = 'none';
    fadeIn();

    console.log('Bonus Winner function call when game mode is advanced');
    
}

rulesButton.addEventListener('click', () => {
    modal.classList.add('active');
    modalBg.classList.add('active');

    if(gameMode.advanced === true){
        howToPlay.src = gameMode.advancedContent;
        rulesTitle.style.marginBottom = '';
    }
    else if(gameMode.advanced === false){
        howToPlay.src = gameMode.normalContent;
        rulesTitle.style.marginBottom = '';
    }
});

function hideModal(){
    modal.classList.remove('active');
    modalBg.classList.remove('active');
}

modalBg.addEventListener('click', (eventTarget) => {
    eventTarget.target === modalBg ? hideModal(): null;
})



closeElement.addEventListener('click', hideModal);






