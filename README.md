Add a simple intro tutorial to your app with jQuery & jquery.touchSwipe.min.js


##Usage:
1. include jquery and jquery touchSwipe
2. config `slideGroup`,`slideItems`,`pager` selector and `Slider.init(config)`

####Add attributes to slider elements as the similar stucture as below:
`
...
|---<div class="slider" slider="main">
    |---<div class="slider-slides" slider="slideGroup">
    |-------<div class="slider-slide">
                ...
    |-------</div>
            ...
    |---</div>
    |---<div class="slider-pager" slider="pager"></div>
|---</div>
...
`
Javascript:
`
$(function(){
    Slider.init({
        "speed": 300 //OPTIONAL
    });
});
`

####If you don't want to change your html code, you can choose pass configuration by Slider.init(configjson);

Javascript:
`
$(function(){
    Slider.init({
        "slideGroup": ".slider-slides",
        "slideItems": ".slider-slide",
        "pager": ".slider-pager",
        "speed": 300 //OPTIONAL
    });
});
`
##NOTE:
Configuration priority: attributes >  attributes