(function($){
  
  $.observable = function(input_obj) {
    var that = {},
        events = {},
        obj = input_obj;

    for(var key in obj) {
      //
      // 如果 obj[key] 是 Array 或 Object
      // 則遞迴呼叫 $.observable()
      //
      var _type = Object.prototype.toString.call(obj[key]).slice(8);
      if(  _type.indexOf('Object') !== -1 || _type.indexOf('Array') !== -1 ) {
         that[key] = $.observable(obj[key]);
      }
      else {
         _init(key, obj, events, that);
      }
    }

    function _init(key, obj, events, that) {

      events[key] = {};

      that[key] = function(val) {
        if( typeof val === 'undefined') {
          return obj[key];
        }
        else {
           var old_val = obj[key];
           obj[key] = val;

           if( typeof events[key]['update'] === 'function' ) {
             events[key]['update'](old_val, val);
           }

           return val;
        }
      };

      that[key].remove = function() {

        if( obj.hasOwnProperty(key) ) {
          
          var removed = obj[key];

          delete obj[key];
          
          if( typeof events[key]['remove'] === 'function' ) {
             events[key]['remove'](removed);
          }

          if(that.hasOwnProperty(key)) {
             delete that[key];
          }

          if(events.hasOwnProperty(key)) {
             delete events[key];
          }
        }
      };

      that[key].on = function(event_name, fn) {
        if( typeof fn !== 'function' ) {
          throw "fn must ne a function.";
        }
        else {
          if( event_name == 'update' || event_name == 'remove') {
            events[key][event_name] = fn;
          }
        }
      };
    };
  
    return that;
  };

})(window.$ || (window.$ = {}));
