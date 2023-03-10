//!-----Experience Needed Calculation-----!//
/** 
 * Gets the experience values needed at each cookie level and saves it in 'exp'
 */
var exp;
fetch("data/exp.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => { exp = data; });

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
        $("#calculationResult").text("Improper Input Detected.")
        return false;
    }
    
    if (expNeeded < 0) {
        $("#calculationResult").text("Improper Current Experience.")
        return false;
    }

    $("#calculationResult").text("Experience Required: " + expNeeded.toLocaleString("en"));
}

//!-----Candy Houses-----!//
/** 
 * Gets the information of cookie houses at each of their levels
 * dynamically updates cookieHouseTable with the cookie house data
 */
fetch("data/cookieHouses.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => {
        $.each(data, function(key, item) {
            $("#cookieHouseTable > tbody").append("\
                <tr>\
                    <td>" + key + "</td>\
                    <td>" + item[0] + "</td>\
                    <td>" + item[1] + "</td>\
                </tr>"
            )
        });
    });

//!-----Candy Count-----!//
/** 
 * Gets the experience values given by each candy at each research level
 * and then creates an informational table about the increase at each level
 */
var candy;
fetch("data/expPerJelly.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => {
        candy = data;
        createTastierJellyTable();
    });

/** 
 * Limit the values for each level of candy to only positive numbers. Then
 * calculate the total based on those values
 */
$(".candyCount").on("change", function() {
    var minCount = 0;
    this.value.replace("\\D+\g", "");

    if (this.value < minCount || this.value == "") { this.value = 0; }

    calculateTotalCandy();
})

/** 
 * When the user changes their level of research recalculate the total experience
 */
$("#tastierJellyResearchLevel").on("change", function() {
    calculateTotalCandy();
})

/** 
 * Calculate the total experience the user has given the amount of 
 * candy at each level and add them together giving the total experience 
 * of all candy
 */
function calculateTotalCandy() {
    var researchLevel = $("#tastierJellyResearchLevel").val();
    var totalExperience = 0;

    $(".candyCount").each(function() {
        var currentCandy = $(this);
        var candyValue = candy[currentCandy.data("candylevel")][researchLevel];

        totalExperience += currentCandy.val() * candyValue;
    })
    
    var totalString = (totalExperience > 100000000000000) ? 
            totalString = " Over 100 Billion" :
            totalString = totalExperience.toLocaleString("en");
    $("#totalCandyResult").text("Experience In Candy: " + totalString);
}

//!-----Tastier Jelly Research effect on candy exp----!//
/** 
 * Dynamically fill in a table containing the information about the exp of each 
 * level of candy at each level of tastier jelly research
 */
function createTastierJellyTable() {
    $.each(candy, function(key, item) {
        $("#tastierJellyTable > tbody").append("\
            <tr>\
                <td>" + key     + "</td>\
                <td>" + item[0] + "</td>\
                <td>" + item[1] + "</td>\
                <td>" + item[2] + "</td>\
                <td>" + item[3] + "</td>\
                <td>" + item[4] + "</td>\
                <td>" + item[5] + "</td>\
            </tr>"
        )
    })
}