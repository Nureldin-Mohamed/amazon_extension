const insertPriceComparison = async () => {
    const productId = window.location.pathname.match(/\/dp\/(\w+)/)[1];
    const dataKey = `prices-${productId}`;

    // Check if data already exists in storage
    chrome.storage.local.get([dataKey], function(result) {
        if (result[dataKey]) {
            displayPriceComparison(result[dataKey]);
        } else {
            // Fetch new data if not in storage
            fetch(`https://yourapi.com/getPrices?productId=${productId}`)
                .then(response => response.json())
                .then(prices => {
                    chrome.storage.local.set({[dataKey]: prices}, function() {
                        displayPriceComparison(prices);
                    });
                })
                .catch(error => {
                    console.error('Error fetching price data:', error);
                    // Display error message to the user
                });
        }
    });
};

const displayPriceComparison = (prices) => {
    const priceDiv = document.createElement('div');
    priceDiv.id = 'price-comparison';
    priceDiv.innerHTML = `<strong>Price Comparison:</strong> ${JSON.stringify(prices)}`;
    document.body.appendChild(priceDiv);
};

if (/\/dp\/\w+/.test(window.location.href)) {
    insertPriceComparison();
}
