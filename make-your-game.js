let frame = document.createElement('div');
frame.style.width = "380px";
frame.style.height = "760px";
frame.style.border = '38px ridge rgb(9, 23, 174)';
frame.style.background = 'url(./db2.jpg)'

let nextBlockFreame = document.createElement('div');
nextBlockFreame.style.width = "180px";
nextBlockFreame.style.height = "180px";
nextBlockFreame.style.border = '14.4px ridge rgb(9, 23, 174)';
nextBlockFreame.innerHTML = "NEXT"
nextBlockFreame.style.color = "white"
nextBlockFreame.style.fontSize = '23.4px'
nextBlockFreame.style.textAlign = 'center'
nextBlockFreame.style.padding = '14.4px'

let statsFrame = document.createElement('div')
statsFrame.style.width = "180px";
statsFrame.style.height = "421.2px";
statsFrame.style.border = '14.4px ridge rgb(9, 23, 174)';
statsFrame.style.padding = '14.4px'
statsFrame.innerHTML = 'SCORE'
statsFrame.style.color = "white"
statsFrame.style.fontSize = '23.4px'
statsFrame.style.textAlign = 'center'

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
verticalDiv.appendChild(nextBlockFreame);
verticalDiv.appendChild(statsFrame);
parentDiv.appendChild(centerDiv);
parentDiv.appendChild(verticalDiv);
document.body.appendChild(parentDiv);


let frameDivBottom = frame.getBoundingClientRect().bottom - 38
let frameDivX = frame.getBoundingClientRect().x + 38
let frameDivRight = frame.getBoundingClientRect().right - 38
let blockCounter = 1
let speed = 1

