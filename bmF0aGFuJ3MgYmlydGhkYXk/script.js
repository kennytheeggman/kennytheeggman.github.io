const meta = [
    ["Gwyneth Barnes", 7, 6, 1, "Althouse"],
    ["Wells Burnfield-Wiebe", 5, 15, 10, "Althouse"],
    ["Mia Cadsby", 3, 6, 4, "Althouse"],
    ["Matthew Chen", 7, 3, 3, "Althouse"],
    ["Stephanie Cheng", 9, 5, 8, "Althouse"],
    ["Owen Choy", 4, 4, 9, "Althouse"],
    ["Mysha Gilani", 5, 6, 9, "Althouse"],
    ["Sarah Hamdi", 5, 5, 1, "Althouse"],
    ["Julia Huang", 5, 5, 8, "Althouse"],
    ["Edie Huo", 4, 3, 5, "Althouse"],
    ["Saachi Jain", 6, 4, 4, "Althouse"],
    ["Ramil Jiwani", 5, 6, 6, "Althouse"],
    ["Angad Khattra", 5, 7, 3, "Althouse"],
    ["Rafael Khaykin", 6, 7, 5, "Althouse"],
    ["Louis L'ahelec", 5, 8, 9, "Althouse"],
    ["David Lee", 5, 3, 4, "Althouse"],
    ["Akshita Nath", 7, 4, 8, "Althouse"],
    ["Caylee Pan", 6, 3, 2, "Althouse"],
    ["Iris Park", 4, 4, 5, "Althouse"],
    ["Andrei Petrut", 6, 6, 3, "Althouse"],
    ["Noam Pringle", 4, 7, 10, "Althouse"],
    ["Amy Qian", 3, 4, 2, "Althouse"],
    ["Stephen Tang", 7, 4, 4, "Althouse"],
    ["Bea Tierney", 3, 7, 1, "Althouse"],
    ["Violette Wu", 8, 2, 9, "Althouse"],
    ["Jessica Yi", 7, 2, 8, "Althouse"],
    ["Julian Zhang", 6, 5, 4, "Althouse"],
    ["Jacob Bifolchi", 5, 8, 2, "Cody"],
    ["Charles Binnie", 7, 6, 10, "Cody"],
    ["Gianna Fung", 6, 4, 5, "Cody"],
    ["Leyan He", 5, 2, 2, "Cody"],
    ["Kenny Huang", 5, 5, 4, "Cody"],
    ["Raihan Ibnsharif", 6, 6, "Cody"],
    ["Nameer Issani", 6, 6, 9, "Cody"],
    ["Anthony Javornik", 7, 8, 10, "Cody"],
    ["John Jiang", 4, 5, 4, "Cody"],
    ["Ashwin Krishan", 6, 7, 3, "Cody"],
    ["Tianyi Li", 6, 2, 8, "Cody"],
    ["Olivia Markow", 6, 6, 2, "Cody"],
    ["Halley Martynov", 6, 8, 2, "Cody"],
    ["Eleanora Melkonian", 8, 9, 2, "Cody"],
    ["Siddhesh Mittra", 8, 6, 3, "Cody"],
    ["Tiffany Mok", 7, 3, 3, "Cody"],
    ["Preanka Narenthiren", 7, 11, 2, "Cody"],
    ["Nicola Phillips", 6, 8, 2, "Cody"],
    ["Oliad Rundassa", 5, 8, 7, "Cody"],
    ["Moineau Shin-Binon", 7, 10, 7, "Cody"],
    ["Eden Silverberg", 4, 10, 10, "Cody"],
    ["Kaveen Sivakumaran", 6, 11, 5, "Cody"],
    ["Sophia Smith", 6, 5, 4, "Cody"],
    ["Anika Thayaparen", 5, 10, 2, "Cody"],
    ["Sophia Wang", 6, 4, 3, "Cody"],
    ["Michael Wei", 7, 3, 3, "Cody"],
    ["Lauren Weintraub", 6, 9, 10, "Cody"],
    ["Ethan Wu", 5, 2, 4, "Cody"],
    ["Allen Yang", 5, 4, 3, "Cody"],
    ["Thomas Yang", 6, 4, 4, "Cody"],
    ["Julian Bauer-Kong", 6, 10, 7, "Crawford"],
    ["Blake Bissell", 5, 7, 2, "Crawford"],
    ["Graham Chapman", 6, 7, 10, "Crawford"],
    ["William Chiu", 7, 4, 5, "Crawford"],
    ["Trinity Chung", 7, 5, 7, "Crawford"],
    ["Sofia Finelli", 5, 7, 8, "Crawford"],
    ["Jason Fu", 5, 2, 7, "Crawford"],
    ["Olivia Hainsworth", 6, 10, 2, "Crawford"],
    ["Liana Jia", 5, 3, 3, "Crawford"],
    ["Anikah Kalam-Chowdhury", 6, 15, 2, "Crawford"],
    ["Grace Ko", 5, 2, 1, "Crawford"],
    ["Olivia Li Ngan Sun", 6, 11, 3, "Crawford"],
    ["Brandon Ling", 7, 4, 4, "Crawford"],
    ["Zara Mamdani", 4, 7, 9, "Crawford"],
    ["Aahil Noor Ali", 5, 8, 9, "Crawford"],
    ["Pranav Reddy", 6, 5, 5, "Crawford"],
    ["Amy Seglins", 3, 7, 9, "Crawford"],
    ["Evelyn Seiden", 6, 6, 4, "Crawford"],
    ["Archie Shou", 6, 4, 5, "Crawford"],
    ["Emma Syme", 4, 4, 9, "Crawford"],
    ["Sherry Tse", 6, 3, 8, "Crawford"],
    ["Amrita Veeraragavan", 6, 12, 1, "Crawford"],
    ["Aiden Wang", 5, 4, 8, "Crawford"],
    ["Jaime Wang", 5, 4, 2, "Crawford"],
    ["Nathan Wang", 6, 4, 4, "Crawford"],
    ["Lauren Willson", 6, 7, 8, "Crawford"],
    ["Emily Xia", 5, 3, 8, "Crawford"],
    ["Kallie Zhang", 6, 5, 5, "Crawford"],
    ["Alina Zhao", 5, 4, 9, "Crawford"],
    ["Liyad Ahmed", 5, 5, 5, "Lewis"],
    ["Layla Al-Ani", 5, 6, 1, "Lewis"],
    ["Aidan Cheng", 5, 5, 3, "Lewis"],
    ["Alexandra Cole", 9, 4, 10, "Lewis"],
    ["Finn Connell", 4, 7, 2, "Lewis"],
    ["Kevin Guo", 5, 3, 3, "Lewis"],
    ["Celena Guo", 6, 3, 4, "Lewis"],
    ["John Hu", 4, 2, 3, "Lewis"],
    ["Hugo Ip", 4, 2, 3, "Lewis"],
    ["Rohan Jain", 5, 4, 7, "Lewis"],
    ["Jacob Jaskolka", 5, 8, 10, "Lewis"],
    ["Sabina Joneja", 6, 6, 4, "Lewis"],
    ["Andrew Karanicolas", 6, 11, 10, "Lewis"],
    ["Amy Kim", 3, 3, 4, "Lewis"],
    ["Rohit Koneru", 5, 6, 5, "Lewis"],
    ["Carina Lai", 6, 3, 8, "Lewis"],
    ["Zora Lakhera", 4, 7, 9, "Lewis"],
    ["Cindy Li", 5, 2, 2, "Lewis"],
    ["Allen Lian", 5, 4, 7, "Lewis"],
    ["Julia Plotkin", 5, 7, 9, "Lewis"],
    ["Jasmine Ren", 7, 3, 1, "Lewis"],
    ["Eshaal Sajid", 6, 5, 8, "Lewis"],
    ["Sarah Ann Siller", 9, 6, 9, "Lewis"],
    ["Avielle Spector-Bloch", 7, 13, 2, "Lewis"],
    ["Gabriel Tian", 7, 4, 4, "Lewis"],
    ["Edwin Wang", 5, 4, 5, "Lewis"],
    ["Matthew Wong", 7, 4, 4, "Lewis"],
    ["Nicole Wong", 6, 4, 3, "Lewis"],
    ["Jeffery Zhang", 7, 5, 4, "Lewis"],
    ["Karen Zhang", 5, 5, 2, "Lewis"],
    ["William Zhou", 7, 4, 5, "Lewis"]
];

