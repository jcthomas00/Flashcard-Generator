//Cloze Card constructor
function ClozeCards(text, cloze){
	//check for proper input
	if (this.partial = this.clozeDelete(text, cloze)){
		this.fullText = text;
		this.cloze = cloze;
	} 
	//throw error if proper input is not received
	else throw "Something seems to be wrong with your input. Please try again";
}

ClozeCards.prototype.clozeDelete = (text, cloze)=>{
	//if text and cloze are not null and cloze is in text, replace cloze in text w/... and return
	if(text && cloze && (text.search(cloze))>0){
		return text.replace(cloze, "...");
	}
	return false;
}

module.exports.ClozeCards = ClozeCards;

