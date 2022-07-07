let color, imageURL
const colorThief = new ColorThief();
const img1 = document.getElementById("thumbnail");
const API_URL = "https://script.google.com/macros/s/AKfycbxma7wgd2RNbtxwG9fF1B3Vif7FypRQJg4oF7zsT3Xi__Ne5577X1dh61fjsmKcJ7xA/exec";
let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
img1.crossOrigin = 'Anonymous';


function customview() {
    let url = "https://sheets.googleapis.com/v4/spreadsheets/1e6bp_MizsC1qxmnmoIiOCx0rdFiZf8Vf3s1CpRIDIHE/values/get?key=AIzaSyBrH5j4PgNdtfAX4yM5_GUvSjeipA7j72M";
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(custom) {
            return custom
        });
}


function contents() {
    //スプレッドシート格納配列作成

    //API起動
    let custom = customview();
    Promise.resolve(custom).then(function(customs) {
        document.getElementById('TitleText').innerHTML = "<a href='" + customs.values[0][3] + "'>" + customs.values[0][2] + "</a>";
        document.getElementById("videoplayer").src = "https://www.youtube.com/embed/" + customs.values[0][1];
        //document.getElementById("thumbnail").src = "https://img.youtube.com/vi/" + customs.values[0][1] + "/maxresdefault.jpg";
        imageURL = "https://img.youtube.com/vi/" + customs.values[0][1] + "/maxresdefault.jpg";
        console.log(imageURL)
        img1.src = googleProxyURL + imageURL;
    })
    document.getElementById('thumbnail').addEventListener("load", colorchange);
}

function colorchange() {
    color = colorThief.getColor(img1);
    var rgb = color[0] + "," + color[1] + "," + color[2];
    $("canvas").css("background-color",`rgb(${rgb})`) // 背景色の変更
}

contents()
window.onload = function() {

    // document.addEventListener('touchmove', handle, { passive: false });
    // document.addEventListener('mousewheel', handle, { passive: false });
    setTimeout(() => {
        const spinner = document.getElementById('loading');
        spinner.classList.add('loaded');
    }, 650);

}

function handle(event) {
    event.preventDefault();
}

//  ランキングAPI呼び出し
$(function() {
    $.ajax({
        type: "GET",
        url: API_URL,
        dataType: "json",
    })
    .done((data, textStatus, jqXHR) => {
        // APIの呼び出しが成功した場合
        data.forEach((v) => {
        // ul要素の作成
        const $ul = $("<ul></ul>");

        // 各項目の設定
        $(`<li>${v.rank}位</li>`).appendTo($ul);
        $(`<li class="thli"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" class="thumb"></li>`).appendTo($ul);
        $(`<li><a href="https://youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer">${v.name}</a></li>`).appendTo($ul);
        $(`<li>${v.count}回</li>`).appendTo($ul);

        // 要素の追加
        $("#container").append($ul);
        });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        // APIの呼び出しが失敗した場合
        alert(JSON.stringify(jqXHR.responseJSON, null, 2));
    });
});