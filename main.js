var UXD_602 = {
  config: {
    },
  

  selectors: {
    bgImgSelector: ".bg_img",
    nearImgSelector: ".container.layer",
   blockForMetric: ".document-type",
  },

  getNodes: function () {
    this.nodes = {
     bgImg: document.querySelector(this.selectors.bgImgSelector),
     nearImgNode: document.querySelector(this.selectors.nearImgSelector),
    };
  },

  changeImageView: function () {
    var imgContainer = document.createElement('div');
    imgContainer.classList.add("bg_img-wrap");
    imgContainer.appendChild(this.nodes.bgImg);
    this.nodes.nearImgNode.before(imgContainer);
  },
 addMetrics: function(){
   document.querySelectorAll(this.selectors.blockForMetric).forEach(function(el){
   el.classList.add('UXD_602');
   });
 },
  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.changeImageView();
      this.addMetrics();
    } else {
      var _this = this;

      window.addEventListener("load", function () {
        _this.getNodes();
        _this.changeImageView();
        _this.addMetrics();
      });
    }
  },
};

UXD_602.init();
