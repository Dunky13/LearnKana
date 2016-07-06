var rand = function(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
function round(value, step, dir) {
    step || (step = 1.0);
	dir || (dir = 0);
    var inv = 1.0 / step;
	var round = 0;
	if(dir == 1)
		round = Math.ceil(value * inv) / inv;
	else if(dir == -1)
		round = Math.floor(value * inv) / inv;
	else
		round = Math.round(value * inv) / inv;
    return round;
}
function shuffle(array, rounds) {
	rounds = typeof rounds !== 'undefined' ? rounds : 3;
	for(var i = 0; i < rounds; i++)
	{
		var counter = array.length;
		while (counter > 0) {
			var index = Math.floor(Math.random() * counter);
			counter--;
			var temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
	}
    return array;
}
function getChanceList(array){
	var tmp = []
	for(var i = 0; i < array.length; i++)
	{
		tmp.push(array[i].chance);
	}
	return tmp;
}
var loadCharacters = function(){
	var jAll = new JAll();
	
	var vowelBlock = new JBlock('v',1);
	jAll.addJBlock(vowelBlock);
	vowelBlock.addJChar(new JChar("a", "あ", "ア"));
	vowelBlock.addJChar(new JChar("i", "い", "イ"));
	vowelBlock.addJChar(new JChar("u", "う", "ウ"));
	vowelBlock.addJChar(new JChar("e", "え", "エ"));
	vowelBlock.addJChar(new JChar("o", "お", "オ"));
	
	var kBlock = new JBlock('k',0);
	jAll.addJBlock(kBlock);
	kBlock.addJChar(new JChar("ka", "か", "カ"));
	kBlock.addJChar(new JChar("ki", "き", "キ"));
	kBlock.addJChar(new JChar("ku", "く", "ク"));
	kBlock.addJChar(new JChar("ke", "け", "ケ"));
	kBlock.addJChar(new JChar("ko", "こ", "コ"));

	var sBlock = new JBlock('s',0);
	jAll.addJBlock(sBlock);
	sBlock.addJChar(new JChar("sa", "さ", "サ"));
	sBlock.addJChar(new JChar("shi", "し", "シ"));
	sBlock.addJChar(new JChar("su", "す", "ス"));
	sBlock.addJChar(new JChar("se", "せ", "セ"));
	sBlock.addJChar(new JChar("so", "そ", "ソ"));

	var tBlock = new JBlock('t',0);
	jAll.addJBlock(tBlock);
	tBlock.addJChar(new JChar("ta", "た", "タ"));
	tBlock.addJChar(new JChar("chi", "ち", "チ"));
	tBlock.addJChar(new JChar("tsu", "つ", "ツ"));
	tBlock.addJChar(new JChar("te", "て", "テ"));
	tBlock.addJChar(new JChar("to", "と", "ト"));
	
	var nBlock = new JBlock('n',0);
	jAll.addJBlock(nBlock);
	nBlock.addJChar(new JChar("na", "な", "ナ"));
	nBlock.addJChar(new JChar("ni", "に", "ニ"));
	nBlock.addJChar(new JChar("nu", "ぬ", "ヌ"));
	nBlock.addJChar(new JChar("ne", "ね", "ネ"));
	nBlock.addJChar(new JChar("no", "の", "ノ"));
	
	var hBlock = new JBlock('h',0);
	jAll.addJBlock(hBlock);
	hBlock.addJChar(new JChar("ha", "は", "ハ"));
	hBlock.addJChar(new JChar("hi", "ひ", "ヒ"));
	hBlock.addJChar(new JChar("fu", "ふ", "フ"));
	hBlock.addJChar(new JChar("he", "へ", "ヘ"));
	hBlock.addJChar(new JChar("ho", "ほ", "ホ"));
	
	var mBlock = new JBlock('m',0);
	jAll.addJBlock(mBlock);
	mBlock.addJChar(new JChar("ma", "ま", "マ"));
	mBlock.addJChar(new JChar("mi", "み", "ミ"));
	mBlock.addJChar(new JChar("mu", "む", "ム"));
	mBlock.addJChar(new JChar("me", "め", "メ"));
	mBlock.addJChar(new JChar("mo", "も", "モ"));
	
	var yBlock = new JBlock('y',0);
	jAll.addJBlock(yBlock);
	yBlock.addJChar(new JChar("ya", "や", "ヤ"));
	yBlock.addJChar(new JChar("yu", "ゆ", "ユ"));
	yBlock.addJChar(new JChar("yo", "よ", "ヨ"));
	
	var rBlock = new JBlock('r',0);
	jAll.addJBlock(rBlock);
	rBlock.addJChar(new JChar("ra", "ら", "ラ"));
	rBlock.addJChar(new JChar("ri", "り", "リ"));
	rBlock.addJChar(new JChar("ru", "る", "ル"));
	rBlock.addJChar(new JChar("re", "れ", "レ"));
	rBlock.addJChar(new JChar("ro", "ろ", "ロ"));
	
	var vowelBlock = new JBlock('w',0);
	jAll.addJBlock(vowelBlock);
	vowelBlock.addJChar(new JChar("wa", "わ", "ワ"));
	vowelBlock.addJChar(new JChar("wo", "を", "ヲ"));
	vowelBlock.addJChar(new JChar("n", "ん", "ン"));
	
	var gBlock = new JBlock('g',0);
	jAll.addJBlock(gBlock);
	gBlock.addJChar(new JChar("ga", "が", "ガ"));
	gBlock.addJChar(new JChar("gi", "ぎ", "ギ"));
	gBlock.addJChar(new JChar("gu", "ぐ", "グ"));
	gBlock.addJChar(new JChar("ge", "げ", "ゲ"));
	gBlock.addJChar(new JChar("go", "ご", "ゴ"));
	
	var zBlock = new JBlock('z',0);
	jAll.addJBlock(zBlock);
	zBlock.addJChar(new JChar("za", "ざ", "ザ"));
	zBlock.addJChar(new JChar("ji (z)", "じ", "ジ"));
	zBlock.addJChar(new JChar("zu", "ず", "ズ"));
	zBlock.addJChar(new JChar("ze", "ぜ", "ゼ"));
	zBlock.addJChar(new JChar("zo", "ぞ", "ゾ"));
	
	var dBlock = new JBlock('d',0);
	jAll.addJBlock(dBlock);
	dBlock.addJChar(new JChar("da", "だ", "ダ"));
	dBlock.addJChar(new JChar("ji (d)", "ぢ", "ヂ"));
	dBlock.addJChar(new JChar("zu", "づ", "ヅ"));
	dBlock.addJChar(new JChar("de", "で", "デ"));
	dBlock.addJChar(new JChar("do", "ど", "ド"));
	
	var bBlock = new JBlock('b',0);
	jAll.addJBlock(bBlock);
	bBlock.addJChar(new JChar("ba", "ば", "バ"));
	bBlock.addJChar(new JChar("bi", "び", "ビ"));
	bBlock.addJChar(new JChar("bu", "ぶ", "ブ"));
	bBlock.addJChar(new JChar("be", "べ", "ベ"));
	bBlock.addJChar(new JChar("bo", "ぼ", "ボ"));
	
	var pBlock = new JBlock('p',0);
	jAll.addJBlock(pBlock);
	pBlock.addJChar(new JChar("pa", "ぱ", "パ"));
	pBlock.addJChar(new JChar("pi", "ぴ", "ピ"));
	pBlock.addJChar(new JChar("pu", "ぷ", "プ"));
	pBlock.addJChar(new JChar("pe", "ぺ", "ペ"));
	pBlock.addJChar(new JChar("po", "ぽ", "ポ"));
	pBlock.addJChar(new JChar("vu", "ゔ", "ゔ"));
	
	var kyBlock = new JBlock('ky',0);
	jAll.addJBlock(kyBlock);
	kyBlock.addJChar(new JChar("kya", "きゃ", "キャ"));
	kyBlock.addJChar(new JChar("kyu", "きゅ", "キュ"));
	kyBlock.addJChar(new JChar("kyo", "きょ", "キョ"));
	
	var shBlock = new JBlock('sh',0);
	jAll.addJBlock(shBlock);
	shBlock.addJChar(new JChar("sha", "しゃ", "シャ"));
	shBlock.addJChar(new JChar("shu", "しゅ", "シュ"));
	shBlock.addJChar(new JChar("sho", "しょ", "ショ"));
	
	var chBlock = new JBlock('ch',0);
	jAll.addJBlock(chBlock);
	chBlock.addJChar(new JChar("cha", "ちゃ", "チャ"));
	chBlock.addJChar(new JChar("chu", "ちゅ", "チュ"));
	chBlock.addJChar(new JChar("cho", "ちょ", "チョ"));
	
	var nyBlock = new JBlock('ny',0);
	jAll.addJBlock(nyBlock);
	nyBlock.addJChar(new JChar("nya", "にゃ", "ニャ"));
	nyBlock.addJChar(new JChar("nyu", "にゅ", "ニュ"));
	nyBlock.addJChar(new JChar("nyo", "にょ", "ニョ"));
	
	var hyBlock = new JBlock('hy',0);
	jAll.addJBlock(hyBlock);
	hyBlock.addJChar(new JChar("hya", "ひゃ", "ヒャ"));
	hyBlock.addJChar(new JChar("hyu", "ひゅ", "ヒュ"));
	hyBlock.addJChar(new JChar("hyo", "ひょ", "ヒョ"));
	
	var myBlock = new JBlock('my',0);
	jAll.addJBlock(myBlock);
	myBlock.addJChar(new JChar("mya", "みゃ", "ミャ"));
	myBlock.addJChar(new JChar("myu", "みゅ", "ミュ"));
	myBlock.addJChar(new JChar("myo", "みょ", "ミョ"));
	
	var ryBlock = new JBlock('ry',0);
	jAll.addJBlock(ryBlock);
	ryBlock.addJChar(new JChar("rya", "りゃ", "リャ"));
	ryBlock.addJChar(new JChar("ryu", "りゅ", "リュ"));
	ryBlock.addJChar(new JChar("ryo", "りょ", "リョ"));
	
	var gyBlock = new JBlock('gy',0);
	jAll.addJBlock(gyBlock);
	gyBlock.addJChar(new JChar("gya", "ぎゃ", "ギャ"));
	gyBlock.addJChar(new JChar("gyu", "ぎゅ", "ギュ"));
	gyBlock.addJChar(new JChar("gyo", "ぎょ", "ギョ"));
	
	var zjBlock = new JBlock('zj',0);
	jAll.addJBlock(zjBlock);
	zjBlock.addJChar(new JChar("ja (z)", "じゃ", "ジャ"));
	zjBlock.addJChar(new JChar("ju (z)", "じゅ", "ジュ"));
	zjBlock.addJChar(new JChar("jo (z)", "じょ", "ジョ"));
	
	var djBlock = new JBlock('dj',0);
	jAll.addJBlock(djBlock);
	djBlock.addJChar(new JChar("ja (d)", "ぢゃ", "ヂャ"));
	djBlock.addJChar(new JChar("ju (d)", "ぢゅ", "ヂュ"));
	djBlock.addJChar(new JChar("jo (d)", "ぢょ", "ヂョ"));
	
	var byBlock = new JBlock('by',0);
	jAll.addJBlock(byBlock);
	byBlock.addJChar(new JChar("bya", "びゃ", "ビャ"));
	byBlock.addJChar(new JChar("byu", "びゅ", "ビュ"));
	byBlock.addJChar(new JChar("byo", "びょ", "ビョ"));
	
	var pyBlock = new JBlock('py',0);
	jAll.addJBlock(pyBlock);
	pyBlock.addJChar(new JChar("pya", "ぴゃ", "ピャ"));
	pyBlock.addJChar(new JChar("pyu", "ぴゅ", "ピュ"));
	pyBlock.addJChar(new JChar("pyo", "ぴょ", "ピョ"));

	return jAll
}
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
function JBlock(blockChar, chance)
{
	this.jCharArr 	= [];
	this.parent 	= undefined;
	this.prev 		= undefined;
	this.next 		= undefined;
	this.blockChar 	= blockChar;
	this.minChance 	= 0;
	this.chance 	= chance < this.minChance ? this.minChance : chance;
	
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
	this.getNumOfChar = function()
	{
		return this.jCharArr.length;
	}
	this.getChar = function(i)
	{
		if(i < 0 || i >= this.jCharArr.length)
			return undefined;
		return this.jCharArr[i];
	}
	this.getChars = function()
	{
		return this.jCharArr;
	}
	this.size = function()
	{
		return this.jCharArr.length;
	}
	this.get = function(i)
	{
		return this.jCharArr[i];
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
function JAll()
{
	this.jBlockArr = [];
	this.currentBlock = 0;
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
		var scoreCurrentBlock = this.getCurrentBlock().getScore();
		
		if(scoreCurrentBlock > 90)
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
		this.jBlockArr[i].setChance(c);
	}
	this.size = function()
	{
		return this.jBlockArr.length;
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
			for(var j = 0; j < jBlock.getNumOfChar(); j++)
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
		return JSON.stringify({timestamp: new Date().getTime(), data: saveObj});
	};
	this.save = function(jsonData)
	{
		var saveObj = jsonData || this.getJSON();
		localStorage.japanese = saveObj ;
		return saveObj;
	}
	this.load = function(externalJsonData)
	{
		var nullTime 			= JSON.stringify({timestamp: 0});
		var externalJsonData 	= externalJsonData || nullTime;
		var internalJsonData 	= localStorage.japanese || nullTime;
		var loadExternal 		= JSON.parse(externalJsonData);
		var loadInternal 		= JSON.parse(internalJsonData);

 		var newestData			= loadExternal.timestamp > loadInternal.timestamp ? loadExternal : loadInternal;
		if(newestData.timestamp == 0) return;

		var saveObj = newestData.data;
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
var setScore = function(obj, score){
	var fail = false;
	var warning = false;
	var success = false;
	if(score < (1/4*100)){
		fail = true;
	}
	else if(score < (6/10*100)){
		warning = true;
	}
	else{
		success = true;
	}
	obj.css('width', score+'%').attr('aria-valuenow', score);
	obj.toggleClass("progress-bar-danger", fail).toggleClass("progress-bar-warning", warning).toggleClass("progress-bar-success", success);
}
var updateScore = function(){
	var hScore = q.jChar.hScore*10;
	var kScore = q.jChar.kScore*10;
	var charScore = (q.jChar.getScore()*10);
	var parentScore = q.jChar.parent.getScore();
	
	chars.save();
	setScore($(".hiragana-score .progress-bar"), hScore);
	setScore($(".katakana-score .progress-bar"), kScore);
	setScore($(".char-score .progress-bar"), charScore);
	setScore($(".block-score .progress-bar"), parentScore);
}
var showNewQuestion = function(){
	$(".RW .correctness").toggleClass("fa-check",false);
	$(".RW .correctness").toggleClass("fa-times",false);
	$(".A").toggleClass("label-danger",false);
	$(".A").toggleClass("label-warning",false);
	$(".A").toggleClass("label-success",false);
	$(".A").toggleClass("disabled",false);
	$("#next").toggleClass("disabled", true);
	
	
	q = chars.getQuestion();
	$("#Q").text(q.qa.question);
	for(var i = 0; i < q.qa.answers.length; i++)
	{
		$($(".A")[i]).text(q.qa.answers[i]);
	}
	//var charScore = (q.jChar.getScore()*10);
	updateScore();
	console.log(getChanceList(chars.jBlockArr));
}
var printDebug = function(str)
{
	if(window.location.hash.substr(1) == "devel")
	{
		alert(str);
	}
}
var nextQuestion = function()
{
	var start = new Date().getTime();
	showNewQuestion();
	var end = new Date().getTime();
	var time = end - start;
	printDebug('Execution time: ' + time);
}
var GApi = function(){
	this.clientId 	= "70842474105-h9e3dv7a6kfv3jtdcr6f8fnjv9o6nfla.apps.googleusercontent.com";
	this.scopes 	= "https://www.googleapis.com/auth/drive.appdata";
	this.data 		= {};
	this.data.name 	= "LearnKanaProgress.txt";
	this.parents 	= ["appDataFolder"];
	this.firstLoad	= true;
	this.findFileId = function(){
		var that = this;
		gapi.client.drive.files.list({q: "name='"+that.data.name+"'", spaces: that.parents}).execute(function(response)
		{
			var exists = response.files.length || false;
			if(!exists)
			{
				gapi.client.drive.files.create({
					name: that.data.name,
					parents: that.parents,
					fields: 'id'
				}).execute(function(response){
					that.data.id = response.id;
				});
			}
			else{
				that.data.id = response.files[0].id;
			}
			if(that.firstLoad){
				that.loadFromDrive();
				that.firstLoad = false;
			}
		});
		return this.data.id;
	};
	this.update = function(text){
		var auth_token = gapi.auth.getToken().access_token;

		const boundary = '-------314159265358979323846';
		const delimiter = "\r\n--" + boundary + "\r\n";
		const close_delim = "\r\n--" + boundary + "--";

		var metadata = { 
			description : 'savefile for my game',
			'mimeType': 'application/json'
		};  

		var multipartRequestBody =
			delimiter +  'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter + 'Content-Type: application/json\r\n\r\n' +
			text +
			close_delim;

		gapi.client.request({ 
			'path': '/upload/drive/v3/files/'+this.data.id,
			'method': 'PATCH',
			'params': {'fileId': this.data.id, 'uploadType': 'multipart'},
			'headers': { 'Content-Type': 'multipart/form-data; boundary="' + boundary + '"', 'Authorization': 'Bearer ' + auth_token, },
			'body': multipartRequestBody 
		}).execute(function(file) {
			console.log("Wrote to file " + file.name + " id: " + file.id); 
		}); 	
	};
	this.saveToDrive = function()
	{
		var charsJSON = chars.getJSON();
		chars.save(charsJSON);
		this.update(charsJSON);
	}
	this.loadFromDrive = function(){
		gapi.client.drive.files.get({fileId: this.data.id, alt: "media"}).execute(function(f){
			chars.load(JSON.stringify(f.result));
		});	
	};

	this.getAccessToken = function()
	{
		if(typeof this.authorized !== undefined){
			return gapi.auth.getToken().access_token;
		}
	}

	this.authorizedFunc = function(res)
	{
		this.authorized = res;
		var that = this;
		gapi.client.load('drive', 'v3', function(res){that.findFileId()})
	}
	this.checkAuth = function(){
		var config = {
			client_id:	this.clientId,
			scope:		this.scopes,
			immediate: 		true
		}
		var that = this;
		gapi.auth.authorize(config, function(res){that.authorizedFunc(res)});
	}
	this.checkAuth();
}
function onSignIn(googleUser) {
	g = new GApi();
}
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}
$(document).ready(function(){
	chars = loadCharacters();
	q = undefined;//chars.getQuestion();
	if(localStorage.japanese){
		chars.load();
	}
	nextQuestion();
	
	$(".A").click(function(){
		var correct = q.answer($(this).text());
		if($(this).hasClass("disabled")){return;}
		if(correct)
		{
			$(".A:contains("+correct.romaji+")").toggleClass("label-warning", true);
			$(".A:contains("+correct.hiragana+")").toggleClass("label-warning", true);
			$(".A:contains("+correct.katakana+")").toggleClass("label-warning", true);
			$(".RW .correctness").toggleClass("fa-check",true);
			$(".RW .correctness").toggleClass("fa-times",false);
			$(".A").toggleClass("disabled",true);
			$(this).toggleClass("label-success",true).toggleClass("label-warning",false);
			$("#next").toggleClass("disabled", false);
			//setTimeout(function(){
			//	showNewQuestion();
			//},1500);
		}
		else
		{
			$(".RW .correctness").toggleClass("fa-check",false);
			$(".RW .correctness").toggleClass("fa-times",true);
			$(this).toggleClass("label-danger",true);
			$("#next").toggleClass("disabled", true);
		}
		updateScore();
	});
	$("#next").click(function(){
		if(!$(this).hasClass("disabled")){
			nextQuestion()
		}
	});
	$(window).on('beforeunload', function(){
		g.saveToDrive();
		//return "Are you sure you want to leave?";
	});
});
