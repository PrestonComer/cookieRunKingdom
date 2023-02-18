//!-----Create skill powder at each level table-----!//
var powderInfo;
fetch("data/skillPowder.json", {mode: "no-cors"})
    .then(res => res.json())
    .then(data => {
        powderInfo = data;
        createSkillPowderTable();
        calculatePowder();
    });

/** 
 * Dynamically create a table where each row after header
 * is a skill level with the information of what is needed to get
 * from the prior level to itself
 */
function createSkillPowderTable() {
    var desiredTable = "1";

    $.each(powderInfo, function(key, item) {
        combindItem = item[1] + " " + item[2];

        if (key > 24) {
            desiredTable = "2";

            if (key > 47) {
                desiredTable = "3";
            }
        }

        $("#skillPowderTable td#powderTable" + desiredTable + " > table > tbody").append("\
            <tr>\
                <td>" + key + "</td>\
                <td>" + combindItem + "</td>\
            </tr>"
        );
    })
}

/** 
 * Put bounds on the powder number input while also updating the 
 * powder needed.
 */
$("#skillPowderCalculator input").on("change", function() {
    if (this.value < 0) { this.value = 0; }

    var startLvl = $("#startingSkillLevel");
    var endLvl = $("#endingSkillLevel");
    if (startLvl.val() >= endLvl.val()) { startLvl.val(endLvl.val() - 1)}
    if (startLvl.val() < 1) { startLvl.val(1); }
    if (endLvl.val() < 2) { endLvl.val(2); }
    if (startLvl.val() > 70) { startLvl.val(70); }
    if (endLvl.val() > 70) { endLvl.val(70); }

    calculatePowder();
})

function calculatePowder() {
    var startLvl = parseInt($("#startingSkillLevel").val());
    var endLvl = parseInt($("#endingSkillLevel").val());
    var powderNeed = [
        ["basicPowderNeed", -$("#basicPowderHave").val()],
        ["refinedPowderNeed", -$("#refinedPowderHave").val()],
        ["pristinePowderNeed", -$("#pristinePowderHave").val()]
    ];

    for (var i =  startLvl + 1; i < endLvl + 1; i++) {
            var powderType = powderInfo[i][2];
            var powderCount = powderInfo[i][1];
            if (powderType == "regular") {
                powderNeed[0][1] += powderCount;
            } else if (powderType == "refined") {
                powderNeed[1][1] += powderCount;
            } else if (powderType == "pristine") {
                powderNeed[2][1] += powderCount;
            }
        }

    $.each(powderNeed, function() {
        $("#"+this[0]).text((this[1] < 0) ? 0 : this[1]);
    })
}