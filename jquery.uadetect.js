/*
 * jQuery Browser Detection Plugin
 * http://thespiral.ca/jquery/uadetect
 * Copyright (c) 2010 M. Pezzi
 * Version: 1.0 (02/16/10)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($){

$.fn.UADetect = function(options) {
  return this.each(function(){
    var opts = $.extend({}, $.fn.UADetect.defaults, options || {}),
        ua = navigator.userAgent.toLowerCase(), classes = [], i = 0;
    
    $.each(opts.definitions, function(browser, result){
      if ( result = opts.definitions[browser](ua) ) {
        $.each(result, function(k, r){
          $(opts.selector).addClass(r);
          classes[i] = r;
          i++;
        });
      }
    });
    
    log('UserAgent: ' + ua, opts);
    log('Classes added to "' + opts.selector + '": ' + classes.join(', '), opts);
  });
};

$.fn.UADetect.defaults = {
  debug : false,
  debugSelector : '#debugger',
  selector : 'body:eq(0)',
  definitions : {
    
    // This part still needs major work.
    webkit : function(ua) {
      if ( match = /(webkit)[ \/]([\w.]+)/.exec(ua) )
        return ['webkit', 'webkit' + parseInt(match[2])];
    },
    chrome : function(ua) {
      if ( match = /(chrome)[ \/]([\w.]+)/.exec(ua) )
        return ['chrome', 'chrome' + parseInt(match[2])];
    },
    safari : function(ua) {
      if ( match = /(safari)[ \/]([\w.]+)/.exec(ua) )
        return ['safari', 'safari' + parseInt(match[2])];
    },    
    mozilla : function(ua) {
      if ( match = /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) && !/compatible/.test(ua) ) 
        return ['mozilla'];
    },
    firefox : function(ua) {
      if ( match = /(firefox)[ \/]([\w.]+)/.exec(ua) )
        return ['firefox', 'firefox' + parseInt(match[2])];
    },
    opera : function(ua) {
      if ( match = /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) )
        return ['opera', 'opera' + parseInt(match[2])];
    },
    msie : function(ua) {
      if ( match = /(msie) ([\w.]+)/.exec(ua) )
        return ['ie', 'ie' + parseInt(match[2])];
    }
  }
};

function log(message, opts) {
  if ( window.console && opts.log )
    window.console.log(message);
  
  if ( $(opts.debugSelector).length > 0 && opts.debug )
    $(opts.debugSelector).append(message + '<br />');
}

})(jQuery);

jQuery(document).ready(function(){
  $(this).UADetect({ debug : true });
});
