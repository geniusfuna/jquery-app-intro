Add a simple intro tutorial to your app with jQuery & jquery.touchSwipe.min.js


Usage:
1. include jquery and jquery touchSwipe
2. config `slideGroup`,`slideItems`,`pager` selector and `Slider.init(config)`

`Javascript
$(function(){
    Slider.init({
        "slideGroup": $(".slider .slider-slides"),
        "slideItems": $(".slider .slider-slides .slider-slide"),
        "pager":$(".slider .slider-pager"),
        "speed":300 //Optional
    });
});
`