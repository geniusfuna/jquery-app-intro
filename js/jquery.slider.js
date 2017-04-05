//jquery plugin, need jquery.touchSwipe.js
;(function ($) {
    $.fn.Slider = function(conf){
        var _this = $(this),Slider,targetIndex,slideItems,slideGroup,pager,sliderspeed,activeId;
        // Reload page to reset value when Oritentation Changes!
        Slider = {
            resize: function(){
                // Slides
                Slider.width = (window.orientation != 0 ||window.orientation != 180 ||  window.orientation == undefined) ? window.innerWidth : window.innerHeight;
                Slider.height = (window.orientation != 0 || window.orientation != 180 || window.orientation == undefined) ? window.innerHeight : window.innerWidth;
                slideGroup.css("width", Slider.total*Slider.width);
                slideItems.width(Slider.width);
                slideItems.each(function(index){
                    $(this).css({
                        // "left": "-" + Slider.width*(index) + "px",
                        "left": Slider.width*(index) + "px",
                        // "transform": "translate(" + Slider.width*index + "px, 0px) translateZ(0px)"
                        // "transform": "translate(" + Slider.width*index + "px, 0px) translateZ(0px)"
                    });
                });
                activeId = $(pager).find('.active').length > 0 ? $(pager).find('.active').index() : 0;
                Slider.switchPage(activeId);
            },
            init: function(){
                window.addEventListener ("orientationchange", function(){Slider.resize()}, false );
                //Configuration priority: conf >  attributes
                conf.slideGroup = conf.slideGroup ? conf.slideGroup : '[slider="slideGroup"]';
                conf.slideItems = conf.slideItems ? conf.slideItems : '[slider="slideGroup"] > div';
                conf.pager = conf.pager ? conf.pager : '[slider="pager"]';

                slideGroup = _this.find(conf.slideGroup).length > 0  ? _this.find(conf.slideGroup) : null;
                slideItems = _this.find(conf.slideItems).length > 0 ? _this.find(conf.slideItems) : null;
                pager = _this.find(conf.pager).length > 0  ? _this.find(conf.pager) : null;
                sliderspeed = conf.speed ? conf.speed : 300;

                if(slideItems == null || slideGroup == null || pager == null){
                    console.log(conf);
                    console.warn("Please check the `Configuration` first.");
                    return
                }
                Slider.total = slideGroup.children().length;

                Slider.resize();
                Slider.pager();

                slideGroup.swipe({
                    swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection){
                        index = slideGroup.find(".active").index();
                        if(distance > Slider.width){
                            distance = Slider.width;
                        }
                        if(direction == "left"){
                            // console.log("SwipeLeft: " + index);
                            if(index == Slider.total - 1){
                                targetIndex = Slider.total - 1;
                            }else{
                                targetIndex = index+1;
                            }
                        }else if(direction == "right"){
                            // console.log("SwipeRight: " + index);
                            if(index < 1){
                                targetIndex = 0;
                            }else{
                                targetIndex = index-1;
                            }
                        }else{
                            //prevent SwipeUp & SwipeDown
                            event.preventDefault();
                        }
                        // console.log(phase);
                        if(phase == "end"){
                            if(distance > Slider.width/3 && (targetIndex < Slider.total-1 || targetIndex > 0)){
                                // Switch page when distance reached one third of screenwidth.
                                Slider.switchPage(parseInt(targetIndex));
                                return
                            }else{
                                Slider.switchPage(parseInt(index));
                                return
                            }
                        }else if(phase == "move"){
                            // console.log("index:"+ index +", targetIndex:" +targetIndex + ", Direction:" + direction + ", Distance:" + distance);
                            if(targetIndex != Slider.total-1){
                                Slider.touchMove(index, distance, sliderspeed, direction);
                                // return
                            }
                            if(targetIndex != 0){
                                if(targetIndex == Slider.total-1){
                                    // console.log("#Right end");
                                    Slider.touchMove(index, distance, sliderspeed, direction);
                                    // return
                                }else{
                                    Slider.touchMove(targetIndex, distance-Slider.width, sliderspeed, direction);
                                    // return
                                }
                            }
                        }
                    },
                    //Default is 75px, set to 0 for demo so any distance triggers swipe
                    threshold:0
                });
            },
            touchMove: function(index, dist, speed, direction){
                var slide = slideItems[index];
                var style = slide && slide.style;

                if (!style) return;
                style.webkitTransitionDuration =
                style.MozTransitionDuration =
                style.msTransitionDuration =
                style.OTransitionDuration =
                style.transitionDuration = speed + 'ms';
                oldDist = parseInt($(slide).attr("dist"));
                if(direction == "left"){
                    style.webkitTransform = 'translate(' + (-dist) + 'px,0)' + 'translateZ(0)';
                }else if(direction == "right"){
                    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
                }
                style.msTransform =
                style.MozTransform =
                style.OTransform = 'translateX(' + dist + 'px)';
            },
            switchPage: function(num){
                var elem = slideItems.eq(num);
                slideItems.each(function(index){
                    slideItems.removeClass("active");
                    $(this).css({
                        // "transition-duration": sliderspeed + "ms",
                        // "transform": "translate(" + Slider.width*(num-index) + "px, 0px) translateZ(0px)"
                        "left" : 0,
                        "transform": "translate(" + Slider.width*(index-num) + "px, 0px) translateZ(0px)"

                    });
                });
                slideItems.eq(num).addClass('active');
                Slider.pager(num);
            },
            pager: function(num){
                // Add Page control
                if(num == undefined){
                    // Initial pager;
                    $(pager).empty();
                    for(var i=0;i<Slider.total;i++){
                        var span = $('<span class="slider-pager-page"><i></i></span>');
                        // span.attr('onclick', "Slider.switchPage(" + i + ");");
                        $(pager).append(span);
                    }
                    if(slideGroup.find(".active").length == 0){
                        slideItems.eq(0).addClass('active');
                        $(pager).children().first().addClass('active');
                    }else{
                        num = slideGroup.find(".active").index();
                        Slider.switchPage(num);
                        $(pager).children().eq(num).addClass('active');
                    }
                }else{
                    $(pager).find('.active').removeClass('active');
                    $(pager).children().eq(num).addClass('active');
                }
            },
            height:(window.orientation != 0 || window.orientation != 180 || window.orientation == undefined) ? window.innerHeight : window.innerWidth,
            width:(window.orientation != 0 ||window.orientation != 180 ||  window.orientation == undefined) ? window.innerWidth : window.innerHeight
        };
        return Slider.init();
    }
} (jQuery));