requirejs.config({
	baseUrl: 'js/dist',
    paths: {
        jquery: 	"//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min",
        bootstrap: 	"//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min",
		msgpack: 	"//cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.20/msgpack.min",
		gapi: 		"//apis.google.com/js/client:platform",
		code: 		"index"
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
		msgpack: {
            deps: ['bootstrap']
        },
		code: {
            deps: ['msgpack', 'gapi']
        },
    }
});

//Define dependencies and pass a callback when dependencies have been loaded
require(['code'], function (a) {
    //Bootstrap and jquery are ready to use here
    //Access jquery and bootstrap plugins with $ variable

	$(document).ready(function(){
		constants	= {};
		localStore	= new Local();
		chars 		= loadCharacters();
		q 			= undefined;//chars.getQuestion();
		if(localStore.getJSON()){
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
});

/* require.config({
    paths: {
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min',
		bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min",
		msgpack: "//cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.20/msgpack.min",
		gapi: "//apis.google.com/js/client:platform",
		code: "index"
    }
});

require(["jquery"], function ($) {
    console.log($.fn.jquery);
}); */