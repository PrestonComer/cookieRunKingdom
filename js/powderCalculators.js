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
    var powderNeed = [
        ["basicPowderNeed", -$("#basicPowderHave").val()],
        ["refinedPowderNeed", -$("#refinedPowderHave").val()],
        ["pristinePowderNeed", -$("#pristinePowderHave").val()]
    ];

    // calculate the max powder needed
    $.each(powderInfo, function(key, item) {
        if ($("#startingSkillLevel").val() <= key) {
            if ($("#endingSkillLevel").val() >= key) {
                var slot;
                if (item[2] == "regular") {
                    slot = 0;
                } else if (item[2] == "refined") {
                    slot = 1;
                } else if (item[2] == "pristine") {
                    slot = 2;
                }

                powderNeed[slot][1] += item[1];

                console.log("slot: " + slot);
                console.log("item[2]: " + item[2]);
                console.log(powderNeed[0]);
                console.log(powderNeed[1]);
                console.log(powderNeed[2]);
                console.log("\n");
            }
        }
    })

    $.each(powderNeed, function() {
        $("#"+this[0]).text((this[1] < 0) ? 0 : this[1]);
    })
}