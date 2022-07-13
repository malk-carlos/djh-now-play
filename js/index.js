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
        // console.log(data)
        for(let a = 0; a < 6; a ++){
            const $hide = $(`<div id='item${String(a)}' class='item hide'></div>`)
            const $show = $(`<div id='item${String(a)}' class='item show'></div>`)
            for(let i = 0; i < 5; i ++){
                if(a == 0){
                    var n = a * 5 + i;
                    const $ul = $(`<ul class="ul${String(i)}"></ul>`);
                    $ul.appendTo($show)
                    // 各項目の設定
                    $(`<li>${data[n].rank}位</li>`).appendTo($ul);
                    $(`<li class="thli"><img src="https://i.ytimg.com/vi/${data[n].id}/hqdefault.jpg" class="thumb"></li>`).appendTo($ul);
                    $(`<li class="name"><a href="https://youtube.com/watch?v=${data[n].id}" target="_blank" rel="noopener noreferrer">${data[n].name}</a></li>`).appendTo($ul);

                    // 要素の追加
                    $("#container").append($show);
                } else {
                    var n = a * 5 + i;
                    const $ul = $(`<ul class="ul${String(i)}"></ul>`);
                    $ul.appendTo($hide)
                    // 各項目の設定
                    $(`<li>${data[n].rank}位</li>`).appendTo($ul);
                    $(`<li class="thli"><img src="https://i.ytimg.com/vi/${data[n].id}/hqdefault.jpg" class="thumb"></li>`).appendTo($ul);
                    $(`<li class="name"><a href="https://youtube.com/watch?v=${data[n].id}" target="_blank" rel="noopener noreferrer">${data[n].name}</a></li>`).appendTo($ul);

                    // 要素の追加
                    $("#container").append($hide);
                }
            }
        }

        listcolor()
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        // APIの呼び出しが失敗した場合
        alert(JSON.stringify(jqXHR.responseJSON, null, 2));
    });
});

function toForm() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdZ1XH-6AX4wLjWhJJ5pkpHG381sHnq0WzB1OPgQkl0lQT9nw/viewform', '_blank')
}

// ランキング切り替えボタン
function left() {
    var now = $(".show").attr("id").replace("item","");
    now = Number(now)

    if(now - 1 >= 0) {
        $(".item").removeClass("lin lout rin rout")
        $(`#item${now-1}`).addClass("show lin")
        $(`#item${now-1}`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
    console.log(now)
}

// ランキング切り替えボタン
function right() {
    var now = $(".show").attr("id").replace("item","");
    now = Number(now)

    if(now + 1 <= 5) {
        $(".item").removeClass("lin lout rin rout")
        $(`#item${now+1}`).addClass("show rin")
        $(`#item${now+1}`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
    console.log(now)
}