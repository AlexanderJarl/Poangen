var getClickedBox;
var boxId;
var playerId;
var diceNum;
var diceArray = [];
var multfHouseArray = [];
var chanceArray = [];
var selectedDiceArray = [];
var shadowdrop = 0;
var selectedDiceCounter;
var uporlow;
var language = ["English", "Swedish"];
var addAnotherDice = true;
var value = 0;
const statesfHouse = ["pair", "three", "done"];
var statefHouse;
var diceStyle;
var modalTitle = document.getElementById('modalTitle');
var colorArrayDice = ["rgba(255, 0, 0, 0.3)","rgba(255, 148, 0, 0.3)","rgba(255, 255, 0, 0.3)","rgba(0, 255, 0, 0.6)","linear-gradient(to bottom right, #33ccff 0%, #66ff99 25%, #ff9933 50%, #ff66cc 75%, #ff99cc 100%)"];
var sixColorArrayDice = ["rgba(255, 0, 0, 0.3)","rgba(255, 148, 0, 0.3)","rgba(255, 255, 0, 0.3)","rgba(148, 255, 0, 0.3)", "rgba(0, 255, 0, 0.3)",  "rgba(0, 255, 0, 0.6)"];
var states = ["Before", "During", "After"];
var yatzyGameState = states[0];
var rowInfo = ["pair", "twopair", "triple",
              "quad", "sStraight", "lStraight",
               "fHouse","chance","Yatzy"];
var nbrOfPlayers = 6;
const rules = ["Count and Add only Aces","Count and Add only Twos","Count and Add only Threes","Count and Add only Fours","Count and Add only Fives","Count and Add only Sixes"];
var playernames = ["Al","Ra", "Ja", "Be", "Ce"];
const dicevals = ["Ones","Twos","Threes","Fours","Fives","Sixes"];
var modal = document.getElementById('resultModal');
var closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
window.addEventListener("keyup", checkKeyPressed, false);

function checkKeyPressed(e) {
    if (e.keyCode == "32") {
        generatePlayingField(nbrOfPlayers, playernames);
    }
}

function clickedBox(e){

//Gets the target box, takes the ID and breaks it apart
//into various identificators. Then calls the upper or
//lower modal creation functions based on the value of uporlow
  playerId = +e.target.id.charAt(1);
  uporlow = e.target.id.charAt(3);
  diceNum = +e.target.id.charAt(4);
  if(uporlow==='d'){
    generateUppderModal(playerId, diceNum);
  }else if(uporlow==='f'){
    generateLowerModal(playerId, diceNum);
  }else{
      console.log("Something went wrong at" + playerId + uporlow + diceNum);
  }
modal.style.display = 'block';
}

function generateUppderModal(playerId, diceNum){
  var parent = document.getElementById('resModalContent');
  var child;
  var p = playerId;
  var r = diceNum;
  modalTitle.innerHTML = 'How many ' + dicevals[diceNum-1].toLowerCase() + ' did you score?';
  var scratchParent = document.getElementsByClassName('modalScratch')[0];
  var scratchLowerChild = document.createElement('button');
  scratchLowerChild.setAttribute("class","popupButton");
  scratchLowerChild.setAttribute("type","button");
  scratchLowerChild.setAttribute("value", 0);
  scratchLowerChild.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
  scratchLowerChild.id = 'p' + p + '_d' + diceNum + '-diceU';
  scratchLowerChild.innerHTML = "None - Scratch This";
  scratchParent.appendChild(scratchLowerChild);
  for(let i = 0; i<5; i++){
    var value = +diceNum+(i*+diceNum);
    var styling = 0;
    child = document.createElement('img');
    child.setAttribute("class","diceImage modalImage"+i);
    child.setAttribute("src","./images/dice"+diceNum+".png");
    child.id = 'p' + playerId + '_d' + diceNum + '-dice' +i;
    child.addEventListener('mouseover', stylePrevious);
    child.addEventListener('mouseout', styleout);
    child.setAttribute("alt",+diceNum+(i*+diceNum));
    child.setAttribute("onclick", "updateLowerInput(this.id, this.alt)");
    parent.appendChild(child);
  }
}

function stylePrevious(e){
  var p = e.target.id.charAt(1);
  var n = e.target.id.charAt(4);
  var x = e.target.id.charAt(10);
  var userId = ('p' + p + '_d' + n + '-dice');
  for (var i = x; i > -1; i--) {
    diceStyle = document.getElementsByClassName('diceImage')[i];
    diceStyle.style.background = colorArrayDice[x];
  }
}

