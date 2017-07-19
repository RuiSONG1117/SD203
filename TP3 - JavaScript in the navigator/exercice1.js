function loadDoc(){
    "use strict"

    //Create a text-area
    var div2 = document.getElementById("div2");
    var textarea = document.createElement("textarea");
    textarea.setAttribute("rows", 25);
    textarea.setAttribute("cols", 100);

    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    div2.innerHTML = "";
    //alert("did something");
    reader.open('get', 'text.txt', true); 
    reader.onreadystatechange = function(){
        if(reader.readyState==4 && reader.status==200){
            textarea.innerHTML = reader.responseText;
            div2.appendChild(textarea);
        }
    };
    reader.send(null);
}

function loadDoc2(){
    "use strict"
    var div2 = document.getElementById("div2");

    var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');
    div2.innerHTML = "";
    //alert("did something");
    reader.open('get', 'text.txt', true); 
    reader.onreadystatechange = function(){
        if(reader.readyState==4 && reader.status==200){
            var allText = reader.responseText;
            var lineByLine = allText.split("\n");
            var colors = ["#fe4365", "#fc9d9a", "#f9cdad", "#c8c8a9", "#83af9b"];
            for(var i=0; i<5; i++){
            	var p = document.createElement("p");
            	p.style.color = colors[i];
            	p.innerHTML = lineByLine[i];
            	div2.appendChild(p);
            }
        }
    };
    reader.send(null);
}