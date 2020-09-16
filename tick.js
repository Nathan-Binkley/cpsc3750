// TODO:
// AUTO VIDEO WHEN WIN/LOSE -- DONE
// Center
// MAKE GAME BUTTONS BIGGER
// FIGURE OUT A RICKROLL SOMEWHERE

//THEME 2000's MYSPACE PAGE


let rootNode;

let buttonNodes = [
    [], //row 0
    [], //row 1
    []  //row 2
];


let AIfirst = false;
let winner = false;
let scratch = false;


let onclick = function() {
    // console.log(this);
    let x = this.row;
    let y = this.col;

    this.innerHTML = 'X';
    this.owned = 'X';
    this.disabled = true;

    
    checkWinner();
    if (winner == false && scratch == false) // Game is not over
    {
        setTimeout(AIpick, 200);
        checkWinner();
    }
};

// Taken from:
// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
let setAIFirst = function()
{
    if (AIfirst == false)
    {
        AIfirst=true;
        this.style.backgroundColor = '#00AA00AA';
    }
    else{
        AIfirst = false;
        this.style.backgroundColor = '#FF0000AA';
    }
}; 


let disableAIFirstButton = function()
{
    let buttons;
    buttons = document.querySelectorAll('button');
    for(var i = 0; i < buttons.length; i++)
    {
        if (buttons[i].innerHTML == "AI go first")
            buttons[i].disabled = true;
    }
};

let init = function() {
    rootNode = document.getElementById("app");
    currRow = rootNode
    
    enabledButtons = JSON.parse(JSON.stringify(buttonNodes));;

    for(var i = 0; i < 3; i++)
    {
        let row = document.createElement('div');  
        for(var j = 0; j < 3; j++)
        {
            let btn = (buttonNodes[i][j] = document.createElement('button'));
            let id = document.createAttribute("class");
            id.value = 'tic';
            btn.setAttributeNode(id);
            btn.innerHTML = '_'; // fill all with empty things
            btn.owned = false;
            btn.row = i;
            btn.col = j;
            btn.disabled = true;

            btn.onclick = onclick; // handles on click stuff

            row.appendChild(btn);
        }
        rootNode.appendChild(row)
    }
    // console.log(buttonNodes);
    // put AI go first button
    let btn = document.createElement('button');
    btn.innerHTML = "AI go first";
    let id = document.createAttribute("id");
    id.value = 'AI';
    btn.setAttributeNode(id);
    btn.onclick = setAIFirst;
    btn.style.backgroundColor="#FF0000AA";
    
    rootNode.appendChild(btn);

    //Play button:
    
    let playBtn = document.createElement('button');
    id = document.createAttribute("id");
    id.value = 'play';
    playBtn.setAttributeNode(id);
    playBtn.innerHTML = 'PLAY';
    playBtn.onclick = play;
    rootNode.appendChild(playBtn);
};


window.addEventListener("load", init); // Called when page loads
// init();

let getAllUnowned = function()
{
    let unowned = []
    for (var i = 0; i < buttonNodes.length; i++)
    {
        for (var j = 0; j < buttonNodes[i].length; j++)
        {
            if (buttonNodes[i][j].owned == false)
            {
                unowned.push(buttonNodes[i][j]);
            }
        }
    }
    return unowned.reverse();
};

let activate = function()
{
    for (var i = 0; i < buttonNodes.length; i++)
    {
        for (var j = 0; j < buttonNodes[i].length; j++)
        {
            if (buttonNodes[i][j].owned == false)
            {
                buttonNodes[i][j].disabled = false;
            }
        }
    }
    
};

let botSelect = function(button)
{
    // console.log("Bot is changing the value");
    // console.log(button);
    button.owned = 'O';
    button.disabled = true;
    button.innerHTML = 'O';
    
};

let AIpick = function()
{
    let unowned;
    unowned = getAllUnowned();
    var c = Math.floor(Math.random() * unowned.length);
    botSelect(unowned[c]);
    
};

let play = function()
{
    console.log("Playtime!");
    this.disabled = true;
    disableAIFirstButton();
    activate();
    if(AIfirst)
    {
        AIpick();
        checkWinner();
    }
};

