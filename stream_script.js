function checkSupport(){
    if(Hls.isSupported()){
        console.log("Browser Supports HLS.");
        return true;
    }
    return false;
}

function setupStreamHLS(webLink){
    if(checkSupport()){
        var video = document.getElementById("video");
        var hls = new Hls();
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function(){
            console.log("Video and Hls library are now linked");
            hls.loadSource(webLink);
            hls.on(Hls.Events.MANIFEST_PARSED, function(event, data){
                console.log('manifest loaded, found ' + data.levels.length + ' quality level');
                var dataString = JSON.stringify(data);
                console.log(dataString)
                video.play();
            });
            
        });

    }
}

function setupStreamMPD(webLink){
    console.log("Dash Player Called");
    var player = dashjs.MediaPlayer().create();
    console.log("Dash Player Initialized for "+webLink);
    player.initialize(document.getElementById("video"), webLink, true);
}

var submitButton = document.getElementById("submitButton");  //interact
submitButton.addEventListener('click', function(){
    var inputSel = document.getElementById("inputSel");
    var webLink = inputSel.value;
    var webArr = webLink.split(".")
    if(webArr[webArr.length-1]==="m3u8"){
        setupStreamHLS(webLink);
    }
    else if(webArr[webArr.length-1]==="mpd"){
        setupStreamMPD(webLink);
    }   
});
