const ids = {
    canvas: "canvas",
    fsbutton: "fullscreen",
    lowrsimg: "lowres",
    highrsimg: "highres",
    camera: "cam",
    ball: "ball",
    camtop: "camtop",
    cambot: "cambot",
    artifact: "artif",
    sensor: "sensor"
};
const alignments = {
    TOP_LEFT: 0,
    TOP: 1,
    TOP_RIGHT: 2,
    LEFT: 3,
    MIDDLE: 4,
    RIGHT: 5,
    BOTTOM_LEFT: 6,
    BOTTOM: 7,
    BOTTOM_RIGHT: 8
};
const aspect = [16, 10];

const $y = (percent) => percent / 100 * canvas.height;
const $x = (percent) => percent / 100 * canvas.width;
const _y = (amount) => amount / $y(100) * 100;
const _x = (amount) => amount / $x(100) * 100;
const _t = (tick, lower, upper) => {
    if (tick / transitionDuration <= lower) {
        return 0;
    }
    else if (tick / transitionDuration <= upper) {
        return (tick / transitionDuration - lower) / (upper - lower);
    }
    else {
        return 1;
    }
}

const canvas = document.getElementById(ids.canvas);
const ctx = canvas.getContext("2d");
const fonts = [
    new FontFace("Archivo Narrow", "url(ArchivoNarrow.ttf)"),
    new FontFace("Roboto Mono", "url(RobotoMono.ttf)"),
    new FontFace("Open Sans", "url(OpenSans.ttf)"),
    new FontFace("Roboto Condensed", "url(RobotoCondensed.ttf)"),
    new FontFace("Ubuntu Mono", "url(UbuntuMono.ttf)")
];
for (let font of fonts) {
    document.fonts.add(font);
}

var h1, h2, h3, p, s;
let onresize = () => {
    h1 = {family: "Archivo Narrow", size: $y(8), weight: "bold"};
    h2 = {family: "Ubuntu Mono", size: $y(5), weight: "100"};
    h3 = {family: "Ubuntu Mono", size: $y(4), weight: "100"};
    p = {family: "Roboto Condensed", size: $y(3.5), weight: ""};
    s = {family: "Roboto Condensed", size: $y(2), weight: ""};
};
let onrender = () => {};

/*****************************                     SLIDES                      *****************************/

