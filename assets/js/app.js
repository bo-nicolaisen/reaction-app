



let myTimerElement = null;
let myResultElement = null;
let myReactionBox=null;
let myStartTime=null;

const myApp = document.getElementById("app");

createGameView();



function createGameView() {
console.log('game view');
    let myHeadline=document.createElement('h2');
    myHeadline.innerText='REACTION TEST';

   myReactionBox = document.createElement('section');
  myReactionBox.classList.add('target');



  myResultElement = document.createElement('p');
  myResultElement.innerText='press start and click the box when it turns green!';

  let myStartButton = document.createElement('button');
  myStartButton.innerText='START';
  myStartButton.addEventListener('pointerdown',(e)=>{
    startGame();
  });


  myApp.appendChild(myHeadline);
  myApp.appendChild(myReactionBox);
  myApp.appendChild(myResultElement);

  myApp.appendChild(myStartButton);
 
}



function startGame(){
    console.log('game started');
    myResultElement.innerText='wait for it!';
    let randomStart=generateRandom(500,2000);


    // med callback
    //setTimeout(()=>{ triggerActivation(); }, randomStart);
    //

    // med promise
    let myPromise = new Promise((myResolve, myReject)=>{

        setTimeout(function () {
          myResolve("go");
        }, randomStart);


      });

      myPromise.then(()=>{
        triggerActivation();
      });
      //
}

function triggerActivation(){
    myStartTime = Date.now();

    myReactionBox.addEventListener('pointerdown',stopTimer,false);
    myReactionBox.classList.toggle('activeTarget');
    myResultElement.innerText='CLICK!'

}


function stopTimer(e){
    console.log('target hit stopping timer');
    let myResult=Date.now() - myStartTime;
    myReactionBox.classList.toggle('activeTarget');
    myReactionBox.removeEventListener('pointerdown',stopTimer,false);

    myResultElement.innerText=`Reaktionstid: ${(myResult*0.001).toFixed(4)} sekunder`;
}








function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}