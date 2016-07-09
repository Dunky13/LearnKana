var GApi = function(){
	this.clientId 	= "70842474105-h9e3dv7a6kfv3jtdcr6f8fnjv9o6nfla.apps.googleusercontent.com";
	this.scopes 	= "https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/games";
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
			var externalObj = f.result;
			var localJSON	= localStore.getJSON() || JSON.stringify({timestamp: 0, gameScore: 0});
			var localObj	= JSON.parse(localJSON);
			
			var localGameScore 		= localObj.gameScore || 0;
			var externalGameScore	= externalObj.gameScore || 0;
			
			if(externalGameScore > localGameScore)
			{
				localStore.setJSON(JSON.stringify(externalObj));
	 			chars.load();
				nextQuestion();
			}
		});	
	};
	this.unlockAchievement = function(achievementId)
	{
		this.achManager.unlockAchievement(achievementId);
	}
	this.revealAchievement = function(achievementId)
	{
		gapi.client.games.achievements.reveal({achievementId: achievementId}).execute(function(resp){console.log(resp);});
	}
	this.purgeData = function(please)
	{
		if(please === "purge")
		{
			gapi.client.drive.files.delete({fileId:this.data.id}).execute()
		}
	}

	this.getAccessToken = function()
	{
		if(typeof this.authorized !== undefined){
			return gapi.auth.getToken().access_token;
		}
	}
	this.loadAchievementManager = function()
	{
		this.achManager = {};
this.achManager.achievements={};var that=this;this.achManager.preloaded=!1,this.achManager.loadData=function(){var e=gapi.client.games.achievementDefinitions.list();e.execute(function(e){if(console.log("Achievement definitions",e),"games#achievementDefinitionsListResponse"==e.kind&&e.hasOwnProperty("items")){for(var a=0;a<e.items.length;a++)that.achManager.achievements[e.items[a].id]=e.items[a],that.achManager.achievements[e.items[a].id].achievementState=e.items[a].initialState;that.achManager.loadAchievementsEarnedByPlayer()}})},this.achManager.clearData=function(){this.achManager.achievements={},this.achManager.preloaded=!1},this.achManager.loadAchievementsEarnedByPlayer=function(){var e=gapi.client.games.achievements.list({playerId:"me"});e.execute(function(e){if(console.log("Your achievement data: ",e),"games#playerAchievementListResponse"==e.kind&&e.hasOwnProperty("items"))for(var a=0;a<e.items.length;a++){var t=e.items[a];that.achManager.achievements[t.id].achievementState=t.achievementState,t.hasOwnProperty("formattedCurrentStepsString")&&(that.achManager.achievements[t.id].formattedCurrentStepsString=t.formattedCurrentStepsString)}else console.log("**Unexpected response **",e)}),this.preloaded=!0},this.achManager.unlockAchievement=function(e){var a=gapi.client.games.achievements.unlock({achievementId:e});a.execute(function(a){console.log("Data from earning achievement is ",a),a.newlyUnlocked?(that.showAchievementWidget(e),that.achManager.loadAchievementsEarnedByPlayer()):console.log("You unlocked "+that.achManager.achievements[e].name+" but you already unlocked it earlier.")})},this.showAchievementWidget=function(e){var a=$("#achUnlocked");a.find("img").prop("src",this.achManager.achievements[e].unlockedIconUrl),a.find("#achDescrip").html(this.achManager.achievements[e].description),a.slideDown(),a.delay(2e3).slideUp()};
		this.achManager.loadData();

	}
	this.authorizedFunc = function(res)
	{
		this.authorized = res;
		var that = this;
		gapi.client.load('drive', 'v3', function(res){that.findFileId()})
		gapi.client.load('games', 'v1', function(res){that.loadAchievementManager()})
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