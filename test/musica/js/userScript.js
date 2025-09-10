//## userID is is defined in index.php
let maxCredits=5;
let credits=-1;
let playlistRefresh;
let usercredits=-1;
let ctimerTO;
var maxShoutout=69;
$(function(){
	getPlaylist();
    //playlistRefreshTimer();
	
	var screenH=window.innerHeight;
	var hHeight=$("#appHeader").height();
	$("#appBody").height(screenH-hHeight-20);
	
	/* *** BUTTON CLICK ********** */
	$(document).on("click",".upvote",function(){
		doUpvote((this));
	});
	$(document).on("tap",".upvote",function(){
		doUpvote((this));
	});
	
	
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~ */
	
	/* *** SEARCH BOX ********** */
    var sTimeout; //For reference to timeout
    var DelayInMs=500;
    //When input is received, (re)set the timer
    $("#searchbox").keyup(function() {
		clearInterval(playlistRefresh);
        if(sTimeout) {clearTimeout(sTimeout);} //Clear existing timeout, if any
        sTimeout = setTimeout(doSearch, DelayInMs);
       // playlistRefreshTimer();
    });
	
    
	/* *** SHOUTOUT ********** */
    $("#diaShoutout").dialog({
        "title": "Shoutout!",
        autoOpen: false,
        "modal": true,
		width:"90%",
		position: { my: "center", at: "top", of: "#appBody" },
        "close": function(){
           getPlaylist();
           playlistRefreshTimer();
        },
    });
	
    $(document).on("click tap","div.jqShoutoutIcon",function(){
        var slid=$(this).data("slid");
        //## get current text
        $("#taShoutout").val($("#shoutout_"+$(this).data("slid")).text());
        $("#slidShoutout").val(slid);
        $("#divShoutoutCharCount").text($("#taShoutout").val().length+"/"+maxShoutout);
        $("#diaShoutout").dialog("open");
    });
	
	/*
    $(document).on("tap","div.jqShoutoutIcon",function(){
        slid=$(this).data("slid");
        //## get current text
        $("#taShoutout").val($("#shoutout_"+$(this).data("slid")).text());
        $("#slidShoutout").val(slid);
        $("#divShoutoutCharCount").text($("#taShoutout").val().length+"/"+maxShoutout);
        $("#diaShoutout").dialog("open");
    });
	*/
	
	
    $(document).on("click tap","#jqBtnSaveShoutout", function(){
		//## userID is set in index.php
        var sodata=$("#frmShoutout").serialize()+"&user="+userID+"&mode=saveShoutout";
        $.post("../datafunctions/getData.php",sodata,function(){
            $("#diaShoutout").dialog("close");
        });
    });
    $("#taShoutout").keyup(function(){
        if($("#taShoutout").val().length >maxShoutout){
            return false;
        }
        $("#divShoutoutCharCount").text($("#taShoutout").val().length+"/"+maxShoutout);
    });
    /* *** END SHOUTOUT ********** */
    
    
    
    $("#jsShowPlaylist").on("click",function(){
        getPlaylist();
		showPlaylistWrapper();
		$("#appBody").scrollTop(0);

    });
    $("#jsShowSessionlist").on("click",function(){
        showSessionlistWrapper();
    });
    
    //## browsing:
    //## use class for type, data-val for value
     
    $(document).on("click",".jsBrowseBySong",function(){
		doBrowseBySong($(this));
    });
    $(document).on("tap",".jsBrowseBySong",function(){
        doBrowseBySong($(this));
    });
    $(document).on("click",".jsBrowseByArtistId",function(){
		doBrowseByArtistId($(this));
    });
    $(document).on("tap",".jsBrowseByArtistId",function(){
        doBrowseByArtistId($(this));
    });
    $(document).on("click",".jsBrowseByYear",function(){
		doBrowseByYear($(this));
    });
    $(document).on("tap",".jsBrowseByYear",function(){
        doBrowseBySong($(this));
    });
	
   $(document).on("click tap",".jsBrowseByTag",function(){
        doBrowseByTag($(this));
    });
	
	
	$("#taShoutout").on("keypress touchstart", function(e){
          var code = e.keyCode ? e.keyCode:e.which; 
          var pressedKey = String.fromCharCode(code); 
          if(pressedKey.match(/^[-\w\s]+$/)){/* */}else{ e.preventDefault(); }
	});
});

	
function doBrowseBySong(ele){
	showSessionlistWrapper();
	$("#jsSessionListTags").hide();
	$("#jsSessionListAZ").show();
	
	$("#jsSessionList").html("");
	$("#appBody").scrollTop(0);

	if($(ele).data("val")=="0"){
		$("#jsSessionList").html($("#songlistDefaultAZ").html());
	}else{
		var url="../datafunctions/getData.php?xml=1&mode=getSonglist&by=song&prefix="+$(ele).data("val")+"&user="+userID; /* userID is set in index.php */
		$.get(url,function(data){
			$("#jsSessionList").html(data);
			$("#xmldata").val(data);
			//$("#jsShowSessionlist").trigger("click");
		});
		
	}
}
	
	
function doBrowseByTag(ele){
	showSessionlistWrapper();
	$("#jsSessionListAZ").hide();
	$("#jsSessionListTags").show();
        $("#jsSessionList").html("");
        $("#appBody").scrollTop(0);
	if($(ele).data("val")=="0"){
		$("#jsSessionList").html($("#songlistDefaultTags").html());
	}else{
        var url="../datafunctions/getData.php?xml=1&mode=getSonglist&by=tag&val="+$(ele).data("val")+"&user="+userID; //## userID is set in index.php
        $.get(url,function(data){
			$("#jsSessionList").html(data);
			$("#xmldata").val(data);
			//$("#jsShowSessionlist").trigger("click");
        });
	}
}	
	
