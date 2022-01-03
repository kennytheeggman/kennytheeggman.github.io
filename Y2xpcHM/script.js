// Global Variables
var height = 0, width = 0, heightavg = 0, widthavg = 0, modalthresholds = [];                       // Variables for modal exit point thresholds
var flag = true;                                                                                    // Allow modal open flag (false when clicking copy button)

var urlname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')+1);   // Path to index.html URI
var elementArr = document.getElementsByClassName("clip");                                           // Array of all clip elements
// Function Declaration
function exit_modal(){
    document.getElementById("modal").style.display = "none";                                        // Sets modal to invisible
    document.querySelector(".player").pause();                                                      // Pause player
}
function open_modal(videosrc) {
    if (flag) {
        document.querySelector(".player").setAttribute("src", videosrc);                            // Set player source to be clipped video
        setTimeout(() => {                                                                          // This only works after a 10 millisecond delay
            document.getElementById("modal").style.display = "flex"; 
            document.querySelector(".player").play();
        }, 10);
    }
}
function copy(videosrc) {
    var urlstring = "https://kennytheeggman.github.io/" + urlname + escape(videosrc);               // Add github prefix and path to clip suffix
    navigator.clipboard.writeText(urlstring);                                                       // Write URL to clipboard
    set_flag();                                                                                     // When copying, set open modal flag to be false
}
function set_flag() { flag = false; }
function unset_flag() { flag = true; }
function add_clip(videosrc, date, clipname) {
    var datestr = date.slice(0, 4) + "/" + date.slice(4, 6) + "/" + date.slice(6);
    var content = document.getElementById("content-wrapper");                                       // Find content wrapper HTML DOM
        var clipel = document.createElement("ul");                                                  // Create UL Element
        content.appendChild(clipel);
            var video = document.createElement("video");                                            // Create video element, child of UL
            clipel.appendChild(video);
            var p1 = document.createElement("p");                                                   // Create paragraph element, child of UL
            clipel.appendChild(p1);                                                 
            var p2 = document.createElement("p");                                                   // Create paragraph element, child of UL
            clipel.appendChild(p2);
            var button = document.createElement("button");                                          // Create button element, child of UL
            clipel.appendChild(button);
                var buttonicon = document.createElement("img");                                     // Create img element, child of button
                button.appendChild(buttonicon);
    clipel.setAttribute("class", "clip");                                                           // Set clip methods
    clipel.setAttribute("onclick", "open_modal('" + videosrc + "')");
    p1.innerHTML = clipname;                                                                        // Set paragraph content
    p2.setAttribute("class", "date");                                                               // Set date attributes
    p2.innerHTML = datestr;
    video.setAttribute("src", videosrc);                                                            // Set video attributes
    video.setAttribute("width", "300");
    video.setAttribute("height", "168");
    button.setAttribute("onclick", "copy('" + videosrc + "')");                                     // Set button methods
    button.setAttribute("onmouseleave", "unset_flag()");                                            
    buttonicon.src = "copybutton.svg";                                                              // Set button icon
}
// Initialize Site
document.getElementById("modal").style.display = "none";                                            // Set modal to be invisible at site intialization        
for (var i = clips.length - 1; i >= 0; i--) {
    add_clip(clips[i][0], clips[i][1], clips[i][2]);
}
// Continuous Scripts
setInterval(() => {                                                                                 // Recalculate modal thresholds in case of window resize
    height = window.innerHeight, width = window.innerWidth;
    heightavg = (window.innerHeight - 562) / 2, widthavg = (window.innerWidth - 1000) / 2;
    modalthresholds = [heightavg, height - heightavg, widthavg, width - widthavg]
}, 60);
document.addEventListener("click", function(e) {                                                    //  When modal is active
    if ((document.getElementById("modal").style.display === "flex") && (                            // If click is outside modal_window
        e.pageY < modalthresholds[0] || e.pageY > modalthresholds[1] ||
        e.pageX < modalthresholds[2] || e.pageX > modalthresholds[3])) {
            exit_modal();                                                                           // Exit modal
    }
});
document.addEventListener("keypress", (e) => {
    if ((document.getElementById("modal").style.display === "flex") && (e.keyCode == 27)) {         // Exit modal if escape is pressed
        exit_modal();
    }
})