let nodes = (t) => bezier(_t(t * transitionDuration, 0, 1), 0, 0, 0, 0.7);
let exts = (t) => {
    if (t < 0.8) {
        return nodes(1) + bezier(_t(t * transitionDuration, 0, 0.8), 0, 0.7, 0.7, 0.7) / 4;
    }
    else {
        return nodes(1) + bezier(1, 0, 0.7, 0.7, 0.7) / 4;
    }
}
let lattices = (divs) => {
    points = [];
    for (let i = 0; i < 1; i+= 1 / divs) {
        let temp = [];
        for (let j = 0; j < 1; j+= 1 / divs) {
            temp.push([i, j]);
        }
        points.push(temp);
    }
    return points;
}
let speed = (t) => bezier(_t(t, 0, 0.5), 0, 0, 0, 0.5)+ bezier(_t(t, 0.5, 1), 0, 0.5, 0.5, 0.5);
let clearScreen = () => {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(0), $x(100), $y(100));
}
let fadeAll = (tick, end, noFadeTitle) => {
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, end * 0.4)}`;
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, end * 0.5, end * 0.9)}`;
    ctx.fillRect($x(0), $y(15), $x(100), $y(10));
    
    if (!noFadeTitle) {
        ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, end * 0.6, end)}`;
        ctx.fillRect($x(0), $y(5), $x(100), $y(10));
    }
}

let slide1 = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#555"
    ctx.lineWidth = $y(0.25);
    ctx.moveTo($x(90), $y(47));
    ctx.lineTo($x(70), $y(47));
    ctx.stroke();

    text("IMPROVING VIDEO QUALITY", h1, [$x(90), $y(30)], alignments.RIGHT);
    text("With Stagnant Hardware", h2, [$x(90), $y(40)], alignments.RIGHT);
    text("Kenny Huang", p, [$x(90), $y(52)], alignments.RIGHT);
}
let anim1 = (tick) => {
    animtickspeed = 0.3;
    animPeriod = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]
    for (let point of points) {
        let velx = point[2] * Math.sin(point[0]) / (animPeriod * 2);
        let vely = point[2] * Math.cos(point[0]) / (animPeriod * 2);

        tick += point[0];
        tick %= animPeriod;

        velx *= Math.sin(tick / animPeriod * 2 * Math.PI);
        vely *= Math.sin(tick / animPeriod * 2 * Math.PI);

        point[0] += velx * tick;
        point[1] += vely * tick;
    }
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(20), $x(30), $y(60));
    ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = "rgba(83, 92, 104,1.0)";
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = "rgba(83, 92, 104,1.0)"
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}
let transition1 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(3), $y(3), $x(80), $y(20));

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 1/4)})`;
    ctx.fillRect($x(0), $y(20), $x(30), $y(60));
    ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 1/4, 1/2)})`;
    ctx.fillRect($x(75), $y(50), $x(90), $y(55));
    
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 1/3, 7/12)})`;
    ctx.fillRect($x(30), $y(37), $x(90), $y(50));
    
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 1/2, 3/4)})`;
    ctx.fillRect($x(30), $y(25), $x(90), $y(35));
    
    let color = `rgba(0, 0, 0, ${_t(tick, 3/4, 1)})`;
    text("TECHNOLOGICAL DEVELOPMENT", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);

    color = `rgba(0, 0, 0, ${_t(tick, 4/5, 1)})`;
    text("Moore's Law", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
}

let slide2 = () => {
    transition1(100);
}
let transition2 = (tick) => {
    transitiontickspeed = 0.1;
    transitionDuration = 100;
    let dt = 0.1;
    
    text("TECHNOLOGICAL DEVELOPMENT", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    text("Moore's Law", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    let coords1 = [$x(5) + $x(speed(tick) * 45) + $x(3), $y(71) - $y(nodes(speed(tick)) * 35)];
    text("Semiconductor performance", p, coords1, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    let coords2 = [$x(5) + $x(speed(tick) * 45) + $x(3), $y(36) + $y(nodes(speed(tick)) * 25)];
    text("Cost per unit performance", p, coords2, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0.3, 0.5)})`);
    let coords3 = [$x(5) + $x(speed(tick) * 45) + $x(3), $y(76)]
    text(Math.round(speed(tick) * 36 + 1975), p, coords3, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    text("*Diagram not to scale", p, [$x(5), $y(90)], alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    
    for (let i = 0; i <= speed(tick) * 7.2; i++) {
        let coords = [$x(5) + $x(i * 45 / 7), $y(76) + $x(2)];
        text(i * 5 + 1975, s, coords, alignments.TOP);
    }

    // blank screen
    clearScreen();
    // y axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.1)})`;
    ctx.fillRect($x(5), $y(76), $x(0.25), -$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.moveTo($x(5) - $y(1), $y(76)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.lineTo($x(5) + $y(1.25), $y(76)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.lineTo($x(5) + $y(0.125), $y(76) - $x(1)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.fill();
    // x axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.1)})`;
    ctx.fillRect($x(5), $y(76), $x(speed(tick) * 45), $x(0.25));
    ctx.moveTo($x(5) + $x(speed(tick) * 45), $y(75));
    ctx.lineTo($x(5) + $x(speed(tick) * 45), $y(77.25));
    ctx.lineTo($x(5) + $x(speed(tick) * 45 + 1), $y(76.125));
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(106, 176, 76, 1)`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(71));
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 45, $y(71) - $y(nodes(speed(i * dt))) * 35)
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(235, 77, 75, ${_t(tick, 0.3, 0.5)})`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(36));
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 45, $y(36) + $y(nodes(speed(i * dt))) * 25)
    }
    ctx.stroke();
}

let slide3 = () => {
    transition2(100);
}
let transition3 = (tick) => {
    transitiontickspeed = 0.2;
    transitionDuration = 100;
    let dt = 0.1;   
    text("TECHNOLOGICAL DEVELOPMENT", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    text("Moore's Law", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    let coords1 = [$x(5) + $x(speed(transitionDuration)) * 45 + $x(speed(tick)) * 13.5 + $x(3), $y(71) - $y(exts(speed(tick)) * 35)];
    text("Semiconductor performance", p, coords1, alignments.LEFT);
    let coords2 = [$x(5) + $x(speed(transitionDuration)) * 45 + $x(speed(tick)) * 13.5 + $x(3), $y(36) + $y(exts(speed(tick)) * 25)];
    text("Cost per unit performance", p, coords2, alignments.LEFT);
    let coords3 = [$x(50) + $x(speed(tick) * 13.5) + $x(3), $y(76)]
    text(Math.round(speed(tick) * 12 + 2011), p, coords3, alignments.LEFT);
    text("*Diagram not to scale", p, [$x(5), $y(90)], alignments.LEFT);
    
    for (let i = 0; i <= 7.2; i++) {
        let coords = [$x(5) + $x(i * 45 / 7), $y(76) + $x(2)];
        text(i * 5 + 1975, s, coords, alignments.TOP);
    }
    for (let i = 1; i <= speed(tick) * 2.4; i++) {
        let coords = [$x(50) + $x(i * 45 / 7), $y(76) + $x(2)];
        text(i * 5 + 2010, s, coords, alignments.TOP);
    }

    clearScreen();
    // y axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, 1)`;
    ctx.fillRect($x(5), $y(76), $x(0.25), -$y(49));
    ctx.moveTo($x(5) - $y(1), $y(76)-$y(49));
    ctx.lineTo($x(5) + $y(1.25), $y(76)-$y(49));
    ctx.lineTo($x(5) + $y(0.125), $y(76) - $x(1)-$y(49));
    ctx.fill();
    // x axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, 1)`;
    ctx.fillRect($x(5), $y(76), $x(45) + $x(speed(tick) * 13.5), $x(0.25));
    ctx.moveTo($x(5) + $x(45) + $x(speed(tick) * 13.5), $y(75));
    ctx.lineTo($x(5) + $x(45) + $x(speed(tick) * 13.5), $y(77.25));
    ctx.lineTo($x(5) + $x(45) + $x(speed(tick) * 13.5) + $x(1), $y(76.125));
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(106, 176, 76, 1)`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(71));
    for (let i = 0; i < transitionDuration / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 45, $y(71) - $y(nodes(speed(i * dt))) * 35)
    }
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(transitionDuration)) * 45 + $x(speed(i * dt)) * 13.5, $y(71) - $y(exts(speed(i * dt))) * 35)
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = `rgba(235, 77, 75, 1)`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(36));
    for (let i = 0; i < transitionDuration / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 45, $y(36) + $y(nodes(speed(i * dt))) * 25)
    }
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(transitionDuration)) * 45 + $x(speed(i * dt)) * 13.5, $y(36) + $y(exts(speed(i * dt))) * 25)
    }
    ctx.stroke();
}

let lowres = document.getElementById(ids.lowrsimg);
let slide4 = () => {
    transition3(100);
}
let transition4 = (tick) => {
    transitiontickspeed = .5;
    transitionDuration = 100;
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.15)})`;
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0.15, 0.3)})`;
    ctx.fillRect($x(0), $y(0), $x(100), $y(20));

    let color = `rgba(0, 0, 0, ${_t(tick, 0.3, 0.45)})`;
    text("VIDEO QUALITY", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.45, 0.6)})`;
    text("Spatial Resolution", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    
    let transform = (p) => [p[0] * $x(15), (p[1] - .5) * (p[0] + .5) * $x(30)];
    let pos = [$x(25), $y(57)];
    points = lattices(10);
    // clearScreen();
    // ctx.beginPath();
    if (tick / transitionDuration > 0.3) {
        ctx.fillStyle = "#fff";
        ctx.fillRect($x(0), $y(20), $x(50), $y(80));
    }
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, .75)})`;
    ctx.fillRect($x(15) + pos[0], -1.5*$x(15) + pos[1] - $y(0.4), $x(2), 1.5*$x(30) + 2*$y(0.4));
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.75)})`;
    text("Camera Sensor", p, [$x(15), $y(85)], alignments.TOP, color);
    // draw and transform grid
    for (let y = 0; y < points.length - 1; y++) {
        for (let x = 0; x < points.length - 1; x++) {
            ctx.strokeStyle = `rgba(19, 15, 64, ${_t(tick, 0.6, .75)})`; //00008b
            ctx.lineWidth = $y(0.4);
            ctx.fillStyle = `rgba(48, 51, 107, ${_t(tick, 0.6, .75)})`; //add8e6

            ctx.beginPath();
            let p1 = points[y][x];
            let p2 = points[y+1][x];
            let p3 = points[y+1][x+1];
            let p4 = points[y][x+1];
            
            let t1 = transform(p1);
            let t2 = transform(p2);
            let t3 = transform(p3);
            let t4 = transform(p4);

            ctx.moveTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.lineTo(pos[0] + t2[0], pos[1] + t2[1]);
            ctx.lineTo(pos[0] + t3[0], pos[1] + t3[1]);
            ctx.lineTo(pos[0] + t4[0], pos[1] + t4[1]);
            ctx.lineTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.stroke();
            ctx.fill();
        }
    }
    if (tick / animPeriod > 0.3) {
        ctx.drawImage(lowres, $x(60), $y(30), lowres.width / lowres.height * $y(40), $y(40));
        ctx.fillStyle = `rgba(255, 255, 255, ${1-_t(tick, 0.8, 1)})`;
        ctx.fillRect($x(60)-1, $y(30)-1, lowres.width / lowres.height * $y(40)+2, $y(40)+2);
        color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
        text("Low Resolution Output Image", p, [$x(60) + (lowres.width / lowres.height * $y(40)) / 2, $y(85)], alignments.TOP, color);
    }
}