function doBrowseByArtistId(ele){
	showSessionlistWrapper();
        $("#jsSessionList").html("");
        $("#appBody").scrollTop(0);
       var  url="../datafunctions/getData.php?mode=getSonglist&by=artistid&prefix="+$(ele).data("val")+"&user="+userID; //## userID is set in index.php
        $.get(url,function(data){
			$("#jsSessionList").html(data);
			$("#jsShowSessionlist").trigger("click");
        });
}
function doBrowseByYear(ele){
	showSessionlistWrapper();
        $("#jsSessionList").html("");
        $("#appBody").scrollTop(0);
        var url="../datafunctions/getData.php?mode=getSonglist&by=year&prefix="+$(ele).data("val")+"&user="+userID; //## userID is set in index.php
        $.get(url,function(data){
			$("#jsSessionList").html(data);
			$("#jsShowSessionlist").trigger("click");
        });
}
	
	
	
function doUpvote(ele){
	if($(ele).hasClass("noCredit")){
		alert("You are out of credits. Please wait.");
		return false;
	}
	clearInterval(playlistRefresh);
	var tr=$(ele).parent().parent();
	var slid=$(tr).data("slid");
	var sid=$(tr).data("sid");
	if($(tr).data("ustat")==1){
		alert("You've already voted");
		return false;
	}
	var doShoutout=($(ele).hasClass("jsOnPlaylist")== false)?true:false;
	var url="../datafunctions/getData.php?mode=getPlaylist&user="+userID+"&action=dovote&vote=1&slid="+slid+"&sid="+sid; //## userID is set in index.php
	$.get(url, function(xmlData){
		$("#jsSessionList").html("");
		writePlaylist(xmlData);
		playlistRefreshTimer();
		showPlaylistWrapper();
		if(doShoutout){
			$("#appBody").animate({ scrollTop: $('#appBody').prop("scrollHeight")}, 1000);
			var $myXml = $( $.parseXML(xmlData) );
			//## trigger click of relevant shoutout icon
			$($("#jsPlaylistWrapper").find("[data-slid='"+$myXml.children('session').children('thisSong').children('play_slid').text()+"']")).trigger("click");
		}
	});

}
	
	
function showPlaylistWrapper(){
        $("#jsSessionlistWrapper").hide();
        $("#jsSearchWrapper").hide();
        $("#jsPlaylistWrapper").show();
}	
function showSessionlistWrapper(){
        $("#jsSearchWrapper").hide();
        $("#jsPlaylistWrapper").hide();
        $("#jsSessionlistWrapper").show();
}	
function showSearchWrapper(){
        $("#jsSearchWrapper").show();
        $("#jsPlaylistWrapper").hide();
        $("#jsSessionlistWrapper").hide();
}	
	
