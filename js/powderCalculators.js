//!-----Create skill powder at each level table-----!//
var powderInfo;
fetch("data/skillPowder.json", {mode: "no-cors"})
    .then(res => res.json())
    .then(data => {
        powderInfo = data;
        createSkillPowderTable();
    });

/** 
 * Dynamically create a table where each row after header
 * is a skill level with the information of what is needed to get
 * from the prior level to itself
 */
function createSkillPowderTable() {
    var sT = $("#skillPowderTable > tbody");
    $.each(powderInfo, function(key, item) {
        combindItem = item[1] + " " + item[2];
        sT.append("\
            <tr>\
                <td>" + key + "</td>\
                <td>" + combindItem + "</td>\
            </tr>"
        );
    })
}