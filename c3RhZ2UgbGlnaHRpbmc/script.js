canvas = document.getElementById("canvas");
canvas.width = window.innerWidth, canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
const width = 1000, v_offset = 10, h_offset = 0, stage_color = "#555";

var x = 50, y = 0, scrubber = x;
var changescrubber = false, movetimeline = false, createcue = false;
var num_nums = 0, temp_num = 0;
var selected = undefined, gui_open = false;

var start_tx = 0, current_tx = 0, rel_tx = 0, f_tx = 0;
var start_ty = 0, current_ty = 0, rel_ty = 0, f_ty = 0;

var h_off = 0;

var pause = true, nextitpause = false;

var t = 0;

var channels = ["US Wash", "LS Wash", "US TD 1", "US TD 2", "US TD 3", "US TD 4", "US TD 5", "US TD 6", "US AS 1", "US AS 2", "US AS 3", "US AS 4", "LS P 1", "LS P 2", "LS P 3", "LS P 4"];
var times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00"];
var cues = [];
var lights = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var colors = {0: "#FFFFFF", 8: "#F48A74", 15: "#F5AD9F", 21: "#FEBD01", 27: "#FFFAC3", 33: "#F78D1F", 40: "#FDC286", 46: "#FFFFFF", 55: "#C9D1FF", 62: "#9FB7FF", 67: "#4201FF", 77: "#0122D1", 82: "#0087B1", 86: "#007F06", 96: "#683FFF", 100: "#FF0008"} 
var colors_rgb = {0: "rgba(255, 255, 255, ", 8: "rgba(244, 138, 116, ", 15: "rgba(245, 173, 159, ", 21: "rgba(254, 189, 1, ", 27: "rgba(255, 250, 195, ", 33: "rgba(247, 141, 31, ", 40: "rgba(253, 194, 134, ", 46: "rgba(255, 255, 255, ", 55: "rgba(201, 209, 255, ", 62: "rgba(159, 183, 255, ", 67: "rgba(66, 1, 255, ", 77: "rgba(1, 34, 209, ", 82: "rgba(0, 135, 177, ", 86: "rgba(0, 127, 6, ", 96: "rgba(104, 63, 255, ", 100: "rgba(255, 0, 8, "} 
var color_vals = [0, 8, 15, 21, 27,33, 40, 46, 55, 62, 67, 77, 82, 86, 96, 100];

