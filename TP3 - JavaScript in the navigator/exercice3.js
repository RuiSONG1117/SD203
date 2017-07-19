function bodyOnload(){
    "use strict"
	
    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var div = document.getElementById("MAIN");
    var jsonObj;
    var timeNow = -1;
    function showURL(){
        timeNow += 1;
        reader.open("get", "http://perso.telecom-paristech.fr/~rsong/slides.json", true);
        reader.onreadystatechange = function(){
            if(reader.readyState==4 && reader.status==200){
                jsonObj = JSON.parse(reader.responseText);
                jsonObj.slides.map(function(o){
                    console.log(timeNow);
                    if(o.time === (timeNow%90)){
                        //console.log(timeNow);
                        div.innerHTML = "";
                        var iframe = document.createElement("iframe");
                        iframe.height = "1000";
                        iframe.width = "1500";
                        iframe.src = o.url;
                        div.appendChild(iframe);
                    }
                });
            }
        }
        reader.send(null);
        window.setTimeout(showURL, 1000);
    }
    showURL();
}