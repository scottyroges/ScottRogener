if(cardBackgroundArray.length==0)cardBackgroundArray.push('images/card_bg1.gif'); //these are set before initialize is called
var cardTypes = ['s','d','h','c'];
var cardColors = {'s':0,'d':1,'h':1,'c':0}; //black =0 red = 1
var cardObjectArray = new Array();
var cardCounter  = 0;
var cardMoveTarget = false;
var thievesStackArray = new Array();
var acesStackArray = new Array();
var freecellArray = new Array();

var deckCount = 0;

var cardMove_initMouseX;
var cardMove_initMouseY;
	
var cardInitX;
var cardInitY;
	
var cardMoveCounter = -1;
var cardToMove = false;
	
var verticalSpaceBetweenCards = 20;

var freecells = 0;

function initSolitaire() //script starts here
	{
		var imageArray = new Array();
		var bgImagei = Math.floor(Math.random()*cardBackgroundArray.length); //selects background image (set in html)
		for(go=0;go<2;go++){
			for(var i=0;i<cardTypes.length;i++){ //creating all the cards
				imageArray[i] = new Array();
				
				for(var j=1;j<=13;j++){
					imageArray[i][j] = new Image();
					imageArray[i][j].src = 'images/bg_' + cardTypes[i] + j + '.gif';
					
					var div = document.createElement('DIV');  //creates div for card to sit
					div.id = cardTypes[i] + j+"_"+go;
					console.log(cardTypes[i] + j+"_"+go);
					div.cardType = cardTypes[i];
					div.numericValue = j;
					div.className='card';
					div.style.left = '0px';
					var img = document.createElement('IMG'); //front of card
					img.src = imageArray[i][j].src;
					img.style.position = 'absolute';
					img.style.top = '0px';
					img.style.paddingLeft = '1px';
					img.style.paddingRight = '2px';
					img.style.paddingTop = '5px';
					img.style.paddingBottom = '1px';
					img.style.backgroundColor='#FFF';
					img.onselectstart = cancelEvent;
					img.ondragstart = cancelEvent;
					img.ondblclick = finishCard;
					img.style.border = '1px solid #000000';
				
					img.onmousedown = initCardMove;
					
					var coverImage = document.createElement('IMG'); //back of card
					
					coverImage.src = cardBackgroundArray[bgImagei];
					coverImage.style.position = 'absolute';
					//coverImage.style.zIndex = '2';				
					coverImage.onselectstart = cancelEvent;
					coverImage.ondragstart = cancelEvent;
					coverImage.onclick = initRevealCard;
					coverImage.style.border = '1px solid #000000';			
					coverImage.style.paddingLeft = '0px';
					coverImage.style.paddingRight = '0px';
					coverImage.style.backgroundColor='#CCC';
					div.appendChild(img); //add front of card to div
					div.appendChild(coverImage); //add back of card to div		
					cardObjectArray.push(div); //add card to card arrat	
					cardCounter++; //increase card counter
				}	
			}	
		}
		document.body.onmousemove = cardMove;
		document.body.onmouseup = stopMoveCard;
		
		var bg_aces = document.getElementById('bg_aces');
		for(var i=0;i<8;i++){
			var div = document.createElement('DIV');
			div.style.width = '72px';
			div.style.position = 'absolute';
			div.style.top = '20px';
			div.style.left = 20 + (i*110) + 'px';
			div.style.height = '100px';
			div.style.backgroundRepeat = 'i-repeat';
			div.style.border='1px dotted #CCC';
			div.id = 'bgEnd' + i;			
			bg_aces.appendChild(div);	
			acesStackArray.push(div);	
		}
		
		var bg_thieves = document.getElementById('bg_thieves');
		for(var i=0;i<10;i++){
			var div = document.createElement('DIV');
			div.style.width = '130px';
			div.style.position = 'absolute';
			div.style.top = '20px';
			div.id = 'bg_thieves_card'+i;
			div.style.left = 20 + (i*105) + 'px';
			div.style.height = '120px';
			div.style.backgroundRepeat = 'i-repeat';
			//div.style.border='1px dotted #CCC';
			bg_thieves.appendChild(div);	
			thievesStackArray.push(div);	
		}
		
		var bg_freecells = document.getElementById('bg_freecells');
		for(var i = 0; i < 2; i++)
		{
			var div = document.createElement('DIV');
			div.style.width = '72px';
			div.style.position = 'absolute';
			div.style.top = 20 + (i*110) + 'px';
			div.style.left = '40px' ;
			div.style.height = '100px';
			div.style.backgroundRepeat = 'i-repeat';
			div.style.border='1px dotted red';
			div.id = 'freecell' + i;
			bg_freecells.appendChild(div);
			freecellArray.push(div);
		}
		
		//document.getElementById('bg_deck_down').onclick = restartDeck; DONT NEED
		
		resetGame();
		
			 
	}
	
