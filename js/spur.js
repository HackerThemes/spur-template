$(document).ready(function(){
    $(".dash-nav-dropdown-toggle").click(function(){
        $(this).closest(".dash-nav-dropdown")
            .toggleClass("show")
            .find(".dash-nav-dropdown")
            .removeClass("show");
    });
});