function line() {
    let backroundChoice = ''
    let quadraBackground = document.createElement('div')
    quadraBackground.className = 'cubeBackground'
    quadraBackground.setAttribute("id", blockCounter)

    let tripleBackground = document.createElement('div')
    tripleBackground.className = 'restBackground'
    tripleBackground.setAttribute("id", blockCounter)

    let randomNumber = Math.floor(Math.random() * 1);

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

        if (keyName === 'ArrowRight' && backroundChoice.id == blockCounter && !frameCollusion && !collusionCheck3() ) {
            backroundChoice.style.marginLeft = parseFloat(backroundChoice.style.marginLeft) + 38 + 'px'            
        }
    });
       
    document.addEventListener('keydown', (e) => {
        const keyName = e.key
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`))

        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().x == frameDivX)

        if (keyName === 'ArrowLeft' && backroundChoice.id == blockCounter && !frameCollusion && !collusionCheck2() ) {    
            backroundChoice.style.marginLeft = parseFloat(backroundChoice.style.marginLeft) - 38 + 'px'
        }
    })
   
    let downKey = 0
    let yPos = 0

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' /*&& backroundChoice.id == blockCounter && !collusionCheck() && backroundChoice.getBoundingClientRect().bottom < frameDivBottom*/) {
            downKey += 38
            //backroundChoice.style.marginTop = parseFloat(backroundChoice.style.marginTop) + 38 + 'px';
            speed = 19
        }
    })

    let rotation = 0;
    document.addEventListener('keydown', (e) => {
        const initialRotation = rotation;
        const initialTransform = backroundChoice.style.transform;
        const initialMarginLeft = backroundChoice.style.marginLeft;
        const initialMarginTop = backroundChoice.style.marginTop;

        if (e.key === ' ' && backroundChoice.id == blockCounter && randomNumber != 2) {
            rotation += 90; 
            backroundChoice.style.transform = `rotate(${rotation}deg)`;     
        }

        if (rotation == 360) {
            rotation = 0
        }

        for (let i = 0 ; i < fallingBlocks.length ; i++){
            if((fallingBlocks[i].getBoundingClientRect().x < frameDivX || fallingBlocks[i].getBoundingClientRect().right > frameDivRight) ||
                fallingBlocks[i].getBoundingClientRect().bottom > frameDivBottom) {
                    
                rotation = initialRotation;
                backroundChoice.style.transform = initialTransform;
                backroundChoice.style.marginLeft = initialMarginLeft;
                backroundChoice.style.marginTop = initialMarginTop;
                return
            }
        }

        for (let i = 0 ; i < allBlocks.length ; i ++) {
            for (let j = 0; j < fallingBlocks.length; j++) {
                if (allBlocks[i].getBoundingClientRect().left == fallingBlocks[j].getBoundingClientRect().left &&
                    allBlocks[i].getBoundingClientRect().top == fallingBlocks[j].getBoundingClientRect().top)  {

                    rotation = initialRotation;
                    backroundChoice.style.transform = initialTransform;
                    backroundChoice.style.marginLeft = initialMarginLeft;
                    backroundChoice.style.marginTop = initialMarginTop;
                    return
                }
            }      
        }
    });
      
    function drop() {
        let fallingBlocks = Array.from(document.querySelectorAll(`.oneBlock[id="${blockCounter}"]`));
        
        var frameCollusion = fallingBlocks.some((block) => block.getBoundingClientRect().bottom == frameDivBottom);

        if (!frameCollusion && !collusionCheck()) {
            yPos += speed       
            backroundChoice.style.marginTop = `${yPos}px`
            if (yPos > 550) {
                speed = 1
            }

            //setTimeout (function () {
                requestAnimationFrame(drop);
            //}, 600);
            
        } else {
            speed = 1
           // fallingBlocks.forEach((block) => {
           //     block.setAttribute('rotation', rotation);
           //     block.setAttribute('top', block.getBoundingClientRect().top);
           //     console.log(block.getBoundingClientRect().top)
           // });

            blockCounter++
            deleteRows()
            line()
        }        
    }
    window.requestAnimationFrame(drop);
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
    
    for (let i = 0 ; i < allBlocks.length ; i ++) {
        for (let j = 0; j < fallingBlocks.length; j++) {
            if (allBlocks[i].getBoundingClientRect().left + 38 == fallingBlocks[j].getBoundingClientRect().left && allBlocks[i].getBoundingClientRect().top + 38 == fallingBlocks[j].getBoundingClientRect().bottom) {
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
            if (allBlocks[i].getBoundingClientRect().right - 38 == fallingBlocks[j].getBoundingClientRect().right && allBlocks[i].getBoundingClientRect().top + 38 == fallingBlocks[j].getBoundingClientRect().bottom) {
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

function deleteRows(){
    let allBlocks = document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`);
    //const filledRow = document.querySelectorAll(`[top="${frameDivBottom - 38}"]`)
    var allrows = []
    for (let i = 0 ; i < 20 ; i++){
        let filteredBlocks = Array.from(allBlocks).filter(block => block.getBoundingClientRect().top === frameDivBottom - 38)    
    }
    

    var fullLine = filteredBlocks.length
    var removeRow = filteredBlocks

    if (fullLine == 10) {
        for(let i = 0 ; i < removeRow.length ; i++) {
            removeRow[i].remove()
        }

    //let allBlocks = Array.from(document.querySelectorAll(`.oneBlock:not([id="${blockCounter}"])`))

        setTimeout (function() {
            for (let i = 0 ; i < allBlocks.length ; i++) {
                //let currentTop = parseInt(allBlocks[i].style.top, 10);
                //var currentTops = parseInt(window.getComputedStyle(allBlocks[i]).top);
                //var newTop = currentTops + 38;

                if (allBlocks[i].getAttribute('rotation') === '0'  ) {allBlocks[i].style.marginTop = parseFloat(allBlocks[i].style.marginTop) + 38 + 'px'}                   
                if (allBlocks[i].getAttribute('rotation') === '90' ) {allBlocks[i].style.marginLeft = parseFloat(allBlocks[i].style.marginLeft) + 38 + 'px'}
                if (allBlocks[i].getAttribute('rotation') === '180') {allBlocks[i].style.marginTop = parseFloat(allBlocks[i].style.marginTop) - 38 + 'px'}
                if (allBlocks[i].getAttribute('rotation') === '270') {allBlocks[i].style.marginLeft = parseFloat(allBlocks[i].style.marginLeft) - 38 + 'px'}
            }
        }, 400);
    }
} 