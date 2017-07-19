function bodyLoad(){
    "use strict"

    var textDiv = document.getElementById("textDiv");
    var textarea = document.createElement("textarea");
    textarea.setAttribute("rows", 10);
    textarea.setAttribute("cols", 75);
    textDiv.appendChild(textarea);

    var but = document.getElementById("button");

    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var url = "http://perso.telecom-paristech.fr/~rsong/chat.php?phrase=";
    //Add event handler
    but.addEventListener ("click", function() {
        //alert("did something");
        reader.open('get', url + textarea.value + "&client_ip=" + client_ip, true); 
        reader.onreadystatechange = function(){
            if(reader.readyState==4 && reader.status==200){
            	textarea.value = "";
            }
        };
        reader.send(null);
    });

    var chatReader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    var chatDiv = document.getElementById("chatDiv");
    function chatUpdate(){
    	chatReader.open("get", "texte.html", true);
    	chatReader.onreadystatechange = function(){
    		if(chatReader.readyState==4 && chatReader.status==200){
    			chatDiv.innerHTML = chatReader.responseText;
    		}
    	}
    	chatReader.send(null);
    	window.setTimeout(chatUpdate, 1000);
    }
    chatUpdate();
}