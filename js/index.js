function customview() {
    let url = "https://sheets.googleapis.com/v4/spreadsheets/1e6bp_MizsC1qxmnmoIiOCx0rdFiZf8Vf3s1CpRIDIHE/values/get?key=AIzaSyBrH5j4PgNdtfAX4yM5_GUvSjeipA7j72M";
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (custom) {
            return custom
        });
}


function contents() {
    //スプレッドシート格納配列作成

    //API起動
    let custom = customview();
    Promise.resolve(custom).then(function (customs) {
        document.getElementById('TitleText').innerHTML = "<a href='" + customs.values[0][3] + "'>" + customs.values[0][2] + "</a>";
        document.getElementById("videoplayer").src = "https://www.youtube.com/embed/" + customs.values[0][1];
        document.getElementById("thumbnail").src = "https://img.youtube.com/vi/" + customs.values[0][1] + "/maxresdefault.jpg";
        console.log("https://img.youtube.com/vi/" + customs.values[0][1] + "/maxresdefault.jpg")


    })


}

function color() {
    const colorThief = new ColorThief();
    const img1 = document.querySelector('img#thumbnail');
    var color;
    // Make sure image is finished loading
    if (img1.complete) {
        color = colorThief.getColor(img1);
    } else {
        image.addEventListener('load', function () {
            color = colorThief.getColor(img1);
        });
    }
    var rbg = color[0] + "," + color[1] + "," + color[2];
    console.log
    document.getElementById("label1").style.color = "rgb(" + rbg + ")";//機関車の画像の色
    console.log(color)
}

contents()
setTimeout(() => {
    color()
}, 2000);




