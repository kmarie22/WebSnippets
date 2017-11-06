/*global $ */
$(document).ready(function () {

	$('.search_content').append('<div class="btnforessponsive"><i class="fa fa-th-large" aria-hidden="true"></i></div>');
	$('.btnforessponsive').click( function(){
	    $('.search_navigation_zone').toggle('slide', { direction: 'left' }, 1000);
	});

    // Set copyright 
    $(".copyright").append( "&#169; " + new Date().getFullYear() + " Teradata. All rights reserved.");

    "use strict";

    $('.navigation > li:has( > ul)').addClass('menu-dropdown-icon');
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI


    $('.navigation > li > ul:not(:has(ul))').addClass('normal-sub');
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

    //$(".navigation").before("<a href=\"#\" class=\"menu-mobile\">Navigation</a>");

    //Adds menu-mobile class (for mobile toggle menu) before the normal menu
    //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
    //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble

    $(".navigation > li").hover(function (e) {
        if ($(window).width() > 943) {
            $(this).children("ul").stop(true, false).fadeToggle(150);
            e.preventDefault();
        }
    });
    //If width is more than 943px dropdowns are displayed on hover

    $(".navigation > li").click(function () {
        if ($(window).width() <= 768) {
            $(this).children("ul").fadeToggle(150);
            $('.menu-dropdown-icon').toggleClass('minussign')
        }
    });
    //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

    $(".menu-mobile").click(function (e) {
        $(".navigation").toggleClass('show-on-mobile');
        $(".menu-mobile").toggleClass('background')
        e.preventDefault();
    });
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)
    
    $("#AdvancedSearch").change(function() {
        changeAdvancedText();
        console.log("Should change...");
    });
    
    $(function () {
        $('.animated > li').hover(function () {
            $(this).find('div[class^="container-"]').stop().slideDown('fast');
        },
        function () {
            $(this).find('div[class^="container-"]').stop().slideUp('slow');
        });
    });

    $('.selectboxfunction').each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });

    // Video control.
    $('.video').parent().click(function () {
        if($(this).children(".video").get(0).paused){
            $(this).children(".video").get(0).play();
            $(this).children(".playpause").fadeOut();
        }else{
            $(this).children(".video").get(0).pause();
            $(this).children(".playpause").fadeIn();
        }
    });
    
    SP.SOD.executeOrDelayUntilScriptLoaded(loadUserData, "SP.UserProfiles.js");

    // Change select style when text is longer than menu
    $("#selectboxfunction").change(function() {
        // var i = $("#selectboxfunction")[0];
        // var selectedValue = i.options[i.selectedIndex].text;

        // if (selectedValue.length > 20) {
        //     console.log("Bigger: " + $(".content_selectbox_right > select")[0]);
        // } else {
        //     console.log("Smaller: " + $(".content_selectbox_right > select")[0]);
        // }
        console.log("Changed");
    });

    // Set default display template for search hover actions
    SP.SOD.executeFunc("searchui.js", "HP_initialize", function () {
	    HP.CommonActions = "~sitecollection/_catalogs/masterpage/SearchDT/Item_CustomHoverPanel_Actions.js";
        console.log("worked");
	});
});

var userprofileProperties;

function loadUserData() {
    
    // Get the current context.
    var clientContext = new SP.ClientContext.get_current();

    // Get the instance of people manager class.
    var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);

    // Get the properties of the current user.
    userprofileProperties = peopleManager.getMyProperties();

    clientContext.load(userprofileProperties);

    // Execute the query.
    clientContext.executeQueryAsync(onSuccess);
}

function onSuccess() {

    // Current user profile picture URL.
    var userProfilePic = userprofileProperties[1];

    // Assign picture to home page menu.
    $("#userprofile").prepend("<img src='" + userProfilePic + "' />");
}

// Change Advanced Search Text
function changeAdvancedText() {
    $("#AdvancedLink").text("Guided Search");
}