let highres = document.getElementById(ids.highrsimg);
let slide5 = () => {
    transition4(100);
}
let selectedSquare = []
let anim5 = (tick, div) => {
    animtickspeed = 1;
    animPeriod = 200;
    let pos = [$x(25), $y(57)];
    let divs = div;
    let velocity = $y(1);
    let length = $y(10);


    let transform = (p) => [p[0] * $x(15), (p[1] - .5) * (p[0] + .5) * $x(30)];
    points = lattices(divs);
    if (tick >= 0 && tick < animtickspeed) {
        let randx = (Math.floor(Math.random() * divs));
        let randy = (Math.floor(Math.random() * divs));
        selectedSquare = [points[randy][randx][0] + 0.5 * 1/divs, points[randy][randx][1] + 0.5 * 1/divs];
    }
    // clearScreen();
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(20), $x(50), $y(80));
    text("Camera Sensor", p, [$x(15), $y(85)], alignments.TOP);
    // draw and transform grid
    ctx.fillStyle = "rgba(83, 92, 104,1.0)";
    ctx.fillRect($x(15) + pos[0], -1.5*$x(15) + pos[1] - $y(0.4), $x(2), 1.5*$x(30) + 2*$y(0.4));
    for (let y = 0; y < points.length - 1; y++) {
        for (let x = 0; x < points.length - 1; x++) {
            ctx.strokeStyle = "rgba(19, 15, 64,1.0)";
            ctx.lineWidth = $y(0.4);
            ctx.fillStyle = "rgba(48, 51, 107, 1)";

            ctx.beginPath();
            let p1 = points[y][x];
            let p2 = points[y+1][x];
            let p3 = points[y+1][x+1];
            let p4 = points[y][x+1];
            
            if (p1[0] <= selectedSquare[0] && selectedSquare[0] <= p3[0] && p1[1] <= selectedSquare[1] && selectedSquare[1] <= p3[1]) {
                if (tick / animPeriod > 0.3 && tick / animPeriod < 0.5)
                ctx.fillStyle = `rgba(249, 202, 36,1.0)`;
            }

            let t1 = transform(p1);
            let t2 = transform(p2);
            let t3 = transform(p3);
            let t4 = transform(p4);

            ctx.moveTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.lineTo(pos[0] + t2[0], pos[1] + t2[1]);
            ctx.lineTo(pos[0] + t3[0], pos[1] + t3[1]);
            ctx.lineTo(pos[0] + t4[0], pos[1] + t4[1]);
            ctx.lineTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.stroke();
            ctx.fill();
        }
    }
    ctx.beginPath();
    ctx.strokeStyle = "rgba(249, 202, 36,1.0)";
    ctx.lineWidth = $y(0.25);
    let transformedSquare = transform(selectedSquare);
    let start = [$x(0), $y(selectedSquare[1] * 20 - 5 + 50)];
    let end = [pos[0] + transformedSquare[0], pos[1] + transformedSquare[1]];
    let dir = [-start[0] + end[0], -start[1] + end[1]];
    let dirl = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
    let unitDir = [dir[0] / dirl, dir[1] / dirl]
    // console.log(unitDir);
    if (dir[1] > 0) {
        ctx.moveTo(Math.min(start[0] - length * unitDir[0] + velocity * unitDir[0] * tick, end[0]), Math.min(start[1] - length * unitDir[1] + velocity * unitDir[1] * tick, end[1]));
        ctx.lineTo(Math.min(start[0] + velocity * unitDir[0] * tick, end[0]), Math.min(start[1] + velocity * unitDir[1] * tick, end[1]));
    }
    else {
        ctx.moveTo(Math.min(start[0] - length * unitDir[0] + velocity * unitDir[0] * tick, end[0]), Math.max(start[1] - length * unitDir[1] + velocity * unitDir[1] * tick, end[1]));
        ctx.lineTo(Math.min(start[0] + velocity * unitDir[0] * tick, end[0]), Math.max(start[1] + velocity * unitDir[1] * tick, end[1]));
    }
    ctx.stroke();
    // ctx.beginPath();
}
let transition5 = (tick) => {
    transitiontickspeed = .5;
    transitionDuration = 100;
    let pos = [$x(25), $y(57)];
    let divs = 10 + speed(_t(tick, 0.3, 0.7) * transitionDuration) * 5;
    
    if (_t(tick, 0, 1) == 1) {
        text("VIDEO QUALITY", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Spatial Resolution", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    }
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(55), $y(20), $x(45), $y(80))

    let transform = (p) => [p[0] * $x(15), (p[1] - .5) * (p[0] + .5) * $x(30)];
    points = lattices(divs);

    ctx.fillStyle = `rgba(83, 92, 104, 1)`;
    ctx.fillRect($x(15) + pos[0], -1.5*$x(15) + pos[1] - $y(0.4), $x(2), 1.5*$x(30) + 2*$y(0.4));
    ctx.strokeStyle = `rgba(19, 15, 64, 1)`; //00008b
    ctx.lineWidth = $y(0.4);
    ctx.fillStyle = `rgba(48, 51, 107, 1)`; //add8e6
    // draw and transform grid
    for (let y = 0; y < points.length - 1; y++) {
        for (let x = 0; x < points.length - 1; x++) {
            ctx.beginPath();
            let p1 = points[y][x];
            let p2 = points[y+1][x];
            let p3 = points[y+1][x+1];
            let p4 = points[y][x+1];
            
            let t1 = transform(p1);
            let t2 = transform(p2);
            let t3 = transform(p3);
            let t4 = transform(p4);

            ctx.moveTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.lineTo(pos[0] + t2[0], pos[1] + t2[1]);
            ctx.lineTo(pos[0] + t3[0], pos[1] + t3[1]);
            ctx.lineTo(pos[0] + t4[0], pos[1] + t4[1]);
            ctx.lineTo(pos[0] + t1[0], pos[1] + t1[1]);
            ctx.stroke();
            ctx.fill();
        }
    }
    if (tick / animPeriod > 0.3) {
        ctx.drawImage(highres, $x(60), $y(30), highres.width / highres.height * $y(40), $y(40));
        ctx.fillStyle = `rgba(255, 255, 255, ${1-_t(tick, 0.8, 1)})`;
        ctx.fillRect($x(60)-1, $y(30)-1, highres.width / highres.height * $y(40)+2, $y(40)+2);
        color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
        text("High Resolution Output Image", p, [$x(60) + (lowres.width / lowres.height * $y(40)) / 2, $y(85)], alignments.TOP, color);
    }
}

let slide6 = () => {
    transition5(100);
}
let transition6 = (tick) => {
    transitiontickspeed = .5;
    transitionDuration = 100;
    let targetpos = [$x(25), $y(40)];
    let explodedir = [$x(2), -$y(1)];
    let num = 10;

    if (_t(tick, 0, 1) == 1) {
        text("VIDEO QUALITY", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Temporal Resolution", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.15)})`;
    ctx.fillRect($x(0), $y(20), $x(55), $y(80));
    ctx.fillRect($x(55), $y(80), $x(45), $y(20));

    color = `rgba(0, 0, 0, ${_t(tick, 0.45, 0.6)})`;
    text("Temporal Resolution", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0.15, 0.3)})`;
    ctx.fillRect($x(0), $y(15), $x(40), $y(5));

    if (tick / transitionDuration > 0.3 && tick / transitionDuration < 0.6) {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(100), $y(80));
        let targetx = $x(60) - ($x(60) - targetpos[0]) * speed(_t(tick, 0.3, 0.5) * transitionDuration);
        let targety = $y(30) - ($y(30) - targetpos[1]) * speed(_t(tick, 0.3, 0.5) * transitionDuration);
        ctx.drawImage(highres, targetx, targety, highres.width / highres.height * $y(40), $y(40));
    }
    if (tick / transitionDuration > 0.6) {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(100), $y(80));
        color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
        text("Low Resolution Sequence", p, [$x(50), $y(85)], alignments.TOP, color);
        for (let i = num - 1; i >= 0; i--) {
            let targetx = $x(60) - ($x(60) - targetpos[0]) * speed(_t(tick, 0.3, 0.5) * transitionDuration) + explodedir[0] * i * speed(_t(tick, 0.6, 0.8) * transitionDuration);
            let targety = $y(30) - ($y(30) - targetpos[1]) * speed(_t(tick, 0.3, 0.5) * transitionDuration) + explodedir[1] * i * speed(_t(tick, 0.6, 0.8) * transitionDuration);
            ctx.drawImage(highres, targetx, targety, highres.width / highres.height * $y(40), $y(40));
        }
        ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.7)})`;
        color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.7)})`;
        ctx.lineWidth = $y(0.6);
        ctx.beginPath();
        ctx.moveTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4), targetpos[1] + $y(42));
        ctx.lineTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration), targetpos[1] + 9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42));
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.7)})`;
        ctx.moveTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration) - $x(1/Math.sqrt(5)), targetpos[1] + 9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42) - $x(2/Math.sqrt(5)));
        ctx.lineTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $x(2/Math.sqrt(5)), targetpos[1] + 9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42) - $x(1/Math.sqrt(5)));
        ctx.lineTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $x(1/Math.sqrt(5)), targetpos[1] + 9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42) + $x(2/Math.sqrt(5)));
        ctx.lineTo(targetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration) - $x(1/Math.sqrt(5)), targetpos[1] + 9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42) - $x(2/Math.sqrt(5)));
        ctx.fill();
        text("Time", p, [targetpos[0] + (highres.width / highres.height * $y(40) + $x(4) + 9 * explodedir[0] * speed(_t(tick, 0.6, 0.8) * transitionDuration))  + $x(2) , targetpos[1] + (9 * explodedir[1] * speed(_t(tick, 0.6, 0.8) * transitionDuration) + $y(42)) ], alignments.LEFT, color);
    }
    color = `rgba(0, 0, 0, ${_t(tick, 0.45, 0.6)})`;
}

