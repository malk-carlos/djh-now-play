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
    let rgb = `${color[0]},${color[1]},${color[2]}`;

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

    if(r == g && r == b) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
        $("*").css("color",`rgb(${r},${g},${b})`)
        $("#body5 button").css({"color":`rgb(${r},${g},${b})`,"border":`solid 1px rgb(${r},${g},${b})`})
        $("#btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${r},${g},${b})`})
        $("h1").css({"color":`rgb(${rgb})`})
        $("#header li a").css({"color":`rgb(${rgb})`})
        $("#header .tc ").css({"color":`rgb(${rgb})`})
        $(".ad p").css("text-shadow","none")
        $("#head-ex").css({"color":`rgb(${rgb})`})
        $("#header button").css({"color":`rgb(${rgb})`})
        $("#foot-ex").css({"color":`rgb(${rgb})`})
        $("footer li a").css({"color":`rgb(${rgb})`})
        $("footer p").css({"color":`rgb(${rgb})`})
        $("footer a").css({"color":`rgb(${rgb})`})
        $(".x").css({"text-shadow":"none","color": "#0bd"})

        $("#stalker").css({"background-color":`rgba(${r},${g},${b},0.5)`}) // メモ：マウスストーカ色変更されない
    } else if(num >= 350) {
        r = num - r;
        g = num - g;
        b = num - b;
        $("*").css("text-shadow",`1px 1px 3px rgb(${r},${g},${b})`)
        $("#body5 button").css({"text-shadow":`1px 1px 3px rgb(${r + s},${g + s},${b + s})`,"border":`solid 1px rgb(${r + s},${g + s},${b + s})`})
        $("#btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${r + s},${g + s},${b + s})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("h1").css({"color":`rgb(${rgb})`,"text-shadow":"1px 1px 0px #888888, 0px 0px 3px #666666"})
        $("#header li a").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("#header .tc ").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $(".ad p").css("text-shadow","none")
        $("#head-ex").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("#header button i").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("#foot-ex").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("footer li a").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("footer p").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $("footer a").css({"color":`rgb(${rgb})`,"text-shadow":"0.5px 0.5px 0px #888888, 0px 0px 2px #666666"})
        $(".x").css("text-shadow","none")

        $("#stalker").css({"background-color":`rgba(${r + s},${g + s},${b + s}},0.5)`}) // メモ：マウスストーカ色変更されない
    } else {
        r = num - r;
        g = num - g;
        b = num - b;
        $("*").css("text-shadow",`1px 1px 3px rgb(${r},${g},${b})`)
        $("#body5 button").css({"text-shadow":`1px 1px 3px rgb(${r + s},${g + s},${b + s})`,"border":`solid 1px rgb(${r + s},${g + s},${b + s})`})
        $("#btn").css({"color":`rgb(${rgb})`,"border":`solid 1px rgb(${r + s},${g + s},${b + s})`,"text-shadow":"none"})
        $("h1").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("#header li a").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("#header .tc ").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $(".ad p").css("text-shadow","none")
        $("#head-ex").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("#header button i").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("#foot-ex").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("footer li a").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("footer p").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $("footer a").css({"color":`rgb(${rgb})`,"text-shadow":"none"})
        $(".x").css("text-shadow","none")

        $("#stalker").css({"background-color":`rgba(${r + s},${g + s},${b + s}},0.5)`}) // メモ：マウスストーカ色変更されない
    }

    console.log(r,g,b)
}