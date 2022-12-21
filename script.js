
document.querySelector("video").paused=true

let ticker = 0

let unhide = () => {
    ticker ++;
    display()
}

let display = () => {
    elements[ticker].style.opacity = 1;
    elements[ticker].style.transform = "scale(1)";
    if (ticker == 17) {
        document.querySelector("video").style.display = "block"
    }
    if (ticker == 18) {
        document.querySelector("video").paused = false
    }
}

let elements =[]
for (let i = 1; i < 20; i++) {
    let element = document.getElementById(i + "")
    element.onclick = unhide
    elements.push(element)
}
console.log(elements)

for (element of elements) {
    element.style.opacity = 0;
}

elements[0].style.opacity = 1;