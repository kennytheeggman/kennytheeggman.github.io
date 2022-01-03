// Global Variables
var height, width, modalthresholds;                                                                 // Variables for modal exit point thresholds
var flag = true;                                                                                    // Allow modal open flag (false when clicking copy button)
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
        var clipel = document.createElement("ul");          content.appendChild(clipel);            // Create UL Element
            var video = document.createElement("video");    clipel.appendChild(video);              // Create video element, child of UL
            var p1 = document.createElement("p");           clipel.appendChild(p1);                 // Create paragraph element, child of UL
            var date = document.createElement("p");         clipel.appendChild(date);               // Create paragraph element, child of UL
            var button = document.createElement("button");  clipel.appendChild(button);             // Create button element, child of UL
                var icon = document.createElement("img");   button.appendChild(icon);               // Create img element, child of button
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
    modalthresholds = [width / 2 - 500, width / 2 + 500, height / 2 - 281, height / 2 + 281];
}, 60);
document.addEventListener("click", function(e) {                                                    // When modal is active
    if ((document.getElementById("modal").style.display === "flex") && (                            // If click is outside modal_window
        e.clientX < modalthresholds[0] - 10 || e.clientX > modalthresholds[1] + 10 ||               // Margin buffer increase
        e.clientY < modalthresholds[2] - 10 || e.clientY > modalthresholds[3] + 10 )) {
            exit_modal();                                                                           // Exit modal
    }
});