var height = 0;
var width = 0;
var heightavg = 0;
var widthavg = 0;
var modalthresholds = [];
var flag = true;
var urlname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')+1);
document.getElementById("modal").style.display = "none";
var elementArr = document.getElementsByClassName("clip");
setInterval(() => {
    height = window.innerHeight;
    width = window.innerWidth;
    heightavg = (window.innerHeight - 562) / 2;
    widthavg = (window.innerWidth - 1000) / 2;
    modalthresholds = [heightavg, height - heightavg, widthavg, width - widthavg]
}, 60);
for (var i = 0; i < elementArr.length; i++) {
    var videosource = elementArr[i].childNodes[1].childNodes[1].getAttribute("src");
    elementArr[i].childNodes[1].childNodes[7].setAttribute("onclick","copy('" + videosource + "')");   
    elementArr[i].setAttribute("onclick", "open_modal('" + videosource + "')");
}
document.addEventListener("click", function(e) {
    if (document.getElementById("modal").style.display === "flex") {
        if (e.pageX < modalthresholds[2] || e.pageX > modalthresholds[3] || e.pageY < modalthresholds[0] || e.pageY > modalthresholds[1]) {
            exit_modal();
        }
    }
});
function exit_modal(){
    document.getElementById("modal").style.display = "none";
    document.querySelector(".player").pause();
}
function open_modal(videosrc) {
    if (flag) {
        document.querySelector(".player").setAttribute("src", videosrc);
        setTimeout(() => {
            document.getElementById("modal").style.display = "flex";
            document.querySelector(".player").play();
        }, 10);
    }
}


function copy(videosrc) {
    var urlstring = "https://kennytheeggman.github.io/" + urlname + escape(videosrc);
    navigator.clipboard.writeText(urlstring);
    set_flag();
}
function set_flag() {
    flag = false;
}
function unset_flag() {
    flag = true;
}
