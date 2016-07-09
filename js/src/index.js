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