// add a guess to the ui
function add_guess_ui(name, first_name_length, last_name_length, east_west, house) {
    let table = document.getElementById("guesstable");
    let row = document.createElement("tr");
    let htmls = [name, first_name_length, last_name_length, east_west, house];

    for (let i = 0; i < 5; i++) {
        let el = document.createElement("td");
        el.innerHTML = htmls[i];
        row.appendChild(el);
    }
    table.appendChild(row);
}

// keep track of guesses
const total_guesses = 10;
var remaining_guesses = total_guesses;

// change guess number in ui
function decrement_guesses() {
    remaining_guesses--;
    document.getElementById("button").setAttribute("value", "Guess (" + (total_guesses - remaining_guesses) + "/" + total_guesses + ")");
}

// choose a person to be the answer
function get_random_person() {
    const randomElement = meta[Math.floor(Math.random() * meta.length)];
    return randomElement;
}

// compare a person to the answer
function compare_to_person(base, comp) {
    let comparison = ["", "", "", "", (base[1] == comp[1] && base[2] == comp[2] && base[3] == comp[3] && base[4] == comp[4])];
    comparison[0] = (base[1] > comp[1]) ? "Longer" : (base[1] < comp[1]) ? "Shorter" : "Correct";
    comparison[1] = (base[2] > comp[2]) ? "Longer" : (base[2] < comp[2]) ? "Shorter" : "Correct";
    comparison[2] = (base[3] > comp[3]) ? "More West" : (base[3] < comp[3]) ? "More East" : "About Right";
    comparison[3] = (base[4] == comp[4]) ? "Correct" : "Incorrect";

    return comparison;
}

