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
    // reset the checkbox header on smaller devices
    $("input#menu-toggle").prop("checked", false).change();
})

/** 
 * 
 */
$("input#menu-toggle").on("change", function() {
    if ($("aside.sidebar__sidebar").hasClass("isMobileSidebar")) {
        $("aside.sidebar__sidebar").removeClass("isMobileSidebar");
    } else {
        $("aside.sidebar__sidebar").addClass("isMobileSidebar");
    }
})