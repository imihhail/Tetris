let frame = document.createElement('div');
frame.style.width = "380px";
frame.style.height = "760px";
frame.style.border = '38px ridge rgb(9, 23, 174)';
frame.style.background = 'url(./db2.jpg)'

let score = 0
let life = 1
let countdown = 60
let gameOver = false

let statsFrame = document.createElement('div')
statsFrame.className = 'test'
let scoreTag = document.createElement('p')
scoreTag.innerHTML = `${score}<br><br>`
let lifeTag = document.createElement('p')
lifeTag.innerHTML = `LIFE LEFT<br><br>${life}<br><br>`;
let timerTag = document.createElement('p')

statsFrame.style.width = "180px";
statsFrame.style.height = "300px";
statsFrame.style.border = '14.4px ridge rgb(9, 23, 174)';
statsFrame.style.padding = '14.4px'
statsFrame.innerHTML = 'SCORE'
statsFrame.style.color = "white"
statsFrame.style.fontSize = '20px'
statsFrame.style.textAlign = 'center'
//statsFrame.style.transition = '2s'

let centerDiv = document.createElement('div');
centerDiv.style.display = "flex";
centerDiv.style.justifyContent = "center";

let parentDiv = document.createElement('div');
parentDiv.style.display = "flex";
parentDiv.style.justifyContent = "center";
parentDiv.style.alignItems = "center";

let verticalDiv = document.createElement('div');
verticalDiv.style.display = "block";

centerDiv.appendChild(frame);

verticalDiv.appendChild(statsFrame);
statsFrame.appendChild(scoreTag)
statsFrame.appendChild(lifeTag)
statsFrame.appendChild(timerTag)
parentDiv.appendChild(centerDiv);
parentDiv.appendChild(verticalDiv);
document.body.appendChild(parentDiv);

let frameDivBottom = frame.getBoundingClientRect().bottom - 38
let frameDivX = frame.getBoundingClientRect().x + 38
let frameDivRight = frame.getBoundingClientRect().right - 38
let blockCounter = 1
let speed = 2
let isPaused = false
let animationId = null
let gamePaused = false

