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

    for (
        var i = parseInt($("#startingSkillLevel").val() + 1);
        i < parseInt($("#endingSkillLevel").val());
        i++
        ) {
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


    // calculate the max powder needed
    // $.each(powderInfo, function(key, item) {
    //     if (parseInt($("#startingSkillLevel").val()) <= parseInt(key)) {
    //         if (parseInt($("#endingSkillLevel").val()) >= parseInt(key)) {
    //             console.log(key + " : " + item);
    //             var slot;
    //             if (item[2] == "regular") {
    //                 slot = 0;
    //             } else if (item[2] == "refined") {
    //                 slot = 1;
    //             } else if (item[2] == "pristine") {
    //                 slot = 2;
    //             }

    //             powderNeed[slot][1] += item[1];
    //         }
    //     }
    // })

    $.each(powderNeed, function() {
        $("#"+this[0]).text((this[1] < 0) ? 0 : this[1]);
    })
}