function getPlaylist(){
	var url="../datafunctions/getData.php?mode=getPlaylist&user="+userID; //## userID is set in index.php
	$.get(url, function(xmlData){
		writePlaylist(xmlData);
		showPlaylistWrapper();
	});
	
}


	
function writePlaylist(xmlData, wrapper){
	$("#xmldata").val(xmlData);
    if(typeof wrapper === 'undefined') wrapper="jsPlaylistWrapper";
	if(!$("#"+wrapper).is(":visible")){
	//	clearSearch();
	}
	//$("#"+wrapper).html("<div></div>");
	var $myXml = $( $.parseXML(xmlData) );
      
    if($myXml.children('session').children('html').length>0){
		$("#"+wrapper).html($myXml.children('session').children('html').find('htmldata').text());
    }else{
        if($myXml.children('session').children('song').length>0){
			var content="";
			$myXml.children('session').children('song').each(function() {
                content+=$( this ).find('htmldata').text();
            });
			$("#"+wrapper).html(content);
//            setDraggable();
            
            if(wrapper=="jsPlaylistWrapper"){
                usercredits=parseInt($myXml.children('session').children('user').children('credits').text());
                $("#userCreditQty").text(usercredits);
                if(usercredits!= maxCredits && usercredits != credits) creditTimeout($myXml.children('session').children('user').children('credit_reset_timer').text());
				var messageBan=$myXml.children('session').children('user').children('messageBan').text();
				showMessageBan(messageBan);
				
            }
        }
    }
    if(wrapper=="jsPlaylistWrapper" && $("#jsPlaylistWrapper").is(":visible")){
		//$("#appBody").scrollTop(0);
	}

}

function creditTimeout(duration) {
    clearInterval(ctimerTO);
	if(duration<1) return false;
    var ctimer = duration, minutes, seconds;
    minutes = parseInt(ctimer / 60, 10);
    seconds = parseInt(ctimer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    $("#userCreditReset").html(" - Credit added in "+minutes + ":" + seconds);
    ctimerTO=setInterval(function () {
        minutes = parseInt(ctimer / 60, 10);
        seconds = parseInt(ctimer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#userCreditReset").html(" - Credit added in "+minutes + ":" + seconds);

        if (--ctimer < 0) {
			clearInterval(ctimerTO);
			usercredits=(usercredits<maxCredits)?usercredits+1:usercredits;
			$("#userCreditReset").html("");
			$("#userCreditQty").text(usercredits);
			$("button").hasClass("");
        }
    }, 1000);
}
function creditTimeoutClear(){
	clearInterval(playlistRefresh);
	playlistRefresh=null;
}
	
function doSearch(){
	var searchVal=$("#searchbox").val().trim();
	
	if(searchVal==""){
		getPlaylist();
        playlistRefreshTimer();
		showPlaylistWrapper();
		return false;
	}
	if($("#jsPlaylistWrapper").is(":visible")){
		$("#jsPlaylistWrapper").hide();
		$("#jsSearchWrapper").show();
	}
	var arr = {xml:1, mode: 'searchsongs', seachval: $("#searchbox").val(), user:userID }; //## userID is set in index.php
	$.ajax({
		url: '../datafunctions/getData.php',
		type: 'POST',
		data:arr,
		success: function(data) {
			$("#jsSearchResults").html(data);
			$("#xmldata").val(data);
			showSearchWrapper();
		}
	});
}
	

function clearSearch(){
	$("#searchbox").val("");
	$("#jsSessionList").html("");
	$("#jsSearchWrapper").hide();
	$("#jsPlaylistWrapper").show();
	getPlaylist();
    playlistRefreshTimer();
}

function playlistRefreshTimer(){
	return false;
   //playlistRefresh=setInterval(getPlaylist,10000);    

} 

function showMessageBan(onoff){
	if(onoff){
		$("#divMessageBan").show();
	}else{
		$("#divMessageBan").hide();
	}
}