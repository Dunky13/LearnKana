function JChar(romaji, hiragana, katakana)
{
	this.romaji = romaji;
	this.hiragana = hiragana;
	this.katakana = katakana;
	this.hScore = 0;
	this.kScore = 0;
	this.minimalChance = 0.05;
	this.tmpChance = 1;
	this.getScore = function()
	{
		return (this.hScore + this.kScore) / 2;
	}
	this.getChance = function()
	{
		var score = this.getScore();
		if(score < 10){return 1;}
		else
		{
			var chance = Math.abs(Math.log10(score)-2);
			return chance > this.minimalChance ? chance : this.minimalChance;
		}
	}
	this.parent = undefined;
	this.hCorrect = function(){this.hScore++;}
	this.kCorrect = function(){this.kScore++;}
	this.hFalse = function(){this.hScore > 0 ? this.hScore-- : 0;}
	this.kFalse = function(){this.kScore > 0 ? this.kScore-- : 0;}
	this.hBonus = function(){this.hScore += 0.5;}
	this.kBonus = function(){this.kScore += 0.5;}
	
}
JChar.TYPE = {
	ROMAJI: "R",
	HIRAGANA: "H",
	KATAKANA: "K"
}