function draw_as() {
    last_style = ctx.strokeStyle;
    last_fill = ctx.fillStyle;

    key_rects = [
        [canvas.width / 2 - width * 0.25 + h_offset, v_offset, width * 0.5, width * 0.25],
        [canvas.width / 2 - width * 0.25 + h_offset, v_offset, width * 0.125, width * 0.25],
        [canvas.width / 2 - width * 0.125 + h_offset, v_offset, width * 0.125, width * 0.25],
        [canvas.width / 2 + h_offset, v_offset, width * 0.125, width * 0.25],
        [canvas.width / 2 + width * 0.125 + h_offset, v_offset, width * 0.125, width * 0.25]
    ];

    ctx.strokeStyle = "black";
    ctx.fillStyle = stage_color;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.rect(...key_rects[1]); ctx.fill();
    ctx.rect(...key_rects[2]); ctx.fill();
    ctx.rect(...key_rects[3]); ctx.fill();
    ctx.rect(...key_rects[4]); ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(...key_rects[0]);
    ctx.stroke();
}
function draw_us() {
    last_style = ctx.strokeStyle;
    last_fill = ctx.fillStyle;

    key_points = [
        [canvas.width / 2 - width * 0.25 + h_offset, width * 0.25 + v_offset],
        [canvas.width / 2 + width * 0.25 + h_offset, width * 0.25 + v_offset],
        [canvas.width / 2 + width * 0.375 + h_offset, width * 0.35 + v_offset],
        [canvas.width / 2 - width * 0.375 + h_offset, width * 0.35 + v_offset]
    ]

    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillStyle = stage_color;
    ctx.beginPath();
    ctx.moveTo(...key_points[0]);
    ctx.lineTo(...key_points[1]);
    ctx.lineTo(...key_points[2]);
    ctx.lineTo(...key_points[3]);
    ctx.lineTo(...key_points[0]);
    ctx.stroke();
    ctx.fill();
}
function draw_st() {
    last_style = ctx.strokeStyle;
    last_fill = ctx.fillStyle;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillStyle = stage_color;
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - width * 0.375 + h_offset, width * 0.35 + v_offset, width * 0.75, width * 0.05);
    ctx.stroke();
    ctx.fill();
}
function draw_ls() {
    last_style = ctx.strokeStyle;
    last_fill = ctx.fillStyle;

    key_points = [
        [canvas.width / 2 - width * 0.375 + h_offset, width * 0.4 + v_offset],
        [canvas.width / 2 + width * 0.375 + h_offset, width * 0.4 + v_offset],
        [canvas.width / 2 + width * 0.5 + h_offset, width * 0.5 + v_offset],
        [canvas.width / 2 - width * 0.5 + h_offset, width * 0.5 + v_offset]
    ]

    ctx.strokeStyle = "black";
    ctx.lineWidth = 6;
    ctx.fillStyle = stage_color;
    ctx.beginPath();
    ctx.moveTo(...key_points[0]);
    ctx.lineTo(...key_points[1]);
    ctx.lineTo(...key_points[2]);
    ctx.lineTo(...key_points[3]);
    ctx.lineTo(...key_points[0]);
    ctx.stroke();
    ctx.fill();
}

