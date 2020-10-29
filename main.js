var UXD441 = {
    config: {
        // linkToAPCHomePage: 'https://www.apc.com/us/en',
    },

    selectors: {
        allResultsContentSelector: '.se-col-md-12',
        oldFilterSectionSelector: '.subcategory-item__body',
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

    tabsClick: function (element) {
        var filterHeader = element.innerText;
        switch (filterHeader) {
            case "Alle Seite":
                this.nodes.allOldFilters.forEach(function (elem) {

                })

                break;
            case "Produkte":
                this.nodes.allOldFilters.forEach(function (elem) {
                    if (elem.innerText === "Produktbereiche" || elem.innerText === "Datenblätter") {
                        elem.click();
                    }
                })

                break;
            case "Unterlagen":
                this.nodes.allOldFilters.forEach(function (elem) {
                    if (elem.innerText === "CAD & Zeichnung" || elem.innerText === "Kataloge und Benutzerhandbücher" || elem.innerText === "Technische Informationen") {
                        elem.click();
                    }
                })

                break;
            case "Software":
                this.nodes.allOldFilters.forEach(function (elem) {
                    if (elem.innerText === "Software/Firmware") {
                        elem.click();
                    }
                })

                break;
            case "FAQ":
                this.nodes.allOldFilters.forEach(function (elem) {
                    if (elem.innerText === "Support und FAQs") {
                        elem.click();
                    }
                })

                break;
            default:
                break;
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