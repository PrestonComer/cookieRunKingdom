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
 * Put bounds on what level the cookie is starting at and on change update
 * the amount of skill powder needed
 */
$("#startingSkillLevel").on("change", function() {
    var curVal = $(this).val();
    if (curVal < 1) { $(this).val(1); }
    if (curVal > 70) { $(this).val(70); }
    calculatePowder();
})

/** 
 * Put bounds on what level the cookie you want to end at and on change
 * update the amount of skill powder needed
 */
$("#endingSkillLevel").on("change", function() {
    var curVal = $(this).val();
    if (curVal < 2) { $(this).val(2); }
    if (curVal > 70) { $(this).val(70); }
    calculatePowder();
})

/** 
 * Put bounds on the powder number input while also updating the 
 * powder needed.
 */
$("#skillPowderCalculator tr:not(.skillPowderHeader) input").on("change", function() {
    if ($(this).val() < 0) { $(this).val(0); }
    calculatePowder();
})

/** 
 * Go through all the skill levels needed to go from starting cookie skill level 
 * to ending skill level summing them.
 */
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