let slide7 = () => {
    transition6(100);   
}
let transition7 = (tick) => {
    transitiontickspeed = .5;
    transitionDuration = 100;
    let targetpos = [$x(25), $y(40)];
    let oldtargetpos = [$x(25), $y(40)];
    let explodedir = [$x(2), -$y(1)];
    let oldexplodedir = [$x(2), -$y(1)];
    let num = 10;

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(30), $y(80), $x(40), $y(20));
    
    if (_t(tick, 0, 1) == 1) {
        text("VIDEO QUALITY", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Temporal Resolution", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    }
    if (tick / transitionDuration > 0.3 && tick / transitionDuration < 0.6) {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(20), $y(25), $x(60), $y(55));
        ctx.fillRect($x(40), $y(15), $x(60), $y(55));
        for (let i = num - 1; i >= 0; i--) {
            let targetx = targetpos[0] + explodedir[0] * (i * speed(_t(tick, 0.3, 0.5) * transitionDuration) + num);
            let targety = targetpos[1] + explodedir[1] * (i * speed(_t(tick, 0.3, 0.5) * transitionDuration) + num);
            ctx.drawImage(highres, targetx, targety, highres.width / highres.height * $y(40), $y(40));
        }
        for (let i = num - 1; i >= 0; i--) {
            let targetx = targetpos[0] + explodedir[0] * i;
            let targety = targetpos[1] + explodedir[1] * i;
            ctx.drawImage(highres, targetx, targety, highres.width / highres.height * $y(40), $y(40));
        }
    }
    if (tick / transitionDuration > 0.6) {
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(20), $y(25), $x(60), $y(55));
        ctx.fillRect($x(40), $y(15), $x(60), $y(55));
        explodedir[0] -= $x(1) * speed(_t(tick, 0.6, 1) * transitionDuration);
        explodedir[1] += $y(0.5) * speed(_t(tick, 0.6, 1) * transitionDuration);
        for (let i = 2 * num - 1; i >= 0; i--) {
            let targetx = targetpos[0] + explodedir[0] * i;
            let targety = targetpos[1] + explodedir[1] * i;
            ctx.drawImage(highres, targetx, targety, highres.width / highres.height * $y(40), $y(40));
        }
        color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
        text("High Resolution Sequence", p, [$x(50), $y(85)], alignments.TOP, color);
    }        
        
    ctx.fillStyle = `rgba(255, 255, 255, 1)`;
    ctx.fillRect($x(80), $y(70), $x(40), $y(20));
    ctx.fillRect($x(68), $y(77), $x(13), $y(6));
    ctx.fillRect($x(64), $y(79), $x(5), $y(5));
    ctx.fillRect($x(72), $y(75), $x(8), $y(4));
    ctx.fillRect($x(77), $y(73), $x(3), $y(3));
    ctx.fillStyle = `rgba(83, 92, 104, 1)`;
    color = `rgba(0, 0, 0, 1)`;
    ctx.lineWidth = $y(0.6);
    ctx.beginPath();
    ctx.moveTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4), oldtargetpos[1] + $y(42));
    ctx.lineTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0], oldtargetpos[1] + 9 * oldexplodedir[1] + $y(42));
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(83, 92, 104, 1)`;
    ctx.moveTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0] - $x(1/Math.sqrt(5)), oldtargetpos[1] + 9 * oldexplodedir[1] + $y(42) - $x(2/Math.sqrt(5)));
    ctx.lineTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0] + $x(2/Math.sqrt(5)), oldtargetpos[1] + 9 * oldexplodedir[1] + $y(42) - $x(1/Math.sqrt(5)));
    ctx.lineTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0] + $x(1/Math.sqrt(5)), oldtargetpos[1] + 9 * oldexplodedir[1] + $y(42) + $x(2/Math.sqrt(5)));
    ctx.lineTo(oldtargetpos[0] + highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0] - $x(1/Math.sqrt(5)), oldtargetpos[1] + 9 * oldexplodedir[1] + $y(42) - $x(2/Math.sqrt(5)));
    ctx.fill();
    text("Time", p, [oldtargetpos[0] + (highres.width / highres.height * $y(40) + $x(4) + 9 * oldexplodedir[0]) + $x(2) , oldtargetpos[1] + (9 * oldexplodedir[1] + $y(42)) ], alignments.LEFT, color);

    
}

let slide8 = () => {
    transition7(100);
}
let transition8 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]

    if (tick / transitionDuration > 0.6) {
        clearScreen();
    }
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0.2, 0.5)})`;
    ctx.fillRect($x(0), $y(15), $x(40), $y(5));

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0.3, 0.6)})`;
    ctx.fillRect($x(0), $y(0), $x(40), $y(15));

    let color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`
    text("THE PROBLEM", h1, [$x(95), $y(5)], alignments.TOP_RIGHT, color);

    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`
    text("Disproportionately expensive", p, [$x(95), $y(25)], alignments.TOP_RIGHT, color);

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}

let slide9 = () => {
    transition8(100);
}
let transition9 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    if (_t(tick, 0, 1) == 1) {
        text("THE PROBLEM", h1, [$x(95), $y(5)], alignments.TOP_RIGHT);
        text("Disproportionately expensive", p, [$x(95), $y(25)], alignments.TOP_RIGHT);
    }

    ctx.fillStyle = "#fff";
    ctx.fillRect($x(50), $y(30), $x(50), $y(20));
    color = `rgba(0, 0, 0, ${_t(tick, 0, 0.4)})`
    text("Use multiple cameras?", p, [$x(95), $y(35)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 1)})`
    text("Compensate for hardware deficiencies", p, [$x(95), $y(45)], alignments.TOP_RIGHT, color);
}