function styleout(e){
  var p = e.target.id.charAt(1);
  var n = e.target.id.charAt(4);
  var x = e.target.id.charAt(10);
  var children = document.getElementById('resModalContent').children.length;
  for (var i = 0; i < children; i++) {
    diceStyle = document.getElementsByClassName('diceImage')[i];
    diceStyle.style.background = '#fff';
}
}

function getSecondPart(str) {
    return str.split('_');
}

function getFirstPart(str) {
    return str.split('-')[0];
}

function styleDice(e){

  var y = e.target.id.charAt(10);
  var x = document.getElementById(e.target.id);

  x.style.background = sixColorArrayDice[y];
}

function checkSelectedDice(){
  var dices = document.getElementById('resModalContent').children;
  selectedDiceCounter = 0;
  value = 0;
  for (var i = 0; i < dices.length; i++) {
    if (dices[i].classList.contains('diceHighlight')) {
        selectedDiceCounter +=1;
        value += +dices[i].alt;
    }
  }

  return selectedDiceCounter;
}



function calculateValueTwopair(){
  var dices = document.getElementById('resModalContent').children;

  value = 0;
  for (var i = 0; i < dices.length; i++) {
    if (dices[i].classList.contains('diceHighlight')) {

        value += +dices[i].alt;
    }
  }

  return value;

}

function calculateValuefHouse(){

  var value = 0;
  for (var i = 0; i < diceArray.length; i++) {
    value += +diceArray[i].alt*+multfHouseArray[i];
    console.log(value);

  }

  return value;

}

function calculateValueChance(){

  var value = 0;
  for (var i = 0; i < chanceArray.length; i++) {
    value += +chanceArray[i].alt;
    console.log(value);

  }

  return value;

}

function selectTwoPairDice(e){
  var clickedDice = document.getElementById(e.target.id);
  var header = document.getElementsByClassName('modalHeader')[0];
  var okBtn = document.getElementsByClassName('okButton')[0];
  var x;
  var y;

  if(addAnotherDice){
    clickedDice.classList.toggle('diceHighlight');
  }else{
    clickedDice.classList.remove('diceHighlight');
  }

  x = checkSelectedDice();
  y = calculateValueTwopair();

  if(x < 2 ){
    okBtn.classList.add('btnInactive');
    if (x == 0) {
      okBtn.innerHTML = 'Select two more dice';
      okBtn.disabled = true;
      addAnotherDice=true;
    }else{
      okBtn.innerHTML = 'Select one more dice';
      addAnotherDice=true;
      okBtn.disabled = true;
      okBtn.classList.add('btnInactive');
      okBtn.classList.remove('btnActive');
    }
  }else if (x == 2){
    addAnotherDice = false;
    okBtn.disabled = false;
    okBtn.setAttribute("value", calculateValueTwopair);
    okBtn.classList.remove('btnInactive');
    okBtn.classList.add('btnActive');

    okBtn.innerHTML = 'OK - '+ calculateValueTwopair();
    okBtn.value = calculateValueTwopair();
 }
}

function selectChance(e){
  var clickedDice = document.getElementById(e.target.id);
  var okBtn = document.getElementsByClassName('okButton')[0];
  var dices = document.getElementById('resModalContent').children;
  var sum;

  if(addAnotherDice){
    for (var i = 0; i < dices.length; i++) {

      if (clickedDice == dices[i] ) {
          selectedDiceCounter += 1;
          chanceArray.push(clickedDice);
          selectedDiceArray[i] += 1;
          console.log(selectedDiceArray);
          sum = selectedDiceArray.reduce(function(a,b){ return a+b; },0);
          console.log("Sum is "+sum);
          shadowdrop += selectedDiceArray[i]+4;
          console.log("Vlue in dicearray is "+selectedDiceArray[i]);
          console.log("Shadowdrop is " +shadowdrop);
          dices[i].style.transform += "translateY(-7px)";
          dices[i].style.boxShadow = "2px "+shadowdrop+"px "+ shadowdrop + "px 3px rgba(0,0,0,0.4)";
          okBtn.innerHTML = "Select the dice you got ("+ (5-sum) +" remaining)";
          console.log(+clickedDice.alt);
          console.log(chanceArray);
          if(chanceArray.length >= 5){
            addAnotherDice = false;
            okBtn.disabled = false;
            okBtn.setAttribute("value", calculateValueChance);
            okBtn.classList.remove('btnInactive');
            okBtn.classList.add('btnActive');

            okBtn.innerHTML = 'OK - '+ calculateValueChance();
            okBtn.value = calculateValueChance();
          }
      }
    }
  }else{

  }
}


