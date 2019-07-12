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
        var that = this;
        var topPosition = 0;
        var leftPosition = 0;
        var oneColHeight = [];
        $(this).css('width', $(window).width());

        this.columnCount = Math.floor(($(window).width() / parseInt(this.options.width)));
        $(this.children()).css({
            'width': this.options.width,
            'padding': this.options.padding
        });

        this.updateItem = function(i){
            $(that[0].children[i]).css({
                'left': leftPosition,
                'top': topPosition
            });
        };
        for(var j = 0; j < this.columnCount; j++){
            oneColHeight.push(parseInt($(this[0].children[j]).outerHeight(true)));
            if(j == 0){
                leftPosition = 0;
            }else{
                leftPosition += parseInt(this.options.width);
            }
            topPosition = 0;
            this.updateItem(j);
        }

        for(var i = 0; i <  this.children().length; i++){
            if(i >= this.columnCount){
                var minHeight = oneColHeight[0];
                for(var j = 0; j < oneColHeight.length; j++){
                    if(oneColHeight[j] < minHeight){
                        minHeight = oneColHeight[j];
                    }
                }
                var currentIndex = oneColHeight.indexOf(minHeight);
                leftPosition = currentIndex * parseInt(this.options.width);
                topPosition = minHeight;
                oneColHeight[currentIndex] = minHeight + parseInt($(this[0].children[i]).outerHeight(true) );
                this.updateItem(i);

            }
        }

    };

})(jQuery);