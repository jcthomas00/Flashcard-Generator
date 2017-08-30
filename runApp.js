let exportObjs = require("./ClozeCard.js"), 
	inquirer = require('inquirer'),
	cardFlag = true,
	flashCards = [],
	ClozeCard, BasicCard;
ClozeCard = exportObjs.ClozeCards;
exportObjs = require('./BasicCard.js');
BasicCard = exportObjs.basicCards;

console.log("***********************WELCOME TO FLASHCARDER********************************");
function cardItUp(cardFlag){
	let front;
	if (!cardFlag){
		return;
	}else{
		cardFlag = false;
		inquirer.prompt({
			type: "list",
			name: "cardType",
			message: "What would you like to do?",
			//Main menu choices
			choices:[{name: "Create A Basic Card"}, {name: "Create A Cloze Card"}, {name: "Play Cards"}, {name: "Exit"}]
		}).then(
			function doStuff(ans){
				switch (ans.cardType){
					case "Create A Basic Card":
						inquirer.prompt({
							name: "cardFront",
							message: "Please enter the text on the FRONT of the card ",
						}).then(function doStuff(ans){
							front = ans.cardFront
							inquirer.prompt({
								name: "cardBack",
								message: "Please enter the text on the BACK of the card ",
							}).then(function doStuff(ans){
								//get user prompts, create basic card and push to array
								flashCards.push(new BasicCard(front,ans.cardBack));
								console.log("Basic card was created.");								
								//back to main menu
								cardItUp(cardFlag=true);
							});
						});
						break;
					case "Create A Cloze Card":
						inquirer.prompt({
							name: "fullText",
							message: "Please enter the text on the FULL text:",
						}).then(function doStuff(ans){
							front = ans.fullText
							inquirer.prompt({
								name: "clozeText",
								message: "Please enter the text on the CLOZE text:",
							}).then(function doStuff(ans){
								try{
									//get user prompts, create cloze card and push to array
									flashCards.push(new ClozeCard(front,ans.clozeText));								
									console.log("Cloze card was created.");								
								} catch(e){
									//catch any errors thrown by cloze constructor
									console.log(e);								
								} finally{
									//back to main menu
									cardItUp(cardFlag=true);
								}
							});
						});
						break;
					case "Play Cards":
						playCards(flashCards.length);
						break;
					case "Exit":
						return;
					default:
						break;
				}
		});
	} //End of recursive else
} //End of function


function playCards(arrayLength){
	if (arrayLength > 0){
			//determine if this is cloze or basic card and retrieve question
			let question = flashCards[arrayLength-1].partial ? flashCards[arrayLength-1].partial : flashCards[arrayLength-1].front;
			inquirer.prompt({
				name: "answer",
				message: "FRONT: " + question + "\n BACK:",
			}).then(function doStuff(ans){
				//determine if this is cloze or basic card and retrieve answer
				let answer = flashCards[arrayLength-1].cloze ? flashCards[arrayLength-1].cloze : flashCards[arrayLength-1].back;
				if (ans.answer === answer){
					console.log(`You got it! "${answer}" is correct.`);
				}else{
					console.log(`Sorry, the correct answer was "${answer}".`);	
				}
				//recursively step through the flash card array
				playCards(--arrayLength);			
			});		
	} else {
				//tell user end of flash cards and back to main menu
				console.log("End of Flash Cards.")
				cardItUp(cardFlag=true);					
	}
}

//Start the madness
cardItUp(cardFlag);