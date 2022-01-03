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
// Initialize Site
document.getElementById("modal").style.display = "none";                                            // Set modal to be invisible at site intialization
for (var i = 0; i < elementArr.length; i++) {                                                       // Loop through all clips
    var videosource = elementArr[i].childNodes[1].childNodes[1].getAttribute("src");                // Get video source
    elementArr[i].childNodes[1].childNodes[7].setAttribute("onclick","copy('" + videosource + "')");// Set copy video source 
    elementArr[i].setAttribute("onclick", "open_modal('" + videosource + "')");                     //  Set modal video source
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
        exit_modal();                                                                               // Exit modal
    }
});