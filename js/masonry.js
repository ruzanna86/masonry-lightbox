/**
 * @author Ruzanna Mehrabyan
 * @since 2019-07-13
 * @copyright Aparg LLC.
 * @description Responsive Gallery Masonry with Lightbox
 */

(function($) {
    var defaults = {
        width: "300px",
        padding: "5px"
    };

    $.fn.masonry = function (options) {
        this.options = $.extend({}, defaults, options);
        console.log(this);
    };

})(jQuery);