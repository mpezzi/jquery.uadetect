/*
 * jQuery Browser Detection Plugin by M. Pezzi
 * http://thespiral.ca/jquery/uadetect
 * Based off of Browser Detect from http://www.quirksmode.org/js/detect.html
 * Version: 1.1 (02/16/10)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($){

$.fn.UADetect = function(options) {
  var self = this;
  
  return this.each(function(){
    var opts = $.extend({}, $.fn.UADetect.defaults, options || {}), classes = [], c = 0;
    
    $.fn.UADetect.browser = $.fn.UADetect.searchString(opts.definitions.browsers, opts) || "Unknown Browser";
    $.fn.UADetect.version = $.fn.UADetect.searchVersion(navigator.userAgent, opts) || 
                            $.fn.UADetect.searchVersion(navigator.appVersion, opts) || "Unknown Version";
    $.fn.UADetect.system  = $.fn.UADetect.searchString(opts.definitions.systems, opts) || "Unknown System";
    
    log('Browser: ' + $.fn.UADetect.browser, opts);
    log('Version: ' + $.fn.UADetect.version, opts);
    log('OS: ' + $.fn.UADetect.system, opts);
  });
};

$.extend($.fn.UADetect, {
  css: [],
  system: '',
  browser: '',
  version: '',
  versionSearchString: '',
  searchString: function(data, opts) {
    for (var i=0;i<data.length;i++)	{
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].search) != -1) {
          $.fn.UADetect.addClasses(opts.selector, data[i].css, opts);
          return data[i].identity;
        }
      }
      else if (dataProp) {
        $.fn.UADetect.addClasses(opts.selector, data[i].css, opts);
        return data[i].identity;
      }
    }
  },
  searchVersion: function(dataString, opts) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    
    version = parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    $(opts.selector).addClass(this.css[this.css.length-1] +'-'+ parseInt(version));
    return version;
  },
  addClasses: function(element, classes, opts) {
    $.each(classes, function(k, c){
      $(element).addClass(c);
    });
    
    $.extend(this.css, classes);
  }
});

$.fn.UADetect.defaults = {
  debug: false,
  debugSelector: '#debugger',
  selector: 'body:eq(0)',
  definitions: {
    browsers: [
      { string: navigator.userAgent, identity: 'Chrome', search: 'Chrome', css: ['webkit', 'chrome'] },
      { string: navigator.userAgent, identity: 'OmniWeb', search: 'OmniWeb', versionSearch: 'OmniWeb/', css: ['omniweb'] },
      { string: navigator.vendor, identity: 'Safari', search: 'Apple', versionSearch: "Version", css: ['webkit', 'safari'] },
      { prop: window.opera, identity: 'Opera', css: ['opera'] },
      { string: navigator.vendor, identity: "iCab", search: "iCab", css: ['webkit', 'icab'] },
      { string: navigator.vendor, identity: "Konqueror", search: "KDE", css: ['kde'] },
      { string: navigator.userAgent, identity: "Firefox", search: "Firefox", css: ['mozilla', 'firefox'] },
      { string: navigator.vendor, identity: "Camino", search: "Camino", css: ['mozilla', 'camino'] },
      { string: navigator.userAgent, identity: "Netscape", search: "Netscape", css: ['netscape'] }, // for newer Netscapes (6+)
      { string: navigator.userAgent, identity: "Internet Explorer", search: "MSIE", versionSearch: "MSIE", css: ['ie'] },
      { string: navigator.userAgent, identity: "Mozilla", search: "Gecko", versionSearch: "rv", css: ['mozilla'] },
      { string: navigator.userAgent, identity: "Netscape", search: "Mozilla", versionSearch: "Mozilla", css: ['netscape'] } // for older Netscapes (4-)
    ],
    systems: [
      { string: navigator.platform, identity: "Windows", search: "Win", css: ['win'] },
      { string: navigator.platform, identity: "Mac", search: "Mac", css: ['mac'] },
      { string: navigator.userAgent, identity: "iPhone/iPod", search: "iPhone", css: ['iphone'] },
      { string: navigator.platform, identity: "Linux", search: "Linux", css: ['linux'] }
    ]
  }
};

function log(message, opts) {
  if ( window.console && opts.debug )
    window.console.log(message);
  
  if ( $(opts.debugSelector).length > 0 && opts.debug )
    $(opts.debugSelector).append(message + '<br />');
}

})(jQuery);

// You can enable this if you just want to use the default settings.
//jQuery(document).ready(function(){ $(this).UADetect(); });