// search for a person by name in an array of people
function search_person(name, array) {
    for (let i = 0; i < array.length; i++) {
        if (name == array[i][0]) {
            return array[i];
        }
    }
    return -1;
}

// use fuzzy searching for candidates
function fuzzy_search_candidates(name) {
    let candidates = [];
    for (let i = 0; i < meta.length; i++) {
        let potential = meta[i][0];
        let name_pointer = 0;
        for (let j = 0; j < potential.length; j++) {
            if (name_pointer == name.length) {
                break;
            }
            if (name[name_pointer].toUpperCase() == potential[j].toUpperCase()) {
                name_pointer++;
            }
        }
        if (name_pointer == name.length) {
            candidates.push(potential);
        }
    }
    return candidates;
}

// person and guesses so far
const chosen_person = get_random_person();
let guesses = [];

// main game logic
function handle_guess(guess) {
    document.getElementById("input").value = "";
    // search for person
    const guess_person = search_person(guess, meta);
    // if person does not exist or is already guessed, end function
    if (guess_person == -1) return;
    if (search_person(guess, guesses) != -1) return;

    // add update guesses
    guesses.push(guess_person);
    let comparison = compare_to_person(chosen_person, guess_person);
    add_guess_ui(guess, comparison[0], comparison[1], comparison[2], comparison[3]);

    // if solved, handle solved
    if (comparison[4]) handle_solved();

    // otherwise, decrement the remaining guesses
    decrement_guesses();
    // if remaining guesses is 0 after decrementing, handle game over
    if (remaining_guesses == 0) handle_game_over();
}

// show solved modal
function handle_solved() {
    document.getElementById("end").innerHTML = "Solved!";
    document.getElementById("answer").innerHTML = "The answer was: " + chosen_person[0];
    document.getElementById("gameend").showModal();
    document.getElementById("gameend").style.display = "flex";
}

// show game over modal
function handle_game_over() {
    document.getElementById("end").innerHTML = "Game Over!";
    document.getElementById("answer").innerHTML = "The answer was: " + chosen_person[0];
    document.getElementById("gameend").showModal();
    document.getElementById("gameend").style.display = "flex";
}

// restart game
function restart_game() {
    location.reload();
}

// changes the value in the input to the value of the search
function handle_search_click(e) {
    let name = e.target.innerHTML;
    document.getElementById("input").value = name;
    update_candidates();
}

// update candidates in the search
function update_candidates() {
    document.getElementById("fuzzy").innerHTML = "";
    let so_far = document.getElementById("input").value;
    if (so_far == "") {
        return;
    }
    let candidates = fuzzy_search_candidates(so_far);
    for (let i = 0; i < candidates.length; i++) {
        let el = document.createElement("p");
        el.innerHTML = candidates[i];
        el.addEventListener("click", handle_search_click);
        document.getElementById("fuzzy").appendChild(el);
    }
}

// event listeners for guesses and restarting
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handle_guess(document.getElementById("input").value);
    }
    setTimeout(update_candidates, 100);
});
document.getElementById("button").addEventListener("click", () => {
    handle_guess(document.getElementById("input").value);
    update_candidates();
});
document.getElementById("restart").addEventListener("click", restart_game);

// initialize guesses on UI
remaining_guesses++;
decrement_guesses();

// TODO: add hints