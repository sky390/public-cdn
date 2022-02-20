var mid = "[";
$.ajax({
    url: "https://codeforces.com/api/contest.list?gym=false",
    dataType: 'json',
    async: false,
    success: function (end) {
        for (var i = end.result.length - 1, j = 0; i >= 0; i--, j++) {
            if (end.result[i].phase == "FINISHED" || end.result[i].durationSeconds > 5 * 3600) { continue; }
            else {
                //console.log(JSON.stringify(end.result[i]));
                mid += JSON.stringify(end.result[i]) + ',';
                //console.log(end.result[i].durationSeconds);
                //console.log("执行了: " + j + " 次");
                break;
            }
        }
    },
    error: function (end) {
        mid = "";
        sta = "加载失败，请刷新重试";
    }
});
mid += ']';
//console.log(mid);

function formatSeconds(value) {
    var date = new Date(value * 1000);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1):date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate():date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours():date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes():date.getMinutes());
    return Y + M + D + h + m;
}

var jsonArray = eval('(' + mid + ')');
//console.log(jsonArray);
var headArray = [];

function parseHead(oneRow) {
    for (var i in oneRow) {
        if (i == "frozen" || i == "phase" || i == "relativeTimeSeconds" || i == "type" || i == "durationSeconds") continue;
        headArray[headArray.length] = i;
    }
}

appendDiv();
function appendDiv() {
    parseHead(jsonArray[0]);
    var div = document.getElementById("recent");
    console.log(jsonArray[0][headArray[1]]);
    console.log(jsonArray[0][headArray[2]]);
    var contestName = "<p>比赛名称: <a href=\"https://codeforces.com/contest/" + JSON.stringify(jsonArray[0][headArray[0]]) + "\">" + jsonArray[0][headArray[1]] + "</a></p>";
    var contestTime = "<p>比赛时间: " + formatSeconds(jsonArray[0][headArray[2]]) + "</p>";
    div.innerHTML = contestName + contestTime;
}
