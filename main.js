var jsonData;
var gameDictionary;
$(document).ready(function(){
    gameDictionary = new Map();
    google.charts.load('current', { packages: ['corechart'] }).then(function () {
        var query = new google.visualization.Query('http://spreadsheets.google.com/tq?key=1RoujVUSQD7mOI2tpeqBszpjjt4tkgLEpr1LHcWND3O8&pub=1');
        query.send(function (response) {            
        var dataTable = response.getDataTable();
        jsonData = dataTable.toJSON();            
        jsonData = JSON.parse(jsonData);
        console.log(jsonData)
        var lastKey;
        for(var i=0; i < jsonData.rows.length; i++) {
            var key = jsonData.rows[i].c[0].v;
            if(!gameDictionary.has(key)){
                gameDictionary.set(key,[]);
                var htmlData = "<p class=\"menu\" onclick=\"initGame(\'"+key+"\')\">" + jsonData.rows[i].c[0].v;
                $(".list ul").append(htmlData);
                lastKey = key;
            }
            var htmlData = "";
            var link = jsonData.rows[i].c[2].v;
            var gameObject = new Object();
            gameObject.name = jsonData.rows[i].c[1].v;
            gameObject.download = link;
            var imageLink = jsonData.rows[i].c[3].v;
            try{
                var split = imageLink.split('w');
                if(split.length>1){
                    imageLink=imageLink.replace(split[split.length-1],"300");
                }

            }catch(e){
                imageLink = jsonData.rows[i].c[3].v;
            }
            gameObject.image = imageLink;
            gameObject.cafe = jsonData.rows[i].c[4].v;
            gameObject.makers = jsonData.rows[i].c[5].v;
            gameDictionary.get(key).push(gameObject);
        }
        initGame(lastKey);
        });
      });

});

function initGame(key){
    $(".game").empty();
    gameList = gameDictionary.get(key);
    for(let i = 0; i<gameList.length; i++){
        var game = gameList[i];
        var newDiv = document.createElement("div");
        newDiv.className = "card";
        
        var img = document.createElement("iframe");
        img.setAttribute('src',game.image);
        img.setAttribute("scrolling","no");
        console.log(img.src);
        var p1 = document.createElement("p");
        var starsSpan = document.createElement("span");
        starsSpan.style.color = "#e2703a";
        starsSpan.className = "maker"
        starsSpan.innerHTML = game.makers;
        p1.appendChild(starsSpan);
        
        var p2 = document.createElement("p");
        var fontSizeSpan = document.createElement("span");
        fontSizeSpan.className = "name"
        fontSizeSpan.innerHTML = game.name;
        p2.appendChild(fontSizeSpan);
        var cafe = document.createElement("a");
        cafe.href = game.cafe;
        cafe.target="_blank";
        cafe.className = "cafe";
        cafe.innerHTML = "게임 소개";
        var downloadlink = document.createElement("a");
        downloadlink.href = game.download;
        downloadlink.target = "_blank";
        downloadlink.className = "download";
        downloadlink.innerHTML = "다운로드";
        
        newDiv.appendChild(img);
        newDiv.appendChild(p1);
        newDiv.appendChild(p2);
        newDiv.appendChild(cafe);
        newDiv.appendChild(downloadlink);
        
        $(".game").append(newDiv);
    }
    console.log(gameList);
}