function line() {
    let backroundChoice = ''
    let quadraBackground = document.createElement('div')
    quadraBackground.className = 'cubeBackground'
    quadraBackground.setAttribute("id", blockCounter)

    let tripleBackground = document.createElement('div')
    tripleBackground.className = 'restBackground'
    tripleBackground.setAttribute("id", blockCounter)

    let randomNumber = Math.floor(Math.random() * 5);

         if (randomNumber == 0) {tetra0(quadraBackground), backroundChoice = quadraBackground}
    else if (randomNumber == 1) {tetra1(tripleBackground), backroundChoice = tripleBackground}
    else if (randomNumber == 2) {tetra2(tripleBackground), backroundChoice = tripleBackground}
    else if (randomNumber == 3) {tetra3(tripleBackground), backroundChoice = tripleBackground}
    else if (randomNumber == 4) {tetra4(tripleBackground), backroundChoice = tripleBackground}

    backroundChoice.style.marginLeft = '114px'

    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    let fallingBlocks = document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`);
  
    document.addEventListener('keydown', (e) => {
        const keyName = e.key;
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`));
        
        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().right == frameDivRight)

        if (keyName === 'ArrowRight' && backroundChoice.id == blockCounter && !frameCollusion && !collusionCheck2() ) {
            backroundChoice.style.marginLeft = parseFloat(backroundChoice.style.marginLeft) + 38 + 'px'            
        }
    });
       
    document.addEventListener('keydown', (e) => {
        const keyName = e.key
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`))

        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().x <= frameDivX)

        if (keyName === 'ArrowLeft' && backroundChoice.id == blockCounter && !frameCollusion && !collusionCheck3() ) {    
            backroundChoice.style.marginLeft = parseFloat(backroundChoice.style.marginLeft) - 38 + 'px'
        }
    })
   
    let yPos = 0

    document.addEventListener('keydown', (e) => {
        //var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().x <= frameDivX)
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`))
        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().bottom >= frameDivBottom)
        if (e.key === 'ArrowDown' && backroundChoice.id == blockCounter && !frameCollusion) {
            while (yPos % 38 !== 0) {
                yPos++
            }
            speed = 19
        }
    })

    let rotation = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && backroundChoice.id == blockCounter && randomNumber != 2) {
            const initialRotation = rotation;
            const initialTransform = backroundChoice.style.transform;
            const initialMarginLeft = backroundChoice.style.marginLeft;
            const initialMarginTop = backroundChoice.style.marginTop;

            rotation += 90; 
            backroundChoice.style.transform = `rotate(${rotation}deg)`;
            for (let i = 0 ; i < allBlocks.length ; i ++) {
                for (let j = 0; j < fallingBlocks.length; j++) {
                    let fallenBlocks = allBlocks[i].getBoundingClientRect();
                    let fallingBlock = fallingBlocks[j].getBoundingClientRect();
                    if (fallenBlocks.left <= fallingBlock.right && fallenBlocks.right >= fallingBlock.left &&
                        fallenBlocks.top <= fallingBlock.bottom && fallenBlocks.bottom >= fallingBlock.top) {
                        rotation = initialRotation;
                        backroundChoice.style.transform = initialTransform;
                        backroundChoice.style.marginLeft = initialMarginLeft;
                        backroundChoice.style.marginTop = initialMarginTop;
                        return
                    }
                }      
            }
            for (let i = 0 ; i < fallingBlocks.length ; i++){
                let fallingBlock = fallingBlocks[i].getBoundingClientRect();
                if((fallingBlock.x < frameDivX || fallingBlock.right > frameDivRight) || fallingBlock.bottom > frameDivBottom) {
                    rotation = initialRotation;
                    backroundChoice.style.transform = initialTransform;
                    backroundChoice.style.marginLeft = initialMarginLeft;
                    backroundChoice.style.marginTop = initialMarginTop;
                    return
                }
            }
        }
        if (rotation == 360) {
            rotation = 0;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' && !gameOver && backroundChoice.id == blockCounter && !gamePaused) {
                gamePaused = true
                let pauseDiv = document.createElement('div');
                let continueText = document.createElement('p');
                let restartText = document.createElement('p');

                pauseDiv.className = 'lost';
                continueText.innerHTML = 'CONTINUE';
                continueText.className = 'restartClass';
                restartText.innerHTML = 'RESTART';
                restartText.className = 'restartClass';

                restartText.addEventListener('click', ()=>{
                    location.reload();
                });

                continueText.addEventListener('click', ()=>{
                    animationId = window.requestAnimationFrame(drop);
                    gamePaused = false
                    pauseDiv.remove()
                });
                
                pauseDiv.appendChild(continueText);
                pauseDiv.appendChild(restartText);
                document.body.appendChild(pauseDiv);
                cancelAnimationFrame(animationId);     
        }
    });

    function drop() {
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`))

        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().bottom >= frameDivBottom)
        
        if (gameOver) {
            GameOverWindow();
            cancelAnimationFrame(animationId)
            return
        }
    
        if (!frameCollusion && !collusionCheck() ) {
            yPos += speed       
            backroundChoice.style.marginTop = `${yPos}px`
            animationId = requestAnimationFrame(drop)
    
        } else {
            speed = 2
            fallingBlocks.forEach((block) => {block.setAttribute('rotation', rotation)}) 
            blockCounter++
            deleteRows()
            line()         
        }        
    }
    animationId = window.requestAnimationFrame(drop)
}
line()


function collusionCheck() {
    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    let fallingBlocks = document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`);

    for (let i = 0 ; i < allBlocks.length ; i ++) {
        for (let j = 0; j < fallingBlocks.length; j++) {
            if (allBlocks[i].getBoundingClientRect().left == fallingBlocks[j].getBoundingClientRect().left && allBlocks[i].getBoundingClientRect().top == fallingBlocks[j].getBoundingClientRect().bottom) {
                return true;
            }
        }      
    }
    return false;
}

