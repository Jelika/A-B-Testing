var UXD441 = {
    config: {
        // linkToAPCHomePage: 'https://www.apc.com/us/en',
    },

    selectors: {
        allResultsContentSelector: '.se-col-md-12',
        oldFilterSectionSelector: '.subcategory-item__body',
        activeOldFiltersSelector: '.se_checkbox_is-active_span',
        tabsSelector: '.uxd-441-category-item__head',
    },

    constants: {
        tabsArray: ["Alle Seite", "Produkte", "Unterlagen", "Software", "FAQ"],
    },

    getNodes: function () {
        this.nodes = {
            allResultsContent: document.querySelector(this.selectors.allResultsContentSelector),
            allOldFilters: document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes,
        };
    },

    initTabContainerSection: function () {
        this.nodes.tabsContainer = document.createElement('section');
        this.nodes.tabsContainer.className = 'uxd-441-section-tabs';
        this.nodes.allTabsContainer = document.createElement('div');
        this.nodes.allTabsContainer.className = 'tabs-container';
        this.nodes.allTabsContainer.addEventListener('click', function(event){this.tabsClick(event.target);}.bind(this));
        this.nodes.tabsContainer.append(this.nodes.allTabsContainer);
        if (!document.querySelector('.tabs-container')) { this.nodes.allResultsContent.insertAdjacentElement('beforebegin', this.nodes.tabsContainer); }
    },
    createTabs: function () {
        this.constants.tabsArray.forEach(function (elem, index) {
            var tabItem = document.createElement('div');
            var tabItemInner = document.createElement('h6');
            tabItemInner.className = 'uxd-441-category-item__heading';
            tabItemInner.innerText = elem;
            if (index) {
                tabItem.className = 'uxd-441-category-item__head';
            }
            else { tabItem.className = 'uxd-441-category-item__head active'; }
            tabItem.append(tabItemInner);
            this.nodes.allTabsContainer.insertAdjacentElement('beforeend', tabItem);
        }.bind(this));
    },

    tabsClick: function (clickedElement) {
        debugger
        var filterHeader = clickedElement.innerText;
        document.querySelectorAll(this.selectors.tabsSelector).forEach(function (elem) {
            elem.classList.remove('active');
        });
        document.querySelectorAll(this.selectors.activeOldFiltersSelector).forEach(function (activeElem) {
            activeElem.click();
        });
        if (!clickedElement.classList.contains('active') && !clickedElement.parentNode.classList.contains('active')) {

            if (clickedElement.classList.contains('uxd-441-category-item__head')) {
                clickedElement.classList.add('active');
            } else { clickedElement.parentNode.classList.add('active'); }
            console.log(clickedElement.innerText);
            switch (filterHeader) {
                case "Alle Seite":
                    break;
                case "Produkte":
    
                    document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes.forEach(function (elem) {
                        
                        if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Produktbereiche" || elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Datenblätter") {
                         console.log(elem.textContent.replace(/\(([^)]+)\)/g, "").trim());
                            elem.childNodes[0].click();
                        }
                    }.bind(this));

                    break;
                case "Unterlagen":
                    document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes.forEach(function (elem) {
                        if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "CAD & Zeichnung" || elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Kataloge und Benutzerhandbücher" || elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Technische Informationen") {
                            elem.childNodes[0].click();
                        }
                    }.bind(this));

                    break;
                case "Software":
                    document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes.forEach(function (elem) {

                        if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Software/Firmware") {
                            elem.childNodes[0].click();
                        }
                    }.bind(this));

                    break;
                case "FAQ":
                    document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes.forEach(function (elem) {
                        if (elem.textContent.replace(/\(([^)]+)\)/g, "").trim() === "Support und FAQs") {
                            elem.childNodes[0].click();
                        }
                    }.bind(this));

                    break;
                default:
                    break;
            }
        }
    },
    // setObserverToResultList: function () {
    //     var addClassesToResultCards = this.addClassesToResultCards.bind(this);
    //     var observer = new MutationObserver(addClassesToResultCards);

    //     observer.observe(this.nodes.resultsList, {
    //         childList: true,
    //         subtree: true,
    //     });
    // },

    init: function () {
        if (document.readyState !== 'loading') {
            this.getNodes();
            this.initTabContainerSection();
            this.createTabs();
            // this.setObserverToResultList();
        } else {
            var _this = this;

            window.addEventListener('load', function () {
                _this.getNodes();
                _this.initTabContainerSection();
                _this.createTabs();
                // this.setObserverToResultList();
            });
        }
    },
};

UXD441.init();