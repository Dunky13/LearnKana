function JBlock(blockChar, chance)
{
	this.jCharArr 		= [];
	this.parent 		= undefined;
	this.prev 			= undefined;
	this.next 			= undefined;
	this.blockChar 		= blockChar;
	this.minChance 		= 0;
	this.chance 		= chance < this.minChance ? this.minChance : chance;
	this.achievementId	= undefined;
	this.addJChar 	= function(jChar)
	{
		this.jCharArr.push(jChar);
		jChar.parent = this;
	}
	this.getChance = function()
	{
		return this.chance;
	}
	this.setChance = function(c)
	{
		this.chance = c;
	}
	this.getChar = function(i) //Same as get()
	{
		if(i < 0 || i >= this.jCharArr.length)
			return undefined;
		return this.jCharArr[i];
	}
	this.get = function(i)
	{
		return this.getChar(i);
	}
	this.getChars = function()
	{
		return this.jCharArr;
	}
	this.size = function()
	{
		return this.jCharArr.length;
	}
	this.setAchievementID = function(s)
	{
		this.achievementId = s;
	}
	this.getAchievementID = function()
	{
		return this.achievementId;
	}
	this.unlockAchievement = function()
	{
		g.unlockAchievement(this.getAchievementID());
		g.revealAchievement(this.next.getAchievementID());
	}
	this.getRandom = function(i)
	{
		var randomList = [];
		i = typeof i !== 'undefined' ? i : 1;
		
		if(this.size() < i)
		{
			var j = i - this.size();
			if(this.prev !== undefined)
				randomList = this.prev.getRandom(j);
			else if(this.next !== undefined)
				randomList = this.next.getRandom(j);
			i -= j;
		}
		
		while(randomList.length < i)
		{
			var randChar = this.get(rand(0,this.size()-1));
			if(randomList.indexOf(randChar)> -1)
				randomList.push(randChar);
		}
	}
	this.getScore = function()
	{
		var score = 0;
		for(var i = 0; i < this.size(); i++)
		{
			score += (this.get(i).getScore()*10);
		}
		return score/this.size();
	}
	// More Sorting & Shuffling to do from neighbors.
	this.getAnswers = function(romaji, hiragana, katakana)
	{
		var numOfAnswers = 10;
		var answers = []
		var tmpCharArr = this.jCharArr;
		
		while(tmpCharArr.length < numOfAnswers/2){
			if(this.prev !== undefined)
				tmpCharArr = tmpCharArr.concat(this.prev.getRandom((numOfAnswers/2)-tmpCharArr.length));
			else if(this.next !== undefined)
				tmpCharArr = tmpCharArr.concat(this.next.getRandom((numOfAnswers/2)-tmpCharArr.length));
			else
				break;
		}
		
		for(var i = 0; i < tmpCharArr.length; i++)
		{
			var jChar = tmpCharArr[i];
			if(romaji)		answers.push(jChar.romaji);
			if(hiragana) 	answers.push(jChar.hiragana);
			if(katakana)	answers.push(jChar.katakana);
		}
			
		return shuffle(answers);
	}
}
