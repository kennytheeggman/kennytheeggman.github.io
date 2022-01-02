var height = window.innerHeight;
var flag = true;
var width = window.innerWidth;
var urlname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')+1);
document.getElementById("modal").style.display = "none";
var heightavg = (window.innerHeight - 562) / 2;
var widthavg = (window.innerWidth - 1000) / 2;
var modalthresholds = [heightavg, height - heightavg, widthavg, width - widthavg]
var elementArr = document.getElementsByClassName("clip");
for (var i = 0; i < elementArr.length; i++) {
    var videosource = elementArr[i].childNodes[1].childNodes[1].getAttribute("src");
    console.log(elementArr[i].childNodes[1].childNodes[7].setAttribute("onclick","copy('" + videosource + "')"));   
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
        console.log(videosrc, "open")
        document.querySelector(".player").setAttribute("src", videosrc);
        document.getElementById("modal").style.display = "flex";
        document.querySelector(".player").play();
    }
}


function copy(videosrc) {
    var urlstring = urlname + escape(videosrc);
    console.log(urlstring)
    navigator.clipboard.writeText(urlstring);
    set_flag();
}
function set_flag() {
    flag = false;
}
function unset_flag() {
    flag = true;
}
