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
    if (startLvl.val() > 70) { startLvl.val(70); }
    if (endLvl.val() > 70) { endLvl.val(70); }

    calculatePowder();
})

function calculatePowder() {
    var powderNeed = [
        [$("#basicPowderNeed"), -$("#basicPowderHave").val()],
        [$("#refinedPowderNeed"), -$("#refinedPowderHave").val()],
        [$("#pristinePowderNeed"), -$("#pristinePowderHave").val()]
    ];

    // calculate the max powder needed
    $.each(powderInfo, function(key, item) {
        console.log("key: " + key + "\n" + "item: " + item);
        if ($("#startingSkillLevel") < key &&
            $("#endingSkillLevel") > key) {
            // if item[2] is basic then 0 else if its refined then 1 else its 2
            var slot = (item[2] == "basic") ? 0 :(item[2] == "refined") ? 1 : 2;

            powderNeed[slot][1] += item[2];
        }
    })

    $.each(powderNeed, function(target, need) {
        target.text = (need < 0) ? 0 : need;
    })
}