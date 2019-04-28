var belchfssc_ = (function(){
	return {
    container: ".belch-floating-search-super-container",
    trigger:   ".belch-floating-search-super-container .bfss-trigger",
    searchBox: ".belch-floating-search-super-container .bfss-search-box",
    init: function(){
      window.$(this.container).closest('.widget-span').css({'min-height': 0});
      this.searchTransitionTimeline = new TimelineMax({paused: true});
      this.searchButtonTimeline     = new TimelineMax({paused: true});
      this.initAnimation();
      this.createListeners();
    },
    initAnimation: function(){
      this.searchTransitionTimeline.set( this.searchBox, {autoAlpha: 0});
      this.searchButtonTimeline.to( this.trigger, .3, {
        rotationX:      '-30',
        transformOrigin:'center center',
        boxShadow:      '0 5px 11px 0 rgba(0, 0, 0, 0.28), 0 19px 15px 0 rgba(0, 0, 0, 0.25)'
      });
      this.searchTransitionTimeline.to( this.searchBox, .7, {
          top: "0px",
          autoAlpha: 1,
          ease: Back.easeOut.config(1.7)
        });
    },
    on: function(action, callback) {
      window.addEventListener(action, callback, { passive: false });
    },
    createListeners: function(){
      this.on("keydown", this.tryClosing.bind(this));
      window.$(this.trigger).on('mouseenter', function(){
        this.searchButtonTimeline.play();
      }.bind(this));
      window.$(this.trigger).on('mouseleave', function(){
        this.searchButtonTimeline.reverse();
      }.bind(this));
      window.$(this.trigger).on('click', function(){
        if(window.$(this.trigger).hasClass('active')){
          this.searchTransitionTimeline.reverse()
          window.$(this.trigger).removeClass('active');
        }else{
          this.searchTransitionTimeline.play()
          window.$(this.trigger).addClass('active');
        }
      }.bind(this));
    },
    tryClosing: function(event){
      if(event.key == "Escape" && $(this.trigger).hasClass('active')){
        this.searchTransitionTimeline.reverse()
        window.$(this.trigger).removeClass('active');
      }
    }
  }
})();
$(function(){
  belchfssc_.init();
});