function collusionCheck2() {
    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    let fallingBlocks = document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`);
    
    for (let i = 0 ; i < allBlocks.length ; i++) {
        for (let j = 0; j < fallingBlocks.length; j++) {
            if (allBlocks[i].getBoundingClientRect().left == fallingBlocks[j].getBoundingClientRect().right && allBlocks[i].getBoundingClientRect().top <= fallingBlocks[j].getBoundingClientRect().bottom && allBlocks[i].getBoundingClientRect().bottom >= fallingBlocks[j].getBoundingClientRect().top) {
                return true;
            }
        }      
    }
    return false;
}

function collusionCheck3() {
    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    let fallingBlocks = document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`);
    
    for (let i = 0 ; i < allBlocks.length ; i ++) {
        for (let j = 0; j < fallingBlocks.length; j++) {
            if (allBlocks[i].getBoundingClientRect().right == fallingBlocks[j].getBoundingClientRect().left && allBlocks[i].getBoundingClientRect().top <= fallingBlocks[j].getBoundingClientRect().bottom && allBlocks[i].getBoundingClientRect().bottom >= fallingBlocks[j].getBoundingClientRect().top) {
                return true;
            }
        }      
    }
    return false;
}

function tetra1(tripleBackground) {
    let transforms = ['translate(38px)', 'translate(38px, 38px)', 'translate(76px, 38px)', 'translate(38px, 76px)'];

    for(let i = 0 ; i < 4; i++) {
        let singleBlock = document.createElement('div');
        singleBlock.className = 'oneBlock';
        singleBlock.id = blockCounter;
        singleBlock.style.background = 'rgb(249, 241, 0)';
        singleBlock.style.transform = transforms[i];
        singleBlock.style.top = '0px'
        singleBlock.style.margin = '0px'
        tripleBackground.appendChild(singleBlock);
    }
    frame.appendChild(tripleBackground);
}

function tetra0(quadraBackground) {
    for(let i = 0 ; i < 4; i++) {
        let singleBlock = document.createElement('div')
        singleBlock.className = 'oneBlock'
        singleBlock.setAttribute("id", blockCounter)
        singleBlock.style.background = 'rgb(0, 249, 75)'
        singleBlock.style.top = '0px'
        singleBlock.style.margin = '0px'
        quadraBackground.appendChild(singleBlock);
        if (i == 0){singleBlock.style.transform = 'translate(76px, 0px)'}
        if (i == 1){singleBlock.style.transform = 'translate(76px, 38px)'}
        if (i == 2){singleBlock.style.transform = 'translate(76px, 76px)'}
        if (i == 3){singleBlock.style.transform = 'translate(76px, 114px)'} 
    }
    frame.appendChild(quadraBackground);
}

function tetra2(tripleBackground) {
    for(let i = 0 ; i < 4; i++) {
        let singleBlock = document.createElement('div')
        singleBlock.className = 'oneBlock'
        singleBlock.style.margin = '0px'
        if (i == 0){singleBlock.style.transform = 'translate(76px, 0px)'}
        if (i == 1){singleBlock.style.transform = 'translate(38px, 0px)'}
        if (i == 2){singleBlock.style.transform = 'translate(76px, 38px)'}
        if (i == 3){singleBlock.style.transform = 'translate(38px, 38px)'}
        singleBlock.setAttribute("id", blockCounter)
        singleBlock.style.background = 'rgb(218, 243, 243)'       
        tripleBackground.appendChild(singleBlock);
    }
    frame.appendChild(tripleBackground)
}

function tetra3(tripleBackground) {
    for(let i = 0 ; i < 4; i++) {
        let singleBlock = document.createElement('div')
        singleBlock.className = 'oneBlock'
        singleBlock.style.margin = '0px'
        if (i == 0){singleBlock.style.transform = 'translate(38px, 0px)'}
        if (i == 1){singleBlock.style.transform = 'translate(38px, 38px)'}
        if (i == 2){singleBlock.style.transform = 'translate(38px, 76px)'}
        if (i == 3){singleBlock.style.transform = 'translate(76px, 76px)'}
        singleBlock.setAttribute("id", blockCounter)
        singleBlock.style.background = 'rgb(0, 220, 249)'       
        tripleBackground.appendChild(singleBlock);
    }
    frame.appendChild(tripleBackground)
}

