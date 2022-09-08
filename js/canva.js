var Canvas = document.getElementById('canvas');
var ctx = Canvas.getContext('2d');

var resize = function() {
    Canvas.width = Canvas.clientWidth;
    Canvas.height = Canvas.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements = [];
var presets = {};

presets.o = function(x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;

            ctx.beginPath();
            ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + +Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx.lineWidth = this.w;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
};

presets.x = function(x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;

            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx.beginPath();
                ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx.lineWidth = _this.w;
                ctx.strokeStyle = c;
                ctx.stroke();
            };

            ctx.save();

            ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx.rotate(this.r * Math.PI / 180);

            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');

            ctx.restore();
        }
    }
};

for (var x = 0; x < Canvas.width; x++) {
    for (var y = 0; y < Canvas.height; y++) {
        if (Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if (Math.round(Math.random()) == 1)
                elements.push(presets.o(x, y, s, 0, 0));
            else
                elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

    var time = new Date().getTime();
    for (var e in elements)
        elements[e].draw(ctx, time);
}, 10);

function listcolor(){

    let r = color[0];
    let g = color[1];
    let b = color[2];
    let rgb = `${color[0]},${color[1]},${color[2]}`; // rgb -> サムネイルから抽出した色 = 背景色

    color.sort(function(first, second){
        return first - second;
    });

    console.log(color)

    num = color[0] + color[2];

    if(num <= 255){
        num += 30
        s = -50
    } else {
        num -= 30
        s = 50
    }


    if((r == g && r == b ) && (num >= 300)) { // 背景色白系の場合

        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
        const trgb = `${r},${g},${b}` // t(turn)rgb ->背景色の補色
        // const srgb = `${r+s},${g+s},${b+s}` // s(shadow)rgb -> rgbが濃い（暗い）色の場合薄く,薄い（明るい）色の場合濃くする

        $("*").css("color",`rgb(${trgb})`)
        $("#body5 button").css({"color":`rgb(${trgb})`,"border":`solid 1px rgb(${trgb})`})
        $(".btn").css({"border":`solid 1px rgb(${trgb})`})
        $(".ad p").css("text-shadow","none")
        $(".x").css({"text-shadow":"none","color": "#0bd"})
        $(".wback").css({"color":`${trgb}`})
        $("#stalker").css({"background-color":`rgba(${trgb},0.5)`})

    } else if(r == g && r == b ) { // 背景色黒系

        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
        const trgb = `${r},${g},${b}` // t(turn)rgb ->背景色の補色
        // const srgb = `${r+s},${g+s},${b+s}` // s(shadow)rgb -> rgbが濃い（暗い）色の場合薄く,薄い（明るい）色の場合濃くする

        $("*").css("color",`rgb(${trgb})`)
        $("#body5 button").css({"color":`rgb(${trgb})`,"border":`solid 1px rgb(${trgb})`})
        $(".btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${trgb})`})
        $(".ad p").css("text-shadow","none")
        $(".x").css({"text-shadow":"none","color": "#0bd"})
        $(".wback").css({"color":`rgb(${rgb})`})
        $("#stalker").css({"background-color":`rgba(${trgb},0.5)`})

    } else if(num >= 350) { // 背景彩色（明るめ）

        r = num - r;
        g = num - g;
        b = num - b;
        const trgb = `${r},${g},${b}` // t(turn)rgb ->背景色の補色
        const srgb = `${r+s},${g+s},${b+s}` // s(shadow)rgb -> rgbが濃い（暗い）色の場合薄く,薄い（明るい）色の場合濃くする

        $("*").css("text-shadow",`1px 1px 3px rgb(${trgb})`)
        $("#body5 button").css({"text-shadow":`1px 1px 3px rgb(${srgb})`,"border":`solid 1px rgb(${srgb})`})
        $(".btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${srgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $(".ad p").css("text-shadow","none")
        $(".x").css("text-shadow","none")
        $(".wback").css({"color":`rgb(${rgb})`,"text-shadow":`0.5px 0.5px 0px rgba(${srgb},0.5), 0px 0px 2px rgba(${srgb},0.5)`})
        $("#stalker").css({"background-color":`rgba(${srgb},0.5)`})

    } else { // 背景彩色(暗め)

        r = num - r;
        g = num - g;
        b = num - b;
        const trgb = `${r},${g},${b}` // t(turn)rgb ->背景色の補色
        const srgb = `${r+s},${g+s},${b+s}` // s(shadow)rgb -> rgbが濃い（暗い）色の場合薄く,薄い（明るい）色の場合濃くする

        $("*").css("text-shadow",`1px 1px 3px rgb(${trgb})`)
        $("#body5 button").css({"text-shadow":`1px 1px 3px rgb(${srgb})`,"border":`solid 1px rgb(${srgb})`})
        $(".btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${srgb})`,"text-shadow":"none"})
        $(".ad p").css("text-shadow","none")
        $(".x").css("text-shadow","none")
        $(".wback").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("#stalker").css({"background-color":`rgba(${srgb},0.5)`})

    }

    console.log(r,g,b)
}