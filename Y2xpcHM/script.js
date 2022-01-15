// Global Variables
var height, width, modalthresholds;                                                                 // Variables for modal exit point thresholds
var flag = true;                                                                                    // Allow modal open flag (false when clicking copy button)
// Function Declaration
function exit_modal() {
    document.getElementById("modal").style.display = "none";                                        // Sets modal to invisible
    document.querySelector(".player").pause();                                                      // Pause player
}
function open_modal(src) {
    if (flag) {
        document.querySelector(".player").setAttribute("src", src);                                 // Set player source to be clipped video
        setTimeout(() => {                                                                          // This only works after a 10 millisecond delay
            document.getElementById("modal").style.display = "flex"; 
            document.querySelector(".player").play();
        }, 10);
    }
}
function copy(src) {
    navigator.clipboard.writeText("https://kennytheeggman.github.io/Y2xpcHM/" + escape(src));       // Write URL to clipboard
    set_flag(false);                                                                                // When copying, set open modal flag to be false
}
function set_flag(val) { flag = val; }
function add_clip(src, time, name, thumbnailsrc) {
    console.log(thumbnailsrc);
    var timestr = time.slice(0, 4) + "/" + time.slice(4, 6) + "/" + time.slice(6);
    var content = document.getElementById("content-wrapper");                                       // Find content wrapper HTML DOM
        var clipel = document.createElement("ul");          content.appendChild(clipel);            // Create UL Element
            var thumbnail = document.createElement("img");  clipel.appendChild(thumbnail);          // Create video element, child of UL
            var p1 = document.createElement("p");           clipel.appendChild(p1);                 // Create paragraph element, child of UL
            var date = document.createElement("p");         clipel.appendChild(date);               // Create paragraph element, child of UL
            var button = document.createElement("button");  clipel.appendChild(button);             // Create button element, child of UL
                var icon = document.createElement("img");   button.appendChild(icon);               // Create img element, child of button
    clipel.setAttribute("class", "clip");                                                           // Set clip methods
    clipel.setAttribute("onclick", "open_modal('" + src + "')");
    p1.innerHTML = name;                                                                            // Set paragraph content
    date.setAttribute("class", "date");                                                             // Set date attributes
    date.innerHTML = timestr;
    thumbnail.setAttribute("src", thumbnailsrc);                                                    // Set thumbnail attributes
    thumbnail.setAttribute("class", "video");
    thumbnail.setAttribute("width", "300");
    thumbnail.setAttribute("height", "168");
    button.setAttribute("onclick", "copy('" + src + "')");                                          // Set button methods
    button.setAttribute("onmouseleave", "set_flag(true)");
    icon.setAttribute("class", "icon");
    icon.src = "copybutton.svg";                                                                    // Set button icon
}
// Initialize Site
document.getElementById("modal").style.display = "none";                                            // Set modal to be invisible at site intialization        
for (var i = clips.length - 1; i >= 0; i--) {
    add_clip("Clips/" + clips[i][0], clips[i][1], clips[i][2], "Clips/" + clips[i][3]);
}
// Continuous Scripts
setInterval(() => {                                                                                 // Recalculate modal thresholds in case of window resize
    height = window.innerHeight, width = window.innerWidth;
    modalthresholds = [width / 2 - 500, width / 2 + 500, height / 2 - 281, height / 2 + 281];
}, 60);
document.addEventListener("click", (e) => {                                                    // When modal is active
    if ((document.getElementById("modal").style.display === "flex") && (                            // If click is outside modal_window
        e.clientX < modalthresholds[0] - 10 || e.clientX > modalthresholds[1] + 10 ||               // Margin buffer increase
        e.clientY < modalthresholds[2] - 10 || e.clientY > modalthresholds[3] + 10 )) {
            exit_modal();                                                                           // Exit modal
    }
});