let slide10 = () => {
    transition9(100);
}
let transition10 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0.2, 0.5)})`;
    ctx.fillRect($x(0), $y(0), $x(100), $y(20));

    let color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`
    text("EXISTING RESEARCH", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`
    text("Naive Implementation", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`
    text("Wilburn et al.", h3, [$x(5), $y(85)], alignments.LEFT, color);
    
    let cam = document.getElementById(ids.camera);
    let ball = document.getElementById(ids.ball);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`
    text("Cam 1", p, [$x(5), $y(35)], alignments.LEFT, color);
    text("Cam 2", p, [$x(5), $y(50)], alignments.LEFT, color);
    text("Cam 3", p, [$x(5), $y(65)], alignments.LEFT, color);
    ctx.fillStyle = `rgba(255, 255, 255, ${1 - _t(tick, 0.8, 1)})`;
    if (_t(tick, 0, 1) > 0.8) {
        ctx.drawImage(cam, $x(15), $y(30), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(cam, $x(15), $y(45), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(cam, $x(15), $y(60), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(ball, $x(40), $y(40), ball.width / ball.height * $y(20), $y(20));
        ctx.fillRect($x(0), $y(20), $x(100), $y(80));
    }
}

let slide11 = () => {
    transition10(100);
}
let transition11 = (tick) => {

    clearScreen();
    // ctx.fillStyle = "#fff";
    // ctx.fillRect($x(0), $y(0), $x(55), $y(100));
    transition10(100);
    transitiontickspeed = 0.4;
    transitionDuration = 100;

    let drawFrame = (x, msg) => {
        ctx.strokeStyle = "rgba(83, 92, 104,1.0)";
        ctx.lineWidth = $y(0.2);
        let width = ball.width / ball.height * $y(10);
        ctx.moveTo($x(x), $y(38));
        ctx.lineTo($x(x) + width, $y(38));
        ctx.lineTo($x(x) + width, $y(38) + $y(10));
        ctx.lineTo($x(x), $y(38) + $y(10));
        ctx.lineTo($x(x), $y(38));
        ctx.stroke();
        ctx.drawImage(ball, $x(x), $y(38), width, $y(10));

        text(msg, s, [$x(x) + width / 2, $y(50)], alignments.TOP);
    }

    let color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("...", h2, [$x(84), $y(43)], alignments.LEFT, color);

    ctx.beginPath();
    ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.2)})`;
    ctx.lineWidth = $y(0.6);
    ctx.moveTo($x(60), $y(60));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60));
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.2)})`;
    ctx.moveTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) - $x(1));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration) + $x(1), $y(60));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) + $x(1));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) - $x(1));
    ctx.fill();
    color = `rgba(0, 0, 0, ${_t(tick, 0, 0.2)})`;
    text("Time", p, [$x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration) * 0.5, $y(63)], alignments.TOP, color);

    if (_t(tick, 0, 1) < 0.1) {
        ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.1) * 0.4})`
        ctx.fillRect($x(15), $y(30), cam.width / cam.height * $y(10), $y(10));
    }
    else if (_t(tick, 0, 1) < 0.4) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.1, 0.2) * 0.4})`
        ctx.fillRect($x(15), $y(30), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
    }
    else if (_t(tick, 0, 1) < 0.7) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.4, 0.5) * 0.4})`
        ctx.fillRect($x(15), $y(45), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
    }
    else if (_t(tick, 0, 1) < 0.8) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.7, 0.8) * 0.4})`
        ctx.fillRect($x(15), $y(60), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
        drawFrame(76, "Cam 3");
    }
    else {
        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
        drawFrame(76, "Cam 3");
    }
}

let slide12 = () => {
    transition11(100);
}
let transition12 = (tick) => {
    clearScreen();
    
    transition10(100);
    let cam = document.getElementById(ids.camera);
    let ball = document.getElementById(ids.ball);
    
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(40), $y(30), $x(30), $y(40));
    
    transitiontickspeed = 0.4;
    transitionDuration = 100;
    
    if (_t(tick, 0, 1) < 0.25) {
        ctx.drawImage(ball, $x(40), $y(40) - speed(_t(tick, 0, 0.25) * transitionDuration) * $y(10), ball.width / ball.height * $y(20), $y(20));
    } 
    else if (_t(tick, 0, 1) < 0.75) {
        ctx.drawImage(ball, $x(40), $y(30) + speed(_t(tick, 0.25, 0.75) * transitionDuration) * $y(20), ball.width / ball.height * $y(20), $y(20));
    }
    else if (_t(tick, 0, 1) <= 1) {
        ctx.drawImage(ball, $x(40), $y(50) - speed(_t(tick, 0.75, 1) * transitionDuration) * $y(10), ball.width / ball.height * $y(20), $y(20));
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.2)})`;
    ctx.lineWidth = $y(0.6);
    ctx.moveTo($x(60), $y(60));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60));
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.2)})`;
    ctx.moveTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) - $x(1));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration) + $x(1), $y(60));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) + $x(1));
    ctx.lineTo($x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration), $y(60) - $x(1));
    ctx.fill();
    let color = `rgba(0, 0, 0, ${_t(tick, 0, 0.2)})`;
    text("Time", p, [$x(60) + $x(30) * speed(_t(tick, 0, 1) * transitionDuration) * 0.5, $y(63)], alignments.TOP, color);
    
    

    let drawFrame = (x, msg) => {
        ctx.strokeStyle = "rgba(83, 92, 104,1.0)";
        ctx.lineWidth = $y(0.2);
        let width = ball.width / ball.height * $y(10);
        ctx.moveTo($x(x), $y(38));
        ctx.lineTo($x(x) + width, $y(38));
        ctx.lineTo($x(x) + width, $y(38) + $y(10));
        ctx.lineTo($x(x), $y(38) + $y(10));
        ctx.lineTo($x(x), $y(38));
        ctx.stroke();
        
        for (let i = 0; i < $x(0.8); i++) {
            ctx.drawImage(ball, $x(x - 0.4) + i, $y(38), width, $y(10));
        }
        text(msg, s, [$x(x) + width / 2, $y(50)], alignments.TOP);
    }

    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("...", h2, [$x(84), $y(43)], alignments.LEFT, color);
    text("Limitation - Motion Blur", p, [$x(76), $y(75)], alignments.TOP, color);

    if (_t(tick, 0, 1) < 0.1) {
        ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.1) * 0.4})`
        ctx.fillRect($x(15), $y(30), cam.width / cam.height * $y(10), $y(10));
    }
    else if (_t(tick, 0, 1) < 0.4) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.1, 0.2) * 0.4})`
        ctx.fillRect($x(15), $y(30), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
    }
    else if (_t(tick, 0, 1) < 0.7) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.4, 0.5) * 0.4})`
        ctx.fillRect($x(15), $y(45), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
    }
    else if (_t(tick, 0, 1) < 0.8) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 - _t(tick, 0.7, 0.8) * 0.4})`
        ctx.fillRect($x(15), $y(60), cam.width / cam.height * $y(10), $y(10));

        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
        drawFrame(76, "Cam 3");
    }
    else {
        drawFrame(60, "Cam 1");
        drawFrame(68, "Cam 2");
        drawFrame(76, "Cam 3");
    }
}

let slide13 = () => {
    transition12(100);
}
let transition13 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)}`;
    ctx.fillRect($x(0), $y(15), $x(100), $y(85));
    
    if (_t(tick, 0, 1) == 1) {
        text("EXISTING RESEARCH", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    }
    let color = `rgba(0, 0, 0, ${_t(tick, 0.3, 0.6)}`;
    text("Better Implementation", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`
    text("Schechtman et al.", h3, [$x(5), $y(85)], alignments.LEFT, color);
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`
    text("Cam 1", p, [$x(5), $y(35)], alignments.LEFT, color);
    text("Cam 2", p, [$x(5), $y(50)], alignments.LEFT, color);
    text("Cam 3", p, [$x(5), $y(65)], alignments.LEFT, color);
    ctx.fillStyle = `rgba(255, 255, 255, ${1 - _t(tick, 0.8, 1)})`;
    
    let ball = document.getElementById(ids.ball);
    if (_t(tick, 0, 1) > 0.8) {
        ctx.drawImage(cam, $x(15), $y(30), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(cam, $x(15), $y(45), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(cam, $x(15), $y(60), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(ball, $x(40), $y(40), ball.width / ball.height * $y(20), $y(20));
        ctx.fillRect($x(0), $y(20), $x(100), $y(80));
    }
}

let slide14 = () => {
    transition13(100);
}
let transition14 = (tick) => {
    transitiontickspeed = 2;
    transitionDuration = 100;
    
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 1)}`;
    ctx.fillRect($x(55), $y(15), $x(45), $y(85));
    
    color = `rgba(0, 0, 0, ${_t(tick, 0, 1)})`
    text("Solves for motion blur", p, [$x(65), $y(40)], alignments.LEFT, color);
}

let slide15 = () => {
    transition13(100);
    transition14(100);
}
let transition15 = (tick) => {
    transitiontickspeed = 2;
    transitionDuration = 100;
    
    if (_t(tick, 0, 1) == 1) {
        transition13(100);
        transition14(100);
    }
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(12), $y(20), $x(20), $y(60));
    
    let cam = document.getElementById(ids.camera);
    let camtop = document.getElementById(ids.camtop);
    let cambot = document.getElementById(ids.cambot);
    
    if (_t(tick, 0, 1) > 0.3) {
        
        let height = cam.width / cam.height * $y(10) * camtop.height / camtop.width;
        ctx.drawImage(camtop, $x(15), $y(40) - height, cam.width / cam.height * $y(10), cam.width / cam.height * $y(10) * camtop.height / camtop.width);
        ctx.drawImage(cam, $x(15), $y(45), cam.width / cam.height * $y(10), $y(10));
        ctx.drawImage(cambot, $x(15), $y(60), cam.width / cam.height * $y(10), cam.width / cam.height * $y(10) * cambot.height / cambot.width);
        ctx.drawImage(ball, $x(40), $y(40), ball.width / ball.height * $y(20), $y(20));
        
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - _t(tick, 0.3, 1)})`;
        ctx.fillRect($x(12), $y(20), $x(20), $y(60));
    }
    
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(60), $y(55), $x(40), $y(10));
    let color = `rgba(0, 0, 0, ${_t(tick, 0.3, 1)})`;
    text("Does not account for parallax", p, [$x(65), $y(60)], alignments.LEFT, color);
}