function draw_stage() {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.rect(canvas.width / 2 - width * 0.5, 0, width, width);
    ctx.fill();
    draw_as(); // Draw acoustic shells
    draw_us(); // Draw upper stage
    draw_st(); // Draw stage drop
    draw_ls(); // Draw lower stage
    draw_lights();
}
function draw_bar() {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.rect(0, canvas.height - 400, canvas.width, 400);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "lightgray"
    ctx.lineWidth = 1
    ctx.moveTo(50, canvas.height - 350);
    ctx.lineTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width - 50, canvas.height - 50);
    ctx.stroke();

    if (pause) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.moveTo(22, canvas.height - 375);
        ctx.lineTo(22, canvas.height - 365);
        ctx.lineTo(27, canvas.height - 370);
        ctx.fill();
    }
    else {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.rect(22, canvas.height - 375, 2, 10);
        ctx.fill();
        ctx.rect(25, canvas.height - 375, 2, 10);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(canvas.width - 61, canvas.height - 35, 4, 12);
    ctx.fill();
    ctx.rect(canvas.width - 65, canvas.height - 31, 12, 4);
    ctx.fill();
}
function draw_scrubber(x) {
    ctx.strokeStyle = "#009CE7";
    ctx.fillStyle = "#009CE7";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x, canvas.height - 350);
    ctx.lineTo(x, canvas.height - 50);
    ctx.lineTo(x, canvas.height - 350);
    ctx.lineTo(x + 5, canvas.height - 355);
    ctx.lineTo(x - 5, canvas.height - 355);
    ctx.fill();
    ctx.stroke();
}
function draw_cues(current_tx, current_ty) {
    // console.log(cues);
    for (var i = 0; i < cues.length; i++) {
        var start_time = cues[i][0];
        var end_time = cues[i][1];
        var target_channel = cues[i][2];
        ctx.beginPath();
        var color = cues[i][3];
        var closest_color = 0;
        for (var j = 0; j < color_vals.length; j++) {
            delta = Math.abs(color_vals[j] - color);
            if (delta < Math.abs(closest_color - color)) {
                closest_color = color_vals[j];
            }
        }
        ctx.strokeStyle = colors[closest_color];
        // console.log(closest_color, colors[closest_color]);
        ctx.lineWidth = 5;
        var y_val = (target_channel - 1) * 25 + 4 +canvas.height - 342 - current_ty;
        var x_start = start_time - current_tx;
        var x_end = end_time - current_tx;
        var occluded_start, occluded_end;

        if (y_val >= canvas.height - 350 && y_val <= canvas.height - 50 && (x_start > 50 || x_end > 50 || x_start < canvas.width - 50 || x_end < canvas.width - 50)) {
        // console.log(cues[i])
            if (x_start < 50) {
                occluded_start = 50;
            }
            else if (x_start > canvas.width - 50) {
                occluded_start = canvas.width - 50;
            }
            else {
                occluded_start = x_start;
            }
            if (x_end > canvas.width - 50) {
                occluded_end = canvas.width - 50;
            }
            else if (x_end < 50) {
                occluded_start = 50;
            }
            else {
                occluded_end = x_end;
            }

            ctx.moveTo(occluded_start, y_val);
            ctx.lineTo(occluded_end, y_val);
            ctx.stroke();
            if (selected == i) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#111";
                ctx.rect(occluded_start, y_val - 2.5, occluded_end - occluded_start, 5);
                ctx.stroke();
            }
        }
    }
}
function draw_lights() {
    dl = [
        (c, i) => { // US Wash
            ctx.beginPath()
            ctx.fillStyle = "rgba(255, 255, 255, " + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2, width * 0.25 * 2 / 3, width * 0.75 / 2, width * 0.5 / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        },
        (c, i) => { // LS Wash
            ctx.beginPath()
            ctx.fillStyle = "rgba(255, 255, 255, " + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2, width * 0.5, width * 0.75 * 2 / 3, width * 0.5 / 4, 0, 0, Math.PI * 2);
            ctx.fill();
        },
        (c, i) => { // US TD 1
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2 - width * 0.175, width * 0.285, width * 0.0625, width * 0.016, 0, 0, Math.PI * 2);
            ctx.fill();
        },
        (c, i) => { // US TD 2
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2 - width * 0.2, width * 0.3125, width * 0.0625 * 1.1, width * 0.016 * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();
            
        },
        (c, i) => { // US TD 3
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2, width * 0.285, width * 0.0625, width * 0.016, 0, 0, Math.PI * 2);
            ctx.fill();
        },
        (c, i) => { // US TD 4
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2, width * 0.3125, width * 0.0625 * 1.1, width * 0.016 * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();
            
        },
        (c, i) => { // US TD 1
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2 + width * 0.175, width * 0.285, width * 0.0625, width * 0.016, 0, 0, Math.PI * 2);
            ctx.fill();
        },
        (c, i) => { // US TD 2
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.ellipse(canvas.width / 2 + width * 0.2, width * 0.3125, width * 0.0625 * 1.1, width * 0.016 * 1.1, 0, 0, Math.PI * 2);
            ctx.fill();
            
        },
        (c, i) => { // US AS 1
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            key_rect = [canvas.width / 2 - width * 0.25 + h_offset, v_offset, width * 0.125, width * 0.25]
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5
            ctx.rect(...key_rect);
            ctx.fill();
            ctx.stroke();
        },
        (c, i) => { // US AS 2
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            key_rect = [canvas.width / 2 - width * 0.125 + h_offset, v_offset, width * 0.125, width * 0.25]
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5
            ctx.rect(...key_rect);
            ctx.fill();
            ctx.stroke();
        },
        (c, i) => { // US AS 3
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            key_rect = [canvas.width / 2 + h_offset, v_offset, width * 0.125, width * 0.25]
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5
            ctx.rect(...key_rect);
            ctx.fill();
            ctx.stroke();
        },
        (c, i) => { // US AS 4
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            key_rect = [canvas.width / 2 + width * 0.125 + h_offset, v_offset, width * 0.125, width * 0.25]
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5
            ctx.rect(...key_rect);
            ctx.fill();
            ctx.stroke();
        },
        (c, i) => { // LS P 1
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.moveTo(canvas.width / 2 - width * 0.375 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 - width * 0.375 / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 - width * 0.25 + h_offset, width * 0.5 + v_offset)
            ctx.lineTo(canvas.width / 2 - width * 0.5 + h_offset, width * 0.5 + v_offset)
            ctx.fill();
            
        },
        (c, i) => { // LS P 2
            // key_points = [
            //     [canvas.width / 2 - width * 0.375 + h_offset, width * 0.4 + v_offset],
            //     [canvas.width / 2 + width * 0.375 + h_offset, width * 0.4 + v_offset],
            //     [canvas.width / 2 + width * 0.5 + h_offset, width * 0.5 + v_offset],
            //     [canvas.width / 2 - width * 0.5 + h_offset, width * 0.5 + v_offset]
            // ]
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.moveTo(canvas.width / 2 - width * 0.375 / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + h_offset, width * 0.5 + v_offset)
            ctx.lineTo(canvas.width / 2 - width * 0.25 + h_offset, width * 0.5 + v_offset)
            ctx.fill()
            
        },
        (c, i) => { // LS P 3
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.moveTo(canvas.width / 2 + width * 0.375 / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + h_offset, width * 0.5 + v_offset)
            ctx.lineTo(canvas.width / 2 + width * 0.25 + h_offset, width * 0.5 + v_offset)
            ctx.fill()            
        },
        (c, i) => { // LS P 4
            var closest_color = 0;
            for (var j = 0; j < color_vals.length; j++) {
                delta = Math.abs(color_vals[j] - c);
                if (delta < Math.abs(closest_color - c)) {
                    closest_color = color_vals[j];
                }
            }
            ctx.beginPath()
            ctx.fillStyle = colors_rgb[closest_color] + (i - 25) / 100 + ")";
            ctx.moveTo(canvas.width / 2 + width * 0.375 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + width * 0.375 / 2 + h_offset, width * 0.4 + v_offset)
            ctx.lineTo(canvas.width / 2 + width * 0.25 + h_offset, width * 0.5 + v_offset)
            ctx.lineTo(canvas.width / 2 + width * 0.5 + h_offset, width * 0.5 + v_offset)
            ctx.fill();
        },
    ]
    for (var i = 0; i < cues.length; i++) {
        if (t + 50 < cues[i][1] && t + 50 > cues[i][0]) {
            dl[cues[i][2] - 1](cues[i][3], cues[i][4]);
        }
    }
}

