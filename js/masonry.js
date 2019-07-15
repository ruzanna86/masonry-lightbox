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
        $(window).resize(function(){
            // $('.rem-masonry').masonry({options});
            console.log(111);
        });
        this.options = $.extend({}, defaults, options);
        var that = this;
        var topPosition = 0;
        var leftPosition = 0;
        var oneColHeight = [];

        this.columnCount = Math.floor(($(window).width() / parseInt(this.options.width)));
        $(this).css('width', (parseInt(this.options.width) * this.columnCount)+'px');

        $(this.children()).css({
            'width': this.options.width,
            'padding': this.options.padding,
            'left': 0
        });

        this.updateItem = function(i){
            $(that[0].children[i]).animate({
                'left': leftPosition,
                'top': topPosition
            },700);
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

        // Lightbox Click Event
        $(that.children()).on( "click",function(){
            var imageSrc = $(this).find('img').attr("src");
            var imageAlt = $(this).find('img').attr("alt");

            $('body').append(
                "<div class='remMasonry-modal-overlay'>"+
                "<div class='remMasonry-modal'>"+
                "<div id='remMasonry-modal-close' class='close-container'>" +
                "<div class='leftright'></div>" +
                "<div class='rightleft'></div>" +
                "<label class='close'>close</label>" +
                "</div>" +
                "<img src='" + imageSrc + "' alt='" + imageAlt + "' class='remMasonry-modal-img' />"+
                "</div>"+
                "</div>"
            ).show('slow');

            $('#remMasonry-modal-close').click(function(){
                $('.remMasonry-modal-overlay').hide('fast', function(){
                    $(this).remove();
                });
            });
        });



    };


})(jQuery);