let appendGoodVideo = function()
{
    let video = document.createElement('iframe');

    let height = document.createAttribute('height');
    height.value = "315";

    let width = document.createAttribute('width');
    width.value='560';

    let frameBorder = document.createAttribute('frameborder');
    frameBorder.value='0';

    let allow = document.createAttribute('allow');
    allow.value='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';

    let fullscreen = document.createAttribute('allowfullscreen');

    
    let src = document.createAttribute('src');
    src.value = 'https://www.youtube.com/embed/1Bix44C1EzY?autoplay=1';

    
    let vidID = document.createAttribute('id');
    vidID.value = 'vidID';
    

    video.setAttributeNode(height);
    video.setAttributeNode(width);
    video.setAttributeNode(frameBorder);
    video.setAttributeNode(allow);
    video.setAttributeNode(fullscreen);
    video.setAttributeNode(src);
    video.setAttributeNode(vidID);

    rootNode.appendChild(video);
};

let appendBadVideo = function()
{
    let video = document.createElement('iframe');

    let height = document.createAttribute('height');
    height.value = "315";
    
    let width = document.createAttribute('width');
    width.value='560';
    
    let frameBorder = document.createAttribute('frameborder');
    frameBorder.value='0';
    
    let allow = document.createAttribute('allow');
    allow.value='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';

    let fullscreen = document.createAttribute('allowfullscreen');
    
    let src = document.createAttribute('src');
    src.value = 'https://www.youtube.com/embed/Dj1DQ9pjU34?start=19&autoplay=1';
    
    let vidID = document.createAttribute('id');
    vidID.value = 'vidID';
    
    video.setAttributeNode(height);
    video.setAttributeNode(width);
    video.setAttributeNode(frameBorder);
    video.setAttributeNode(allow);
    video.setAttributeNode(fullscreen);
    video.setAttributeNode(src);
    video.setAttributeNode(vidID);
    
    rootNode.appendChild(video);
};

let handleWinner = function(playerWinner)
{
    console.log("Handling winner " + playerWinner);
    let div = document.createElement('div');
    rootNode.appendChild(div);

    let winStatement = document.createElement('H1'); //Display Winner
    winStatement.innerHTML = playerWinner + " is the winner";
    let id = document.createAttribute("id");
    id.value = 'win';
    winStatement.setAttributeNode(id);
    rootNode.appendChild(winStatement);

    rootNode.appendChild(div);

    //display winner via text
    
    if(playerWinner == 'X')
    {
        appendGoodVideo();
    }
    else   
        appendBadVideo();
    
    rootNode.appendChild(div);
    // If winner is player (x), use this YT link: <iframe width="560" height="315" src="https://www.youtube.com/embed/1Bix44C1EzY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // if winner is AI (O), use this YT link: <iframe width="560" height="315" src="https://www.youtube.com/embed/Dj1DQ9pjU34?start=19" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // 
};

//Deactivate when game is over
let deactivate = function()
{
    //Shut down all buttons (Disable them)
    let game = document.getElementsByClassName('tic');
    for(var i = 0; i < game.length; i++)
    {
        console.log("Button found");
        console.log(game[i]);
        game[i].disabled = true;
    }

};

let checkHorizontal = function()
{
    
    console.log("Checking Horizontal");
    for(var i = 0; i < buttonNodes.length; i++)
    {
        if(buttonNodes[i][1].innerHTML == buttonNodes[i][0].innerHTML 
            && buttonNodes[i][2].innerHTML == buttonNodes[i][0].innerHTML 
            && buttonNodes[i][0].innerHTML != '_')
            {
                console.log("WE HAVE A WINNER");
                console.log(buttonNodes[i][0].innerHTML);
                winner = true;
                deactivate();
                return buttonNodes[i][0].innerHTML;
            }
    }
    return false;
    
};

let checkDiagonal = function()
{
    console.log("Checking Diagonal");
    
    for(var i = 0; i < buttonNodes.length; i++)
    {
    
            if(buttonNodes[1][1].innerHTML == buttonNodes[0][0].innerHTML 
                && buttonNodes[2][2].innerHTML == buttonNodes[0][0].innerHTML
                && buttonNodes[0][0].innerHTML != '_')
                {
                    console.log("WE HAVE A WINNER");
                    console.log(buttonNodes[0][0].innerHTML);
                    winner = true;
                    deactivate();
                    return buttonNodes[0][0].innerHTML;
                }
        
            if(buttonNodes[1][1].innerHTML == buttonNodes[2][0].innerHTML 
                && buttonNodes[2][0].innerHTML == buttonNodes[0][2].innerHTML 
                && buttonNodes[0][2].innerHTML != '_')
            {
                console.log("WE HAVE A WINNER");
                console.log(buttonNodes[2][0].innerHTML);
                winner = true;
                deactivate();
                return buttonNodes[2][0].innerHTML;
            }
        
    }
    return false;
};

