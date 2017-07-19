"use strict"

var timeNow = -1;
var timer_is_on = 1;
var t;
var reader;
var jsonObj;

function bodyOnload(){
    "use strict"
    readJSON();
    showURL();
}

function readJSON(){
    reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    reader.open("get", "http://perso.telecom-paristech.fr/~rsong/slides.json", false);
    reader.onreadystatechange = function(){
        if(reader.readyState==4 && reader.status==200){
            jsonObj = JSON.parse(reader.responseText);
        }
    }
    reader.send(null);
}

function divAppend(){
    jsonObj.slides.map(function(o){
        if(o.time === timeNow){
            var div = document.getElementById("MAIN");
            div.innerHTML = "";
            var iframe = document.createElement("iframe");
            iframe.height = "500";
            iframe.width = "1400";
            iframe.src = o.url;
            div.appendChild(iframe);
        }
    });
}

function showURL(){
    timeNow = (timeNow + 1)%90;
    console.log(timeNow);

    divAppend();

    t = setTimeout(function(){ showURL() }, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        showURL();
    } else {
        clearTimeout(t);
        timer_is_on = 0;
    }
}

function previousPage(){
    clearTimeout(t);
    timer_is_on = 0;
    timeNow = (timeNow - (timeNow%15) +75)%90;
    console.log(timeNow);

    divAppend();
}

function nextPage(){
    clearTimeout(t);
    timer_is_on = 0;
    timeNow = (timeNow - (timeNow%15) +15)%90;
    console.log(timeNow);

    divAppend();
}





