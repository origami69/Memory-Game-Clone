
import React, { useState, useEffect } from "react";
import './App.css'
var randomWords = require('random-words');
const App = () => {
 
  let [arrayObj, arrayObjSet] = useState([]);
  let [wordDis, wordSet]=useState('')
  let [lives, livesSet]=useState(3)
  let [point, pointSet]=useState(0)
 let [bestPoint, bestPointSet]=useState(0)

const display1=()=>{
  document.querySelector('.gameIntro').style.display='none'
  document.querySelector('.gameHold').style.display='flex'
  const array = randomWords(300)
  array.forEach(word => {
    arrayObj.push({
      wordCreate: word,
      wordSeen: 'no'
    })
  });
  return wordSpawner()
}
const wordSpawner=()=>{
  const ranNum= Math.floor(Math.random()*300)
  wordDis=arrayObj[ranNum].wordCreate
  wordSet(wordDis)
}
let seenWord=()=>{
  var result = arrayObj.filter(obj => {
    return obj.wordCreate === wordDis
  })
  const ranNum= Math.floor(Math.random()*300)
  if(result[0].wordSeen==='yes'){
    pointSet(point+1)
    wordDis=arrayObj[ranNum].wordCreate
    wordSet(wordDis)
  }else if(lives===1){
  if(point>bestPoint){
  bestPointSet(point)
  livesSet(lives-1)
  document.querySelector('.gameHold').style.display='none'
  document.querySelector('.gameEnd').style.display='flex'
  }else{
    livesSet(lives-1)
    document.querySelector('.gameHold').style.display='none'
    document.querySelector('.gameEnd').style.display='flex'
  }
}else{
  livesSet(lives-1)
  for (let i=0; i<arrayObj.length;i++) {
    if (arrayObj[i].wordCreate === wordDis) {
      arrayObj[i].wordSeen='yes'
    };
  }
  wordDis=arrayObj[ranNum].wordCreate
  wordSet(wordDis)
}
}
  

let notSeenWord=()=>{
  var result = arrayObj.filter(obj => {
    return obj.wordCreate === wordDis
  })
  const ranNum= Math.floor(Math.random()*300)
  if(result[0].wordSeen==='no'){
    pointSet(point+1)
    for (let i=0; i<arrayObj.length;i++) {
    if (arrayObj[i].wordCreate === wordDis) {
      arrayObj[i].wordSeen='yes'
    };
  }
  wordDis=arrayObj[ranNum].wordCreate
  wordSet(wordDis)
  }else if(lives===1){
  if(point>bestPoint){
  bestPointSet(point)
  livesSet(lives-1)
  document.querySelector('.gameHold').style.display='none'
  document.querySelector('.gameEnd').style.display='flex'
  }else{
    livesSet(lives-1)
    document.querySelector('.gameHold').style.display='none'
    document.querySelector('.gameEnd').style.display='flex'
  }
} else{
  livesSet(lives-1)
  wordDis=arrayObj[ranNum].wordCreate
  wordSet(wordDis)
}
  }
const reZeroAll=()=>{
wordDis=''
wordSet(wordDis)
lives=3
livesSet(lives)
point=0
pointSet(point)
arrayObj=[]
arrayObjSet(arrayObj)
document.querySelector('.gameEnd').style.display='none'
document.querySelector('.gameIntro').style.display='flex'
}
useEffect(()=>{
  const data= window.localStorage.getItem('my_best')
  if(data!=null){
    bestPointSet(JSON.parse(data))
  }
},[])
useEffect(() => {
  if(bestPoint!==0){
    window.localStorage.setItem('my_best', JSON.stringify(bestPoint))
  }
 },[bestPoint]);
  return (
    <div className="container">
      <div className="gameIntro">
        <div className="gameName">Word Memory Game</div>
        <div className="gameInstruct">You will be shown words and for every new word seen click New and for every word you have seen again click Seen</div>
        <button className="start" onClick={display1}>Start Game</button>
      </div>
      <div className="gameHold">
<div className="livesAndScore">
  <div className="Lives"><p>Lives   |   </p>{lives}</div>
  <div className="score"><p>Score | </p> {point}</div>
  <div className="bestScore"><p>Best Score | </p> {bestPoint}</div>
  </div>
<div className="wordPop">{wordDis}</div>
<div className="btnHolder">
  <button className="seen" onClick={seenWord}>Seen</button>
  <button className="new" onClick={notSeenWord}>New</button>
</div>
      </div>
      <div className="gameEnd">
      <div className="gameNamer">Word Memory Game</div>
      <div className="wordFinish">{point}<div className="wordsAnum">Words</div></div>
     <button className="reZero" onClick={reZeroAll}>Restart</button>
      </div>
    </div>
  );
};

export default App;