let slide16 = () => {
    transition15(100);
}
let transition16 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    fadeAll(tick, 0.5);
    
    let color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("MY RESEARCH", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Research Question", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 1)})`;
    text("Can Schechtman's technique be improved", h2, [$x(50), $y(45)], alignments.MIDDLE, color);
    text("to account for parallax?", h2, [$x(50), $y(55)], alignments.MIDDLE, color);
}

let slide17 = () => {
    transition16(100);
}
let transition17 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    fadeAll(tick, 0.5, true);
    
    if (_t(tick, 0, 1) == 1) {
        text("MY RESEARCH", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    }
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Experimentation", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    // text("Variables", h2, [$x(5), $y(75)], alignments.LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 1)})`;
    text("Video feed", p, [$x(5), $y(40)], alignments.LEFT, color);
    text("Relative timings", p, [$x(5), $y(50)], alignments.LEFT, color);
    text("Relative positioning", p, [$x(5), $y(60)], alignments.LEFT, color);
}

let slide18 = () => {
    transition17(100);
}
let transition18 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    clearScreen();
    transition17(100);
    
    progress = speed(_t(tick, 0.2, 0.7) * transitionDuration);
    
    let dir1 = [($x(50) - $x(30)) * progress + $x(30), ($y(50) - $y(40)) * progress + $y(40)];
    let dir2 = [($x(50) - $x(30)) * progress + $x(30), $y(50)];
    let dir3 = [($x(50) - $x(30)) * progress + $x(30), ($y(50) - $y(60)) * progress + $y(60)];
    
    ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.2)})`;
    ctx.lineWidth = $y(0.8)
    // ctx.beginPath();
    ctx.moveTo($x(30), $y(40));
    ctx.lineTo(dir1[0], dir1[1]);
    ctx.stroke();
    // ctx.beginPath();
    ctx.moveTo($x(30), $y(50));
    ctx.lineTo(dir2[0], dir2[1]);
    ctx.stroke();
    // ctx.beginPath();
    ctx.moveTo($x(30), $y(60));
    ctx.lineTo(dir3[0], dir3[1]);
    ctx.stroke();
    
    let color = `rgba(0, 0, 0, ${_t(tick, 0.7, 1)})`;
    text("Algorithm", p, [$x(53), $y(50)], alignments.LEFT, color);
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Results", h2, [$x(53), $y(75)], alignments.LEFT, color);
}

let slide19 = () => {
    transition18(100);
}
let transition19 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    let artif = document.getElementById(ids.artifact);
    let highres = document.getElementById(ids.highrsimg);
    
    fadeAll(tick, 0.5);
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("ANALYSIS", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Accuracy", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("How close is it to reality?", p, [$x(5), $y(25)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("Compare to ground truth with LSR", p, [$x(5), $y(35)], alignments.TOP_LEFT, color);
    text("vs", p, [$x(50), $y(65)], alignments.MIDDLE, color);
    if (_t(tick, 0, 1) > 0.8) {
    let width = artif.width / artif.height * $y(30);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - _t(tick, 0.9, 1)}`;
        ctx.drawImage(artif, $x(15), $y(50), width, $y(30));
        ctx.drawImage(highres, $x(100) - $x(15) - width, $y(50), width, $y(30));
        ctx.fillRect($x(15) - 1, $y(50) - 1, width + 2, $y(30) + 2);
        ctx.fillRect($x(100) - $x(15) - width - 1, $y(50) - 1, width + 2, $y(30) + 2);
    }
}

let slide20 = () => {
    transition19(100);
}
let transition20 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]
    
    fadeAll(tick, 0.5);

    color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("ANALYSIS", h1, [$x(95), $y(5)], alignments.TOP_RIGHT, color);
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Hardware Cost", h3, [$x(95), $y(15)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("What are the cost savings using this approach?", p, [$x(95), $y(25)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("Compare to hypothetical non algorithmic system", p, [$x(95), $y(35)], alignments.TOP_RIGHT, color);

    if (_t(tick, 0, 1) > 0.6) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(30), $y(60));
        ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    }

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}

let slide21 = () => {
    transition20(100);
}
let transition21 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]
    
    fadeAll(tick, 0.5, true);

    if (_t(tick, 0, 1) == 1) {
        text("ANALYSIS", h1, [$x(95), $y(5)], alignments.TOP_RIGHT, color);
    }
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Software Cost", h3, [$x(95), $y(15)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("How much processing is required per frame?", p, [$x(95), $y(25)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("Assess real time feasibility", p, [$x(95), $y(35)], alignments.TOP_RIGHT, color);


    if (_t(tick, 0, 1) > 0.6) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(30), $y(60));
        ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    }

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(83, 92, 104, 1)`;
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = `rgba(83, 92, 104, 1)`;
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}

let slide22 = () => {
    transition21(100);
}
let transition22 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]
    
    fadeAll(tick, 0.5, true);

    if (_t(tick, 0, 1) == 1) {
        text("ANALYSIS", h1, [$x(95), $y(5)], alignments.TOP_RIGHT, color);
    }
    
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Limitations", h3, [$x(95), $y(15)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("Very unilateral", p, [$x(95), $y(25)], alignments.TOP_RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("No comparison with other methods", p, [$x(95), $y(35)], alignments.TOP_RIGHT, color);


    if (_t(tick, 0, 1) > 0.6) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(30), $y(60));
        ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    }

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(83, 92, 104, 1)`;
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = `rgba(83, 92, 104, 1)`;
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}

let slide23 = () => {
    transition22(100);
}
let transition23 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;
    
    fadeAll(tick, 0.5);

    color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Cost", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
}

