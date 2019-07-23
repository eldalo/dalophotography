(function ($, window, document, undefined) {
  'use strict';

  const setSectionCenterTop = (sectionName, className) => {
    const top = ($(window).height() - sectionName.height()) * 0.5;
    sectionName.css(className, top);
  }

  const initResizeWindow = () => {
    setSectionCenterTop($('#information'), 'top');
  }

  const initReady = () => {
    const sliderBackground = new MasterSlider();

    sliderBackground.control('timebar', { autohide: false, overVideo: true, align: 'bottom', color: '#bda168', width: 1 });
    sliderBackground.setup('slider-background', {
      width: 1366,
      height: 768,
      minHeight: 0,
      space: 0,
      start: 1,
      grabCursor: true,
      swipe: true,
      mouse: true,
      keyboard: true,
      layout: "fullscreen",
      wheel: false,
      autoplay: true,
      instantStartLayers: true,
      loop: true,
      shuffle: false,
      preload: 0,
      heightLimit: true,
      autoHeight: false,
      smoothHeight: true,
      endPause: false,
      overPause: false,
      fillMode: "fill",
      centerControls: false,
      startOnAppear: false,
      layersMode: "center",
      autofillTarget: "",
      hideLayers: false,
      fullscreenMargin: 0,
      speed: 5,
      dir: "h",
      parallaxMode: "swipe",
      view: "fade"
    });
  }

  const initLoad = () => {
    setSectionCenterTop($('#information'), 'top');

    TweenMax.to('#loading', 2.5, {
      css: { opacity: 0, display: 'none' },
      autoAlpha: 0,
      ease: Power3.easeOut,
      onComplete: () => {
        TweenMax.to('.opacity', .15, {
          css: { opacity: 1, display: 'block' },
          autoAlpha: 1,
          ease: Power2.easeIn
        });
      }
    });
  }

  $(document).ready(initReady);
  $(window).on('load', initLoad);
  $(window).on('resize', initResizeWindow);
})(jQuery, window, document);
