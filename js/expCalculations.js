//*-----Experience Needed Calculation-----*//
/** 
 * Gets the experience values needed at each cookie level and saves it in 'exp'
 */
var exp;
fetch("data/exp.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => {
        exp = data;
    });

/** 
 * When cookie information (level) is changed check to make sure it
 * is in bounds of the game. if it is then adjust calculations
 */
$(".cookieInfo").on("change", function() {
    var maxLevel = 70;
    var minLevel = 1;

    if (this.value > maxLevel) { this.value = maxLevel; }
    if (this.value < minLevel) { this.value = minLevel; }

    calculateExperience();
})

/** 
 * When cookie information (experience) is changed check to make sure it is
 * in bounds of the game. if it is then adjust calculations
 */
$("#currentExperience").on("change", function() {
    var maxExp = 8938600;
    var minExp = 0;

    if (this.value > maxExp) { this.value = maxExp; }
    if (this.value < minExp + 1) { this.value = minExp; }

    calculateExperience();
})

/** 
 * Get the user provided information and using the retrieved json determine how
 * much experience is needed until the cookie reaches the retrieved target level
 */
function calculateExperience() {
    var startLevel = parseInt($("#startingCookieLevel").val());
    var endLevel = parseInt($("#endingCookieLevel").val());
    var expNeeded = -parseInt($("#currentExperience").val());

    for (let virtualLevel = startLevel; virtualLevel < endLevel; virtualLevel++) {
        expNeeded += exp[virtualLevel + 1];
    }

    if (startLevel >= endLevel) {
        $("#calculationResult").text("Improper Input Detected.\n Please Try Again.")
        return false;
    }
    
    if (expNeeded < 0) {
        $("#calculationResult").text("Current Experience Exceeds Needed Experience.\n Please Try Again.")
        return false;
    }

    $("#calculationResult").text("Experience Points Needed: " + expNeeded.toLocaleString("en"));
}

//*-----Candy Count-----*//
$(".candyCount").on("change", function() {
    var minCount = 0;
    this.value.replace("\\D+\g", "")

    if (this.value < minCount || this.value == "") { this.value = 0; }
})