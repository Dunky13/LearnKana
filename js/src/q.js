function QA(q,a,t){
	this.question = q;
	this.answers = a;
	this.type = t;
}
function Q(qa,jChar){
	this.qa = qa;
	this.jChar = jChar;
	this.answer = function(chr){
		if(this.qa.question === chr)
			return undefined;
		var correct = this.jChar;
		if(this.jChar.romaji === chr)
		{
			if(qa.type === JChar.TYPE.HIRAGANA){jChar.hCorrect();}
			else if(qa.type === JChar.TYPE.KATAKANA){jChar.kCorrect();}
		}
		else if(this.jChar.hiragana === chr)
		{
			if(qa.type === JChar.TYPE.ROMAJI){jChar.hCorrect();}
			else if(qa.type === JChar.TYPE.KATAKANA){jChar.kCorrect();jChar.hBonus();}
		}
		else if(this.jChar.katakana === chr)
		{
			if(qa.type === JChar.TYPE.HIRAGANA){jChar.hCorrect();jChar.kBonus();}
			else if(qa.type === JChar.TYPE.ROMAJI){jChar.kCorrect();}
		}
		else if(qa.type === JChar.TYPE.HIRAGANA){
			jChar.hFalse();
			correct = undefined;
		}
		else if(qa.type === JChar.TYPE.KATAKANA){
			jChar.kFalse();
			correct = undefined;
		}
		else
		{
			correct = undefined;
		}
		return correct;
	}
}