function isClicked(dice) {
  if(dice.classList.contains('diceHighlight')){
    return true;
  }else{
    return false;
  }
}

function selectfHouseDice(e){

  //Not there yet, cant change your mind twice...
  var clickedDice = document.getElementById(e.target.id);
  var header = document.getElementsByClassName('modalHeader')[0];

  console.log(diceArray);

  var okBtn = document.getElementsByClassName('okButton')[0];
  var x;
  var addedDie;
  var addedDieHard;
  var reversed = false;

  if(isClicked(clickedDice)){
  clickedDice.classList.remove('diceHighlight');
  addedDie = diceArray.indexOf(clickedDice);
  if(true){
    if (multfHouseArray[addedDie]==2){
    statefHouse = statesfHouse[0];
    diceArray.splice(addedDie,1);
    multfHouseArray.splice(addedDie,1);
    for (var i = 0; i < 2; i++) {
      addedDieHard = selectedDiceArray.indexOf(clickedDice);
      selectedDiceArray.splice(addedDie, 1);
      console.log("removing " + clickedDice);

    }
    reversed = true;
    console.log("I reversed it!");
    console.log("The remaining item should be the three: " + diceArray[0]);
    console.log("This should be 3: " + multfHouseArray[0]);
    okBtn.innerHTML = "You need to select the pair again!";
    disableOkButton();
  }else if(multfHouseArray[addedDie]==3){
    statefHouse = statesfHouse[1];
    diceArray.splice(addedDie,1);
    multfHouseArray.splice(addedDie,1);
    for (var i = 0; i < 3; i++) {
      addedDieHard = selectedDiceArray.indexOf(clickedDice);
      selectedDiceArray.splice(addedDie, 1);
      console.log("removing " + clickedDice);

    }
    console.log("The remaining item should be the two: " + diceArray[0]);
    console.log("This should be 2: " + multfHouseArray[0]);
    disableOkButton();
    okBtn.innerHTML = "You need to select the three of a kind again!";
  }else{
    console.log("Pas possible!");
  }
}
  console.log("Has index " + addedDie);
}else if(statefHouse == statesfHouse[0] && addAnotherDice){
  clickedDice.classList.add('diceHighlight');
  diceArray.push(clickedDice);
  multfHouseArray.push(2);
  for (var i = 0; i < 2; i++) {
    selectedDiceArray.push(clickedDice);
    console.log("pushing " + clickedDice);
    console.log("This is the selectedDiceArray: " + selectedDiceArray);
  }
  console.log("pushed 2")
  if(diceArray.length == 2){
    statefHouse = statesfHouse[2];
    fullHouseOk();
  }else{
    statefHouse = statesfHouse[1];
    disableOkButton();
    okBtn.innerHTML = "Now you need to select the three of a kind";
    console.log("I should not be immediately followed by ");
  }
  console.log(statefHouse);
}else if(statefHouse == statesfHouse[1] && addAnotherDice && !reversed){
  console.log("me. Damnit!");
  clickedDice.classList.add('diceHighlight');
  diceArray.push(clickedDice);
  multfHouseArray.push(3);
  for (var i = 0; i < 3; i++) {
    selectedDiceArray.push(clickedDice);
    console.log("pushing " + clickedDice);
    console.log("This is the selectedDiceArray: " + selectedDiceArray);
  }
  console.log("pushed 3");
  if(diceArray.length == 2){
    statefHouse = statesfHouse[2];
    fullHouseOk();
  }else{
    statefHouse = statesfHouse[0];
    disableOkButton();
    okBtn.innerHTML = "You need to select the pair again";

  }
  console.log(statefHouse);
}else if(statefHouse == statesfHouse[0] && addAnotherDice && reversed){
  clickedDice.classList.add('diceHighlight');
  diceArray.push(clickedDice);
  multfHouseArray.push(2);
  for (var i = 0; i < 2; i++) {
    selectedDiceArray.push(clickedDice);
    console.log("pushing " + clickedDice);
  }
  console.log("pushed 2 again");
  if(diceArray.length == 2){
    statefHouse = statesfHouse[2];
    fullHouseOk();
  }else{
    statefHouse = statesfHouse[1];
    disableOkButton();
    okBtn.innerHTML = "You need to select the three of a kind again";
  }
  console.log(statefHouse);
  for (var i = 0; i < diceArray.length; i++) {
    console.log(diceArray[i]);
    header.appendChild(diceArray[i]);
  }
}

function fullHouseOk(){
  addAnotherDice = false;
  okBtn.disabled = false;
  okBtn.setAttribute("value", calculateValuefHouse);
  okBtn.classList.remove('btnInactive');
  okBtn.classList.add('btnActive');

  okBtn.innerHTML = 'OK - '+ calculateValuefHouse();
  okBtn.value = calculateValuefHouse();
}

function disableOkButton(){
  okBtn.classList.add('btnInactive');
  if(okBtn.classList.contains('btnActive')){
    okBtn.classList.remove('btnActive');
  }
  okBtn.disabled = true;
  addAnotherDice=true;
}
  x = checkSelectedDice();



}



