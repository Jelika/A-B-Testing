var UXD_602 = {
    selectors: {
     blockForMetric: ".document-type",
    },
  
   addMetrics: function(){
     document.querySelectorAll(this.selectors.blockForMetric).forEach(function(el){
     el.classList.add('UXD_602');
     });
   },
    init: function () {
      if (document.readyState !== "loading") {
        this.addMetrics();
      } else {
        var _this = this;
  
        window.addEventListener("load", function () {
          _this.addMetrics();
        });
      }
    },
  };
  
  UXD_602.init();
  