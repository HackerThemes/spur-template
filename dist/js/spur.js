/*!
 * Spur - An admin template based on Bootstrap 4
 * Version v0.1.0
 * Copyright 2016 - 2018 Alexander Rechsteiner
 * https://hackerthemes.com
 */

$(document).ready(function(){
    $(".dash-nav-dropdown-toggle").click(function(){
        $(this).closest(".dash-nav-dropdown")
            .toggleClass("show")
            .find(".dash-nav-dropdown")
            .removeClass("show");
    });

    $(".menu-toggle").click(function(){
        $(".dash").toggleClass("dash-compact");

    })

});