let checkVertical = function()
{
    console.log("Checking Vertical");
    
    for(var i = 0; i < buttonNodes.length; i++)
    {
        
        console.log(buttonNodes[0][i].innerHTML);
        if(buttonNodes[1][i].innerHTML == buttonNodes[0][i].innerHTML 
            && buttonNodes[2][i].innerHTML == buttonNodes[0][i].innerHTML
             && buttonNodes[0][i].innerHTML != '_')
        {
            console.log("WE HAVE A WINNER");
            console.log(buttonNodes[0][i].innerHTML);
            winner = true;
            deactivate();
            return buttonNodes[0][i].innerHTML;
        }
        
    }
        
    return false;
};

let handleDraw = function()
{
    console.log("There was a draw");
    deactivate();
    // Do stuff with buttons/text to say it's a scratch
    let div = document.createElement('div');
    rootNode.appendChild(div);

    let winStatement = document.createElement('H1'); // Display tie
    let id = document.createAttribute("id");
    id.value = 'win';
    winStatement.setAttributeNode(id);
    winStatement.innerHTML = "CAT SCRATCH NOBODY WINS";
    rootNode.appendChild(winStatement);

    rootNode.appendChild(div);//new row

    appendBadVideo();

    rootNode.appendChild(div);

    //Link YT: <iframe width="560" height="315" src="https://www.youtube.com/embed/Dj1DQ9pjU34?start=19" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

};

let checkScratch = function()
{
    let scratchCount = 0;
    for (var i = 0; i < buttonNodes.length; i++)
    {
        for (var j = 0; j < buttonNodes[i].length; j++)
        {
            if (buttonNodes[i][j].disabled)
            {
                scratchCount += 1;
            }
        }
    }
    return (scratchCount >= 9) ? true : false;
}

let printBoard = function()
{
    for (var i = 0; i < buttonNodes.length; i++)
    {
        for (var j = 0; j < buttonNodes[i].length; j++)
        {
            if (buttonNodes[i][j].owned == false)
            {
                console.log(buttonNodes[i][j].innerHTML);
            }
        }
    }
};

let reset = function ()
{
    winner = false;
    scratch = false;

    for (var i = 0; i < buttonNodes.length; i++) // reset grid
    {
        for (var j = 0; j < buttonNodes[i].length; j++)
        {
            buttonNodes[i][j].owned = false;
            buttonNodes[i][j].innerHTML = '_';
            buttonNodes[i][j].disabled = false;
        }
    }
    document.getElementById("win").remove();
    document.getElementById("reset").remove();
    document.getElementById("vidID").remove();
    deactivate();
    document.getElementById("play").disabled = false;
    document.getElementById("AI").disabled = false;

}; 

let checkWinner = function()
{
    console.log("Checking for a winner");
    winner = checkDiagonal();
    console.log(winner);
    if(winner==false)
        winner = checkVertical();
    console.log(winner);
    if (winner==false)
        winner = checkHorizontal();
    console.log(winner);
    if (winner == false)
    {
        scratch = checkScratch();
        if (scratch == true)
        {
            console.log("SCRATCH");
            handleDraw();
            let btn = document.createElement('button');
            let id = document.createAttribute("id");
            id.value = 'reset';
            btn.setAttributeNode(id);
            btn.innerHTML = "Reset";
            rootNode.appendChild(btn);
            btn.addEventListener('click',reset);
        }
        else
            console.log("No winner, no scratch");
    }
    else if(winner != false)
    {
        console.log("HADLE WINNER");
        handleWinner(winner);
        let btn = document.createElement('button');
        let id = document.createAttribute("id");
        id.value = 'reset';
        btn.setAttributeNode(id);
        btn.innerHTML = "Reset";
        btn.style.margin = '500000px 10px 500000px 12px';
        
        rootNode.appendChild(btn);
        btn.addEventListener('click', reset);
    }
    else   
        console.log("UNKNOWN: " + winner);
};
