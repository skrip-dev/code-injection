function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function hideElements() {
  const selectors = [
    'li[name="Settings Agent Bots"]',
    'li[name="Settings Automation"]',
    'li[name="Settings Macros"]',
    'li[name="Settings Integrations"]',
    'li[name="Reports Bot"]',
    'div[name="Portals"]',
    'div[name="Campaigns"]',
    'a[href="/app/accounts/2/settings/inboxes/new"]',
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

  document.querySelectorAll('img[alt="Omnichannel"]').forEach(function(imgElement) {
    const targetDiv = imgElement.closest('div.h-full.w-full.bg-white');
    if (targetDiv) {
      targetDiv.style.display = 'none';
    }
  });

  if (window.location.pathname.endsWith('settings/inboxes/list')) {
    document.querySelectorAll("main > div > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div > button").forEach(function(element) {
      element.style.display = 'none';
    });
  }

  const hasTabsUl = !!document.querySelector('ul.tabs');
  const inInboxesSettings = window.location.pathname.includes('settings/inboxes');
  if (inInboxesSettings && hasTabsUl) {
    const tabToSelect = document.querySelector('main > div > div.flex-grow.flex-shrink.w-full.min-w-0.pl-0.pr-0.overflow-auto.settings.bg-n-solid-1 > div.pt-4.pb-0.px-8.border-b.border-solid.border-n-weak\\/60 > div > ul > li:nth-child(2) > a');
    if (tabToSelect) {
      tabToSelect.click();
    }

    document.querySelector('ul.tabs').style.display = 'none'

    const attrConversation = document.querySelector('main > div > div.flex-grow.flex-shrink.w-full.min-w-0.pl-0.pr-0.overflow-auto.settings.bg-n-solid-1 > div.mx-8 > div > div:nth-child(2)');
    if (attrConversation) {
      attrConversation.style.display = 'none';
    }
  }

  if (window.location.pathname.endsWith('settings/inboxes/new')) {
    window.location.pathname = '/';
  }
}

function hideElements2X() {
  const intervalId = setInterval(hideElements, 100);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 3000);
}

function watchPathChange() {
  hideElements2X();

  window.addEventListener('popstate', function() {
    hideElements2X();
  });

  const pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    hideElements2X();
  };

  const replaceState = history.replaceState;
  history.replaceState = function() {
    replaceState.apply(history, arguments);
    hideElements2X();
  };
}

function execInjection() {
  const cookieValue = getCookie('cw_d_session_info');
  if (!cookieValue) {
    return;
  }

  const cookieParsed = JSON.parse(decodeURIComponent(cookieValue))

  if (cookieParsed.uid.endsWith("@skrip.dev")) {
    console.log('Ignorando watchPathChange');
    return;
  }

  watchPathChange();
}

execInjection();