function tetra4(tripleBackground) {
    for(let i = 0 ; i < 4; i++) {
        let singleBlock = document.createElement('div')
        singleBlock.className = 'oneBlock'
        singleBlock.style.margin = '0px'
        if (i == 0){singleBlock.style.transform = 'translate(38px, 0px)'}
        if (i == 1){singleBlock.style.transform = 'translate(76px, 0px)'}
        if (i == 2){singleBlock.style.transform = 'translate(38px, 38px)'}
        if (i == 3){singleBlock.style.transform = 'translate(0px, 38px)'}
        singleBlock.setAttribute("id", blockCounter)
        singleBlock.style.background = 'rgb(255, 0, 17)'       
        tripleBackground.appendChild(singleBlock);
    }
    frame.appendChild(tripleBackground)
}

function deleteRows() {
    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    var n = 38
    var allFilledRows = []
    var removedRowFloor = 0
    var removeCount = 0;
    var countRemovedFloors = 0

    for (let y = 0 ; y < 20 ; y++) {       
        let rowOccupancy = Array.from(allBlocks).filter(block => block.getBoundingClientRect().top === frameDivBottom - n)
        allFilledRows.push(rowOccupancy)
        if (allFilledRows[y].length == 10) {
            for (let x = 0 ; x < allFilledRows[y].length ; x++) {
                removedRowFloor = allFilledRows[y][x].getBoundingClientRect().top + countRemovedFloors
                allFilledRows[y][x].remove()
                removeCount++; 
                
                if (removeCount === 10) {
                    score += 10
                    countdown += 7

                    scoreTag.innerHTML = `${score}<br><br>`
                    adjustBlocks(allBlocks, removedRowFloor)
                    removeCount = 0;                 
                }
            }
            countRemovedFloors += 38
        }
        n += 38   
    }
    if (allFilledRows[19].length != 0) {
        life -= 1
        lifeTag.innerHTML = `LIFE LEFT<br><br>${life}<br><br>`
        gameOver = true
    }
}

function adjustBlocks(allBlocks, removedRowFloor) {
    setTimeout (function() {
        for (let i = 0 ; i < allBlocks.length ; i++) {
            if (allBlocks[i].getBoundingClientRect().top < removedRowFloor) {
            if (allBlocks[i].getAttribute('rotation') === '0'  ) {allBlocks[i].style.marginTop = parseFloat(allBlocks[i].style.marginTop) + 38 + 'px'}                   
            if (allBlocks[i].getAttribute('rotation') === '90' ) {allBlocks[i].style.marginLeft = parseFloat(allBlocks[i].style.marginLeft) + 38 + 'px'}
            if (allBlocks[i].getAttribute('rotation') === '180') {allBlocks[i].style.marginTop = parseFloat(allBlocks[i].style.marginTop) - 38 + 'px'}
            if (allBlocks[i].getAttribute('rotation') === '270') {allBlocks[i].style.marginLeft = parseFloat(allBlocks[i].style.marginLeft) - 38 + 'px'}
            }
        }
    }, 400);
}

function startCountdown() {
    function updateDisplay() {
        let minutes = Math.floor(countdown / 60);
        let seconds = countdown % 60;

        timerTag.innerHTML = `TIME LEFT <br><br> ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    updateDisplay();

    let intervalId = setInterval(() => {
        if (gamePaused) {
            return;
        }
        countdown--;
        updateDisplay();

        if (gameOver) {
            clearInterval(intervalId);
        }
        if (countdown < 1) {
            clearInterval(intervalId);
            life -= 1;
            lifeTag.innerHTML = `LIFE LEFT<br><br>${life}<br><br>`;
            gameOver = true;
        }
    }, 1000);
}
startCountdown();

function GameOverWindow(){
        let loseWindow = document.createElement('div')
        loseWindow.className = 'lost'
        loseWindow.innerHTML = 'GAME OVER'

        let restardText = document.createElement('p')
        restardText.className = 'restartClass'
        restardText.innerHTML = 'RESTART'

        restardText.addEventListener('click', ()=>{
            frame.innerHTML = ''
            gameOver = false
            loseWindow.style.display = 'none'
            life = 1
            score = 0
            lifeTag.innerHTML = `LIFE LEFT<br><br>${life}<br><br>`
            scoreTag.innerHTML = `${score}<br><br>`
            countdown = 60
            startCountdown()
            line()
        })

        loseWindow.appendChild(restardText)
        document.body.appendChild(loseWindow)
}