function finishCard()
	{
		var card = this.parentNode;
		for(var i = 0; i < acesStackArray.length; i++)
		{
			var subDivs = acesStackArray[i].getElementsByTagName('DIV');
			if(subDivs.length == 0 && card.numericValue == 1) 
			{
				console.log("auto move ace");
				card.style.top = '0px';
				acesStackArray[i].appendChild(card);
				return;
			}
			else if(subDivs.length > 0 && (card.cardType == subDivs[subDivs.length-1].cardType) && (card.numericValue ==subDivs[subDivs.length-1].numericValue +1))
			{
				card.style.top = '0px';
				subDivs[subDivs.length-1].appendChild(card);
				return;
			}
			
		}
	}
	
function resetGame()
	{
		cardObjectArray = cardObjectArray.sort(sortCards);
		deckCount = 0;
		var bgDeck = document.getElementById('bg_deck_down');
		for(var i=0;i<cardObjectArray.length;i++){

			cardObjectArray[i].style.top = '0px';
			coverCard(cardObjectArray[i]);		
			cardObjectArray[i].style.left = '0px';
			bgDeck.appendChild(cardObjectArray[i]);
			cardObjectArray[i].location="deck_down";
			deckCount++;
			showDeckCount();
		}		
		
		dealCards();
		
	}
	
function dealCards()
	{
		var cardCounter = 0;
		for(var i=0;i<4;i++){
			for(var j=0;j<10;j++){
				var obj = document.getElementById('bg_thieves_card'+j);
				var subs = obj.getElementsByTagName('DIV');
				if(subs.length==0){
					obj.appendChild(cardObjectArray[cardCounter]);
					cardObjectArray[cardCounter].style.top = '0px';
				}else{
					subs[subs.length-1].appendChild(cardObjectArray[cardCounter]);	
					cardObjectArray[cardCounter].style.top = verticalSpaceBetweenCards + 'px';
				}
				
				revealCard(cardObjectArray[cardCounter]);
				cardObjectArray[cardCounter].location="column"+j;
				deckCount--;
				showDeckCount();
				cardCounter++;
			}			
		}		
	}
	
function initRevealCard()
	{
		var parentObj = getTopDiv(this);
		if(parentObj.id=='bg_deck_down'){
			var subDivs = parentObj.getElementsByTagName('DIV');
			var maxIndex = subDivs.length-1;
			/*if(subDivs.length>0){
				var divsShown = document.getElementById('bg_deck_shown').getElementsByTagName('DIV');
				for(var i=0;i<divsShown.length;i++){
					divsShown[no].style.left='0px';
				}					
			}

			for(var i=maxIndex;i>minIndex;i--){
				revealCard(subDivs[i]);
				subDivs[i].style.left = (maxIndex-i) * 10 + 'px'; 
				document.getElementById('bg_deck_shown').appendChild(subDivs[i]);
			}*/
			revealCard(subDivs[maxIndex]);
			document.getElementById('bg_deck_shown').appendChild(subDivs[maxIndex]);
			deckCount--;
			showDeckCount();
			return false;
		}	
	}
	
function showDeckCount()
	{
		var deck = document.getElementById('deckCount');
		deck.innerText = "Cards Left: " + deckCount.toString();
	}
	
function cancelEvent()
	{
		return false;
	}
	
function sortCards(a,b)
	{
		return Math.random() - Math.random();	
	}
	
function revealCard(divObj)
	{
		var imgs = divObj.getElementsByTagName('IMG');
		imgs[1].style.display='none';
		
	}
	
function coverCard(divObj)
	{
		var imgs = divObj.getElementsByTagName('IMG');
		imgs[1].style.display='';		
	}
	
function getTopDiv(inputDiv)
	{
		while(inputDiv.parentNode && inputDiv.tagName!='BODY'){			
			if(inputDiv.id.indexOf('bg_')>=0)return inputDiv;
			inputDiv = inputDiv.parentNode;
		}		
		return inputDiv;
	}
	
