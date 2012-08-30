(function($){

    $.event.special.leftclick = {

        delegateType: 'click',

        bindType: 'click',

        handle: function (event) {
            var originalEvent = event.originalEvent,
                isIE = $.browser.msie,
                type = event.type,
                result;
            if (
                originalEvent
                &&
                (
                    !isIE && originalEvent.which === 1
                    ||
                    isIE && originalEvent.button === 0
                )
            )
            {
                event.type = 'leftclick';
                result = event.handleObj.handler.call(this,event);
                event.type = type;
                return result
            }
        }
    };

})(jQuery);