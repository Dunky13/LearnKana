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
		interface	= new Interface();
		localStore	= new Local();
		chars 		= interface.loadCharacters();
		q 			= undefined;//chars.getQuestion();
		if(localStore.getJSON()){
			chars.load();
		}
		interface.nextQuestion();

		$(".A").click(function(){interface.clickAnswer(this);});
		$("#next").click(function(){interface.clickNext(this);});
		$(window).on('beforeunload', function(){
			g.saveToDrive();
			//return "Are you sure you want to leave?";
		});
	});
});