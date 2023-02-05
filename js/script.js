var exp;
fetch("data/exp.json", { mode: "no-cors" })
    .then(res => res.json())
    .then(data => {
        exp = data;
    });

$(".cookieInfo").on("change", function() {
    var maxLevel = 70;
    var minLevel = 1;

    if (this.value > maxLevel) { this.value = maxLevel; }
    if (this.value < minLevel) { this.value = minLevel; }
})

$("#currentExperience").on("change", function() {
    var maxExp = 8938600;
    var minExp = 0;

    if (this.value > maxExp) { this.value = maxExp; }
    if (this.value < minExp + 1) { this.value = minExp; }
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