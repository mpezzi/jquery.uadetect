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
  return this.each(function(){
    var opts = $.extend({}, $.fn.UADetect.defaults, options || {});
    
    $.fn.UADetect.system  = $.fn.UADetect.searchString(opts.definitions.systems, opts) || "Unknown System";
    $.fn.UADetect.browser = $.fn.UADetect.searchString(opts.definitions.browsers, opts) || "Unknown Browser";
    $.fn.UADetect.version = $.fn.UADetect.searchVersion(navigator.userAgent, opts) || 
                            $.fn.UADetect.searchVersion(navigator.appVersion, opts) || "Unknown Version";
    
    log('UserAgent: ' + ( navigator.userAgent || 'NULL' ), opts);
    log('Vendor: ' + ( navigator.vendor || 'NULL' ), opts);
    log('Browser: ' + $.fn.UADetect.browser, opts);
    log('Version: ' + $.fn.UADetect.version, opts);
    log('OS: ' + $.fn.UADetect.system, opts);
    log('Added the following classes to <em>' + opts.selector + '</em>: ' + $.fn.UADetect.css.join(', '), opts);
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
    var index = dataString.indexOf(this.versionSearchString), classes = [];
        
    if ( index == -1 ) return;
    
    version = parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    classes[0] = this.css[this.css.length-1] +'-'+ parseInt(version);
    $.fn.UADetect.addClasses(opts.selector, classes, opts);
    
    return version;
  },
  addClasses: function(element, classes, opts) {
    $.each(classes, function(k, c){
      $(element).addClass(c);
      $.fn.UADetect.css.push(c);
    });
  }
});

$.fn.UADetect.defaults = {
  debug: false,
  debugSelector: '#debugger',
  selector: 'body:eq(0)',
  definitions: {
    browsers: [
      { identity: 'Chrome', string: navigator.userAgent, search: 'Chrome', css: ['webkit', 'chrome'] },
      { identity: 'OmniWeb', string: navigator.userAgent, search: 'OmniWeb', versionSearch: 'OmniWeb/', css: ['omniweb'] },
      { identity: 'Safari', string: navigator.vendor, search: 'Apple', versionSearch: "Version", css: ['webkit', 'safari'] },
      { identity: 'Opera', prop: window.opera, css: ['opera'] },
      { identity: "iCab", string: navigator.vendor, search: "iCab", css: ['webkit', 'icab'] },
      { identity: "Konqueror", string: navigator.vendor, search: "KDE", css: ['kde'] },
      { identity: "Firefox", string: navigator.userAgent, search: "Firefox", css: ['mozilla', 'firefox'] },
      { identity: "Camino", string: navigator.vendor, search: "Camino", css: ['mozilla', 'camino'] },
      { identity: "Netscape", string: navigator.userAgent,search: "Netscape", css: ['netscape'] }, // for newer Netscapes (6+)
      { identity: "Internet Explorer", string: navigator.userAgent, search: "MSIE", versionSearch: "MSIE", css: ['ie'] },
      { identity: "Mozilla", string: navigator.userAgent, search: "Gecko", versionSearch: "rv", css: ['mozilla'] },
      { identity: "Netscape", string: navigator.userAgent, search: "Mozilla", versionSearch: "Mozilla", css: ['netscape'] } // for older Netscapes (4-)
    ],
    systems: [
      { identity: "Windows", string: navigator.platform, search: "Win", css: ['win'] },
      { identity: "Mac", string: navigator.platform, search: "Mac", css: ['mac'] },
      { identity: "iPhone/iPod", string: navigator.userAgent, search: "iPhone", css: ['iphone'] },
      { identity: "Linux", string: navigator.platform, search: "Linux", css: ['linux'] }
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
