function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function hideElements() {
  const selectors = [
    'li[name="Settings Inboxes"]',
    'li[name="Settings Agent Bots"]',
    'li[name="Settings Automation"]',
    'li[name="Settings Macros"]',
    'li[name="Settings Integrations"]',
    'li[name="Reports Bot"]',
    'div[name="Portals"]',
    'div[name="Campaigns"]'
  ];

  selectors.forEach(function(selector) {
    document.querySelectorAll(selector).forEach(function(element) {
      if (element.tagName === 'DIV') {
        const liElement = element.closest('li');
        if (liElement) {
          liElement.style.display = 'none';
        }
      } else {
        element.style.display = 'none';
      }
    });
  });
}

function watchPathChange() {
  hideElements();

  window.addEventListener('popstate', function() {
    hideElements();
  });

  const pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    hideElements();
  };

  const replaceState = history.replaceState;
  history.replaceState = function() {
    replaceState.apply(history, arguments);
    hideElements();
  };
}

function execInjection() {
  const cookieValue = getCookie('cw_d_session_info');
  if (!cookieValue) {
    return;
  }

  const cookieParsed = JSON.parse(decodeURIComponent(cookieValue))

  if (cookieParsed.uid.endsWith("@skrip.dev")) {
    return;
  }

  watchPathChange();
}

execInjection();
