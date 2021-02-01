const viewOnMobile = {
  input: null,
  url: null,
  parameterUrl: null,
  iframe: null,
  inputWrapper: null,
  popWindowOpened: false,
  iframeWraper: null,
  messageElement: null,
  iframeWorked: true,
  init() {
    this.input = document.querySelector(".jsInputUrl");
    this.input.addEventListener("keydown", this.onKeyDown);
    this.iframe = document.querySelector(".jsIframe");

    this.iframe.onload = (event) => {
      const iframeWorked = event.target.contentWindow.window.length; // 0 or 1

      viewOnMobile.iframeWorked = !!iframeWorked;
      !!iframeWorked
        ? this.iframeWraper.classList.remove("got-cors")
        : this.onIframeNotWorked();
    };

    this.inputWrapper = document.querySelector(".jsInputWrapper");
    this.iframeWraper = document.querySelector(".jsIframeWrapper");
    this.messageElement = document.querySelector(".jsMessage");

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
    window.history.pushState("home", "View on Mobile", `?url=${this.url}`);
  },
  onIframeNotWorked() {
    this.iframeWraper.classList.add("got-cors");
    this.messageElement.innerHTML =
      "I'm opening this site in a popup window :)";
    !this.popWindowOpened && this.openPopupWindow();
    setTimeout(() => {
      this.messageElement.innerHTML = `The mobile site is open in a popup window. You closed it? <span onclick="viewOnMobile.openPopupWindow()"> Just open it again.</span> :)`;
    }, 3000);
    this.popWindowOpened = true;
  },
  openPopupWindow() {
    window.open(
      this.url,
      "_blank",
      "location=yes,height=736,width=414,scrollbars=yes,status=yes"
    );
  },
  hideInput() {
    this.inputWrapper.classList.add("active");
  },
  onKeyDown(e) {
    viewOnMobile.popWindowOpened = false;

    if (e.keyCode === 13 || e.key === "Enter") {
      const value = e.target.value;
      document.querySelector(".jsIframe").src = value;
      viewOnMobile.storeUrl(value);
      viewOnMobile.url = value;
      viewOnMobile.onUrlProvided();
      this.iframeWraper.classList.remove("got-cors");
    }
  },
};

viewOnMobile.init();
