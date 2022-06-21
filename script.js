var totcount =5;
var curCount =0;
var userCount=0, botCount=0;


var Game = document.getElementById('Game');
var start = document.getElementById('start');
var user = document.getElementById('user');
var comp = document.getElementById('comp');
var itreator = document.getElementById('iteration');
var container = document.getElementById('element-container');


function startGame(){
    start.innerHTML = "Started ";
    Game.style.display="inline";
    user.innerHTML = "YOU : 0";
    comp.innerHTML = "COMPUTER : 0";
    itreator.innerHTML = curCount+ "/" + totcount;
}

function rpsGame(yourChoice){
    //Get user choice
    var userChoice = yourChoice.id;
    //Get bot choice
    console.log(randomNumber());
    var botChoice = numberToChoice(randomNumber());
    console.log(botChoice);
    //get result
    var result = decideWinner(userChoice,botChoice);
    console.log(result);
    //get message u need to print
    var message = getMessage(result);
    console.log(message.msg);
    //change frontend
    rpsFrontEnd(userChoice,botChoice,message);
}

function randomNumber(){ 
   return  Math.floor(Math.random()*3);
}

function numberToChoice(n){
    if(n==0) return "rock";
    else if(n==1) return "paper";
    else return "scissor";
}

function decideWinner(user, bot){
    if(user=="rock"){
        if(bot=="rock") return [1,1];
        else if(bot=="paper") return [0,1];
        else return [1,0];        
    }
    else if(user == "scissor"){
        if(bot=="rock") return [0,1];
        else if(bot=="paper") return [1,0];
        else return [1,1];    
    }
    else{
        if(bot=="rock") return [1,0];
        else if(bot=="paper") return [1,1];
        else return [0,1];  
    }
}

function getMessage(arr){
    if(arr[0]==1 && arr[1]==1) {
        return {'msg' : "It's a Tie"};
    }
    else if(arr[0]==1 && arr[1]==0){
       userCount+=1; 
       return {'msg' : 'You Won! Keep It Up'};
    }
    else if(arr[0]==0 && arr[1]==1){
        botCount+=1;
        return {'msg' :'You Lost! Better Luck Next Time'};
    }
}

function rpsFrontEnd(user,bot,message){
    document.getElementById('chooseText').innerHTML = "Round  Result";
    var imageData = {
        'rock' : document.getElementById('rock').src ,
        'paper' : document.getElementById('paper').src ,
        'scissor' : document.getElementById('scissor').src
    }
    document.getElementById('rock-div').style.display = 'none';
    document.getElementById('paper-div').style.display = 'none';
    document.getElementById('sicssor-div').style.display = 'none';
    

    var humandiv = document.createElement('div');
    humandiv.innerHTML = "<img src ='"+  imageData[user]+"'/>";
    humandiv.setAttribute('class','element-mod');
    var botdiv = document.createElement('div');
    botdiv.setAttribute('class','element-mod');
    botdiv.innerHTML = "<img src ='"+  imageData[bot] + "'/>";
    var msgdiv = document.createElement('div');
    msgdiv.setAttribute('class','element-mod');
    msgdiv.innerHTML = "<p>"+message['msg']+"</p>";
   
    container.appendChild(humandiv);
    container.appendChild(msgdiv);
    container.appendChild(botdiv);

    

    setTimeout(()=>{
        humandiv.remove();
        botdiv.remove();
        msgdiv.remove();
        backToMain();
    },2000);
}

function backToMain(){
    curCount+=1;
    user.innerHTML = "YOU : "+ userCount;
    comp.innerHTML = "COMPUTER : "+ botCount  ;
    if(curCount<totcount) itreator.innerHTML = curCount+1+ "/" + totcount; 
    if(curCount == totcount) { 
       let winner;   
       if(userCount>botCount) winner = "Hurry!! You Won The Game"; 
       else if(userCount == botCount) winner = "It's a Tie ";
       else winner = " You Lost!! Better Luck Next Time"; 
       return showFinalResult(winner);
    }   
    document.getElementById('chooseText').innerHTML = "CHOOSE ONE";
    document.getElementById('rock-div').style.display = 'inline';
    document.getElementById('paper-div').style.display = 'inline';
    document.getElementById('sicssor-div').style.display = 'inline';
 }

 function showFinalResult(win){
    document.getElementById('chooseText').innerHTML = "Final  Result ";
    var main_div = document.createElement('div');
    main_div.innerHTML=win;
    main_div.setAttribute('id','final-result-div');
    container.appendChild(main_div);
 }


 function stopGame(){
     var game = document.getElementById('Game');
     game.style.display="none";
     var div = document.createElement('div');
     div.innerHTML = "<p>IT'S SAD TO SEE YOU GO !</p>"
     div.setAttribute('id','end_div')
     var body = document.getElementById('bd');
     body.appendChild(div);

 }