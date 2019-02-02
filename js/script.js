class MySite {

    constructor() {
        this.WrapElements();
        this.stickyUtility();
    }

    WrapElements() {
        jQuery("nav").wrap('<div class="nav-placeholder"></div>');
        jQuery("nav").wrapInner('<div class="nav-inner"></div>');
        jQuery(".nav-inner").wrapInner('<div class="nav-inner-most"></div>');
    }

    stickyUtility() {
        if (!jQuery("nav").hasClass("fixed")) {
            this.navOffset = jQuery("nav").offset().top;
        }
        jQuery(".nav-placeholder").height(jQuery("nav").outerHeight());
    }

    stickyTopBar() {
        let scrollPos = jQuery(window).scrollTop();
        if (scrollPos >= this.navOffset) {
            jQuery("nav").addClass("fixed");
        } else {
            jQuery("nav").removeClass("fixed");
        }
    }
}
jQuery(document).ready(function() {
    var SiteInit = new MySite();

    jQuery(window).on('scroll', function() {
        SiteInit.stickyTopBar();

    });

    jQuery(window).on('resize', function() {
        SiteInit.stickyUtility();
    });
});