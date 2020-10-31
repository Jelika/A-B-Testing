var UXD441 = {
    config: {
        // linkToAPCHomePage: 'https://www.apc.com/us/en',
    },

    selectors: {
        allResultsContentSelector: '.se-col-md-12',
        oldFilterSectionSelector: '.subcategory-item__body',
        activeOldFiltersSelector: '.se_checkbox_is-active_span',
        tabsSelector: '.uxd-441-category-item__head',
        resultsListSelector: '.results:last-child',
        filterBlockSelector: '.filter-lvl1',
        categoriesHeaderSelector: '.categories-header',

    },

    constants: {
        tabsArray: ["Alle Seite", "Produkte", "Unterlagen", "Software", "FAQ"],
    },

    getNodes: function () {
        this.nodes = {
            allResultsContent: document.querySelector(this.selectors.allResultsContentSelector),
            allOldFilters: document.querySelector(this.selectors.oldFilterSectionSelector).firstChild.childNodes,
            resultsList: document.querySelector(this.selectors.resultsListSelector),
            filterBlock: document.querySelector(this.selectors.filterBlockSelector),
            categoriesHeader: document.querySelector(this.selectors.categoriesHeaderSelector),
        };
    },

    initTabContainerSection: function () {
        this.nodes.tabsContainer = document.createElement('section');
        this.nodes.tabsContainer.className = 'uxd-441-section-tabs';
        this.nodes.allTabsContainer = document.createElement('div');
        this.nodes.allTabsContainer.className = 'tabs-container';
        this.nodes.allTabsContainer.addEventListener('click', function (event) { this.tabsClick(event.target); }.bind(this));
        this.nodes.tabsContainer.append(this.nodes.allTabsContainer);
        if (!document.querySelector('.tabs-container')) { this.nodes.allResultsContent.insertAdjacentElement('beforebegin', this.nodes.tabsContainer); }
    },
    hideFilterContainer: function () {
        this.nodes.filterBlock.classList.add('uxd-441-hidden');
        this.nodes.categoriesHeader.classList.add('uxd-441-hidden');
    },
    createTabs: function () {
        this.constants.tabsArray.forEach(function (elem, index) {
            var tabItem = document.createElement('div');
            var tabItemInner = document.createElement('h6');
            tabItemInner.className = 'uxd-441-category-item__heading';
            tabItemInner.innerText = elem;
            if (!sessionStorage.getItem('currentFilter')) {
                sessionStorage.setItem('currentFilter', "Alle Seite");
            }
            if (elem === sessionStorage.getItem('currentFilter')) {
                tabItem.className = 'uxd-441-category-item__head active';
            }
            else { tabItem.className = 'uxd-441-category-item__head'; }

            tabItem.append(tabItemInner);
            this.nodes.allTabsContainer.insertAdjacentElement('beforeend', tabItem);
        }.bind(this));
    },

    tabsClick: function (clickedElement) {
        var filterHeader = clickedElement.innerText;
        var searchText = document.querySelector('.sdl-header-se_search-field').value;
        var urlString = '';
        if (!clickedElement.classList.contains('active') && !clickedElement.parentNode.classList.contains('active')) {
            if (clickedElement.classList.contains('uxd-441-category-item__head')) {
                clickedElement.classList.add('active');
            } else { clickedElement.parentNode.classList.add('active'); }

            switch (filterHeader) {
                case "Alle Seite":
                    urlString = 'https://www.se.com/de/de/search/' + searchText + '?multifilter=';
                    location.assign(urlString);
                    break;
                case "Produkte":
                    urlString = 'https://www.se.com/de/de/search/' + searchText + '?multifilter=Produktbereiche%2CDatenblätter';
                    location.assign(urlString);
                    break;
                case "Unterlagen":
                    urlString = 'https://www.se.com/de/de/search/' + searchText + '?multifilter=CAD+%26+Zeichnung%2CKataloge+und+Benutzerhandbücher%2CTechnische+Informationen';
                    location.assign(urlString);
                    break;
                case "Software":
                    urlString = 'https://www.se.com/de/de/search/' + searchText + '?multifilter=Software%2FFirmware';
                    location.assign(urlString);
                    break;
                case "FAQ":
                    urlString = 'https://www.se.com/de/de/search/' + searchText + '?multifilter=Support+und+FAQs';
                    location.assign(urlString);
                    break;
                default:
                    break;
            }
        }
        sessionStorage.setItem('currentFilter', filterHeader);
    },

    addClassesToResultCards: function () {
        this.nodes.resultsList
            .querySelectorAll(this.selectors.resultCardsSelector)
            .forEach(function (card) {
                card.classList.add('uxd-441-primary');
            });
    },

    setObserverToResultList: function () {
        var addClassesToResultCards = this.addClassesToResultCards.bind(this);
        var observer = new MutationObserver(addClassesToResultCards);

        observer.observe(this.nodes.resultsList, {
            childList: true,
            subtree: true,
        });
    },

    init: function () {
        if (document.readyState !== 'loading') {
            this.getNodes();
            this.hideFilterContainer();
            this.initTabContainerSection();
            this.createTabs();
            this.setObserverToResultList();
        } else {
            var _this = this;

            window.addEventListener('load', function () {
                _this.getNodes();
                _this.hideFilterContainer();
                _this.initTabContainerSection();
                _this.createTabs();
                _this.setObserverToResultList();
            });
        }
    },
};

UXD441.init();