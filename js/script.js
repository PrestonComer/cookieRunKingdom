var exp;
fetch("data/exp.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => {
        exp = data;
    });

$(".cookieInfo").on("change", function() {
    var maxLevel = 70;
    var minLevel = 1;
    var currentLevel = this.value;

    if (currentLevel > maxLevel) { currentLevel = maxLevel; }
    if (currentLevel < minLevel) { currentLevel = minLevel; }
})

$("#currentExperience").on("change", function() {
    var maxExp = 8938600;
    var minExp = 0;
    var currentExp = this.value;

    if (currentExp > maxExp) { currentExp = maxExp; }
    if (currentExp < minExp) { currentExp = minExp; }
})

$("#calculateExperience").on("click", function() {
    var startLevel = parseInt($("#startingCookieLevel").val());
    var endLevel = parseInt($("#endingCookieLevel").val());
    var expNeeded = -parseInt($("#currentExperience").val());

    for (let virtualLevel = startLevel; virtualLevel < endLevel; virtualLevel++) {
        expNeeded += exp[virtualLevel + 1];
    }

    $("#calculationResult").text("Experience Points Needed: " + expNeeded.toLocaleString("en"));
})