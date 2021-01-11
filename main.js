var APC16764 = {
  selectors: {
    topContainerSelector: ".srp-content",
    allResultsContentSelector: ".se-col-md-12",
    activeOldFiltersSelector: ".se_checkbox_is-active_span",
    categoryFacetSelector: ".filter-list__sublist",
    categoryFacetItemsSelector: ".filter-list__sublist-item",
    categoryFacetItems1Selector: ".category-list__item ",
    categoryFacetItems2Selector: ".js-filter-list__item",
    selectedFacetsSelector: ".selected-facets__list-item",
    observerClassSelector: ".js-srp-mediator-outer",
  },

  getNodes: function () {
    this.nodes = {
      topContainer: document.querySelector(this.selectors.topContainerSelector),
      categoryFacet: document.querySelector(
        this.selectors.categoryFacetSelector
      ),
      categoryFacetItems: document.querySelectorAll(
        this.selectors.categoryFacetItems1Selector
      ),
      observerClass: document.querySelector(
        this.selectors.observerClassSelector
      ),
      selectedFacets: document.querySelector(
        this.selectors.selectedFacetsSelector
      ),
    };
  },

  initTabContainerSection: function () {
    this.nodes.tabsContainer = document.createElement("ul");
    this.nodes.tabsContainer.className = "APC-16764-section-tabs APC-16764-metric";
    if (!document.querySelector(".APC-16764-section-tabs")) {
      while (!document.querySelector(".APC-16764-section-tabs")) {
        document
          .querySelector(".srp-content")
          .insertAdjacentElement("beforebegin", this.nodes.tabsContainer);
        this.createTabs();
      }
    }
    if (document.querySelector(".category-list-wrap") || document.querySelectorAll('.js-filter-list__item ').length<=2) {
      document.querySelector(".filters-wrap").style.display = "none";
      if (
        !document
          .querySelector(".results-wrap")
          .classList.contains("full-width")
      ) {
        document.querySelector(".results-wrap").classList.add("full-width");
      }
    } else {
      document.querySelector(".filters-wrap").style.display = "inline-block";
      document.querySelector(".results-wrap").classList.remove("full-width");
    }
  },

  createTabs: function () {
    var firstTabItem = document.createElement("li");
    var firstTabItemInner = document.createElement("h6");
    firstTabItemInner.innerText = "All Categories";

    if (!sessionStorage.getItem("currentFilter")) {
      sessionStorage.setItem("currentFilter", "All Categories");
    }

    if ("All Categories" === sessionStorage.getItem("currentFilter")) {
      firstTabItem.className = "APC-16764-category-item__head active";
      firstTabItemInner.className = "APC-16764-category-item__heading active";
    } else {
      firstTabItem.className = "APC-16764-category-item__head";
      firstTabItemInner.className = "APC-16764-category-item__heading";
    }

    firstTabItem.append(firstTabItemInner);
    firstTabItem.addEventListener(
      "click",
      function (event) {
        this.tabsClick(event.target);
      }.bind(this)
    );

    this.nodes.tabsContainer.insertAdjacentElement("beforeend", firstTabItem);
    if (!document.querySelector(".category-list-wrap")) {
      this.nodes.categoryFacetItems = document
        .querySelector(this.selectors.categoryFacetItems2Selector)
        .querySelectorAll(this.selectors.categoryFacetItemsSelector);
    } else {
      this.nodes.categoryFacetItems = document.querySelectorAll(
        this.selectors.categoryFacetItems1Selector
      );
    }

    this.nodes.categoryFacetItems.forEach(
      function (item) {
        var elem = item.innerText
          .replace(/\(([^)]+)\)/g, "")
          .replace(/\d/g, "")
          .trim();
        var tabItem = document.createElement("li");
        var tabItemInner = document.createElement("h6");
        var tabProductAmount = document.createElement("span");
        tabItemInner.innerText = elem;
        tabProductAmount.className = "APC-16764-category-item__amount";
        var tabNumber = item.textContent.replace(/[a-zA-Z()&]+/g, "").trim();
        tabProductAmount.innerText = tabNumber;

        if (tabNumber === "0") {
          tabItem.className = "APC-16764-category-item__disable";
          tabItemInner.className = "APC-16764-category-item__heading";
        } else {
          if (elem === sessionStorage.getItem("currentFilter")) {
            tabItem.className = "APC-16764-category-item__head active";
            tabItemInner.className = "APC-16764-category-item__heading active";
          } else {
            tabItem.className = "APC-16764-category-item__head";
            tabItemInner.className = "APC-16764-category-item__heading";
          }
        }

        tabItem.append(tabItemInner);
        tabItem.append(tabProductAmount);

        if (!tabItem.classList.contains("APC-16764-category-item__disable")) {
          tabItem.addEventListener(
            "click",
            function (event) {
              this.tabsClick(event.target);
            }.bind(this)
          );
        }

        this.nodes.tabsContainer.insertAdjacentElement("beforeend", tabItem);
      }.bind(this)
    );
  },

  tabsClick: function (clickedElement) {
    var filterHeader = clickedElement.textContent
      .replace(/\(([^)]+)\)/g, "")
      .replace(/\d/g, "")
      .trim();
    if (
      !clickedElement.classList.contains("active") &&
      !clickedElement.classList.contains("APC-16764-category-item__disable") &&
      !clickedElement.parentNode.classList.contains("active") &&
      !clickedElement.parentNode.classList.contains(
        "APC-16764-category-item__disable"
      )
    ) {
      if (!document.querySelector(".category-list-wrap")) {
        this.nodes.categoryFacetItems = document
          .querySelector(this.selectors.categoryFacetItems2Selector)
          .querySelectorAll(this.selectors.categoryFacetItemsSelector);
      } else {
        this.nodes.categoryFacetItems = document.querySelectorAll(
          this.selectors.categoryFacetItems1Selector
        );
      }
      if (filterHeader === "All Categories") {
        document
          .querySelectorAll(".selected-facets__list-item")
          .forEach(function (f) {
            f.click();
          });
      } else {
        this.nodes.categoryFacetItems.forEach(function (elem) {
          if (
            elem.textContent
              .replace(/\(([^)]+)\)/g, "")
              .replace(/\d/g, "")
              .trim() === filterHeader
          ) {
            elem.click();
          }
        });
      }
      sessionStorage.setItem("currentFilter", filterHeader);
    }
  },

  setObserver: function () {
    var initTabContainerSection = this.initTabContainerSection.bind(this);
    var observer = new MutationObserver(initTabContainerSection);
    observer.observe(this.nodes.observerClass, {
      childList: true,
      subtree: true,
    });
  },

  addSubmitListeners: function () {
    sessionStorage.setItem("currentFilter", "All Categories");
    document
      .querySelectorAll(".selected-facets__list-item")
      .forEach(function (s) {
        s.click();
      });
  },

  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.initTabContainerSection();
      this.addSubmitListeners();
      this.setObserver();
    } else {
      var _this = this;

      window.addEventListener("load", function () {
        _this.getNodes();
        _this.initTabContainerSection();
        _this.addSubmitListeners();
        _this.setObserver();
      });
    }
  },
};

APC16764.init();