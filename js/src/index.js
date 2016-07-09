var Interface = function()
{
	this.setScore = function(obj, score){
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
	};
	this.updateScore = function(){
		var hScore = q.jChar.hScore*10;
		var kScore = q.jChar.kScore*10;
		var charScore = (q.jChar.getScore()*10);
		var parentScore = q.jChar.parent.getScore();

		chars.save();
		this.setScore($(".hiragana-score .progress-bar"), hScore);
		this.setScore($(".katakana-score .progress-bar"), kScore);
		this.setScore($(".char-score .progress-bar"), charScore);
		this.setScore($(".block-score .progress-bar"), parentScore);
	};
	this.showNewQuestion = function(){
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
		this.updateScore();
		console.log(getChanceList(chars.jBlockArr));
	}
	this.printDebug = function(str)
	{
		if(window.location.hash.substr(1) == "devel")
		{
			alert(str);
		}
	}
	this.nextQuestion = function()
	{
		var start = new Date().getTime();
		this.showNewQuestion();
		var end = new Date().getTime();
		var time = end - start;
		this.printDebug('Execution time: ' + time);
	}
	this.clickAnswer = function(){
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
		}
		else
		{
			$(".RW .correctness").toggleClass("fa-check",false);
			$(".RW .correctness").toggleClass("fa-times",true);
			$(this).toggleClass("label-danger",true);
			$("#next").toggleClass("disabled", true);
		}
		this.updateScore();
	}
	this.clickNext = function(){
		if(!$(this).hasClass("disabled")){
			this.nextQuestion()
		}
	}
	this.loadCharacters = function(){
		var jAll = new JAll();

		var vowelBlock = new JBlock('v',1);
		jAll.addJBlock(vowelBlock);
		vowelBlock.setAchievementID('CgkI-byp9IcCEAIQAQ');
		vowelBlock.addJChar(new JChar("a", "あ", "ア"));
		vowelBlock.addJChar(new JChar("i", "い", "イ"));
		vowelBlock.addJChar(new JChar("u", "う", "ウ"));
		vowelBlock.addJChar(new JChar("e", "え", "エ"));
		vowelBlock.addJChar(new JChar("o", "お", "オ"));

		var kBlock = new JBlock('k',0);
		jAll.addJBlock(kBlock);
		kBlock.setAchievementID('CgkI-byp9IcCEAIQAg');
		kBlock.addJChar(new JChar("ka", "か", "カ"));
		kBlock.addJChar(new JChar("ki", "き", "キ"));
		kBlock.addJChar(new JChar("ku", "く", "ク"));
		kBlock.addJChar(new JChar("ke", "け", "ケ"));
		kBlock.addJChar(new JChar("ko", "こ", "コ"));

		var sBlock = new JBlock('s',0);
		jAll.addJBlock(sBlock);
		sBlock.setAchievementID('CgkI-byp9IcCEAIQAw');
		sBlock.addJChar(new JChar("sa", "さ", "サ"));
		sBlock.addJChar(new JChar("shi", "し", "シ"));
		sBlock.addJChar(new JChar("su", "す", "ス"));
		sBlock.addJChar(new JChar("se", "せ", "セ"));
		sBlock.addJChar(new JChar("so", "そ", "ソ"));

		var tBlock = new JBlock('t',0);
		jAll.addJBlock(tBlock);
		tBlock.setAchievementID('CgkI-byp9IcCEAIQBA');
		tBlock.addJChar(new JChar("ta", "た", "タ"));
		tBlock.addJChar(new JChar("chi", "ち", "チ"));
		tBlock.addJChar(new JChar("tsu", "つ", "ツ"));
		tBlock.addJChar(new JChar("te", "て", "テ"));
		tBlock.addJChar(new JChar("to", "と", "ト"));

		var nBlock = new JBlock('n',0);
		jAll.addJBlock(nBlock);
		nBlock.setAchievementID('CgkI-byp9IcCEAIQBQ');
		nBlock.addJChar(new JChar("na", "な", "ナ"));
		nBlock.addJChar(new JChar("ni", "に", "ニ"));
		nBlock.addJChar(new JChar("nu", "ぬ", "ヌ"));
		nBlock.addJChar(new JChar("ne", "ね", "ネ"));
		nBlock.addJChar(new JChar("no", "の", "ノ"));

		var hBlock = new JBlock('h',0);
		jAll.addJBlock(hBlock);
		hBlock.setAchievementID('CgkI-byp9IcCEAIQBg');
		hBlock.addJChar(new JChar("ha", "は", "ハ"));
		hBlock.addJChar(new JChar("hi", "ひ", "ヒ"));
		hBlock.addJChar(new JChar("fu", "ふ", "フ"));
		hBlock.addJChar(new JChar("he", "へ", "ヘ"));
		hBlock.addJChar(new JChar("ho", "ほ", "ホ"));

		var mBlock = new JBlock('m',0);
		jAll.addJBlock(mBlock);
		mBlock.setAchievementID('CgkI-byp9IcCEAIQBw');
		mBlock.addJChar(new JChar("ma", "ま", "マ"));
		mBlock.addJChar(new JChar("mi", "み", "ミ"));
		mBlock.addJChar(new JChar("mu", "む", "ム"));
		mBlock.addJChar(new JChar("me", "め", "メ"));
		mBlock.addJChar(new JChar("mo", "も", "モ"));

		var yBlock = new JBlock('y',0);
		jAll.addJBlock(yBlock);
		yBlock.setAchievementID('CgkI-byp9IcCEAIQCA');
		yBlock.addJChar(new JChar("ya", "や", "ヤ"));
		yBlock.addJChar(new JChar("yu", "ゆ", "ユ"));
		yBlock.addJChar(new JChar("yo", "よ", "ヨ"));

		var rBlock = new JBlock('r',0);
		jAll.addJBlock(rBlock);
		rBlock.setAchievementID('CgkI-byp9IcCEAIQCQ');
		rBlock.addJChar(new JChar("ra", "ら", "ラ"));
		rBlock.addJChar(new JChar("ri", "り", "リ"));
		rBlock.addJChar(new JChar("ru", "る", "ル"));
		rBlock.addJChar(new JChar("re", "れ", "レ"));
		rBlock.addJChar(new JChar("ro", "ろ", "ロ"));

		var vowelBlock = new JBlock('w',0);
		jAll.addJBlock(vowelBlock);
		vowelBlock.setAchievementID('CgkI-byp9IcCEAIQCg');
		vowelBlock.addJChar(new JChar("wa", "わ", "ワ"));
		vowelBlock.addJChar(new JChar("wo", "を", "ヲ"));
		vowelBlock.addJChar(new JChar("n", "ん", "ン"));

		var gBlock = new JBlock('g',0);
		jAll.addJBlock(gBlock);
		gBlock.setAchievementID('CgkI-byp9IcCEAIQCw');
		gBlock.addJChar(new JChar("ga", "が", "ガ"));
		gBlock.addJChar(new JChar("gi", "ぎ", "ギ"));
		gBlock.addJChar(new JChar("gu", "ぐ", "グ"));
		gBlock.addJChar(new JChar("ge", "げ", "ゲ"));
		gBlock.addJChar(new JChar("go", "ご", "ゴ"));

		var zBlock = new JBlock('z',0);
		jAll.addJBlock(zBlock);
		zBlock.setAchievementID('CgkI-byp9IcCEAIQDA');
		zBlock.addJChar(new JChar("za", "ざ", "ザ"));
		zBlock.addJChar(new JChar("ji (z)", "じ", "ジ"));
		zBlock.addJChar(new JChar("zu", "ず", "ズ"));
		zBlock.addJChar(new JChar("ze", "ぜ", "ゼ"));
		zBlock.addJChar(new JChar("zo", "ぞ", "ゾ"));

		var dBlock = new JBlock('d',0);
		jAll.addJBlock(dBlock);
		dBlock.setAchievementID('CgkI-byp9IcCEAIQDQ');
		dBlock.addJChar(new JChar("da", "だ", "ダ"));
		dBlock.addJChar(new JChar("ji (d)", "ぢ", "ヂ"));
		dBlock.addJChar(new JChar("zu", "づ", "ヅ"));
		dBlock.addJChar(new JChar("de", "で", "デ"));
		dBlock.addJChar(new JChar("do", "ど", "ド"));

		var bBlock = new JBlock('b',0);
		jAll.addJBlock(bBlock);
		bBlock.setAchievementID('CgkI-byp9IcCEAIQDw');
		bBlock.addJChar(new JChar("ba", "ば", "バ"));
		bBlock.addJChar(new JChar("bi", "び", "ビ"));
		bBlock.addJChar(new JChar("bu", "ぶ", "ブ"));
		bBlock.addJChar(new JChar("be", "べ", "ベ"));
		bBlock.addJChar(new JChar("bo", "ぼ", "ボ"));

		var pBlock = new JBlock('p',0);
		jAll.addJBlock(pBlock);
		pBlock.setAchievementID('CgkI-byp9IcCEAIQDw');
		pBlock.addJChar(new JChar("pa", "ぱ", "パ"));
		pBlock.addJChar(new JChar("pi", "ぴ", "ピ"));
		pBlock.addJChar(new JChar("pu", "ぷ", "プ"));
		pBlock.addJChar(new JChar("pe", "ぺ", "ペ"));
		pBlock.addJChar(new JChar("po", "ぽ", "ポ"));
		pBlock.addJChar(new JChar("vu", "ゔ", "ゔ"));

		var kyBlock = new JBlock('ky',0);
		jAll.addJBlock(kyBlock);
		kyBlock.setAchievementID('CgkI-byp9IcCEAIQEA');
		kyBlock.addJChar(new JChar("kya", "きゃ", "キャ"));
		kyBlock.addJChar(new JChar("kyu", "きゅ", "キュ"));
		kyBlock.addJChar(new JChar("kyo", "きょ", "キョ"));

		var shBlock = new JBlock('sh',0);
		jAll.addJBlock(shBlock);
		shBlock.setAchievementID('CgkI-byp9IcCEAIQEQ');
		shBlock.addJChar(new JChar("sha", "しゃ", "シャ"));
		shBlock.addJChar(new JChar("shu", "しゅ", "シュ"));
		shBlock.addJChar(new JChar("sho", "しょ", "ショ"));

		var chBlock = new JBlock('ch',0);
		jAll.addJBlock(chBlock);
		chBlock.setAchievementID('CgkI-byp9IcCEAIQEg');
		chBlock.addJChar(new JChar("cha", "ちゃ", "チャ"));
		chBlock.addJChar(new JChar("chu", "ちゅ", "チュ"));
		chBlock.addJChar(new JChar("cho", "ちょ", "チョ"));

		var nyBlock = new JBlock('ny',0);
		jAll.addJBlock(nyBlock);
		nyBlock.setAchievementID('CgkI-byp9IcCEAIQEw');
		nyBlock.addJChar(new JChar("nya", "にゃ", "ニャ"));
		nyBlock.addJChar(new JChar("nyu", "にゅ", "ニュ"));
		nyBlock.addJChar(new JChar("nyo", "にょ", "ニョ"));

		var hyBlock = new JBlock('hy',0);
		jAll.addJBlock(hyBlock);
		hyBlock.setAchievementID('CgkI-byp9IcCEAIQFA');
		hyBlock.addJChar(new JChar("hya", "ひゃ", "ヒャ"));
		hyBlock.addJChar(new JChar("hyu", "ひゅ", "ヒュ"));
		hyBlock.addJChar(new JChar("hyo", "ひょ", "ヒョ"));

		var myBlock = new JBlock('my',0);
		jAll.addJBlock(myBlock);
		myBlock.setAchievementID('CgkI-byp9IcCEAIQFQ');
		myBlock.addJChar(new JChar("mya", "みゃ", "ミャ"));
		myBlock.addJChar(new JChar("myu", "みゅ", "ミュ"));
		myBlock.addJChar(new JChar("myo", "みょ", "ミョ"));

		var ryBlock = new JBlock('ry',0);
		jAll.addJBlock(ryBlock);
		ryBlock.setAchievementID('CgkI-byp9IcCEAIQFg');
		ryBlock.addJChar(new JChar("rya", "りゃ", "リャ"));
		ryBlock.addJChar(new JChar("ryu", "りゅ", "リュ"));
		ryBlock.addJChar(new JChar("ryo", "りょ", "リョ"));

		var gyBlock = new JBlock('gy',0);
		jAll.addJBlock(gyBlock);
		gyBlock.setAchievementID('CgkI-byp9IcCEAIQFw');
		gyBlock.addJChar(new JChar("gya", "ぎゃ", "ギャ"));
		gyBlock.addJChar(new JChar("gyu", "ぎゅ", "ギュ"));
		gyBlock.addJChar(new JChar("gyo", "ぎょ", "ギョ"));

		var zjBlock = new JBlock('zj',0);
		jAll.addJBlock(zjBlock);
		zjBlock.setAchievementID("CgkI-byp9IcCEAIQGA");
		zjBlock.addJChar(new JChar("ja (z)", "じゃ", "ジャ"));
		zjBlock.addJChar(new JChar("ju (z)", "じゅ", "ジュ"));
		zjBlock.addJChar(new JChar("jo (z)", "じょ", "ジョ"));

		var djBlock = new JBlock('dj',0);
		jAll.addJBlock(djBlock);
		djBlock.setAchievementID("CgkI-byp9IcCEAIQGQ");
		djBlock.addJChar(new JChar("ja (d)", "ぢゃ", "ヂャ"));
		djBlock.addJChar(new JChar("ju (d)", "ぢゅ", "ヂュ"));
		djBlock.addJChar(new JChar("jo (d)", "ぢょ", "ヂョ"));

		var byBlock = new JBlock('by',0);
		jAll.addJBlock(byBlock);
		byBlock.setAchievementID("CgkI-byp9IcCEAIQGg");
		byBlock.addJChar(new JChar("bya", "びゃ", "ビャ"));
		byBlock.addJChar(new JChar("byu", "びゅ", "ビュ"));
		byBlock.addJChar(new JChar("byo", "びょ", "ビョ"));

		var pyBlock = new JBlock('py',0);
		jAll.addJBlock(pyBlock);
		pyBlock.setAchievementID("CgkI-byp9IcCEAIQGw");
		pyBlock.addJChar(new JChar("pya", "ぴゃ", "ピャ"));
		pyBlock.addJChar(new JChar("pyu", "ぴゅ", "ピュ"));
		pyBlock.addJChar(new JChar("pyo", "ぴょ", "ピョ"));


		return jAll
	}
}


var Local = function()
{
	this.data = "LearnKana";
	this.getJSON = function()
	{
		return localStorage.getItem(this.data);
	}
	this.setJSON = function(jsonData)
	{
		localStorage.setItem(this.data, jsonData);
	}
}
