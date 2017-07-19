function bodyLoad(){

    "use strict"

    var textDiv = document.getElementById("textDiv");
    var textarea = document.createElement("textarea");
    textarea.setAttribute("rows", 10);
    textarea.setAttribute("cols", 75);
    textDiv.appendChild(textarea);

    var but = document.getElementById("button");
    //read from textarea, send them and clear it
    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var url = "chat.php?phrase=";
    but.addEventListener ("click", function() {
    	reader.open('get', url + textarea.value + "&client_ip=" + client_ip , true); 

    	reader.onreadystatechange = function(){
    		if(reader.readyState==4 && reader.status==200){
    		    //console.log(textarea.value);
    		    textarea.value = "";
    		}
    	};
    	reader.send(null);
    });

    //display the content of texte.html
    var chatReader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var chatDiv = document.getElementById("chatDiv");
    var nmLine = 0;
    var i = 0;
    var lineByLine = ""
    var ipColor = [];
    var ifExist = new Array();
    var ind = 0;
    function chatUpdate(){
        chatReader.open("get", "http://perso.telecom-paristech.fr/~rsong/texte.html", true);
        chatReader.onreadystatechange = function(){
            if(chatReader.readyState==4 && chatReader.status==200){
                var allText = chatReader.responseText;
                //console.log(allText.length);
                lineByLine = allText.split(/<br \/>/g);
                //console.log(lineByLine.length);
                for(i = 1+nmLine; i<lineByLine.length; i++){
                    var line = lineByLine[i]
                    var IP = (line.match(/-[^-]*/g)[0]).match(/".*"/g)[0];
                    //console.log(IP);
                    //store the color for a new user:
                    if( (typeof ifExist[IP]) === "undefined"){
                        console.log("inserting color");
                        ipColor.push(   (function (ln){
                                            var obj = {cl: '#' + (Math.random().toString(16) + "000000").substring(2,8), thisIp: ln };
                                            console.log(obj.cl);
                                            return obj;
                                        }
                        )(IP)
                        );
                        ifExist[IP]=ind;
                        ind++ ;
                    }
                    //remove a line if the number of all lines are about to exceed 10
                    if(nmLine >= 10){
                    	chatDiv.removeChild(chatDiv.firstChild);
                    }
                    var p = document.createElement("p");
                    p.innerHTML = line;
                    p.style.color = ipColor[ifExist[IP]].cl;
                    //console.log(p.innerHTML);
                    chatDiv.appendChild(p);
                    nmLine = nmLine + 1;
                }
            }
        }
        chatReader.send(null);
        window.setTimeout(chatUpdate, 100);
    }
    chatUpdate();
}