function generateLowerModal(player, rownr){
  var parent = document.getElementById('resModalContent');
  var child;
  var p = player;
  var r = rownr;
  var scratchParent = document.getElementsByClassName('modalScratch')[0];
  scratchLowerChild = document.createElement('button');
  scratchLowerChild.setAttribute("class","popupButton");
  scratchLowerChild.setAttribute("type","button");
  scratchLowerChild.setAttribute("value", 0);
  scratchLowerChild.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
  scratchLowerChild.id = 'p' + p + '_f' + rownr + '-diceL';
  scratchLowerChild.innerHTML = "None - Scratch This";
  scratchParent.appendChild(scratchLowerChild);
  valueTwopair=0;
  if(rowInfo[rownr-1] === 'pair' || rowInfo[rownr-1] === 'triple' || rowInfo[rownr-1] === 'quad' ){
    for(let i = 0; i<6; i++){
      var x = i+1;

      child = document.createElement('img');
      child.setAttribute("class","diceImage modalImage"+i);
      child.setAttribute("src","./images/dice"+ x +".png");
      child.id = 'p' + p + '_f' + rownr + '-dice' +i;
      if(rowInfo[rownr-1] === 'pair'){
      child.setAttribute("alt",+x*2);
      modalTitle.innerHTML = 'What pair did you score?';
      }else if(rowInfo[rownr-1] === 'triple'){
      child.setAttribute("alt",+x*3);
      modalTitle.innerHTML = 'What triple did you score?'
      }else {
      child.setAttribute("alt",+x*4);
      modalTitle.innerHTML = 'What quadruple did you score?'
      }
      child.addEventListener('mouseover', styleDice);
      child.addEventListener('mouseout', styleout);
      child.setAttribute("onclick", "updateLowerInput(this.id, this.alt)");
      parent.appendChild(child);
    }
  }else if (rowInfo[rownr-1] === 'sStraight') {
  var sStraightBtn = document.createElement('button');
    sStraightBtn.setAttribute("class","scoreButton");
    sStraightBtn.setAttribute("type","button");
    sStraightBtn.setAttribute("value", 15);
    sStraightBtn.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    sStraightBtn.id = 'p' + p + '_f' + rownr + '-dices';
    sStraightBtn.innerHTML = "I did get a small straight!";
    modalTitle.innerHTML = 'Did you get a small straight?'
    scratchLowerChild.innerHTML = "No - Scratch This";
    parent.appendChild(sStraightBtn);
  }else if (rowInfo[rownr-1] === 'lStraight') {
  var lStraightBtn = document.createElement('button');
    lStraightBtn.setAttribute("class","scoreButton");
    lStraightBtn.setAttribute("type","button");
    lStraightBtn.setAttribute("value", 20);
    lStraightBtn.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    lStraightBtn.id = 'p' + p + '_f' + rownr + '-dicel';
    lStraightBtn.innerHTML = "I did get a big straight!";
    modalTitle.innerHTML = 'Did you get a big straight?'
    scratchLowerChild.innerHTML = "No - Scratch This";
    parent.appendChild(lStraightBtn);
  }else if (rowInfo[rownr-1] === 'Yatzy') {
  var yatzyBtn = document.createElement('button');
    yatzyBtn.setAttribute("class","yatzyButton");
    yatzyBtn.setAttribute("type","button");
    yatzyBtn.setAttribute("value", 50);
    yatzyBtn.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    yatzyBtn.id = 'p' + p + '_f' + rownr + '-diceY';
    yatzyBtn.innerHTML = "YES! I GOT THE YATZY!!";
    modalTitle.innerHTML = 'WOW - Did you just get YATZY??'
    scratchLowerChild.innerHTML = "No - Scratch This";
    parent.appendChild(yatzyBtn);
  }else if (rowInfo[rownr-1] === 'twopair') {
    var scratchOk = document.createElement('button');
    modalTitle.innerHTML = 'What two pairs did you get?'
    scratchOk.setAttribute("class","okButton");
    scratchOk.setAttribute("type","button");

    scratchOk.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    scratchOk.id = 'p' + p + '_f' + rownr + '-diceO';
    scratchOk.innerHTML = "Ok";
    selectedDiceCounter = 0;
    for(let i = 0; i<6; i++){
      var x = i+1;
      child = document.createElement('img');
      child.setAttribute("class","diceImage modalImage"+i);
      child.setAttribute("src","./images/dice"+ x +".png");
      child.id = 'p' + p + '_f' + rownr + '-dice' +i;
      child.setAttribute("alt",+x*2);
      child.addEventListener('mouseover', styleDice);
      child.addEventListener('mouseout', styleout);
      child.addEventListener('click', selectTwoPairDice);
      parent.appendChild(child);
    }
    parent = document.getElementsByClassName('modalOk')[0];
    parent.appendChild(scratchOk);
    scratchOk.classList.add('btnInactive');
    scratchOk.innerHTML = 'Select two dice';
    scratchOk.disabled = true;
  }else if (rowInfo[rownr-1] === 'fHouse') {
    var scratchOk = document.createElement('button');
    modalTitle.innerHTML = 'Nice, did you roll a full house?';
    scratchOk.setAttribute("class","okButton");
    scratchOk.setAttribute("type","button");

    scratchOk.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    scratchOk.id = 'p' + p + '_f' + rownr + '-diceO';
    scratchOk.innerHTML = "Ok";
    selectedDiceCounter = 0;
    for(let i = 0; i<6; i++){
      var x = i+1;
      child = document.createElement('img');
      child.setAttribute("class","diceImage modalImage"+i);
      child.setAttribute("src","./images/dice"+ x +".png");
      child.id = 'p' + p + '_f' + rownr + '-dice' +i;
      child.setAttribute("alt", x)
      child.addEventListener('mouseover', styleDice);
      child.addEventListener('mouseout', styleout);
      child.addEventListener('click', selectfHouseDice);
      parent.appendChild(child);
    }
    parent = document.getElementsByClassName('modalOk')[0];
    parent.appendChild(scratchOk);
    scratchOk.classList.add('btnInactive');
    scratchOk.innerHTML = 'Select the pair';
    scratchOk.disabled = true;
    statefHouse = statesfHouse[0];
    diceArray = [];
    multfHouseArray = [];
    selectedDiceArray = [];

  }else if (rowInfo[rownr-1] === 'chance') {
    var scratchOk = document.createElement('button');
    modalTitle.innerHTML = 'What will be your chance?';
    scratchOk.setAttribute("class","okButton");
    scratchOk.setAttribute("type","button");

    scratchOk.setAttribute("onclick", "updateLowerInput(this.id, this.value)");
    scratchOk.id = 'p' + p + '_f' + rownr + '-diceO';
    scratchOk.innerHTML = "Ok";
    selectedDiceCounter = 0;
    selectedDiceArray = [];
    for(let i = 0; i<6; i++){
      var x = i+1;
      child = document.createElement('img');
      child.setAttribute("class","diceImage modalImage"+i);
      child.setAttribute("src","./images/dice"+ x +".png");
      child.id = 'p' + p + '_f' + rownr + '-dice' +i;
      child.setAttribute("alt", x)
      child.addEventListener('mouseover', styleDice);
      child.addEventListener('mouseout', styleout);
      child.addEventListener('click', selectChance);
      parent.appendChild(child);
      selectedDiceArray.push(0);
    }
    parent = document.getElementsByClassName('modalOk')[0];
    parent.appendChild(scratchOk);
    scratchOk.classList.add('btnInactive');
    scratchOk.innerHTML = 'Select the dice you got (5 remaining)';
    scratchOk.disabled = true;
    addAnotherDice = true;
    shadowdrop = 0;
    chanceArray = [];
    selectedDiceCounter = 0;

  }else{
    console.log("Darn" + rowInfo[rownr-1]);
  }
  modal.style.display = "block";

}