function set_axes(x, y) {
    // US Wash, LS Wash, 6 US Top Downs, 4 US Acoustic Shells, 4 LS Pools - Total 16 * 25 px per line = 400 px
    // 100 px / second

    ctx.fillStyle = "white";

    for (var i = 0; i < channels.length; i ++) {
        y_val = 25 * i + 12;
        adjusted_y_val = y_val - y;
        if (adjusted_y_val >= 0 && adjusted_y_val <= 300) {
            ctx.beginPath();
            ctx.strokeStyle = "#555";
            ctx.lineWidth = 1
            ctx.fillText(channels[i], 5, canvas.height - 350 + adjusted_y_val);
            ctx.moveTo(50, canvas.height - 350 + adjusted_y_val);
            ctx.lineTo(canvas.width - 50, canvas.height - 350 + adjusted_y_val);
            ctx.stroke();
        }
    }
    
    
    for (var i = 0; i < times.length; i ++) {
        x_val = 200 * i;
        adjusted_x_val = x_val - x;
        if (adjusted_x_val >= 0 && adjusted_x_val <= canvas.width - 150) {
            ctx.beginPath();
            ctx.strokeStyle = "#555";
            ctx.lineWidth = 1
            ctx.fillText(times[i], 50 + adjusted_x_val, canvas.height - 25);
            ctx.moveTo(50 + adjusted_x_val, canvas.height - 350);
            ctx.lineTo(50 + adjusted_x_val, canvas.height - 50);
            ctx.stroke();
        }
    }
    h_off = -x;

}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