function numberFreecells()
	{
		var empty = 0;
		for(var i = 0; i < thievesStackArray.length; i++)
		{
			var subDivs = thievesStackArray[i].getElementsByTagName("DIV");
			if(subDivs.length==0) empty++;
		}
		for(var i = 0; i < freecellArray.length; i++)
		{
			var subDivs = freecellArray[i].getElementsByTagName('DIV');
			if(subDivs.length==0) empty++;
		}
		freecells=empty;
		console.log("freecells : " + freecells.toString());
	}

//card moving functions	
	function initCardMove(e)
	{
		
		if (!e) var e = window.event;
		cardMoveTarget = this.parentNode.parentNode;
		cardToMove = this.parentNode;
		//console.log("initCardMove this.parent.parent: " + this.parentNode.parentNode.id);
		/*if(cardMoveTarget.id=='bg_deck_shown'){
			var subDivs = cardMoveTarget.getElementsByTagName('DIV');
			if(subDivs[subDivs.length-1]!=this.parentNode)return;		
		}*/
		//console.log("initCardMove topDiv: " + getTopDiv(this).id);
		topDiv = getTopDiv(this);
		if(topDiv.id.substring(0,15) == "bg_thieves_card") {
			numberFreecells();
			var subDivs = cardToMove.getElementsByTagName('DIV');
			var numericValue = cardToMove.numericValue;
			var cardType = cardToMove.cardType;
			for(var i = 0; i < subDivs.length; i++) {
				console.log("initCardMove -child: " + subDivs[i].id);
				if(subDivs[i].numericValue != numericValue - (i +1) || subDivs[i].cardType != cardType) return;
			}
			if(subDivs.length > freecells) return;
		}
		
		//console.log("initCardMove - cardToMove : " + cardToMove.id);
		cardMoveCounter = 0;
		cardMove_initMouseX = e.clientX;
		cardMove_initMouseY = e.clientY;
		
		cardInitX = getleftPos(this.parentNode.parentNode);
		//console.log("initCardMove - cardInitX : " + cardInitX.toString());
		cardInitY = getTopPos(this.parentNode.parentNode);
		//console.log("initCardMove - cardInitY : " + cardInitY.toString());		
		startCardMove();
		
		return false;
	}
	
	function startCardMove() 
	{
		//console.log("startCardMove-cardMoveCounter: " + cardMoveCounter.toString());
		if(cardMoveCounter>=0 && cardMoveCounter<10){
			cardMoveCounter = cardMoveCounter + 1;
			setTimeout('startCardMove()',10);
		}
		if(cardMoveCounter>=10){
			//cardToMove.style.left = '0px';
			document.getElementById('movingCardContainer').style.left= cardInitX +'px';
			document.getElementById('movingCardContainer').style.top= cardInitY/1 + 5 +'px';
			document.getElementById('movingCardContainer').appendChild(cardToMove);
		}		
	}
	
	function cardMove(e) //only functions when a card is picked up (cardMoveCounter specifies this)
	{
		//console.log("cardMove-cardMoveCounter: " + cardMoveCounter.toString());
		if(cardMoveCounter>=10){ 
			if (!e) var e = window.event;
			//console.log("cardMove-left: " + (e.clientX - cardMove_initMouseX + cardInitX/1).toString() + ' px');
			document.getElementById('movingCardContainer').style.left = e.clientX - cardMove_initMouseX + cardInitX/1 + 'px' ;
			//console.log("cardMove-top: " + (e.clientY/1 - cardMove_initMouseY/1 + cardInitY/1).toString() + ' px');
			document.getElementById('movingCardContainer').style.top = e.clientY/1 - cardMove_initMouseY/1 + cardInitY/1 + 'px';
		}
	}
	
	function stopMoveCard(e)
	{
		if(cardMoveCounter==-1)return;
		cardMoveCounter = -1;
		if (!e) var e = window.event;
		var divs = document.getElementById('movingCardContainer').getElementsByTagName('DIV');
		if(divs.length==0)return;
		var moveObj = document.getElementById('movingCardContainer');
		var leftPos = moveObj.style.left.replace('px','')/1;
		var topPos = moveObj.style.top.replace('px','')/1;	
		for(var i=0;i<thievesStackArray.length;i++){
			var tmpLeft = getleftPos(thievesStackArray[i]);
			var tmpTop = getTopPos(thievesStackArray[i]);			
			var subDivs = thievesStackArray[i].getElementsByTagName('DIV').length;
			if(leftPos>=tmpLeft-70 && leftPos<=tmpLeft+70 && topPos>=tmpTop-100 && topPos<=(tmpTop+100 + (subDivs*10))){
				var topDivTarget = getTopDiv(cardMoveTarget);
				if(topDivTarget!=thievesStackArray[i]){
					var tmpDivs = thievesStackArray[i].getElementsByTagName('DIV');					
					var cardTypeThis = divs[0].cardType;
					var numericIDThis = divs[0].numericValue;					
					if(tmpDivs.length==0){
							divs[0].style.left = '0px';
							divs[0].style.top = '0px';
							thievesStackArray[i].appendChild(divs[0]);
							return; 						
					}else{						
						var destDiv = tmpDivs[tmpDivs.length-1];						
						var cardTypeDest = destDiv.cardType;						
						var numericIDDest = destDiv.numericValue;						
						if(cardTypeDest==cardTypeThis && numericIDDest-1==numericIDThis){
							divs[0].style.top = verticalSpaceBetweenCards + 'px';
							divs[0].style.left = '0px';
							destDiv.appendChild(divs[0]);
							return; 
						}
					}
				}	
			}			
		}
		var gameFinished = true;
		for(var i=0;i<acesStackArray.length;i++){
			var tmpLeft = getleftPos(acesStackArray[i]);
			var tmpTop = getTopPos(acesStackArray[i]);			
			var tmpDivs = acesStackArray[i].getElementsByTagName('DIV');			
			
			if(leftPos>=tmpLeft-70 && leftPos<=tmpLeft+70 && topPos>=tmpTop-100 && topPos<=tmpTop+100){
				var topDivTarget = getTopDiv(cardMoveTarget);
				if(topDivTarget!=acesStackArray[i] && divs.length==1){
					var cardTypeThis = divs[0].cardType;
					var numericIDThis = divs[0].numericValue;
					if(tmpDivs.length==0){
						if(numericIDThis==1){
							divs[0].style.left = '0px'
							divs[0].style.top = '0px' 
							acesStackArray[i].appendChild(divs[0]);
							return; 
						}
						
					}else{
						var destDiv = tmpDivs[tmpDivs.length-1];						
						var cardTypeDest = destDiv.cardType;						
						var numericIDDest = destDiv.numericValue;						
						if(cardTypeDest==cardTypeThis && numericIDDest==(numericIDThis-1)){
							divs[0].style.left = '0px';
							divs[0].style.top = '0px';
							destDiv.appendChild(divs[0]);
							return; 
						}
					}   
				}	
			}

			if(tmpDivs.length<13)gameFinished=false;						
			
		}
		
		for(var i = 0; i < freecellArray.length; i++)
		{
			var tmpLeft = getleftPos(freecellArray[i]);
			var tmpTop = getTopPos(freecellArray[i]);
			var tmpDivs = freecellArray[i].getElementsByTagName('DIV');
			
			if(leftPos>=tmpLeft-70 && leftPos<=tmpLeft+70 && topPos>=tmpTop-100 && topPos<=tmpTop+100){
				var topDivTarget = getTopDiv(cardMoveTarget);
				if(topDivTarget!=freecellArray[i] && divs.length==1){
					var cardTypeThis = divs[0].cardType;
					var numericIDThis = divs[0].numericValue;
					if(tmpDivs.length==0){
							divs[0].style.left = '0px'
							divs[0].style.top = '0px' 
							freecellArray[i].appendChild(divs[0]);
							return; 
					}   
				}	
			}
			
		}
		
		if(gameFinished){
			alert("Congratulations! - you did it.\nThank you for trying this game at www.dhtmlgoodies.com");
		}
		
		
		if(divs.length>0){
			if(cardMoveTarget.id!='bg_deck_shown')divs[0].style.left = '0px';
			cardMoveTarget.appendChild(divs[0]);			
		}
	}
	
function getTopPos(inputObj) 
	{
		
	  var returnValue = inputObj.offsetTop;
	  while((inputObj = inputObj.offsetParent) != null){
	  	returnValue += inputObj.offsetTop;
	  }
	  return returnValue;
	}
	
function getleftPos(inputObj)
	{
	  var returnValue = inputObj.offsetLeft;
	  while((inputObj = inputObj.offsetParent) != null)returnValue += inputObj.offsetLeft;
	  return returnValue;
	}
