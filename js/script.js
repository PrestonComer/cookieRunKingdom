$.getJSON("../data/exp.json", function(data) {
    $("body").append(data);
})

$(".cookieInfo").on("change", function() {
    if (this.value > 70) {
        this.value = 70;
    }
    if (this.value < 1) {
        this.value = 1;
    }
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