/**
 * jQuery plugin to read Open Graph Protocol data from the page
 */
 
(function($) {
  
  var checkNamespacePresent = function (node) {
    var i, attr, attributes = node.attributes || {};
    // we're looking for xmlns:og="http://opengraphprotocol.org/schema/"
    for (i = 0; i < attributes.length; i++) {
      attr = attributes[i];
      if (attr.nodeName.substring(0,5) === "xmlns" && 
          attr.nodeValue === "http://opengraphprotocol.org/schema/") {
        return attr.nodeName.substring(6);
      }
    }
    return null;
  }
  
  $.fn.ogp = function() {
    var ns = null, data = {};
    $(this).each(function () {
      $(this).parents().andSelf().each(function () {
        ns = checkNamespacePresent(this);
        if (ns !== null) {
          return false;
        } 
      });
      
      // give up if no namespace
      if (ns === null) {
        ns = "og";
      }
      
      // look for OGP data
      ns = ns + ":";
      $('meta', this).each(function () {
        var prop = $(this).attr("property"), key, value;
        if (prop && prop.substring(0, ns.length) === ns) {
          key = prop.substring(ns.length);
          value = $(this).attr("content");
          data[key] = data[key] || [];
          data[key].push(value);
        }
      });
    });
    
    // this is the total of everything
    
    return data;
  }
})(jQuery);
