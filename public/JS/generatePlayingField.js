

function generatePlayingField(nbrPlayers, playernames, language ){
  var parentRow;
  var lang = language;
  var divchild1;
  var divchild2;
  var mainParent = document.getElementsByTagName('main')[0];
  var parentSection;
  var formParent;
  var boxChild;
  var formChild;
  var scratch;
  //Generate Player Header in Nav Row

  for (var p = 0; p < playernames.length; p++) {
    parentRow = document.getElementsByClassName('navRow')[0];
    boxChild = document.createElement('div');
    boxChild.setAttribute("class","playerHeader");
    boxChild.innerHTML = playernames[p];
    parentRow.appendChild(boxChild);
  }
  //Generate static backdrop - 4 sections
  // for(var i = 0; i < 4; i++){
  //   parentSection = document.createElement('section');
  //   parentSection.setAttribute("id", "section"+i);
  //   mainParent.appendChild(parentSection);
  //   if(i==0){
  //     divchild1 = document.createElement('div');
  //     divchild1.classList.add('titleRow');
  //     parentSection.appendChild(divchild1);
  //     divchild2 = document.createElement('div');
  //     divchild2.classList.add('titleRowLabel');
  //     divchild2.textContent = yatzyRuleInfo.row0[lang];
  //     divchild1.appendChild(divchild2);
  //   }else if (i == 1) {
  //     for (var j = 1; j < 7; j++) {
  //       divchild1 = document.createElement('div');
  //       divchild1.classList.add('row');
  //       parentSection.appendChild(divchild1);
  //       divchild2 = document.createElement('div');
  //       divchild2.classList.add('diceval');
  //       divchild2.textContent = "Hej";
  //       divchild1.appendChild(divchild2);
  //       divchild2 = document.createElement('div');
  //       divchild2.classList.add('icon');
  //
  //       divchild1.appendChild(divchild2);
  //       divchild2 = document.createElement('div');
  //       divchild2.classList.add('diceval');
  //
  //       divchild1.appendChild(divchild2);
  //     }
  //   }
  //
  // }



  //Generate the Upper section, dices 1-6

  for (var i = 0; i < dicevals.length; i++) {
    parentRow = document.getElementsByClassName('row')[i];
    formParent = document.getElementsByClassName('scoresheet')[0];
    var idd = i+1;
    for (var j = 0; j < playernames.length; j++) {
      var idp = j+1;

      boxChild = document.createElement('div');
      boxChild.setAttribute("class", "scoreBox");
      boxChild.addEventListener('click', clickedBox);
      boxChild.id = 'p'+idp + '_d' +idd;

      parentRow.appendChild(boxChild);
      formChild = document.createElement('input');
      formChild.setAttribute("type","hidden");
      formChild.id = 'p'+idp + '_d' +idd + '_inp';
      formParent.appendChild(formChild);

    }
  }
  //Generate Upper half score Section
  parentRow = document.getElementsByClassName('row')[6];
  for (var i = 0; i < playernames.length; i++) {
    boxChild = document.createElement('div');
    var u = i+1;
    boxChild.setAttribute("class","resultbox");
    boxChild.id = 'p' + u + '_uResult';
    parentRow.appendChild(boxChild);
  }
  //Generate Bonus Row
  parentRow = document.getElementsByClassName('row')[7];
  for (var i = 0; i < playernames.length; i++) {
    boxChild = document.createElement('div');
    var u = i+1;
    boxChild.setAttribute("class","resultbox");
    boxChild.id = 'p' + u + '_bonus';
    parentRow.appendChild(boxChild);
  }
  //Generate lower section
  parentRow = document.getElementsByClassName('icon')[7];
      parentRow.append(sumImage());

  parentRow = document.getElementsByClassName('icon')[8];
      parentRow.append(bonusImage());

  parentRow = document.getElementsByClassName('icon')[9];
  for (var i = 0; i < 2; i++) {
      parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[10];
  for (var i = 0; i < 2; i++) {
      parentRow.append(grayDiceImage());
  }
  parentRow.append(plusImage());
  for (var i = 0; i < 2; i++) {
      parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[11];
for (var i = 0; i < 3; i++) {
    parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[12];
for (var i = 0; i < 4; i++) {
    parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[13];
for (var i = 0; i < 5; i++) {
    parentRow.append(grayDiceImage());
  }
  parentRow.append(emptyDiceImage());

  parentRow = document.getElementsByClassName('icon')[14];
parentRow.append(emptyDiceImage());
for (var i = 0; i < 5; i++) {
    parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[15];
  for (var i = 0; i < 2; i++) {
      parentRow.append(grayDiceImage());
  }
  parentRow.append(plusImage());
  for (var i = 0; i < 3; i++) {
      parentRow.append(grayDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[16];
  for (var i = 0; i < 5; i++) {
    parentRow.append(emptyDiceImage());
  }

  parentRow = document.getElementsByClassName('icon')[17];
  for (var i = 0; i < 5; i++) {
    parentRow.append(grayDiceImage());
  }


   for (var i = 0; i < rowInfo.length; i++) {
     parentRow = document.getElementsByClassName('row')[8+i];
     formParent = document.getElementsByClassName('scoresheet')[0];
     var idd = i+1;
     for (var j = 0; j < playernames.length; j++) {
       var idp = j+1;
       boxChild = document.createElement('div');
       boxChild.setAttribute("class", "scoreBox");
       boxChild.addEventListener('click', clickedBox);
       boxChild.id = 'p'+idp + '_f' + idd;
       parentRow.appendChild(boxChild);
       formChild = document.createElement('input');
       formChild.setAttribute("type","hidden");
       formChild.id = 'p'+idp + '_f' + idd + '_inp';
       formParent.appendChild(formChild);

     }

   }
   console.log(formParent);
   console.log(document.getElementById('lowerHalfResult'));
  //Generate Total Score Row
  parentRow = document.getElementsByClassName('row')[17];
  for (var i = 0; i < playernames.length; i++) {
    boxChild = document.createElement('div');
    var u = i+1;
    boxChild.setAttribute("class","resultbox");
    boxChild.id = 'p' + u + '_total';
    parentRow.appendChild(boxChild);
  }
}
