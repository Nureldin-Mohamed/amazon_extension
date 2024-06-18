chrome.action.onClicked.addListener((tab) => {
  // Check if the URL is an Amazon product page
  if (tab.url && /amazon\.\w+\/dp\/\w+/.test(tab.url)) {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
      });
  } else {
      console.log("Not an Amazon product page.");
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Not on Amazon',
        message: 'The price checker extension works only on Amazon product pages.'
    });
  }
});
