var jsonData;
var gameDictionary;
$(document).ready(function(){
    gameDictionary = new Map();
    const frontLinkStr = 'https://docs.google.com/uc?export=download&id='
    const backLinkStr = '&confirm=t'
    google.charts.load('current', { packages: ['corechart'] }).then(function () {
        var query = new google.visualization.Query('http://spreadsheets.google.com/tq?key=1RoujVUSQD7mOI2tpeqBszpjjt4tkgLEpr1LHcWND3O8&pub=1');
        query.send(function (response) {            
        var dataTable = response.getDataTable();
        jsonData = dataTable.toJSON();            
        jsonData = JSON.parse(jsonData);
        console.log(jsonData)
        for(var i=0; i < jsonData.rows.length; i++) {
            var key = jsonData.rows[i].c[0].v;
            if(!gameDictionary.has(key)){
                gameDictionary.set(key,[]);
                var htmlData = "<li onclick=\"initGame("+key+")\">" + jsonData.rows[i].c[0].v;
                $(".list ul").append(htmlData);
            }
            var htmlData = "";
            var link = jsonData.rows[i].c[2].v.split('/')[5];
            link = frontLinkStr+link+backLinkStr;
            var gameObject = new Object();
            gameObject.name = jsonData.rows[i].c[1].v;
            gameObject.download = link;
            gameObject.image = jsonData.rows[i].c[3].v;
            gameObject.cafe = jsonData.rows[i].c[4].v;
            gameDictionary.get(key).push(gameObject);
        }
        init();
        });
      });

});
function init(){
    
}
function initGame(key){
    $(".game").empty();
    gameList = gameDictionary.get(key);
    for(let i = 0; i<gameList.length; i++){
        console.log(game);
        var game = gameList[i];
        var newDiv = document.createElement("div");
        newDiv.className = "card";
        
        // ?��미�?? ?��?�� ?��?��
        var img = document.createElement("img");
        img.setAttribute('src',game.image);
        console.log(img.src);
        // �?? 번째 p ?��?�� ?��?��
        var p1 = document.createElement("p");
        var starsSpan = document.createElement("span");
        starsSpan.style.color = "#e2703a";
        starsSpan.innerHTML = game.name;
        p1.appendChild(starsSpan);
        
        // ?�� 번째 p ?��?�� ?��?��
        var p2 = document.createElement("p");
        var fontSizeSpan = document.createElement("span");
        fontSizeSpan.style.fontSize = "20px";
        fontSizeSpan.innerHTML = game.name;
        p2.appendChild(fontSizeSpan);
        
        // ?��?�� ?��????��?�� div ?��?�� ?��?��
        var downloadlink = document.createElement("a");
        downloadlink.href = game.download;
        downloadlink.target = "_blank";
        downloadlink.className = "download";
        downloadlink.innerHTML = "?��?��로드";
        
        // ?��?��?�� ?��?��?��?�� ?��로운 div?�� 추�??
        newDiv.appendChild(img);
        newDiv.appendChild(p1);
        newDiv.appendChild(p2);
        newDiv.appendChild(downloadlink);
        
        // ?��?��?�� div�?? 문서?�� 추�??
        $(".game").append(newDiv);
    }
    console.log(gameList);
}



