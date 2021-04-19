var APCG17966 = {
  config: {},

  selectors: {
    closeBtnSelector: ".styles_comparisonCloseIcon__1ASvb",
    stickyElementWrapperSelector: ".USC_universalStickyContainer__17-d7",
    clearListLabelSelector: ".styles_comparisonClearLabel__1xC9o",
    comparisonContentSelector: ".styles_comparisonContent__3B6no",
    comparisonActionsSelector: ".styles_comparisonActions__1eKHs",
    comparisonCountSelector: ".styles_comparisonCount__2567X",
    comparisonClearListSelector: ".styles_comparisonClearList__2OLr1",
   	productCountSelector: ".styles_productCount__2z-Ql",
    stickyElementsWrapperSelector: ".USC_stickyElementsWrapper__tGltN",
    widgetContainerWrapSelector:".styles_WidgetContainerWrap__3aOwI",
    observerSelector: ".styles_comparisonLink__1fGc5",
  },

  getNodes: function () {
    this.nodes = {
      closeBtn: document.querySelector(this.selectors.closeBtnSelector),
      stickyElementWrapper: document.querySelector(
        this.selectors.stickyElementWrapperSelector
      ),
      clearListLabel: document.querySelector(
        this.selectors.clearListLabelSelector
      ),
      comparisonContent: document.querySelector(
        this.selectors.comparisonContentSelector
      ),
      comparisonActions: document.querySelector(
        this.selectors.comparisonActionsSelector
      ),
      comparisonCount: document.querySelector(
        this.selectors.comparisonCountSelector
      ),
       comparisonClearList: document.querySelector(
        this.selectors.comparisonClearListSelector
      ),
      productCount: document.querySelector(
        this.selectors.productCountSelector
      ),
        stickyElementsWrapper: document.querySelector(
        this.selectors.stickyElementsWrapperSelector
      ),
       widgetContainerWrap: document.querySelector(
        this.selectors.widgetContainerWrapSelector
      ),
       observerSelector: document.querySelector(
        this.selectors.observerSelector
      ),
    };
  },

  changeBarView: function () {
    console.log('=========');
    var imgContainerToMin = document.createElement("span");
    imgContainerToMin.classList.add("minimize_img-wrap");
    imgContainerToMin.classList.add("APCG17966-toMinMax");
    this.nodes.imgContainerToMin = imgContainerToMin;

    var imgContainerToMax = document.createElement("span");
    imgContainerToMax.classList.add("maximize_img-wrap");
    imgContainerToMax.classList.add("APCG17966-toMinMax");
    imgContainerToMax.classList.add("minimize-width");
    this.nodes.imgContainerToMax = imgContainerToMax;
	
    this.nodes.imgContainerToMin.addEventListener(
      "click",
     this.listenerMaxMin.bind(this)
    );

    this.nodes.imgContainerToMax.addEventListener(
      "click",
      this.listenerMaxMin.bind(this)
    );
    
    this.nodes.closeBtn.before(imgContainerToMin);
    this.nodes.comparisonCount.before(imgContainerToMax);
  },
  
  listenerMaxMin: function () {
    this.nodes.stickyElementWrapper.classList.toggle("minimize-width");
    this.nodes.clearListLabel.classList.toggle("minimize-width");
    this.nodes.comparisonContent.classList.toggle("minimize-width");
    this.nodes.comparisonActions.classList.toggle("minimize-width");
    this.nodes.imgContainerToMin.classList.toggle("minimize-width");
    this.nodes.imgContainerToMax.classList.toggle("minimize-width");
    this.nodes.comparisonClearList.classList.toggle("minimize-width");
    this.nodes.productCount.classList.toggle("minimize-width");
    this.nodes.stickyElementsWrapper.classList.toggle("minimize-width");
    this.nodes.comparisonCount.classList.toggle("minimize-width");
    this.nodes.widgetContainerWrap.classList.toggle("minimize-width");
  },

    setObserver: function () {
        var  changeBarView = this.changeBarView.bind(this);
        var observer = new MutationObserver(changeBarView);
        observer.observe(this.nodes.observerSelector, {
          attributeFilter:['href'],
        });
    
    
    },
  
  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.changeBarView();
      this.setObserver();
    } else {
      var _this = this;

      window.addEventListener("load", function () {
        _this.getNodes();
        _this.changeBarView();
        _this.setObserver();
      });
    }
  },
};

APCG17966.init();