function show_gui(selected) {
    gui_open = true;
    ctx.fillStyle = "#555";
    ctx.roundRect(canvas.width - 250, 50, 200, 100, 20);
    ctx.fill();
    ctx.font = "15 px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Colour: " + cues[selected][3], canvas.width - 250 + 20, 100 - 20);
    ctx.fillText("Intensity: " + cues[selected][4], canvas.width - 250 + 20, 100 + 20);
}
function hide_gui() {
    gui_open = false;
    ctx.fillStyle = "#333";
    ctx.rect(canvas.width - 250, 50, 200, 100, 20);
    ctx.fill();
}

function get_music() {
    // console.log("music");
    var file = document.getElementById("get_file")
    file.click();
}

function get_download() {
    var fileContent = "cues = [";
    for (var i = 0; i < cues.length - 1; i++) {
        var current_str = "[" + new String(cues[i]) + "], "
        fileContent += current_str;
    }
    fileContent += "[" + new String(cues[cues.length - 1]) + "]]";
    // console.log(fileContent);
    var bb = new Blob([fileContent]);
    var a = document.createElement('a');
    a.style.display = "none";
    a.download = 'download.slf';
    a.href = window.URL.createObjectURL(bb);
    a.click();
}

function get_upload() {
    // console.log("upload");
    var file = document.getElementById("input")
    file.click();
    // console.log(file.files)
    file.addEventListener("change", () => {
        var fr = new FileReader()
        fr.readAsText(file.files[0]);
        fr.onload = (e) => {
            eval(fr.result);
        }
    });
}

function create_t_list() {
    var imap = [36, 35, 19, 20, 21, 22, 23, 24, 15, 16, 17, 18, 25, 27, 29, 31]
    var cmap = [1, 1, 43, 44, 45, 46, 47, 48, 39, 40, 41, 42, 26, 28, 30, 32]
    var exp_cue = []
    for (var i = 0; i < times.length * 10; i++) {
        var time = i * 20;
        var temp_cue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (var j = 0; j < cues.length; j++) {
            if (time + 50 < cues[j][1] && time + 50 > cues[j][0]) {
                temp_cue[imap[cues[j][2] - 1] - 1] = cues[j][4];
                temp_cue[cmap[cues[j][2] - 1] - 1] = cues[j][3];
            }
        }
        exp_cue.push([i / 10, temp_cue])
    }
    var last_same_cue = 0;
    var exp_cue_2 = []
    function compare_list(arr1, arr2) {
        if (arr1.length != arr2.length) {
            return false;
        }
        else {
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] != arr2[i]) {
                    return false
                }
            }
            return true
        }
    }
    for (var i = 0; i < times.length * 10; i++) {
        console.log(last_same_cue);
        if (!compare_list(exp_cue[i][1], exp_cue[last_same_cue * 10][1])) {
            exp_cue_2.push([last_same_cue, exp_cue[i][0], exp_cue[last_same_cue * 10][1]]);
            last_same_cue = exp_cue[i][0]
        }
    }
    exp_cue_2.push([last_same_cue, exp_cue[exp_cue.length - 1][0], exp_cue[last_same_cue * 10][1]]);
    var return_string = "Start Time,End Time,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48\n";
    for (var i = 0; i < exp_cue_2.length; i++) {
        return_string += new String(exp_cue_2[i]) + "\n";
    }
    return return_string;
}

function exp() {
    var fileContent = create_t_list();
    // console.log(fileContent);
    var bb = new Blob([fileContent]);
    var a = document.createElement('a');
    a.style.display = "none";
    a.download = 'download.csv';
    a.href = window.URL.createObjectURL(bb);
    a.click();
}

