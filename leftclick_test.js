/*
    leftclick example
 */

$(function(){

    var TEST_AREA = $('.page-test-area'),

        elementsOnPage = 1;

    // LOG FUNCTIONS
    function log(message){
        if (window.console){
            window.console.log(message)
        } else {
            alert(message)
        }
    }
    //END LOG FUNCTIONS

    //HANDLERS FOR TESTS
    function enableLeftClick(e){
        e.stopPropagation();
        var data = e.data,
            type = data.type;
        $(this).removeClass('click-disabled');
        log('Delegate by "'+type+'" leftclick called...');
    }
    function disableLeftClick(e){
        e.stopPropagation();
        var data = e.data,
            type = data.type,
            disableMethod,
            parent = $(this).parent(),
            eventContainer,
            selector;
        log('Delegate by "'+type+'" leftclick is off...');
        parent.addClass('click-disabled');
        switch (type) {

            case 'on' :
                                    disableMethod = 'off';
                                    eventContainer = parent;
                                    break;
            case 'on-delegate' :
                                    disableMethod = 'off';
                                    eventContainer = TEST_AREA;
                                    selector = '.click-'+type;
                                    break;
            case 'one' :
                                    disableMethod = 'off';
                                    eventContainer = parent;
                                    break;
            case 'one-delegate' :
                                    disableMethod = 'off';
                                    eventContainer = TEST_AREA;
                                    selector = '.click-'+type;
                                    break;
            case 'delegate' :
                                    disableMethod = 'undelegate';
                                    eventContainer = TEST_AREA;
                                    selector = '.click-'+type;
                                    break;
            case 'live' :
                                    disableMethod = 'die';
                                    eventContainer = parent;
                                    break;
            case 'bind' :
                                    disableMethod = 'unbind';
                                    eventContainer = parent;
                                    break;
            default :
                                    disableMethod = 'off';
                                    eventContainer = TEST_AREA;
                                    break;

        }
        eventContainer[disableMethod]('leftclick',selector,enableLeftClick).trigger('leftclick');
    }
    //END TEST HANDLERS

    //DELEGATE TEST HANDLERS
    TEST_AREA.on('leftclick','.click-on-delegate',{type:'on-delegate'},enableLeftClick)
             .on('leftclick','.click-on-delegate a',{type:'on-delegate'},disableLeftClick)
             .one('leftclick','.click-one-delegate',{type:'one-delegate'},enableLeftClick)
             .one('leftclick','.click-one-delegate a',{type:'one-delegate'},disableLeftClick)
             .delegate('.click-delegate','leftclick',{type:'delegate'},enableLeftClick)
             .delegate('.click-delegate a','leftclick',{type:'delegate'},disableLeftClick);
    $('.click-live').live('leftclick',{type:'live'},enableLeftClick);
    $('.click-live a').live('leftclick',{type:'live'},disableLeftClick);
    //END DELEGATE TEST HANDLERS

    //GENERATE HANDLERS
    function createContent(elementsNumbers,type){
        var div,
            link,
            i = 0;
        for (i;i<elementsNumbers;i++){
            div = $('<div/>',{
                text : type
            }).addClass('click-'+type).addClass('click');
            link = $('<a/>',{
                href : 'javascript:;',
                text : 'disable handler'
            }).addClass('click-link');
            div.append(link);
            TEST_AREA.append(div);
        }
    }

    function createOnDelegateContent(elementsNumbers){
        createContent(elementsNumbers,'on-delegate');
    }
    function createOneDelegateContent(elementsNumbers){
        createContent(elementsNumbers,'one-delegate');
    }
    function createDelegateContent(elementsNumbers){
        createContent(elementsNumbers,'delegate');
    }
    function createLiveContent(elementsNumbers){
        createContent(elementsNumbers,'live');
    }
    function createOnNonDelegateContent(elementsNumbers){
        createContent(elementsNumbers,'on');
        $('.click-on').on('leftclick',{type:'on'},enableLeftClick)
            .find('a')
            .on('leftclick',{type:'on'},disableLeftClick);
    }
    function createOneNonDelegateContent(elementsNumbers){
        createContent(elementsNumbers,'one');
        $('.click-one').one('leftclick',{type:'one'},enableLeftClick)
            .find('a')
            .one('leftclick',{type:'one'},disableLeftClick);
    }
    function createBindContent(elementsNumbers){
        createContent(elementsNumbers,'bind');
        $('.click-bind').bind('leftclick',{type:'bind'},enableLeftClick)
            .find('a')
            .bind('leftclick',{type:'bind'},disableLeftClick);
    }

    //GENERATE CONTENT
    createOnDelegateContent(elementsOnPage);
    createOnNonDelegateContent(elementsOnPage);
    createOneDelegateContent(elementsOnPage);
    createOneNonDelegateContent(elementsOnPage);
    createDelegateContent(elementsOnPage);
    createLiveContent(elementsOnPage);
    createBindContent(elementsOnPage);

});