let slide24 = () => {
    transition23(100);
}
let transition24 = (tick) => {
    transitiontickspeed = 0.3;
    transitionDuration = 100;
    let dt = 0.1;

    let nodes = (t) => bezier(_t(t * transitionDuration, 0, 1), 0, 1/3, 2/3, 1);
    let nodes1 = (t) => bezier(_t(t * transitionDuration, 0, 1), 0, 1/3, 1/3, 1/3);

    if (_t(tick, 0, 1) == 1) {
        text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Cost", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    }
    let coords1 = [$x(5) + $x(speed(tick) * 55) + $x(3), $y(76) - $y(nodes(speed(tick)) * 35)];
    text("Multicamera algorithm performance", p, coords1, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    let coords2 = [$x(5) + $x(speed(tick) * 55) + $x(3), $y(76) - $y(nodes1(speed(tick)) * 35)];
    text("Single camera performance", p, coords2, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0.3, 0.5)})`);
    let coords3 = [$x(5) + $x(speed(tick) * 55) + $x(3), $y(76)]
    if (_t(tick, 0, 1) < 0.7) {
        text("$" + Math.round(speed(tick) * (1000)), p, coords3, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    }
    else {
        text("Cost", p, coords3, alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    }
    text("Hypothetical price to performance comparison", p, [$x(5), $y(90)], alignments.LEFT, `rgba(0, 0, 0, ${_t(tick, 0, 0.1)})`);
    
    // for (let i = 0; i <= speed(tick) * 7.2; i++) {
    //     let coords = [$x(5) + $x(i * 55 / 7), $y(76) + $x(2)];
    //     text("$" + i * 500, s, coords, alignments.TOP);
    // }
    
    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.3)})`;
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));
    // y axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.1)})`;
    ctx.fillRect($x(5), $y(76), $x(0.25), -$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.moveTo($x(5) - $y(1), $y(76)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.lineTo($x(5) + $y(1.25), $y(76)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.lineTo($x(5) + $y(0.125), $y(76) - $x(1)-$y(speed(_t(tick, 0, 0.08) * transitionDuration) * 49));
    ctx.fill();
    // x axis triangle
    ctx.beginPath();
    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.1)})`;
    ctx.fillRect($x(5), $y(76), $x(speed(tick) * 55), $x(0.25));
    ctx.moveTo($x(5) + $x(speed(tick) * 55), $y(75));
    ctx.lineTo($x(5) + $x(speed(tick) * 55), $y(77.25));
    ctx.lineTo($x(5) + $x(speed(tick) * 55 + 1), $y(76.125));
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = `rgba(106, 176, 76, 1)`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(76));
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 55, $y(76) - $y(nodes(speed(i * dt))) * 35)
    }
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(235, 77, 75, ${_t(tick, 0.3, 0.5)})`;
    ctx.lineWidth = $y(0.5);
    ctx.moveTo($x(5), $y(76));  
    for (let i = 0; i < tick / dt; i++) {
        ctx.lineTo($x(5) + $x(speed(i * dt)) * 55, $y(76) - $y(nodes1(speed(i * dt))) * 35)
    }
    ctx.stroke();
}

let slide25 = () => {
    transition24(100);
}
let transition25 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    fadeAll(tick, 0.5, true);

    if (_t(tick, 0, 1) == 1) {
        text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    }
    let color = `rgba(0, 0, 0, ${_t(tick, 0.6, 0.8)})`;
    text("Environment", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
}

