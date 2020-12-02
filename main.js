var APCG16765 = {
  config: {
    childList: true,
    subtree: true,
    attributes: true,
  },

  selectors: {
    buttonsWrapperWithChatBotSelector: ".USC_stickyButtonsWrapper__2-oTJ",
    cookieNotificationSelector: ".sdl-message-cookie-notification",
  },
  getNodes: function () {
    this.nodes = {
      buttonsWrapperWithChatBot: document.querySelector(
        this.selectors.buttonsWrapperWithChatBotSelector
      ),
      cookieNotification: document.querySelector(
        this.selectors.cookieNotificationSelector
      ),
    };
  },

  replaceChatBot: function () {
    console.log("===================================================");
    if (this.nodes.cookieNotification.classList.contains("hide")) {
      this.nodes.buttonsWrapperWithChatBot.classList.remove("toUp");
    } else {
      this.nodes.buttonsWrapperWithChatBot.classList.add("toUp");
    }
  },

  setObserverToResultList: function () {
    var replaceChatBot = this.replaceChatBot.bind(this);
    var observer = new MutationObserver(replaceChatBot);

    observer.observe(this.nodes.cookieNotification, this.config);
  },
  init: function () {
    if (document.readyState !== "loading") {
      this.getNodes();
      this.replaceChatBot();
      this.setObserverToResultList();
    } else {
      var _this = this;
      window.addEventListener("load", function () {
        _this.getNodes();
        _this.replaceChatBot();
        _this.setObserverToResultList();
      });
    }
  },
};
APCG16765.init();
