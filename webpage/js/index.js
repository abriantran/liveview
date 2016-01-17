'use strict';
/* KYACS (Kor's Youtube Animated Commenting System) */

//TODO: create namespace, refactor, clean up this mess

var annotation = [];

$("#annotations > *, #player").addClass("animated"); // needed for the css3 animations used

var annotations = {};
annotations.startTime = [];
annotations.stopTime  = [];
annotations.effectIn  = [];
annotations.effectOut = [];
annotations.positionTop = [];
annotations.positionHorizontalCentre = [];
annotations.videoShake = [];
annotations.bullshitfactor = [];
annotations.alertType = [];
annotations.nodes     = document.querySelectorAll("#annotations > *");

for (var i = 0; i < annotations.nodes.length; i++) {
    annotations.startTime[i] = annotations.nodes[i].getAttribute("data-starttime");
    annotations.stopTime[i]  = annotations.nodes[i].getAttribute("data-stoptime");
    annotations.effectIn[i]  = annotations.nodes[i].getAttribute("data-effectIn");
    annotations.effectOut[i] = annotations.nodes[i].getAttribute("data-effectOut");
    annotations.positionTop[i] = annotations.nodes[i].getAttribute("data-positionTop");
    annotations.bullshitfactor[i] = annotations.nodes[i].getAttribute("data-bullshitfactor");
    annotations.alertType[i] = annotations.nodes[i].getAttribute("data-alertType");
    annotations.positionHorizontalCentre[i] = annotations.nodes[i].getAttribute("data-positionHorizontalCentre") || "";
    annotations.videoShake[i] = annotations.nodes[i].getAttribute("data-videoShake") || "";
}

for (var j = 0; j < annotations.nodes.length; j++) {
    var k = j + 1;
    var annotationsNthchild = $("#annotations > *:nth-child(" + k + ")");

    if (annotationsNthchild.hasClass("thought")) {
        annotationsNthchild.wrap("<div id='thoughtbubblewrap" + k + "' class='thoughtbubblewrap'></div>");
        var temp = "#thoughtbubblewrap" + k;
        annotation[j] = $(temp);
    } else {
        annotation[j] = annotationsNthchild;
    }
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: video.ID,
        playerVars: {
            start: video.start,
            end: video.stop,
            fs: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
//    event.target.playVideo();
}

var done = false;

function onPlayerStateChange(event) {
    var interval;
    var annotationsNthchild;

    var hasStarted = [];
    var hasEnded = [];
    var videoEffect = "wobble";
    var temp;

    // assigning values to array elements
    for (var i = 0; i < annotations.nodes.length; i++) {
        hasStarted[i] = false;
        hasEnded[i] = false;
    }

    if (event.data == YT.PlayerState.PLAYING && !done) {
        interval = setInterval(function () {
            for (var i = 0; i < annotations.nodes.length; i++) {
                var j = i + 1; // nth-child is not zero-based

                if (hasStarted[i] === false && player.getCurrentTime() > parseFloat(annotations.startTime[i])) {
                    if (annotations.bullshitfactor[i]) {
                        switch (annotations.alertType[i]) {
                            case "success":
                                Notifier.success(annotations.bullshitfactor[i], "Succes");
                                break;
                            case "warning":
                                Notifier.warning(annotations.bullshitfactor[i], "Warning");
                                break;
                            case "error":
                                Notifier.error(annotations.bullshitfactor[i], "Error");
                                break;
                            case "info":
                                Notifier.info(annotations.bullshitfactor[i], "Info");
                                break;
                            case "notify":
                                Notifier.notify(annotations.bullshitfactor[i], "Notification");
                        }
                    }

                    if (annotations.effectIn[i]) {

                        annotation[i].addClass("visible toForeground " + annotations.effectIn[i]);

                    } else {
                        annotation[i].addClass("visible toForeground " + "bounceInLeft");
                    }

                    if (annotations.positionHorizontalCentre[i]) {

                        annotation[i].css({
                            left: "50%",
                            marginLeft: annotations.positionHorizontalCentre[i] + "px"
                        });

                    }

                    if (annotations.positionTop[i]) {
                        annotation[i].css({
                            top: annotations.positionTop[i] + "px"
                        });

                    } else {
                        annotation[i].css({
                            top: "100px"
                        });
                    }

                    if (annotation[i].hasClass("videoShake")) {
                        $("#player").addClass(videoEffect);
                        setTimeout(function () {
                            $("#player").removeClass(videoEffect);
                        }, 1000);
                    }

                    hasStarted[i] = true;
                }
//                else if (player.getCurrentTime() <= parseFloat(annotations.startTime[i])) {
//                    hasStarted[i] = false;
//                }

                if (hasEnded[i] === false && player.getCurrentTime() > parseFloat(annotations.stopTime[i])) {
                    if (annotations.effectIn[i]) {
                        annotation[i].removeClass("visible " + annotations.effectIn[i]);

                    } else {
                        annotation[i].removeClass("visible " + "bounceInLeft");
                    }

                    (function (jj) {
                        setTimeout(function () {
                            $("#annotations *:nth-child(" + jj + ")").removeClass("toForeground");
                        }, 1000);
                    }(j));

                    if (annotations.effectOut[i]) {
                        annotation[i].addClass(annotations.effectOut[i]);
                    } else {
                        annotation[i].addClass("bounceOutRight");
                    }

                    hasEnded[i] = true;
                }
//                else if (player.getCurrentTime() <= parseFloat(annotations.stopTime[i])) {
//                    hasEnded[i] = false;
//                }
            }
        }, 200);

        done = true;
    }

    if (event.data == YT.PlayerState.ENDED) {
        clearInterval(interval);
    }
}


function opnieuw() {
    window.location = window.location;
}
document.querySelector("#again").addEventListener("click", opnieuw, false);