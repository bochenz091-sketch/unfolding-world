(() => {
  const preservedHash = window.location.hash;
  const nativeReplaceState = history.replaceState.bind(history);
  const dohaImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Doha_skyline_in_the_morning_%2812544910974%29_%28cropped%29.jpg/1280px-Doha_skyline_in_the_morning_%2812544910974%29_%28cropped%29.jpg";

  history.replaceState = (state, title, url) => {
    if (url === "#/" && preservedHash && preservedHash !== "#/") {
      return nativeReplaceState(state, title, `${location.pathname}${location.search}${preservedHash}`);
    }

    return nativeReplaceState(state, title, url);
  };

  function patchDohaImage() {
    const title = document.querySelector("#modal-title");
    const image = document.querySelector("#modal-image");

    if (!title || !image || title.textContent.trim() !== "Doha" || image.dataset.dohaPatch === "1") {
      return;
    }

    image.dataset.dohaPatch = "1";
    image.dataset.loadState = "loading";

    const preloader = new Image();
    preloader.decoding = "async";
    preloader.onload = () => {
      image.dataset.loadState = "loaded";
      image.src = dohaImage;
    };
    preloader.onerror = () => {
      image.dataset.loadState = "fallback";
    };
    preloader.src = dohaImage;
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
  });
})();
