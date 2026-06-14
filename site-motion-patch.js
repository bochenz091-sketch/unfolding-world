(() => {
  const preservedHash = window.location.hash;
  const nativeReplaceState = history.replaceState.bind(history);
  const dohaImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Doha_skyline_in_the_morning_%2812544910974%29_%28cropped%29.jpg/1280px-Doha_skyline_in_the_morning_%2812544910974%29_%28cropped%29.jpg";
  const dohaLocalImage = "assets/destinations/doha.jpg";
  const domesticImageRoot = "assets/destinations";
  const domesticImageTimeout = 2200;
  const remoteImageTimeout = 5800;

  history.replaceState = (state, title, url) => {
    if (url === "#/" && preservedHash && preservedHash !== "#/") {
      return nativeReplaceState(state, title, `${location.pathname}${location.search}${preservedHash}`);
    }

    return nativeReplaceState(state, title, url);
  };

  function shouldPreferDomesticAssets() {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("assets");

    if (requestedMode === "remote") {
      return false;
    }

    if (requestedMode === "local" || params.get("cn") === "1") {
      return true;
    }

    if (window.location.protocol === "file:") {
      return false;
    }

    return !/(^|\.)github\.io$/i.test(window.location.hostname);
  }

  function requestFrame(callback) {
    if (typeof window.requestAnimationFrame === "function") {
      return window.requestAnimationFrame(callback);
    }

    return window.setTimeout(callback, 16);
  }

  function installRouteWatchGuard() {
    if (typeof window.requestAnimationFrame !== "function") {
      return;
    }

    const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
    let routeWatchTimer = 0;

    window.requestAnimationFrame = (callback) => {
      if (typeof callback === "function" && callback.name === "watchRouteHash") {
        if (!routeWatchTimer) {
          routeWatchTimer = window.setInterval(() => callback(performance.now()), 300);
        }

        return routeWatchTimer;
      }

      return nativeRequestAnimationFrame(callback);
    };
  }

  function installPointerMoveGuard() {
    const nativeAddEventListener = EventTarget.prototype.addEventListener;
    const guardedListeners = new WeakMap();

    EventTarget.prototype.addEventListener = function patchedAddEventListener(type, listener, options) {
      const shouldGuard = type === "pointermove"
        && typeof listener === "function"
        && this instanceof Element
        && (this.id === "map-canvas" || this.id === "terrain-map");

      if (!shouldGuard) {
        return nativeAddEventListener.call(this, type, listener, options);
      }

      if (!guardedListeners.has(listener)) {
        let frame = 0;
        let lastEvent = null;
        guardedListeners.set(listener, function guardedPointerMove(event) {
          lastEvent = event;

          if (frame) {
            return;
          }

          frame = requestFrame(() => {
            frame = 0;
            listener.call(this, lastEvent);
          });
        });
      }

      return nativeAddEventListener.call(this, type, guardedListeners.get(listener), options);
    };
  }

  function normalizeSlug(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getRouteSlug() {
    return normalizeSlug(window.location.hash.replace(/^#\//, "").split("/")[0] ?? "");
  }

  function getDomesticImageUrl(slug) {
    return `${domesticImageRoot}/${slug}.jpg`;
  }

  function patchDomesticModalImage() {
    if (!shouldPreferDomesticAssets()) {
      return;
    }

    const title = document.querySelector("#modal-title");
    const image = document.querySelector("#modal-image");

    if (!title || !image) {
      return;
    }

    const slug = getRouteSlug() || normalizeSlug(title.textContent);

    if (!slug || image.dataset.domesticSlug === slug) {
      return;
    }

    const localImage = getDomesticImageUrl(slug);

    if (image.getAttribute("src") === localImage) {
      image.dataset.domesticSlug = slug;
      return;
    }

    image.dataset.domesticSlug = slug;

    const preloader = new Image();
    const timeout = window.setTimeout(() => {
      preloader.onload = null;
      preloader.onerror = null;
    }, domesticImageTimeout);

    preloader.decoding = "async";
    preloader.onload = () => {
      window.clearTimeout(timeout);
      image.dataset.loadState = "loaded";
      image.src = localImage;
    };
    preloader.onerror = () => {
      window.clearTimeout(timeout);
    };
    preloader.src = localImage;
  }

  function getDohaImageCandidates() {
    return shouldPreferDomesticAssets() ? [dohaLocalImage, dohaImage] : [dohaImage];
  }

  function patchDohaImage() {
    const title = document.querySelector("#modal-title");
    const image = document.querySelector("#modal-image");

    if (!title || !image || title.textContent.trim() !== "Doha" || image.dataset.dohaPatch === "1") {
      return;
    }

    image.dataset.dohaPatch = "1";
    image.dataset.loadState = "loading";

    function tryCandidate(index) {
      const imageUrl = getDohaImageCandidates()[index];

      if (!imageUrl) {
        image.dataset.loadState = "fallback";
        return;
      }

      const preloader = new Image();
      const timeout = window.setTimeout(() => {
        preloader.onload = null;
        preloader.onerror = null;
        tryCandidate(index + 1);
      }, index === 0 && shouldPreferDomesticAssets() ? domesticImageTimeout : remoteImageTimeout);

      preloader.decoding = "async";
      preloader.onload = () => {
        window.clearTimeout(timeout);
        image.dataset.loadState = "loaded";
        image.src = imageUrl;
      };
      preloader.onerror = () => {
        window.clearTimeout(timeout);
        tryCandidate(index + 1);
      };
      preloader.src = imageUrl;
    }

    tryCandidate(0);
  }

  function registerDomesticCache() {
    if (!("serviceWorker" in navigator) || window.location.protocol === "file:") {
      return;
    }

    if (!shouldPreferDomesticAssets() && new URLSearchParams(window.location.search).get("sw") !== "1") {
      return;
    }

    navigator.serviceWorker.register("./domestic-cache-sw.js", { scope: "./" }).catch(() => {
      // Service worker support varies across embedded browsers; the site remains fully usable.
    });
  }

  function settleMobileOpener() {
    if (window.innerWidth > 760 || !document.body.classList.contains("is-opening-atlas")) {
      return;
    }

    window.finishLuxuryOpener?.();
  }

  window.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(settleMobileOpener, 3600);

    const observer = new MutationObserver(patchDohaImage);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    patchDohaImage();
    patchDomesticModalImage();
    new MutationObserver(patchDomesticModalImage).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "hidden"]
    });
    registerDomesticCache();
  });

  installRouteWatchGuard();
  installPointerMoveGuard();
})();