function clearModal(){
  var modalBody = document.getElementById('resModalmain').children;
  for (var i = 1; i < modalBody.length; i++) {
    while (modalBody[i].firstChild) {
      modalBody[i].removeChild(modalBody[i].firstChild);
    }
  }
  while(diceArray.length > 0){
    diceArray.shift();
  }
}

function closeModal(){
  clearModal();
  modal.style.display = "none";
}

function outsideClick(e){
  if(e.target == modal){
    closeModal();
  }
}

function updateLowerInput(id, valuex){
  boxId = getFirstPart(id);
  console.log(boxId);
  var value = valuex;
  getClickedBox = document.getElementById(boxId);
  var input = document.getElementById(boxId + '_inp');
  console.log(boxId  + '_inp');
  console.log(input);
  input.value = value;
  console.log(value);
  if(value > 0){
    getClickedBox.innerHTML = input.value;
  }else{
    getClickedBox.innerHTML = '---';
  }
  closeModal();
  checkUpperCompletion();
  checkLowerCompletion();
  addAnotherDice = true;
  diceArray = [];
}

function updateUpperInput(id, valuex){
  boxId = getFirstPart(id);
  console.log(boxId);
  var value = valuex;
  getClickedBox = document.getElementById(boxId);
  var input = document.getElementById(boxId + '_inp');
  input.value = value;
  console.log(value);
  if(value > 0){
    getClickedBox.innerHTML = input.value;
  }else{
    getClickedBox.innerHTML = '---';
  }
  closeModal();
  checkUpperCompletion();
  checkLowerCompletion();
}

