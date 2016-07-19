function JAll()
{
	this.jBlockArr = [];
	this.currentBlock = 0;
	this.lastAchievement = "CgkI-byp9IcCEAIQHA";
	this.getBlock = function(i)
	{
		return this.jBlockArr[i];
	}
	this.getCurrentBlock = function()
	{
		return this.getBlock(this.currentBlock);
	}
	this.findLastActiveBlock = function()
	{
		while(this.getCurrentBlock().getScore() > 90)
		{
			this.currentBlock++;
		}
		this.calculateNewChances();
	}
	this.calculateNewChances = function()
	{
		if(this.isGameFinished())
		{
			for(var i = 0; i < this.size(); i++)
			{
				this.setChance(i,1/this.size());
			}
			return;
		}
		var scoreCurrentBlock = this.getCurrentBlock().getScore();
		
		if(scoreCurrentBlock > 95)
		{
			this.findLastActiveBlock();
			return;
		}
		
		//SET HEAD TO: #/2+0.5
		//SET 2nd TO: round(0.1212*#+0.3333,0.25)
		
		//SET 0.5 TO: round((T#-2)/2,1,1)
		//SET 0.25 TO: round((T#-2)/2,1,-1)
		
		for(var i = this.currentBlock; i >= 0; i--)
		{
			var chance = 0;
			if(i == this.currentBlock)
				chance = ((i+1)/2+0.5);
			else if(i == this.currentBlock - 1)
				chance = round(0.1212*(i+1)+0.3333,0.25);
			else if(i <= this.currentBlock - 2 && i >= round((this.currentBlock-2)/2,1,1))
				chance = 0.5
			else
				chance = 0.25
			this.setChance(i,chance/(this.currentBlock+1));
		}
	}
	this.setChance = function(i,c)
	{
		this.getBlock(i).setChance(c);
	}
	this.size = function()
	{
		return this.jBlockArr.length;
	}
	this.getGameScore = function()
	{
		var score = 0;
		for(var i = 0; i < this.size(); i++)
		{
			score += this.getBlock(i).getScore();
		}
 		return score/this.size();
	}
	this.isGameFinished = function()
	{
		if(this.currentBlock < this.size() - 1)
			return false;
		var score = true;
		for(var i = this.currentBlock; i >= 0; i--)
		{
			if(this.getBlock(i).getScore() < 100)
			{
				score = false;
				break;
			}
		}
 		return score;
	}
	this.addJBlock = function(jBlock)
	{
		if(this.size() > 0)
		{
			jBlock.prev = this.getBlock(this.size() - 1);
			jBlock.prev.next = jBlock;
		}
		
		this.jBlockArr.push(jBlock);
		jBlock.parent = this;
		
	}
	this.getCharacter = function()
	{
		this.calculateNewChances();
		var weighed_list = [];
		for(var i = 0; i <= this.currentBlock; i++)
		{
			var jBlock = this.getBlock(i);
			var jBlockChance = jBlock.getChance() * 10;
			for(var j = 0; j < jBlock.size(); j++)
			{
				var jChar = jBlock.getChar(j);
				var jCharChance = jChar.getChance() * 100;
				for(var k = 0; k < jBlockChance * jCharChance; k++){
					weighed_list.push(jChar);
				}
			}
			
		}
		
		return weighed_list[rand(0, weighed_list.length-1)];
	};
	this.getQuestion = function()
	{
		var jChar = this.getCharacter();
		var jCharParent = jChar.parent;
		var qa = undefined;
		var test = Math.random();
		if(test < 1/3) //romaji
		{
			qa = new QA(jChar.romaji, jCharParent.getAnswers(false,true,true), JChar.TYPE.ROMAJI);
		}
		else if(test < 2/3) //hiragana
		{
			qa = new QA(jChar.hiragana, jCharParent.getAnswers(true,false,true), JChar.TYPE.HIRAGANA);
		}
		else{				//katakana
			qa = new QA(jChar.katakana,jCharParent.getAnswers(true,true,false), JChar.TYPE.KATAKANA);
		}
		return new Q(qa,jChar);
		
	}
	this.getJSON = function()
	{
		var saveObj = {};

		for(var i = 0; i < this.jBlockArr.length; i++)
		{
			var jBlock = this.jBlockArr[i];
			var block = {};
			for(var j = 0; j < jBlock.jCharArr.length; j++)
			{
				var jChar = jBlock.jCharArr[j];
				var chrData = {};
				chrData["hScore"] = jChar.hScore;
				chrData["kScore"] = jChar.kScore;

				block[jChar.romaji] = chrData;
			}
			saveObj[jBlock.blockChar] = block;
		}
		return JSON.stringify({timestamp: new Date().getTime(), gameScore: this.getGameScore(), data: saveObj});
	};
	this.save = function(jsonData)
	{
		var saveObj = jsonData || this.getJSON();
		localStore.setJSON(saveObj);
		return saveObj;
	}
	this.load = function()
	{
		var nullTimeObj			= {timestamp: 0, gameScore: 0}
		var nullTimeJSON		= JSON.stringify(nullTimeObj);
		var internalJsonData 	= localStore.getJSON() || nullTimeJSON;
		var loadInternal 		= JSON.parse(internalJsonData);

		var saveObj = loadInternal.data;
		for(var i = 0; i < this.jBlockArr.length; i++)
		{
			var jBlock = this.jBlockArr[i];
			if(saveObj.hasOwnProperty(jBlock.blockChar))
			{
				var saveObjBlock = saveObj[jBlock.blockChar];
				for(var j = 0; j < jBlock.jCharArr.length; j++)
				{
					var jChar = jBlock.jCharArr[j];
					if(saveObjBlock.hasOwnProperty(jChar.romaji))
					{
						jChar.hScore = saveObjBlock[jChar.romaji].hScore;
						jChar.kScore = saveObjBlock[jChar.romaji].kScore;
					}
				}
			}
		}
		this.findLastActiveBlock();
	}
}