document.getElementById('fetchStock').addEventListener('click', fetchStockPrice);

function fetchStockPrice() {
    const symbol = document.getElementById('stockSymbol').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data['Time Series (1min)']) {
                const timeSeries = data['Time Series (1min)'];
                const latestTime = Object.keys(timeSeries)[0];
                const latestData = timeSeries[latestTime];
                const price = latestData['1. open'];
                document.getElementById('result').innerText = `Latest price of ${symbol}: $${price}`;
            } else {
                document.getElementById('result').innerText = 'Stock not found or invalid symbol.';
            }
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            document.getElementById('result').innerText = 'Error fetching data.';
        });
}
