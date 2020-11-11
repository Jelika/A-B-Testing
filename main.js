var UXD547 = {
  config: {
    bannerPngURL: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/Banner-1180x200.png',
    contactsLogosURLs: {
      apple: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/SE_Employee-35x35.svg',
      linkedIn: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/Linkedin-35x35.svg',
      schnider: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/SE_Employee-35x35.svg',
      facebook: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/Facebook-35x35.svg',
    },
    benefitsIconsURLs: {
      action: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/action_paste-50x50.svg',
      cloud: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/cloud_download-50x50.svg',
      light: 'https://raw.githubusercontent.com/Jelika/A-B-Testing/UXD-547/assets/light_on-50x50.svg',
    },
    mediaURLs: [
      '<a class="icon-linkedin" onclick="invokeProcessLI()" target="_blank" title="LinkedIn" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-apple" id="apple" onclick="invokeProcessAP();" title="Apple" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-Schnider" onclick="invokeProcessPng()" target="_blank" title="Schneider-Electric Employee Login" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',
      '<a class="icon-facebook" id="fb" onclick="invokeProcessFB();" title="Facebook" xtm-t="A" xtm-n="<js:sei_stat.app>::%n::social::</jsfunc:sei_stat.loginSocial>"></a>',

    ],
  },

  selectors: {
    emailFieldWrapperSelector: '.form-group.padd-bt-7',
    registerTextSelector: '.text-center',
    registerLinkSelector: '.text-center > a',
    mySchneiderBlockSelector: '.td-cell',
    privacyNoticeSelector: '.privacy-notice',
    nextBtnSelector: '.form-group:nth-child(2)',
    benefitsSelector: '.application-group>.td-cell',
    mainBannerSelector: '.signup-cove-position',
  },

  getNodes: function () {
    this.nodes = {
      emailFieldWrapper: document.querySelector(this.selectors.emailFieldWrapperSelector),
      registerText: document.querySelector(this.selectors.registerTextSelector),
      registerLink: document.querySelector(this.selectors.registerLinkSelector),
      mySchneiderBlock: document.querySelector(this.selectors.mySchneiderBlockSelector),
      privacyNotice: document.querySelector(this.selectors.privacyNoticeSelector),
      nextBtn: document.querySelector(this.selectors.nextBtnSelector),
      benefits: document.querySelector(this.selectors.benefitsSelector),
      mainBanner: document.querySelector(this.selectors.mainBannerSelector),
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

  createBenefits: function () {
    this.nodes.benefits.innerHTML = '<div class="uxd-547-benefits_container">' +
      '<h2 class="benefits_header">Enjoy all benefits of a Schneider Electric account!</h2>' + ' <div class="benefits_list">' +
      '<div class="benefits_item" ><div class="benefit-svg"></div><div class="description"><h5 class="benefits_title">Instant access and support</h5>' +
      '<p>Get access to our online chat, training, and business services customized for you, anywhere, anytime.</p></div></div>' +
      '<div class="benefits_item"><div class="benefit-svg"></div><div class="description"><h5 class="benefits_title">Key data in one place</h5>' +
      '<p>Find the right products with catalogs, selectors, and configurators, in just a few clicks.</p></div></div>' +
      '<div class="benefits_item"><div class="benefit-svg"></div><div class="description"><h5 class="benefits_title">Personalized experience</h5>' +
      '<p> Organize your homepage content the way that works for you.</p></div></div></div> </div>';
  },
  createImgBanner: function () {
    var _this = this;
    var imgContainer = document.createElement('div');
    imgContainer.className = 'uxd-547-banner-container';

    fetch(_this.config.bannerPngURL).then(function (res) {
      return res.blob();
    }).then(function (png) {
      var bannerImg = document.createElement('img');
      bannerImg.className="banner-img";
      var objURL = URL.createObjectURL(png);
      bannerImg.src = objURL;
      imgContainer.append(bannerImg);
      _this.nodes.mainBanner.prepend(imgContainer);
    });
  },

  createContactMedia: function () {
    var _this = this;

    var contactsLInks = document.createElement('ul');
    var continueWithContainer = document.createElement('div');
    var continueWithHeader = document.createElement('p');
    contactsLInks.className = 'uxd-547-contacts';
    continueWithHeader.className = 'UXD-547-paragraph';
    continueWithHeader.innerText = 'Or continue with';
    continueWithContainer.append(continueWithHeader);
    Promise.all([
      fetch(_this.config.contactsLogosURLs.apple),
      fetch(_this.config.contactsLogosURLs.linkedIn),
      fetch(_this.config.contactsLogosURLs.schnider),
      fetch(_this.config.contactsLogosURLs.facebook),
    ]).then(function (responses) {
      Promise.all(
        responses.map(function (res) {
          return res.text();
        })
      ).then(function (svgs) {
        svgs.forEach(function (svg, i) {
          var contactLink = document.createElement('li');
          contactLink.className = 'uxd-547-media';
          contactLink.innerHTML = _this.config.mediaURLs[i];
          contactLink.childNodes[0].insertAdjacentHTML('afterbegin', svg);
          contactsLInks.append(contactLink);
        });
      }).then(function () {
        continueWithContainer.append(contactsLInks);
        _this.nodes.nextBtn.insertAdjacentElement("afterEnd", continueWithContainer);
      });
    });
    this.createBenefits();
    this.createImgBanner();
    Promise.all([
      fetch(_this.config.benefitsIconsURLs.light),
      fetch(_this.config.benefitsIconsURLs.cloud),
      fetch(_this.config.benefitsIconsURLs.action),
    ]).then(function (responses) {
      Promise.all(
        responses.map(function (res) {
          return res.text();
        })
      ).then(function (svgs) {
        svgs.forEach(function (svg, i) {
          document.querySelectorAll('.benefit-svg')[i].insertAdjacentHTML('afterbegin', svg);
        });
      });
    });
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