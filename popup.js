document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('price-container');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = new URL(tabs[0].url);
        const productId = url.pathname.match(/\/dp\/(\w+)/)[1];
        const dataKey = `prices-${productId}`;

        chrome.storage.local.get([dataKey], function(result) {
            if (result[dataKey]) {
                container.innerHTML = `Prices: ${JSON.stringify(result[dataKey])}`;
            } else {
                container.innerHTML = 'No price data available.';
            }
        });
    });
});
