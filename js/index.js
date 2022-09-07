let color, imageURL
const colorThief = new ColorThief();
const img1 = document.getElementById("thumbnail");
const API_URL = "https://script.google.com/macros/s/AKfycbyvcTmxkWbmDuBvYbqMyrbG9G3SzeXyYCTuBZugVJbIeXIf-Bp3rBKzA889qyUY3ql7/exec";
let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
img1.crossOrigin = 'Anonymous';

// 
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
        imageURL = "https://img.youtube.com/vi/" + customs.values[0][1] + "/maxresdefault.jpg";
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
        for(let a = 0; a < 6; a ++){
            const $hide = $(`<div id='item${String(a)}' class='item hide'></div>`)
            const $show = $(`<div id='item${String(a)}' class='item show'></div>`)
            for(let i = 0; i < 5; i ++){
                if(a == 0){
                    var n = a * 5 + i;
                    const $ul = $(`<ul class="ul${String(i)}"></ul>`);
                    $ul.appendTo($show)
                    // 各項目の設定
                    $(`<li class="rank"><div>${data[n].num}位</div></li>`).appendTo($ul);
                    $(`<li class="thli"><img src="https://i.ytimg.com/vi/${data[n].id}/hqdefault.jpg" class="thumb"></li>`).appendTo($ul);
                    $(`<li class="name"><div><a href="https://youtube.com/watch?v=${data[n].id}" target="_blank" rel="noopener noreferrer">${data[n].name}</a></div></li>`).appendTo($ul);

                    // 要素の追加
                    $("#container").append($show);
                } else {
                    var n = a * 5 + i;
                    const $ul = $(`<ul class="ul${String(i)}"></ul>`);
                    $ul.appendTo($hide)
                    // 各項目の設定
                    $(`<li class="rank"><div>${data[n].num}位</div></li>`).appendTo($ul);
                    $(`<li class="thli"><img src="https://i.ytimg.com/vi/${data[n].id}/hqdefault.jpg" class="thumb"></li>`).appendTo($ul);
                    $(`<li class="name"><div><a href="https://youtube.com/watch?v=${data[n].id}" target="_blank" rel="noopener noreferrer">${data[n].name}</a></div></li>`).appendTo($ul);

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

    // 左のページが存在すれば
    if(now - 1 >= 0) {
        $(".item").removeClass("lin lout rin rout")
        $(`#item${now-1}`).addClass("show lin")
        $(`#item${now-1}`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
    // 左端のページであれば
    else {
        $(".item").removeClass("lin lout rin rout")
        $(`#item5`).addClass("show lin")
        $(`#item5`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
}

// ランキング切り替えボタン
function right() {
    var now = $(".show").attr("id").replace("item","");
    now = Number(now)

    // 右のページが存在すれば
    if(now + 1 <= 5) {
        $(".item").removeClass("lin lout rin rout")
        $(`#item${now+1}`).addClass("show rin")
        $(`#item${now+1}`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
    // 右端のページであれば
    else {
        $(".item").removeClass("lin lout rin rout")
        $(`#item0`).addClass("show rin")
        $(`#item0`).removeClass("hide")
        $(`#item${now}`).removeClass("show")
        $(`#item${now}`).addClass("hide")
    }
}

// スクロール遷移
$(function(){
    const topBtn = $('#header h1');
    const toB1 = $('.toB1');
    const toB5 = $('.toB5');
    const toB7 = $('.toB7');
    const body5 = $('#body5').offset().top;
    const body7 = $('#body7').offset().top;
    
    topBtn.click(function(){
        $('body,html').animate({
        scrollTop: 0},750);
        return false;
    });
    toB1.click(function(){
        $('body,html').animate({
        scrollTop: 0},500);
        return false;
    });
    toB5.click(function(){
        $('body,html').animate({
        scrollTop: body5},500);
        return false;
    });
    toB7.click(function(){
        $('body,html').animate({
        scrollTop: body7},500);
        return false;
    });
});

// ツールチップ
$(function(){
    const c_before = $('.tcb');
    const chip = $(".tc")

    chip.hide();
    
    // c_before要素ホバーでツールチップ表示
    c_before.hover(function(){
        $(this).next().fadeIn();
    },
    function (){
        $(this).next().hide();
    })
});

$(function(){
    //マウスストーカー用のdivを取得
    const stalker = $("#stalker");

    //上記のdivタグをマウスに追従させる処理
    document.addEventListener('mousemove', function (e) {
        stalker.css('transform',`translate(${e.clientX}px,${e.clientY}px)`)
    });
})

// ハンバーガーメニュー ここから
const closes = $("#close, #close i")
const menus = $("#menu, #menu i")

function menu(){
    $('#header ul').css('display','inline-block');
    menus.css('display','none');
    closes.css('display','unset');
};
  
function closeing(){
    $('#header ul').css('display','none');
    menus.css('display','unset');
    closes.css('display','none');
};
// ここまで

// フォント変更

let fonti = 0
function font(){
    if(fonti == 0){
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-family":"corp"})
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-weight":"unset"})
        $("#debag").text("コーポレートロゴ")
        fonti += 1
    }
    else if(fonti == 1){
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-family":"genju_li"})
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-weight":"bolder"})
        $("#debag").text("源柔X light")
        fonti += 1
    }
    else if(fonti == 2){
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-family":"genju_mid"})
        $("*:not('h2,h1,.ad p,.x,.ex,#f')").css({"font-weight":"unset"})
        $("#debag").text("源柔X midium")
        fonti = 0
    }
}