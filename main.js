var APCG17966 = {
  config: {},

  selectors: {
    closeBtnSelector: ".styles_comparisonCloseIcon__1ASvb",
    stickyElementWrapperSelector: ".USC_stickyElementsWrapper__tGltN",
    clearListLabelSelector: ".styles_comparisonClearLabel__1xC9o",
    comparisonContentSelector: ".styles_comparisonContent__3B6no",
    comparisonActionsSelector: ".styles_comparisonActions__1eKHs",
    comparisonCountSelector: ".styles_comparisonCount__2567X",
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
    };
  },

  changeBarView: function () {
    var imgContainerToMin = document.createElement("span");
    imgContainerToMin.classList.add("minimize_img-wrap");
    imgContainerToMin.classList.add("APCG17966-toMin");
    this.nodes.imgContainerToMin = imgContainerToMin;

    var imgContainerToMax = document.createElement("span");
    imgContainerToMax.classList.add("maximize_img-wrap");
    imgContainerToMax.classList.add("APCG17966-toMax");
    imgContainerToMax.classList.add("minimize-width");
    this.nodes.imgContainerToMax = imgContainerToMax;

    this.nodes.imgContainerToMin.addEventListener(
      "click",
      this.listenerMaxMin()
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
  },

  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.changeBarView();
    } else {
      var _this = this;

      window.addEventListener("load", function () {
        _this.getNodes();
        _this.changeBarView();
      });
    }
  },
};

APCG17966.init();
