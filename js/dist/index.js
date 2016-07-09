function round(e,a,t){a||(a=1),t||(t=0);var r=1/a,n=0;return n=1==t?Math.ceil(e*r)/r:t==-1?Math.floor(e*r)/r:Math.round(e*r)/r}function shuffle(e,a){a="undefined"!=typeof a?a:3;for(var t=0;t<a;t++)for(var r=e.length;r>0;){var n=Math.floor(Math.random()*r);r--;var h=e[r];e[r]=e[n],e[n]=h}return e}function getChanceList(e){for(var a=[],t=0;t<e.length;t++)a.push(e[t].chance);return a}function JChar(e,a,t){this.romaji=e,this.hiragana=a,this.katakana=t,this.hScore=0,this.kScore=0,this.minimalChance=.05,this.tmpChance=1,this.getScore=function(){return(this.hScore+this.kScore)/2},this.getChance=function(){var e=this.getScore();if(e<10)return 1;var a=Math.abs(Math.log10(e)-2);return a>this.minimalChance?a:this.minimalChance},this.parent=void 0,this.hCorrect=function(){this.hScore++},this.kCorrect=function(){this.kScore++},this.hFalse=function(){this.hScore>0?this.hScore--:0},this.kFalse=function(){this.kScore>0?this.kScore--:0},this.hBonus=function(){this.hScore+=.5},this.kBonus=function(){this.kScore+=.5}}function JBlock(e,a){this.jCharArr=[],this.parent=void 0,this.prev=void 0,this.next=void 0,this.blockChar=e,this.minChance=0,this.chance=a<this.minChance?this.minChance:a,this.achievementId=void 0,this.addJChar=function(e){this.jCharArr.push(e),e.parent=this},this.getChance=function(){return this.chance},this.setChance=function(e){this.chance=e},this.getNumOfChar=function(){return this.jCharArr.length},this.getChar=function(e){if(!(e<0||e>=this.jCharArr.length))return this.jCharArr[e]},this.getChars=function(){return this.jCharArr},this.size=function(){return this.jCharArr.length},this.get=function(e){return this.jCharArr[e]},this.setAchievementID=function(e){this.achievementId=e},this.getAchievementID=function(){return this.achievementId},this.unlockAchievement=function(){g.unlockAchievement(this.getAchievementID()),g.revealAchievement(this.next.getAchievementID())},this.getRandom=function(e){var a=[];if(e="undefined"!=typeof e?e:1,this.size()<e){var t=e-this.size();void 0!==this.prev?a=this.prev.getRandom(t):void 0!==this.next&&(a=this.next.getRandom(t)),e-=t}for(;a.length<e;){var r=this.get(rand(0,this.size()-1));a.indexOf(r)>-1&&a.push(r)}},this.getScore=function(){for(var e=0,a=0;a<this.size();a++)e+=10*this.get(a).getScore();return e/this.size()},this.getAnswers=function(e,a,t){for(var r=10,n=[],h=this.jCharArr;h.length<r/2;)if(void 0!==this.prev)h=h.concat(this.prev.getRandom(r/2-h.length));else{if(void 0===this.next)break;h=h.concat(this.next.getRandom(r/2-h.length))}for(var i=0;i<h.length;i++){var s=h[i];e&&n.push(s.romaji),a&&n.push(s.hiragana),t&&n.push(s.katakana)}return shuffle(n)}}function QA(e,a,t){this.question=e,this.answers=a,this.type=t}function Q(e,a){this.qa=e,this.jChar=a,this.answer=function(t){if(this.qa.question!==t){var r=this.jChar;return this.jChar.romaji===t?e.type===JChar.TYPE.HIRAGANA?a.hCorrect():e.type===JChar.TYPE.KATAKANA&&a.kCorrect():this.jChar.hiragana===t?e.type===JChar.TYPE.ROMAJI?a.hCorrect():e.type===JChar.TYPE.KATAKANA&&(a.kCorrect(),a.hBonus()):this.jChar.katakana===t?e.type===JChar.TYPE.HIRAGANA?(a.hCorrect(),a.kBonus()):e.type===JChar.TYPE.ROMAJI&&a.kCorrect():e.type===JChar.TYPE.HIRAGANA?(a.hFalse(),r=void 0):e.type===JChar.TYPE.KATAKANA?(a.kFalse(),r=void 0):r=void 0,r}}}function JAll(){this.jBlockArr=[],this.currentBlock=0,this.lastAchievement="CgkI-byp9IcCEAIQHA",this.getBlock=function(e){return this.jBlockArr[e]},this.getCurrentBlock=function(){return this.getBlock(this.currentBlock)},this.findLastActiveBlock=function(){for(;this.getCurrentBlock().getScore()>90;)this.currentBlock++;this.calculateNewChances()},this.calculateNewChances=function(){if(this.isGameFinished())for(var e=0;e<this.size();e++)this.setChance(e,1/this.size());else{var a=this.getCurrentBlock().getScore();if(a>95)return void this.findLastActiveBlock();for(var e=this.currentBlock;e>=0;e--){var t=0;t=e==this.currentBlock?(e+1)/2+.5:e==this.currentBlock-1?round(.1212*(e+1)+.3333,.25):e<=this.currentBlock-2&&e>=round((this.currentBlock-2)/2,1,1)?.5:.25,this.setChance(e,t/(this.currentBlock+1))}}},this.setChance=function(e,a){this.getBlock(e).setChance(a)},this.size=function(){return this.jBlockArr.length},this.getGameScore=function(){for(var e=0,a=0;a<this.size();a++)e+=this.getBlock(a).getScore();return e/this.size()},this.isGameFinished=function(){if(this.currentBlock<this.size()-1)return!1;for(var e=!0,a=this.currentBlock;a>=0;a--)if(this.getBlock(a).getScore()<100){e=!1;break}return e},this.addJBlock=function(e){this.size()>0&&(e.prev=this.getBlock(this.size()-1),e.prev.next=e),this.jBlockArr.push(e),e.parent=this},this.getCharacter=function(){this.calculateNewChances();for(var e=[],a=0;a<=this.currentBlock;a++)for(var t=this.getBlock(a),r=10*t.getChance(),n=0;n<t.getNumOfChar();n++)for(var h=t.getChar(n),i=100*h.getChance(),s=0;s<r*i;s++)e.push(h);return e[rand(0,e.length-1)]},this.getQuestion=function(){var e=this.getCharacter(),a=e.parent,t=void 0,r=Math.random();return t=r<1/3?new QA(e.romaji,a.getAnswers(!1,!0,!0),JChar.TYPE.ROMAJI):r<2/3?new QA(e.hiragana,a.getAnswers(!0,!1,!0),JChar.TYPE.HIRAGANA):new QA(e.katakana,a.getAnswers(!0,!0,!1),JChar.TYPE.KATAKANA),new Q(t,e)},this.getJSON=function(){for(var e={},a=0;a<this.jBlockArr.length;a++){for(var t=this.jBlockArr[a],r={},n=0;n<t.jCharArr.length;n++){var h=t.jCharArr[n],i={};i.hScore=h.hScore,i.kScore=h.kScore,r[h.romaji]=i}e[t.blockChar]=r}return JSON.stringify({timestamp:(new Date).getTime(),gameScore:this.getGameScore(),data:e})},this.save=function(e){var a=e||this.getJSON();return localStore.setJSON(a),a},this.load=function(){for(var e={timestamp:0,gameScore:0},a=JSON.stringify(e),t=localStore.getJSON()||a,r=JSON.parse(t),n=r.data,h=0;h<this.jBlockArr.length;h++){var i=this.jBlockArr[h];if(n.hasOwnProperty(i.blockChar))for(var s=n[i.blockChar],c=0;c<i.jCharArr.length;c++){var o=i.jCharArr[c];s.hasOwnProperty(o.romaji)&&(o.hScore=s[o.romaji].hScore,o.kScore=s[o.romaji].kScore)}}this.findLastActiveBlock()}}function onSignIn(e){g=new GApi}function signOut(){var e=gapi.auth2.getAuthInstance();e.signOut().then(function(){console.log("User signed out.")})}var rand=function(e,a){return Math.floor(Math.random()*(a-e+1))+e},loadCharacters=function(){var e=new JAll,a=new JBlock("v",1);e.addJBlock(a),a.setAchievementID("CgkI-byp9IcCEAIQAQ"),a.addJChar(new JChar("a","あ","ア")),a.addJChar(new JChar("i","い","イ")),a.addJChar(new JChar("u","う","ウ")),a.addJChar(new JChar("e","え","エ")),a.addJChar(new JChar("o","お","オ"));var t=new JBlock("k",0);e.addJBlock(t),t.setAchievementID("CgkI-byp9IcCEAIQAg"),t.addJChar(new JChar("ka","か","カ")),t.addJChar(new JChar("ki","き","キ")),t.addJChar(new JChar("ku","く","ク")),t.addJChar(new JChar("ke","け","ケ")),t.addJChar(new JChar("ko","こ","コ"));var r=new JBlock("s",0);e.addJBlock(r),r.setAchievementID("CgkI-byp9IcCEAIQAw"),r.addJChar(new JChar("sa","さ","サ")),r.addJChar(new JChar("shi","し","シ")),r.addJChar(new JChar("su","す","ス")),r.addJChar(new JChar("se","せ","セ")),r.addJChar(new JChar("so","そ","ソ"));var n=new JBlock("t",0);e.addJBlock(n),n.setAchievementID("CgkI-byp9IcCEAIQBA"),n.addJChar(new JChar("ta","た","タ")),n.addJChar(new JChar("chi","ち","チ")),n.addJChar(new JChar("tsu","つ","ツ")),n.addJChar(new JChar("te","て","テ")),n.addJChar(new JChar("to","と","ト"));var h=new JBlock("n",0);e.addJBlock(h),h.setAchievementID("CgkI-byp9IcCEAIQBQ"),h.addJChar(new JChar("na","な","ナ")),h.addJChar(new JChar("ni","に","ニ")),h.addJChar(new JChar("nu","ぬ","ヌ")),h.addJChar(new JChar("ne","ね","ネ")),h.addJChar(new JChar("no","の","ノ"));var i=new JBlock("h",0);e.addJBlock(i),i.setAchievementID("CgkI-byp9IcCEAIQBg"),i.addJChar(new JChar("ha","は","ハ")),i.addJChar(new JChar("hi","ひ","ヒ")),i.addJChar(new JChar("fu","ふ","フ")),i.addJChar(new JChar("he","へ","ヘ")),i.addJChar(new JChar("ho","ほ","ホ"));var s=new JBlock("m",0);e.addJBlock(s),s.setAchievementID("CgkI-byp9IcCEAIQBw"),s.addJChar(new JChar("ma","ま","マ")),s.addJChar(new JChar("mi","み","ミ")),s.addJChar(new JChar("mu","む","ム")),s.addJChar(new JChar("me","め","メ")),s.addJChar(new JChar("mo","も","モ"));var c=new JBlock("y",0);e.addJBlock(c),c.setAchievementID("CgkI-byp9IcCEAIQCA"),c.addJChar(new JChar("ya","や","ヤ")),c.addJChar(new JChar("yu","ゆ","ユ")),c.addJChar(new JChar("yo","よ","ヨ"));var o=new JBlock("r",0);e.addJBlock(o),o.setAchievementID("CgkI-byp9IcCEAIQCQ"),o.addJChar(new JChar("ra","ら","ラ")),o.addJChar(new JChar("ri","り","リ")),o.addJChar(new JChar("ru","る","ル")),o.addJChar(new JChar("re","れ","レ")),o.addJChar(new JChar("ro","ろ","ロ"));var a=new JBlock("w",0);e.addJBlock(a),a.setAchievementID("CgkI-byp9IcCEAIQCg"),a.addJChar(new JChar("wa","わ","ワ")),a.addJChar(new JChar("wo","を","ヲ")),a.addJChar(new JChar("n","ん","ン"));var d=new JBlock("g",0);e.addJBlock(d),d.setAchievementID("CgkI-byp9IcCEAIQCw"),d.addJChar(new JChar("ga","が","ガ")),d.addJChar(new JChar("gi","ぎ","ギ")),d.addJChar(new JChar("gu","ぐ","グ")),d.addJChar(new JChar("ge","げ","ゲ")),d.addJChar(new JChar("go","ご","ゴ"));var C=new JBlock("z",0);e.addJBlock(C),C.setAchievementID("CgkI-byp9IcCEAIQDA"),C.addJChar(new JChar("za","ざ","ザ")),C.addJChar(new JChar("ji (z)","じ","ジ")),C.addJChar(new JChar("zu","ず","ズ")),C.addJChar(new JChar("ze","ぜ","ゼ")),C.addJChar(new JChar("zo","ぞ","ゾ"));var J=new JBlock("d",0);e.addJBlock(J),J.setAchievementID("CgkI-byp9IcCEAIQDQ"),J.addJChar(new JChar("da","だ","ダ")),J.addJChar(new JChar("ji (d)","ぢ","ヂ")),J.addJChar(new JChar("zu","づ","ヅ")),J.addJChar(new JChar("de","で","デ")),J.addJChar(new JChar("do","ど","ド"));var l=new JBlock("b",0);e.addJBlock(l),l.setAchievementID("CgkI-byp9IcCEAIQDw"),l.addJChar(new JChar("ba","ば","バ")),l.addJChar(new JChar("bi","び","ビ")),l.addJChar(new JChar("bu","ぶ","ブ")),l.addJChar(new JChar("be","べ","ベ")),l.addJChar(new JChar("bo","ぼ","ボ"));var g=new JBlock("p",0);e.addJBlock(g),g.setAchievementID("CgkI-byp9IcCEAIQDw"),g.addJChar(new JChar("pa","ぱ","パ")),g.addJChar(new JChar("pi","ぴ","ピ")),g.addJChar(new JChar("pu","ぷ","プ")),g.addJChar(new JChar("pe","ぺ","ペ")),g.addJChar(new JChar("po","ぽ","ポ")),g.addJChar(new JChar("vu","ゔ","ゔ"));var u=new JBlock("ky",0);e.addJBlock(u),u.setAchievementID("CgkI-byp9IcCEAIQEA"),u.addJChar(new JChar("kya","きゃ","キャ")),u.addJChar(new JChar("kyu","きゅ","キュ")),u.addJChar(new JChar("kyo","きょ","キョ"));var v=new JBlock("sh",0);e.addJBlock(v),v.setAchievementID("CgkI-byp9IcCEAIQEQ"),v.addJChar(new JChar("sha","しゃ","シャ")),v.addJChar(new JChar("shu","しゅ","シュ")),v.addJChar(new JChar("sho","しょ","ショ"));var w=new JBlock("ch",0);e.addJBlock(w),w.setAchievementID("CgkI-byp9IcCEAIQEg"),w.addJChar(new JChar("cha","ちゃ","チャ")),w.addJChar(new JChar("chu","ちゅ","チュ")),w.addJChar(new JChar("cho","ちょ","チョ"));var k=new JBlock("ny",0);e.addJBlock(k),k.setAchievementID("CgkI-byp9IcCEAIQEw"),k.addJChar(new JChar("nya","にゃ","ニャ")),k.addJChar(new JChar("nyu","にゅ","ニュ")),k.addJChar(new JChar("nyo","にょ","ニョ"));var f=new JBlock("hy",0);e.addJBlock(f),f.setAchievementID("CgkI-byp9IcCEAIQFA"),f.addJChar(new JChar("hya","ひゃ","ヒャ")),f.addJChar(new JChar("hyu","ひゅ","ヒュ")),f.addJChar(new JChar("hyo","ひょ","ヒョ"));var m=new JBlock("my",0);e.addJBlock(m),m.setAchievementID("CgkI-byp9IcCEAIQFQ"),m.addJChar(new JChar("mya","みゃ","ミャ")),m.addJChar(new JChar("myu","みゅ","ミュ")),m.addJChar(new JChar("myo","みょ","ミョ"));var A=new JBlock("ry",0);e.addJBlock(A),A.setAchievementID("CgkI-byp9IcCEAIQFg"),A.addJChar(new JChar("rya","りゃ","リャ")),A.addJChar(new JChar("ryu","りゅ","リュ")),A.addJChar(new JChar("ryo","りょ","リョ"));var p=new JBlock("gy",0);e.addJBlock(p),p.setAchievementID("CgkI-byp9IcCEAIQFw"),p.addJChar(new JChar("gya","ぎゃ","ギャ")),p.addJChar(new JChar("gyu","ぎゅ","ギュ")),p.addJChar(new JChar("gyo","ぎょ","ギョ"));var I=new JBlock("zj",0);e.addJBlock(I),I.setAchievementID("CgkI-byp9IcCEAIQGA"),I.addJChar(new JChar("ja (z)","じゃ","ジャ")),I.addJChar(new JChar("ju (z)","じゅ","ジュ")),I.addJChar(new JChar("jo (z)","じょ","ジョ"));var y=new JBlock("dj",0);e.addJBlock(y),y.setAchievementID("CgkI-byp9IcCEAIQGQ"),y.addJChar(new JChar("ja (d)","ぢゃ","ヂャ")),y.addJChar(new JChar("ju (d)","ぢゅ","ヂュ")),y.addJChar(new JChar("jo (d)","ぢょ","ヂョ"));var B=new JBlock("by",0);e.addJBlock(B),B.setAchievementID("CgkI-byp9IcCEAIQGg"),B.addJChar(new JChar("bya","びゃ","ビャ")),B.addJChar(new JChar("byu","びゅ","ビュ")),B.addJChar(new JChar("byo","びょ","ビョ"));var S=new JBlock("py",0);return e.addJBlock(S),S.setAchievementID("CgkI-byp9IcCEAIQGw"),S.addJChar(new JChar("pya","ぴゃ","ピャ")),S.addJChar(new JChar("pyu","ぴゅ","ピュ")),S.addJChar(new JChar("pyo","ぴょ","ピョ")),e};JChar.TYPE={ROMAJI:"R",HIRAGANA:"H",KATAKANA:"K"};var GApi=function(){this.clientId="70842474105-h9e3dv7a6kfv3jtdcr6f8fnjv9o6nfla.apps.googleusercontent.com",this.scopes="https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/games",this.data={},this.data.name="LearnKanaProgress.txt",this.parents=["appDataFolder"],this.firstLoad=!0,this.findFileId=function(){var e=this;return gapi.client.drive.files.list({q:"name='"+e.data.name+"'",spaces:e.parents}).execute(function(a){var t=a.files.length||!1;t?e.data.id=a.files[0].id:gapi.client.drive.files.create({name:e.data.name,parents:e.parents,fields:"id"}).execute(function(a){e.data.id=a.id}),e.firstLoad&&(e.loadFromDrive(),e.firstLoad=!1)}),this.data.id},this.update=function(e){var a=gapi.auth.getToken().access_token;const t="-------314159265358979323846",r="\r\n--"+t+"\r\n",n="\r\n--"+t+"--";var h={description:"savefile for my game",mimeType:"application/json"},i=r+"Content-Type: application/json\r\n\r\n"+JSON.stringify(h)+r+"Content-Type: application/json\r\n\r\n"+e+n;gapi.client.request({path:"/upload/drive/v3/files/"+this.data.id,method:"PATCH",params:{fileId:this.data.id,uploadType:"multipart"},headers:{"Content-Type":'multipart/form-data; boundary="'+t+'"',Authorization:"Bearer "+a},body:i}).execute(function(e){console.log("Wrote to file "+e.name+" id: "+e.id)})},this.saveToDrive=function(){var e=chars.getJSON();chars.save(e),this.update(e)},this.loadFromDrive=function(){gapi.client.drive.files.get({fileId:this.data.id,alt:"media"}).execute(function(e){var a=e.result,t=localStore.getJSON()||JSON.stringify({timestamp:0,gameScore:0}),r=JSON.parse(t),n=r.gameScore||0,h=a.gameScore||0;h>n&&(localStore.setJSON(JSON.stringify(a)),chars.load(),nextQuestion())})},this.unlockAchievement=function(e){this.achManager.unlockAchievement(e)},this.revealAchievement=function(e){gapi.client.games.achievements.reveal({achievementId:e}).execute(function(e){console.log(e)})},this.purgeData=function(e){"purge"===e&&gapi.client.drive.files["delete"]({fileId:this.data.id}).execute()},this.getAccessToken=function(){if(void 0!==typeof this.authorized)return gapi.auth.getToken().access_token},this.loadAchievementManager=function(){this.achManager={},this.achManager.achievements={};var e=this;this.achManager.preloaded=!1,this.achManager.loadData=function(){var a=gapi.client.games.achievementDefinitions.list();a.execute(function(a){if(console.log("Achievement definitions",a),"games#achievementDefinitionsListResponse"==a.kind&&a.hasOwnProperty("items")){for(var t=0;t<a.items.length;t++)e.achManager.achievements[a.items[t].id]=a.items[t],e.achManager.achievements[a.items[t].id].achievementState=a.items[t].initialState;e.achManager.loadAchievementsEarnedByPlayer()}})},this.achManager.clearData=function(){this.achManager.achievements={},this.achManager.preloaded=!1},this.achManager.loadAchievementsEarnedByPlayer=function(){var a=gapi.client.games.achievements.list({playerId:"me"});a.execute(function(a){if(console.log("Your achievement data: ",a),"games#playerAchievementListResponse"==a.kind&&a.hasOwnProperty("items"))for(var t=0;t<a.items.length;t++){var r=a.items[t];e.achManager.achievements[r.id].achievementState=r.achievementState,r.hasOwnProperty("formattedCurrentStepsString")&&(e.achManager.achievements[r.id].formattedCurrentStepsString=r.formattedCurrentStepsString)}else console.log("**Unexpected response **",a)}),this.preloaded=!0},this.achManager.unlockAchievement=function(a){var t=gapi.client.games.achievements.unlock({achievementId:a});t.execute(function(t){console.log("Data from earning achievement is ",t),t.newlyUnlocked?(e.showAchievementWidget(a),e.achManager.loadAchievementsEarnedByPlayer()):console.log("You unlocked "+e.achManager.achievements[a].name+" but you already unlocked it earlier.")})},this.showAchievementWidget=function(e){var a=$("#achUnlocked");a.find("img").prop("src",this.achManager.achievements[e].unlockedIconUrl),a.find("#achDescrip").html(this.achManager.achievements[e].description),a.slideDown(),a.delay(2e3).slideUp()},this.achManager.loadData()},this.authorizedFunc=function(e){this.authorized=e;var a=this;gapi.client.load("drive","v3",function(e){a.findFileId()}),gapi.client.load("games","v1",function(e){a.loadAchievementManager()})},this.checkAuth=function(){var e={client_id:this.clientId,scope:this.scopes,immediate:!0},a=this;gapi.auth.authorize(e,function(e){a.authorizedFunc(e)})},this.checkAuth()},setScore=function(e,a){var t=!1,r=!1,n=!1;a<25?t=!0:a<60?r=!0:n=!0,e.css("width",a+"%").attr("aria-valuenow",a),e.toggleClass("progress-bar-danger",t).toggleClass("progress-bar-warning",r).toggleClass("progress-bar-success",n)},updateScore=function(){var e=10*q.jChar.hScore,a=10*q.jChar.kScore,t=10*q.jChar.getScore(),r=q.jChar.parent.getScore();chars.save(),setScore($(".hiragana-score .progress-bar"),e),setScore($(".katakana-score .progress-bar"),a),setScore($(".char-score .progress-bar"),t),setScore($(".block-score .progress-bar"),r)},showNewQuestion=function(){$(".RW .correctness").toggleClass("fa-check",!1),$(".RW .correctness").toggleClass("fa-times",!1),$(".A").toggleClass("label-danger",!1),$(".A").toggleClass("label-warning",!1),$(".A").toggleClass("label-success",!1),$(".A").toggleClass("disabled",!1),$("#next").toggleClass("disabled",!0),q=chars.getQuestion(),$("#Q").text(q.qa.question);for(var e=0;e<q.qa.answers.length;e++)$($(".A")[e]).text(q.qa.answers[e]);updateScore(),console.log(getChanceList(chars.jBlockArr))},printDebug=function(e){"devel"==window.location.hash.substr(1)&&alert(e)},nextQuestion=function(){var e=(new Date).getTime();showNewQuestion();var a=(new Date).getTime(),t=a-e;printDebug("Execution time: "+t)},Local=function(){this.data="LearnKana",this.getJSON=function(){return localStorage.getItem(this.data)},this.setJSON=function(e){localStorage.setItem(this.data,e)}};