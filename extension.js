function scrapeHTMLTag(tagName) {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const tags = iframeDocument.getElementsByTagName(tagName);
      Array.from(tags).forEach(tag => {
        console.log(tag.innerText); // Do whatever you want with the tag here
      });
    });
  }
  
  // Call the function to scrape <p> tags
  scrapeHTMLTag('p');