let slide26 = () => {
    transition25(100);
}
let transition26 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(20), $x(100), $y(80));

    if (_t(tick, 0, 1) == 1) {
        text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Environment", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.5)})`;
    ctx.lineWidth = $y(0.4);
    ctx.moveTo($x(5), $y(30));
    ctx.lineTo($x(7), $y(30));
    ctx.lineTo($x(7), $y(70));
    ctx.lineTo($x(5), $y(70));
    ctx.lineTo($x(5), $y(30));
    ctx.stroke();

    ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0, 0.5)})`;
    ctx.fillRect($x(5), $y(70) - speed(_t(tick, 0, 0.5) * transitionDuration) * $y(38), $x(2), speed(_t(tick, 0, 0.5) * transitionDuration) * $y(38));

    color = `rgba(0, 0, 0, ${_t(tick, 0, 0.5)})`;
    text("Target", p, [$x(8), $y(70) - speed(_t(tick, 0, 0.5) * transitionDuration) * $y(38)], alignments.LEFT, color);
    text("Performance", p, [$x(8), $y(75) - speed(_t(tick, 0, 0.5) * transitionDuration) * $y(38)], alignments.LEFT, color);

    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 1)})`;
    text("QA Pass Rate", p, [$x(75), $y(45)], alignments.LEFT, color);
    text("89%", h2, [$x(75), $y(55)], alignments.LEFT, color);

    if (_t(tick, 0, 1) > 0.5) {
        let sensor = document.getElementById(ids.sensor);
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 5; y++) {
                let xpos = $x(26) + $x(5) * x;
                let ypos = $y(30) + $x(5) * y;
                ctx.drawImage(sensor, xpos, ypos, $x(5), $x(5));
                
                let strike = (x==0&&y==0) || (x==7&&y==4) || (x==4&&y==2) || (x==8&&y==0) || (x==2&&y==3);

                if (strike) {
                    // console.log(x, y);
                    ctx.strokeStyle = `rgba(235, 77, 75, ${_t(tick, 0.7, 1)})`;
                    ctx.beginPath();
                    ctx.moveTo(xpos, ypos);
                    ctx.lineTo(xpos + $x(5), ypos + $x(5));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(xpos + $x(5), ypos);
                    ctx.lineTo(xpos, ypos + $x(5));
                    ctx.stroke();
                }
            }
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${1-_t(tick, 0.5, 0.8)})`;
        ctx.fillRect($x(26), $y(30), $x(70), $y(55));
    }
}

let slide27 = () => {
    transition26(100);
}
let transition27 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(20), $x(75), $y(80));

    if (_t(tick, 0, 1) == 1) {
        text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
        text("Environment", h3, [$x(5), $y(15)], alignments.TOP_LEFT);
        text("QA Pass Rate", p, [$x(75), $y(45)], alignments.LEFT);
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(83, 92, 104, 1)`;
    ctx.lineWidth = $y(0.4);
    ctx.moveTo($x(5), $y(30));
    ctx.lineTo($x(7), $y(30));
    ctx.lineTo($x(7), $y(70));
    ctx.lineTo($x(5), $y(70));
    ctx.lineTo($x(5), $y(30));
    ctx.stroke();

    ctx.fillStyle = `rgba(83, 92, 104, 1)`;
    ctx.fillRect($x(5), $y(32) + $y(15) * speed(_t(tick, 0, 0.5) * transitionDuration), $x(2), $y(38) - speed(_t(tick, 0, 0.5) * transitionDuration) * $y(15));


    text("Target", p, [$x(8), $y(32) + $y(15) * speed(_t(tick, 0, 0.5) * transitionDuration)], alignments.LEFT);
    text("Performance", p, [$x(8), $y(37) + $y(15) * speed(_t(tick, 0, 0.5) * transitionDuration)], alignments.LEFT);

    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 1)})`;
    text("96%", h2, [$x(75), $y(55)], alignments.LEFT, color);

    ctx.fillStyle = `rgba(255, 255, 255, ${_t(tick, 0, 0.5)})`;
    ctx.fillRect($x(75), $y(48), $x(25), $y(30));

    if (_t(tick, 0, 1) > 0) {
        let sensor = document.getElementById(ids.sensor);
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 5; y++) {
                let xpos = $x(26) + $x(5) * x;
                let ypos = $y(30) + $x(5) * y;
                ctx.drawImage(sensor, xpos, ypos, $x(5), $x(5));
                
                let strike = (x==0&&y==0) || (x==7&&y==4);
                let oldstrike = (x==8&&y==0) || (x==2&&y==3) || (x==4&&y==2);

                if (strike) {
                    // console.log(x, y);
                    ctx.strokeStyle = `rgba(235, 77, 75, 1)`;
                    ctx.beginPath();
                    ctx.moveTo(xpos, ypos);
                    ctx.lineTo(xpos + $x(5), ypos + $x(5));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(xpos + $x(5), ypos);
                    ctx.lineTo(xpos, ypos + $x(5));
                    ctx.stroke();
                }
                if (oldstrike) {
                    // console.log(x, y);
                    ctx.strokeStyle = `rgba(235, 77, 75, ${1 - _t(tick, 0.7, 1)})`;
                    ctx.beginPath();
                    ctx.moveTo(xpos, ypos);
                    ctx.lineTo(xpos + $x(5), ypos + $x(5));
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(xpos + $x(5), ypos);
                    ctx.lineTo(xpos, ypos + $x(5));
                    ctx.stroke();
                }
            }
        }
    }
}

let slide28 = () => {
    transition27(100);
}
let transition28 = (tick) => {
    transitiontickspeed = 1;
    transitionDuration = 100;

    fadeAll(tick, 0.5, true);

    if (_t(tick, 0, 1) == 1) {
        text("VALUE", h1, [$x(5), $y(5)], alignments.TOP_LEFT);
    }
    let color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("Reliability", h3, [$x(5), $y(15)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("More reliable hardware", p, [$x(5), $y(25)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.75, 0.95)})`;
    text("Less downtime on hardware breakdowns", p, [$x(5), $y(35)], alignments.TOP_LEFT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.8, 1)})`;
    text("Easier to source and replace", p, [$x(5), $y(45)], alignments.TOP_LEFT, color);
}

let slide29 = () => {
    transition28(100);
}
let transition29 = (tick) => {
    transitiontickspeed = 0.5;
    transitionDuration = 100;
    let points = [
        [21, 53, 0.9],
        [6, 92, 0.7],
        [9, 58, 0.6],
        [10, 86, 0.6],
        [26, 66, 0.9],
        [14, 94, 0.6],
        [3, 59, 0.7],
        [4, 42, 0.7],
        [9, 44, 0.7],
        [5, 82, 0.9],
        [16, 85, 0.9],
        [29, 81, 0.6],
        [30, 93, 0.9],
        [23, 91, 0.5],
        [13, 43, 0.5],
        [7, 28, 0.9]
    ]
    
    fadeAll(tick, 0.5);

    color = `rgba(0, 0, 0, ${_t(tick, 0.5, 0.7)})`;
    text("THANKS!", h1, [$x(90), $y(30)], alignments.RIGHT, color);
    color = `rgba(0, 0, 0, ${_t(tick, 0.7, 0.9)})`;
    text("Questions?", h2, [$x(90), $y(40)], alignments.RIGHT, color);


    if (_t(tick, 0, 1) > 0.6) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.fillRect($x(0), $y(20), $x(30), $y(60));
        ctx.fillRect($x(0), $y(60), $x(60), $y(40));
    }
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.arc($x(points[i][0]), $y(points[i][1]), $y(points[i][2]), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = `rgba(83, 92, 104, ${_t(tick, 0.6, 0.8)})`;
        ctx.lineWidth = $y(0.06);
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 1) % points.length][0]), $y(points[(i + 1) % points.length][1]));
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo($x(points[i][0]), $y(points[i][1]));
        ctx.lineTo($x(points[(i + 2) % points.length][0]), $y(points[(i + 2) % points.length][1]));
        ctx.stroke();
    }
}

let slide30 = () => {
    transition29(100);
}

const slides = [
    [slide1, anim1, transition1],
    [slide2, () => {}, transition2],
    [slide3, () => {}, transition3],
    [slide4, () => {}, transition4],
    [slide5, (tick) => anim5(tick, 10), transition5],
    [slide6, (tick) => anim5(tick, 15), transition6],
    [slide7, () => {}, transition7],
    [slide8, () => {}, transition8],
    [slide9, anim1, transition9],
    [slide10, anim1, transition10],
    [slide11, () => {}, transition11],
    [slide12, () => {}, transition12],
    [slide13, () => {}, transition13],
    [slide14, () => {}, transition14],
    [slide15, () => {}, transition15],
    [slide16, () => {}, transition16],
    [slide17, () => {}, transition17],
    [slide18, () => {}, transition19],
    // [slide19, () => {}, transition19],
    [slide20, () => {}, transition20],
    [slide21, anim1, transition21],
    [slide22, anim1, transition22],
    [slide23, anim1, transition23],
    [slide24, () => {}, transition24],
    [slide25, () => {}, transition25],
    [slide26, () => {}, transition26],
    [slide27, () => {}, transition27],
    [slide28, () => {}, transition28],
    [slide29, () => {}, transition29],
    [slide30, anim1, () => {}]
];


var slidePointer = 0;
var animTicker = 0;
var transitionTicker = 0;

var animtickspeed = 1;
var animPeriod = 100;

var transitiontickspeed = 1;
var transitionDuration = 100;

var pauseanim = false;
var pausetransition = false;

/*****************************                     CALLBACKS                      *****************************/


// recalculate canvas on resize
document.body.onresize = () => {
    // do letterboxing according to aspect ratio
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isWConstrained = (height * aspect[0] / aspect[1] > width)
    canvas.width = width * isWConstrained + height * aspect[0] / aspect[1] * !isWConstrained;
    canvas.height = width * aspect[1] / aspect[0] * isWConstrained + height * !isWConstrained;
    // rerender on resize
    onresize();
    render();
}

// fullscreen when button is clicked
document.getElementById(ids.fsbutton).onclick = () => {
    let el = document.documentElement;
    el.requestFullscreen();
}

function render() {
    onrender();
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect($x(0), $y(0), $x(100), $y(100));

    slides[slidePointer][0]();
}

setInterval(() => {
    if (pauseanim) {
        return;
    }
    if (slidePointer == slides.length) {
        return;
    }
    slides[slidePointer][1](animTicker);
    animTicker += animtickspeed;
    animTicker %= animPeriod;
}, 10);

document.onkeyup = (e) => {
    if (e.key == "ArrowRight") {
        if (slidePointer == slides.length) {
            return;
        }
        pauseanim = true;
        slides[slidePointer][2](0);
        if (transitionDuration == 0) {
            slidePointer += 1;
            pauseanim = false;
            render();
            return;
        }
        let transition = setInterval(() => {
            if (pausetransition) {
                return;
            }
            if (transitionTicker >= transitionDuration) {
                slidePointer += 1;
                pauseanim = false;
                clearInterval(transition);
                transitionTicker = 0;
                render();
                return;
            }
            slides[slidePointer][2](transitionTicker);
            transitionTicker += transitiontickspeed;
        }, 10);
        if (transitionTicker > 0) {
            transitionDuration = 0;
            transitionTicker = 0;
            slidePointer += 1;
            pauseanim = false;
            clearInterval(transition);
            render();
            return;
        }
    } 
    if (e.key == "ArrowLeft") {
        if (slidePointer != 0) {
            slidePointer -= 1;
        }
        animTicker = 0;
        transitionTicker = 0;
        render();
    }
}


document.body.onresize();

/*****************************                     UTILS                      *****************************/

// add text with certain font and position
function text(msg, font, pos, align, fill) {
    // console.log("called text with " + msg);
    if (!fill) {
        fill = "#000";
    }
    for (let font of fonts) {
        font.load();
    }
    document.fonts.ready.then(() => {
        let tempFont = ctx.font;
        let tempFill = ctx.fillStyle;
        ctx.font = font.weight + " " + font.size + "px " + font.family;
        ctx.fillStyle = fill;
        let width = ctx.measureText(msg).width;
        let height = font.size;
        switch (align) {
            case alignments.TOP_LEFT:
                pos[1] += height;
                break;
            case alignments.TOP:
                pos[1] += height;
                pos[0] -= width / 2;
                break;
            case alignments.TOP_RIGHT:
                pos[1] += height;
                pos[0] -= width;
                break;
            case alignments.LEFT:
                pos[1] += height / 2;
                break;
            case alignments.MIDDLE:
                pos[1] += height / 2;
                pos[0] -= width / 2;
                break;
            case alignments.RIGHT:
                pos[1] += height / 2;
                pos[0] -= width;
                break;
            case alignments.BOTTOM:
                pos[0] -= width / 2;
                break;
            case alignments.BOTTOM_RIGHT:
                pos[0] -= width;
                break;
    
            default:
                break;
        }
        ctx.fillText(msg, pos[0], pos[1]);
        ctx.font = tempFont;
        ctx.fillStyle = tempFill;
    });
}

canvas.onclick = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(_x(x), _y(y));
}

function bezier(t, initial, p1, p2, final) {
    return (
        (1 - t) * (1 - t) * (1 - t) * initial +
        3 * (1 - t) * (1 - t) * t * p1 +
        3 * (1 - t) * t * t * p2 +
        t * t * t * final
    );
}