window.AudioContext = window.AudioContext;
var context = new window.AudioContext();
var source;
function playSound(arraybuffer) {
    context.decodeAudioData(arraybuffer, function (buf) {
        source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = buf;
        source.start(0);
    });
}
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    playFile(files[0]);
    pause = false;
    t = 0;
    scrubber = 50;
}
function playFile(file) {
    var freader = new FileReader();

    freader.onload = function (e) {
        // console.log(e.target.result);
        playSound(e.target.result);
    };
    freader.readAsArrayBuffer(file);
}
document.getElementById('get_file').addEventListener('change', handleFileSelect, false);

document.addEventListener("mousemove", (event) => {
    x = event.offsetX;
    y = event.offsetY;
});

document.addEventListener("keypress", (e) => {
    e.preventDefault();
    var key = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "0": 0,
        "F": 10,
        "L": 0
    }
    if (num_nums > 0 && e.key in key) {
        if (num_nums == 4) {
            cues[selected][3] = 10 * key[e.key];
            hide_gui();
            show_gui(selected);
        }
        else if (num_nums == 3) {
            cues[selected][3] += key[e.key];
            hide_gui();
            show_gui(selected);
        }
        else if (num_nums == 2) {
            cues[selected][4] = 10 * key[e.key];
            hide_gui();
            show_gui(selected);
        }
        else if (num_nums == 1) {
            cues[selected][4] += key[e.key];
            hide_gui();
            show_gui(selected);
        }
        num_nums -= 1;
    }
    else if (gui_open) {
        // console.log(selected);
        if (e.key == "r") {
            // console.log("delete");
        //     console.log(selected)
            cues.splice(selected, 1);
            hide_gui();
        }
    }
    if (e.key == " ") {
        if (pause) {
            pause = false;
        }
        else {
            pause = true;
            context.close()
        }
    }
})

document.addEventListener("mousedown", (e) => {
    if (e.button == 0 && x <= scrubber + h_off + 5 && x >= scrubber + h_off - 5 && y >= canvas.height - 355 && y <= canvas.height - 350) {
        changescrubber = true;
    }
    else if (e.button == 0 && x <=canvas.width - 50 && x >= canvas.width - 250 && y >= 50 && y <= 150) {
        // console.log("clicked");
        if (gui_open && num_nums == 0) {
            num_nums = 4;
        }
    }
    else if (e.button == 0 && x <= 27 && x >= 22 && y <= canvas.height - 365 && y >= canvas.height - 375) {
        if (pause) {
            pause = false;
        }
        else {
            pause = true;
            context.close()
        }
    }
    else if (e.button == 0 && y >= canvas.height - 35 && y <= canvas.height - 23 && x >= canvas.width - 65 && x <= canvas.width - 53) {
        // console.log("added");
        times.push(times.length + ":00");
    }
    else if (e.button == 0 && y >= canvas.height - 400) {
        f_tx = x;
        f_ty = y;
        movetimeline = true;
    }
    else if (e.button == 2) {
        e.preventDefault();
        createcue = true;
        start_tx = x;
        start_ty = y;
    }
    if (e.button == 0 && x >= 50 && x <= 65 && y <= 65 && y >= 50) {
        get_music();
    }
    if (e.button == 0 && x >= 85 && x <= 90 && y <= 65 && y >= 50) {
        get_download();
    }
    if (e.button == 0 && x >= 120 && x <= 135 && y <= 65 && y >= 50) {
        get_upload();
    }
    if (e.button == 0 && x >= 155 && x <= 170 && y <= 65 && y >= 50) {
        exp();
    }
});
document.addEventListener("mouseup", (e) => {

    changescrubber = false;
    movetimeline = false;
    createcue = false;
    current_tx = current_tx - rel_tx;
    current_ty = current_ty - rel_ty;
    // console.log(current_tx, current_ty);
    if (start_tx < 50) {
        start_tx = 50;
    }
    else if (start_tx > canvas.width - 50) {
        start_tx = canvas.width - 50;
    }
    if (x < 50) {
        x = 50;
    }
    else if (x > canvas.width - 50) {
        x = canvas.width - 50;
    }
    if (x < start_tx) {
        var temp = x;
        x = start_tx;
        start_tx = temp;
    }
    start_time = Math.ceil(start_tx / 20) * 20 - (current_tx % 20) - 10 + current_tx;
    end_time = Math.ceil(x / 20) * 20 - (current_tx % 20) - 10 + current_tx;
    target_chan = - Math.round((canvas.height - 350 - start_ty - 12 - current_ty) / 25);

    // console.log(target_chan);

    if (e.button == 2 && target_chan > 0) {
        config = [start_time, end_time, target_chan, 0, 0];
        cues.push(config);
    }

    rel_tx = 0;
    rel_ty = 0;
    start_tx = 0;
    start_ty = 0;
});
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})
document.addEventListener("dblclick", (e) => {
    // console.log("clicked");
    var select = false;
    for (var i = 0; i < cues.length; i++) {
        x_lower = cues[i][0] - current_tx;
        x_upper = cues[i][1] - current_tx;
        y_lower = (cues[i][2] - 1) * 25 + 4 + canvas.height - 342 - current_ty - 3;
        y_upper = (cues[i][2] - 1) * 25 + 4 + canvas.height - 342 - current_ty + 3;
        console.log(x, y, ":", x_lower, x_upper, y_lower, y_upper);
        // console.log(x_lower, x_upper, y_lower, y_upper)
        if (x >= x_lower && x <= x_upper && y >= y_lower && y <= y_upper) {
            select = true;
            selected = i;
            show_gui(selected);
        }
    }
    if (!select) {
        hide_gui();
        selected = undefined;
    }
})

