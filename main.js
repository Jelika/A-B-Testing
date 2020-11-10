var UXD547 = {
  config: {
    contactsLogosURLs: {
      apple: 'https://raw.githubusercontent.com/lobanyov/A-B-testing/master/UXD-570-multivariate-header/C/assets/Schneider.svg?token=AMWUZCIANVSQTOLCGTEHAAC7RGEQM',
      schnider: 'https://schneider.atlassian.net/7508c9c0-dc78-4cb4-a56d-0b876cd4a329', 
      facebook: 'https://schneider.atlassian.net/c45397c1-fbde-4df4-a110-f0ce2afa2614',
      linkedIn: 'https://schneider.atlassian.net/7e3e4e9a-ce16-4211-85c6-7b1f2e415d0c',
    },
    mediaURLs: [
      '<a class="icon-apple" id="apple" onclick="invokeProcessAP();" title="Apple" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-Schnider" onclick="invokeProcessPng()" target="_blank" title="Schneider-Electric Employee Login" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-facebook" id="fb" onclick="invokeProcessFB();" title="Facebook" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-linkedin" onclick="invokeProcessLI()" target="_blank" title="LinkedIn" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
    ],
  },

  selectors: {
    emailFieldWrapperSelector: '.form-group.padd-bt-7',
    registerTextSelector: '.text-center',
    registerLinkSelector: '.text-center > a',
    mySchneiderBlockSelector: '.td-cell',
    privacyNoticeSelector: '.privacy-notice',
    nextBtnSelector:'.form-group:nth-child(2)',
  },

  getNodes: function () {
    this.nodes = {
      emailFieldWrapper: document.querySelector(this.selectors.emailFieldWrapperSelector),
      registerText: document.querySelector(this.selectors.registerTextSelector),
      registerLink: document.querySelector(this.selectors.registerLinkSelector),
      mySchneiderBlock: document.querySelector(this.selectors.mySchneiderBlockSelector),
      privacyNotice: document.querySelector(this.selectors.privacyNoticeSelector),
      nextBtn: document.querySelector(this.selectors.nextBtnSelector),
    };
  },

  insertElementsIntoForm: function () {
    var p = document.createElement('p');
    p.textContent = 'Enter your email address to get started';
    p.className = 'UXD-547-paragraph';
    this.nodes.emailFieldWrapper.insertAdjacentElement('beforebegin', p);
    this.nodes.registerText.style.display = 'none';

    var registrationBtn = document.createElement('button');
    registrationBtn.className = 'UXD-547-registration-btn';
    registrationBtn.textContent = 'New to Schneider Electric? Create an account';
    registrationBtn.href = '#';
    this.nodes.mySchneiderBlock.insertAdjacentElement('afterend', registrationBtn);

    var helpLink = document.createElement('a');
    helpLink.className = 'UXD-547-help-link';
    helpLink.textContent = 'Need Help?';
    helpLink.href = '#';
    this.nodes.privacyNotice.insertAdjacentElement('afterend', helpLink);

    // Add listener to registration button
    var cb = this.registrationBtnHandler.bind(this);
    registrationBtn.addEventListener('click', cb);
  },

  registrationBtnHandler: function () {
    this.nodes.registerLink.click();
  },
  createContactMedia: function () {
    var _this = this;

    var contactsLInks = document.createElement('ul');
    var continueWithContainer=document.createElement('div');
    var continueWithHeader=document.createElement('p');
    contactsLInks.className = 'uxd-547-contacts';
    continueWithHeader.className='UXD-547-paragraph';
    continueWithHeader.innerText='Or continue with';
    continueWithContainer.append(continueWithHeader);
    Promise.all([
      fetch(this.config.contactsLogosURLs.apple),
      fetch(this.config.contactsLogosURLs.schnider),
      fetch(this.config.contactsLogosURLs.facebook),
      fetch(this.config.contactsLogosURLs.linkedIn),
    ]).then(function (responses) {
      Promise.all(``
        responses.map(function (res) {
          return res.text();
        })
      ).then(function (svgs) {
        svgs.forEach(function (svg, i) {
          var contactLink = document.createElement('li');
          contactLink.className = 'uxd-547-media';
          contactLink.innerHTML(_this.config.mediaURLs[i]);
          contactLink.childNodes[0].insertAdjacentHTML('afterbegin', svg);
          contactsLInks.append(contactLink);
        });
      });
    });
    continueWithContainer.append(contactsLInks);
    this.nodes.nextBtn.insertAdjacentElement("afterEnd",continueWithContainer);
  },

  init: function () {
    if (document.readyState !== 'loading') {
      this.getNodes();
      this.insertElementsIntoForm();
      this.createContactMedia();
    } else {
      var _this = this;

      window.addEventListener('load', function () {
        _this.getNodes();
        _this.insertElementsIntoForm();
        _this.createContactMedia();
      });
    }
  },
};

UXD547.init();