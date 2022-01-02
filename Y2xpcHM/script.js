var elementArr = document.getElementsByClassName("clip");
for (var i = 0; i < elementArr.length; i++) {
    var videosource = elementArr[i].childNodes[1].childNodes[1].getAttribute("src");
    elementArr[i].childNodes[1].setAttribute("href", videosource);
}