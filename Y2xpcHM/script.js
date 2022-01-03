// Global Variables
var height, width, heightavg, widthavg, modalthresholds;                       // Variables for modal exit point thresholds
var flag = true;                                                                                    // Allow modal open flag (false when clicking copy button)
var urlname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')+1);   // Path to index.html URI
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
    navigator.clipboard.writeText("https://kennytheeggman.github.io/Y2xpcHM/" + escape(videosrc));  // Write URL to clipboard
    set_flag(false);                                                                                // When copying, set open modal flag to be false
}
function set_flag(val) { flag = val; }
function add_clip(videosrc, date, clipname) {
    var datestr = date.slice(0, 4) + "/" + date.slice(4, 6) + "/" + date.slice(6);
    var content = document.getElementById("content-wrapper");                                       // Find content wrapper HTML DOM
        var clipel = document.createElement("ul");                                                  // Create UL Element
        content.appendChild(clipel);
            var video = document.createElement("video");                                            // Create video element, child of UL
            clipel.appendChild(video);
            var p1 = document.createElement("p");                                                   // Create paragraph element, child of UL
            clipel.appendChild(p1);                                                 
            var date = document.createElement("p");                                                 // Create paragraph element, child of UL
            clipel.appendChild(date);
            var button = document.createElement("button");                                          // Create button element, child of UL
            clipel.appendChild(button);
                var icon = document.createElement("img");                                           // Create img element, child of button
                button.appendChild(icon);
    clipel.setAttribute("class", "clip");                                                           // Set clip methods
    clipel.setAttribute("onclick", "open_modal('" + videosrc + "')");
    p1.innerHTML = clipname;                                                                        // Set paragraph content
    date.setAttribute("class", "date");                                                             // Set date attributes
    date.innerHTML = datestr;
    video.setAttribute("src", videosrc);                                                            // Set video attributes
    video.setAttribute("width", "300");
    video.setAttribute("height", "168");
    button.setAttribute("onclick", "copy('" + videosrc + "')");                                     // Set button methods
    button.setAttribute("onmouseleave", "set_flag(true)");
    icon.src = "copybutton.svg";                                                                    // Set button icon
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
        e.clientY < modalthresholds[0] || e.clientY > modalthresholds[1] ||
        e.clientX < modalthresholds[2] || e.clientX > modalthresholds[3])) {
            exit_modal();                                                                           // Exit modal
    }
});