function checkUpperCompletion(){
 var upperScoreBox;
 var upperScore = 0;
 var counter;
 var upperBonusBox;
 var box;

   for (var i = 0; i < playernames.length; i++) {
     var idd = i+1;
     upperScore = 0;
     counter = 0;
     upperScoreBox = document.getElementById('p'+idd+'_uResult');
     upperBonusBox = document.getElementById('p'+idd+'_bonus');
     for (var j = 0; j < rules.length; j++) {
       var idp = j+1;
       boxId = document.getElementById('p'+idd+'_d'+idp+'_inp');
        box = document.getElementById('p'+idd+'_d'+idp);
       if(box.innerHTML != ''){
         upperScore += +boxId.value;
        } else{
        counter += 1;
        }
     }
     if(counter === 0){
       upperScoreBox.innerHTML = upperScore;

       if(upperScore > 62){
         upperBonusBox.innerHTML = 50;
      }else{
        upperBonusBox.innerHTML = 0;
      }
    }
   }
 }

 function checkLowerCompletion(){
  var upperScoreBox;
  var totalScoreBox;
  var upperBonusBox;
  var totalScore;
  var totalCounter;
  var box;
  var boxId;

    for (var i = 0; i < playernames.length; i++) {
      var idd = i+1;
      totalScore = 0;
      totalCounter = 0;
      upperScoreBox = document.getElementById('p'+idd+'_uResult');
      upperBonusBox = document.getElementById('p'+idd+'_bonus');
      totalScoreBox = document.getElementById('p'+idd+'_total');
      if(upperScoreBox.innerHTML != ''){
        totalScore += +upperScoreBox.innerHTML;
        totalScore += +upperBonusBox.innerHTML;
       }else{
       totalCounter += 1;
       }

      for (var j = 0; j < rowInfo.length; j++) {
        var idp = j+1;
        boxId = document.getElementById('p'+idd+'_f'+idp+'_inp');
         box = document.getElementById('p'+idd+'_f'+idp);
        if(box.innerHTML != ''){
          totalScore += +boxId.value;
         }else{
         totalCounter += 1;
         }
      }
      if(totalCounter==0){
        totalScoreBox.innerHTML = totalScore;

    }
    }
  }

function allFinished(){
  var finishedCounter = 0;
  for (var i = 0; i < playernames.length; i++) {
    var idd = i+1;
    for (var j = 0; j < rules.length; j++) {
      var idp = j+1;
       var box = document.getElementById('p'+idd+'_d'+idp);
      if(box.innerHTML != ''){
        finishedCounter += 1;
      }
    }
    for (var j = 0; j < rowInfo.length; j++) {
      var idp = j+1;
       var box = document.getElementById('p'+idd+'_f'+idp);
      if(box.innerHTML == ''){
        finishedCounter += 1;
        console.log("Finishedcounter is "+  finishedCounter);
      }
    }
  }
  if(finishedCounter==0){
    return true;
  }else{
    return false;
  }
}
