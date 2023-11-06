let isClicked = 0;

function releaseClick () {
  setTimeout(function () {
    isClicked = 0;
  }, 2000);
}

function waitForElement (querySelector, timeout) {
  return new Promise ((resolve, reject) => {
    let timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver (() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true, 
      subtree: true
    });
    if (timeout) timer = setTimeout (() => {
      observer.disconnect();
      reject();
    }, timeout);
  });
}