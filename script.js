const viewOnMobile = {
  input: null,
  url: null,
  parameterUrl: null,
  iframe: null,
  inputWrapper: null,
  init() {
    this.input = document.querySelector(".jsInputUrl");
    this.input.addEventListener("keydown", this.onKeyDown);
    this.iframe = document.querySelector(".jsIframe");
    this.inputWrapper = document.querySelector(".jsInputWrapper");
    this.url = this.getStoredUrl();
    this.parameterUrl = this.getUrlParameter();

    if (!!this.url) {
      this.onUrlProvided();
    }

    if (!!this.parameterUrl) {
      this.url = this.parameterUrl;
      this.storeUrl(this.url);
      this.onUrlProvided();
    }
  },
  storeUrl(url) {
    localStorage.url = url;
  },
  getStoredUrl() {
    return localStorage.url;
  },
  getUrlParameter() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const urlParam = url.searchParams.get("url");
    return urlParam;
  },
  onUrlProvided() {
    this.input.blur();
    this.iframe.src = this.url;
    this.input.value = this.url;
    this.hideInput();
    window.history.pushState("home", "View on Mobile", `/?url=${this.url}`);
  },
  hideInput() {
    this.inputWrapper.classList.add("active");
  },
  onKeyDown(e) {
    if (e.keyCode === 13 || e.key === "Enter") {
      const value = e.target.value;
      document.querySelector(".jsIframe").src = value;
      viewOnMobile.storeUrl(value);
      viewOnMobile.url = value
      viewOnMobile.onUrlProvided();
    }
  },
};

viewOnMobile.init();
