var myDispatchEvent = function (name){
    var event, useEvents = 1;
    if (useEvents){
        event =  new Event(name);
    }else{
        event = document.createEvent('Event');
        event.initEvent(name, true, true);
    }
    document.getElementById("content").dispatchEvent(event);
}

window["GD_OPTIONS"] = {
    "gameId": "3dbd133d0cd9468bafdf2c9812290f4b",
    "onEvent": function(event) {
        switch (event.name) {
            case "SDK_GAME_START":
                // advertisement done, resume game logic and unmute audio
                myDispatchEvent('SDK_GAME_START');
                break;
            case "SDK_GAME_PAUSE":
                // pause game logic / mute audio
                myDispatchEvent('SDK_GAME_PAUSE');
                // document.getElementById("content").dispatchEvent(new Event("SDK_GAME_PAUSE"));
                break;
            case "SDK_GDPR_TRACKING":
                // this event is triggered when your user doesn't want to be tracked
                console.log("SDK_GDPR_TRACKING");
                break;
            case "SDK_GDPR_TARGETING":
                // this event is triggered when your user doesn't want personalised targeting of ads and such
                console.log("SDK_GDPR_TARGETING");
                break;
            case "SDK_READY":
                // this event is triggered when your user doesn't want personalised targeting of ads and such
                console.log("SDK_READY");
                break;
        }
    },
};

var gdsdk = {
    showAd: () => {
        console.log("No ads here");
        myDispatchEvent('SDK_GAME_START');
    }
};