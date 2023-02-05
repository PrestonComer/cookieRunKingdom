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
 * is in bounds of the game
 */
$(".cookieInfo").on("change", function() {
    var maxLevel = 70;
    var minLevel = 1;

    if (this.value > maxLevel) { this.value = maxLevel; }
    if (this.value < minLevel) { this.value = minLevel; }
})

/** 
 * When cookie information (experience) is changed check to make sure it is
 * in bounds of the game
 */
$("#currentExperience").on("change", function() {
    var maxExp = 8938600;
    var minExp = 0;

    if (this.value > maxExp) { this.value = maxExp; }
    if (this.value < minExp + 1) { this.value = minExp; }
})

/** 
 * Get the user provided information and using the retrieved json determine how
 * much experience is needed until the cookie reaches the retrieved target level
 */
$("#calculateExperience").on("click", function() {
    var startLevel = parseInt($("#startingCookieLevel").val());
    var endLevel = parseInt($("#endingCookieLevel").val());
    var expNeeded = -parseInt($("#currentExperience").val());

    for (let virtualLevel = startLevel; virtualLevel < endLevel; virtualLevel++) {
        expNeeded += exp[virtualLevel + 1];
    }

    if (startLevel >= endLevel || (expNeeded < 0)) {
        $("#calculationResult").text("Improper input detected.\n Please try again.")
        return false;
    }

    $("#calculationResult").text("Experience Points Needed: " + expNeeded.toLocaleString("en"));
})

/**
 * Iterates through the main pages and hide them all
 */
function hideAllPages() {
    $(".mainPage").each(function() {
        $(this).hide();
    });
}

/**
 * Attach the click event to navigation links to hide all
 * pages then show the one that matches the link pressed
 */
$('aside.sidebar__sidebar > a').on("click", function() {
    hideAllPages();
    // show the page of the link clicked on
    $(this.dataset.target).show();
})