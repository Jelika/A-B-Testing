var APC16764 = {
  selectors: {
    topContainerSelector: ".top-message-wrap",
    allResultsContentSelector: ".se-col-md-12",
    activeOldFiltersSelector: ".se_checkbox_is-active_span",
    categoryFacetSelector: ".filter-list__sublist",
    categoryFacetItemsSelector: ".list__item .filter-list__sublist-item",
    selectedFacetsSelector:".selected-facets__list-item",
    //   resultsListSelector: '.results:last-child',
  },

  constants: {
    tabsArray: [
      "All Categories",
      "Products & Services",
      "Support",
      "FAQ",
      "Documents",
    ],
  },

  getNodes: function () {
    this.nodes = {
      topContainer: document.querySelector(this.selectors.topContainerSelector),
      categoryFacet: document.querySelector(this.selectors.categoryFacetSelector),
      categoryFacetItems: querySelectorAll(this.selectors.categoryFacetItemsSelector),
      selectedFacets: querySelector(this.selectors.selectedFacetsSelector)
      //  resultsList: document.querySelector(this.selectors.resultsListSelector),
    };
  },

  initTabContainerSection: function () {
    this.nodes.tabsContainer = document.createElement("section");
    this.nodes.tabsContainer.className = "APC-16764-section-tabs";
    this.nodes.allTabsContainer = document.createElement("div");
    this.nodes.allTabsContainer.className = "tabs-container";
    this.nodes.allTabsContainer.addEventListener(
      "click",
      function (event) {
        this.tabsClick(event.target);
      }.bind(this)
    );
    this.nodes.tabsContainer.append(this.nodes.allTabsContainer);
    if (!document.querySelector(".tabs-container")) {
      this.nodes.topContainer.insertAdjacentElement(
        "beforeend",
        this.nodes.tabsContainer
      );
    }
  },

  createTabs: function () {
    this.constants.tabsArray.forEach(
      function (elem) {
        var tabItem = document.createElement("div");
        var tabItemInner = document.createElement("h6");
        tabItemInner.className = "APC-16764-category-item__heading";
        tabItemInner.innerText = elem;
        if (!sessionStorage.getItem("currentFilter")) {
          sessionStorage.setItem("currentFilter", "All Categories");
        }
        if (elem === sessionStorage.getItem("currentFilter")) {
          tabItem.className = "APC-16764-category-item__head active";
        } else {
          tabItem.className = "APC-16764-category-item__head";
        }

        tabItem.append(tabItemInner);
        this.nodes.allTabsContainer.insertAdjacentElement("beforeend", tabItem);
      }.bind(this)
    );
  },

  tabsClick: function (clickedElement) {
    var filterHeader = clickedElement.innerText;
    document
      .querySelectorAll(".APC-16764-category-item__head")
      .forEach(function (el) {
        el.classList.remove("active");
      });
    if (
      !clickedElement.classList.contains("active") &&
      !clickedElement.parentNode.classList.contains("active")
    ) {
      if (clickedElement.classList.contains("APC-16764-category-item__head")) {
        clickedElement.classList.add("active");
      } else {
        clickedElement.parentNode.classList.add("active");
      }

      switch (filterHeader) {
        case "All Categories":
         this.nodes.selectedFacets.click();
          break;
        case "Products & Services":
         this.nodes.categoryFacetItems.forEach(function (elem) {
          if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Products & Services") {
              elem.click();
          }
      })
          break;
        case "Support":
          this.nodes.categoryFacetItems.forEach(function (elem) {
            if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Support") {
                elem.click();
            }
        })
          break;
        case "FAQ":
          this.nodes.categoryFacetItems.forEach(function (elem) {
            if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "FAQ") {
                elem.click();
            }
        })
          break;
        case "Documents":
          this.nodes.categoryFacetItems.forEach(function (elem) {
            if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Documents") {
                elem.click();
            }
        })
          break;
        default:
          break;
      }
    }
    sessionStorage.setItem("currentFilter", filterHeader);
  },

  /*addClassesToResultCards: function () {
      this.nodes.resultsList
          .querySelectorAll(this.selectors.resultCardsSelector)
          .forEach(function (card) {
              card.classList.add('uxd-441-primary');
          });
  },*/

  /* setObserverToResultList: function () {
      var addClassesToResultCards = this.addClassesToResultCards.bind(this);
      var observer = new MutationObserver(addClassesToResultCards);

      observer.observe(this.nodes.resultsList, {
          childList: true,
          subtree: true,
      });
  },*/

  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.initTabContainerSection();
      this.createTabs();
      // this.setObserverToResultList();
    } else {
      var _this = this;

      window.addEventListener("load", function () {
        _this.getNodes();
        _this.initTabContainerSection();
        _this.createTabs();
        // _this.setObserverToResultList();
      });
    }
  },
};

APC16764.init();