setTimeout(() => {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var music = document.getElementById("music");
    var download = document.getElementById("download");
    var upload = document.getElementById("upload");
    var exp = document.getElementById("export");
    music.addEventListener("load", ctx.drawImage(music, 50, 50, 15, 15))
    download.addEventListener("load", ctx.drawImage(download, 85, 50, 15, 15))
    upload.addEventListener("load", ctx.drawImage(upload, 120, 50, 15, 15))
    exp.addEventListener("load", ctx.drawImage(exp, 155, 50, 15, 15))
}, 0);

setInterval(() => {
    if (changescrubber && x > 50 && x < canvas.width - 50) {
        draw_stage();
        draw_bar();
        scrubber = x - h_off;
        t = x - 50 - h_off;
        // console.log(t);
        draw_scrubber(scrubber + h_off);
        set_axes(current_tx, current_ty);
        draw_cues(current_tx, current_ty);
        // show_gui(0);
    }
    else if (movetimeline && x > 50 && x < canvas.width - 50) {
        ctx.lineWidth = 0.5;
        draw_stage();
        draw_bar();
        // if (movedirection < 0) {
        //     rel_tx -= 10;
        // }
        // else if (movedirection > 0) {
        //     rel_tx += 10;
        // }
        // else {
            rel_ty = y - f_ty;
        // }
        if (rel_ty - current_ty > 1) {
            rel_ty = current_ty;
        }
        else if (rel_ty - current_ty < -101) {
            rel_ty = -100 + current_ty;
        }
        rel_tx = x - f_tx;
        if (rel_tx - current_tx > 0) {
            rel_tx = current_tx;
        }
        else if (rel_tx - current_tx < - (times.length * 200 - canvas.width - 150)) {
            rel_tx = -(times.length * 200 - canvas.width - 150) + current_tx;
        }
        if (scrubber + h_off > canvas.width - 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(canvas.width - 55, canvas.height - 355 - 10);
            ctx.lineTo(canvas.width - 55, canvas.height - 345 - 10);
            ctx.lineTo(canvas.width - 50, canvas.height - 350 - 10);
            ctx.fill();
        }
        else if (scrubber + h_off < 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(50, canvas.height - 355 - 10);
            ctx.lineTo(50, canvas.height - 345 - 10);
            ctx.lineTo(45, canvas.height - 350 - 10);
            ctx.fill();
        }
        else {
            draw_scrubber(scrubber + h_off);
        }
        set_axes(current_tx - rel_tx, current_ty - rel_ty);
        draw_cues(current_tx - rel_tx, current_ty - rel_ty);
        // show_gui(0);
    }
    else if (createcue) {
        ctx.lineWidth = 0.5;
        draw_stage();
        draw_bar();
        set_axes(current_tx, current_ty);
        draw_cues(current_tx, current_ty)
        // show_gui(0);
        if (scrubber + h_off > canvas.width - 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(canvas.width - 55, canvas.height - 355 - 10);
            ctx.lineTo(canvas.width - 55, canvas.height - 345 - 10);
            ctx.lineTo(canvas.width - 50, canvas.height - 350 - 10);
            ctx.fill();
        }
        else if (scrubber + h_off < 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(50, canvas.height - 355 - 10);
            ctx.lineTo(50, canvas.height - 345 - 10);
            ctx.lineTo(45, canvas.height - 350 - 10);
            ctx.fill();
        }
        else {
            draw_scrubber(scrubber + h_off);
        }
        targetedchan =  - Math.round((canvas.height - 350 - start_ty - 12 - current_ty) / 25) - 1
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        if (targetedchan * 25 - current_ty >= 0 && targetedchan * 25 - current_ty < 300) {
            if (x >= 50 && x <= canvas.width - 50) {
                ctx.moveTo(Math.ceil(start_tx / 20) * 20 - current_tx % 20 - 10, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.lineTo(Math.ceil(x / 20) * 20 - current_tx % 20 - 10, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.stroke();
            }
            else if (x < 50) {
                ctx.moveTo(Math.ceil(start_tx / 20) * 20 - current_tx % 20 - 10, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.lineTo(50, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.stroke();
            }
            else {
                ctx.moveTo(Math.ceil(start_tx / 20) * 20 - current_tx % 20 - 10, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.lineTo(canvas.width - 50, targetedchan * 25 + 12 + canvas.height - 350 - current_ty);
                ctx.stroke();
            }
        }
        // console.log(targetedchan);
        // console.log(channels[targetedchan - 1]);
        ctx.lineWidth = 0.5;
    }
    else {
        ctx.lineWidth = 0.5;
        draw_stage();
        draw_bar();
        set_axes(current_tx, current_ty);
        draw_cues(current_tx, current_ty);
        // show_gui(0);
        if (scrubber + h_off > canvas.width - 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(canvas.width - 55, canvas.height - 355 - 10);
            ctx.lineTo(canvas.width - 55, canvas.height - 345 - 10);
            ctx.lineTo(canvas.width - 50, canvas.height - 350 - 10);
            ctx.fill();
        }
        else if (scrubber + h_off < 50) {
            ctx.beginPath();
            ctx.fillStyle = "#009CE7";
            ctx.moveTo(50, canvas.height - 355 - 10);
            ctx.lineTo(50, canvas.height - 345 - 10);
            ctx.lineTo(45, canvas.height - 350 - 10);
            ctx.fill();
        }
        else {
            draw_scrubber(scrubber + h_off);
        }
    }
    
    if (!pause) {
        t += 2;
        // console.log(t);
        scrubber = t + 50;
        
        for (var j = 0; j < lights.length; j++) {
            lights[j] = [0, 0];
        }
        for (var i = 0; i < cues.length; i++) {
            if (t < cues[i][1] && t > cues[i][0]) {
                lights[cues[i][2] - 1] = [cues[i][3], cues[i][4]];
                // console.log(lights);
            }
        }
        if (t + 50 > 200 * (times.length - 1)) {
            scrubber = 50;
            t = 0;
            pause = true;
            context.close()
        }
    }
}, 10);