const green = '#00b909'; 
const red = '#dc1212';

const transparentGreen = '#ccf1ce';
const transparentRed = '#f8d0d0';

function updatePrice(elementId, newPrice) {
    const priceElement = document.getElementById(elementId);
    
    const pricePattern = /^\d{1,4}(\.\d{0,2})?$/; 

    if (pricePattern.test(newPrice)) {
        priceElement.innerText = parseFloat(newPrice).toFixed(2);
    }
}

function createChart(canvasElement, chartType, data, borderColor, backgroundColor, label) {
    new Chart(canvasElement, {
        type: chartType,
        data: {
            labels: data.map((_, index) => index + 1), // Creates a sequence of numbers as labels (1, 2, 3, ...)
            datasets: [{
                label: label,
                data: data,
                borderColor: borderColor,
                backgroundColor: backgroundColor, // Light red or light green
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                lineTension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: false, // Hides the x-axis
                    title: {
                        display: false // Hides the title of the x-axis
                    }
                },
                y: {
                    display: false, // Hides the y-axis
                    title: {
                        display: false // Hides the title of the y-axis
                    }
                }
            },
            plugins: {
                legend: {
                    display: false, // Hides the legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Price: $${context.raw.toFixed(2)}`; // Custom tooltip format
                        }
                    }
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const b30 = document.getElementById('bist30Chart').getContext('2d');
    const b100 = document.getElementById('bist100Chart').getContext('2d');
    
    const usd = document.getElementById('usdChart').getContext('2d');
    const eur = document.getElementById('eurChart').getContext('2d');

    const foil = document.getElementById('foilChart').getContext('2d');
    


    async function fetchBist30() {
        try {
            const currentChangeElement = document.getElementById('currentChangeB30');
    
            const changeValue = parseFloat(currentChangeElement.innerText);
    
            if (changeValue > 0) {
                currentChangeElement.classList.add('up');
            } else if (changeValue < 0) {
                currentChangeElement.classList.add('down');
            }
    
            const response = await fetch("../../data/b30.json");
            const data = await response.json();
    
            const updates = data.updates;
            const prices = updates.map(update => parseFloat(update.price.replace(/,/g, '')));
    
            console.log('Prices:', prices);
            if (prices.length < 2) {
                return;
            }
    
            const lastPrice = prices[prices.length - 1];
            const lineColor = lastPrice > prices[prices.length - 2] ? green : red; 
            const backgroundColor = lastPrice > prices[prices.length - 2] ? transparentGreen : transparentRed; 
    
            updatePrice('currentPriceB30', lastPrice);
    
            createChart(b30, 'line', prices, lineColor, backgroundColor, 'Bist 30');
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    async function fetchBist100() {
        try {

            const currentChangeElement = document.getElementById('currentChangeB100');

            const changeValue = parseFloat(currentChangeElement.innerText);
    
            if (changeValue > 0) {
                currentChangeElement.classList.add('up');
            } else if (changeValue < 0) {
                currentChangeElement.classList.add('down');
            }
            const response = await fetch("../../data/b100.json");
            const data = await response.json();
            
            const updates = data.updates;
            const prices = updates.map(update => parseFloat(update.price.replace(/,/g, '')));
    
            console.log('Prices:', prices);
            if (prices.length < 2) {
                return;
            }

            const lastPrice = prices[prices.length - 1];
            const secondLastPrice = prices[prices.length - 2];
    
            const lineColor = lastPrice > secondLastPrice ? green : red; 
            const backgroundColor = lastPrice > secondLastPrice ? transparentGreen : transparentRed; 

            updatePrice('currentPriceB100',lastPrice);
    
            createChart(b100, 'line', prices, lineColor, backgroundColor, 'Bist 100');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    async function fetchUSD() {
        try {
            const currentChangeElement = document.getElementById('currentChangeUSD');

            const changeValue = parseFloat(currentChangeElement.innerText);
    
            if (changeValue > 0) {
                currentChangeElement.classList.add('up');
            } else if (changeValue < 0) {
                currentChangeElement.classList.add('down');
            }

            const response = await fetch("../../data/usd.json");
            const data = await response.json();
            
            // Extract updates from JSON
            const updates = data.updates;
            const prices = updates.map(update => parseFloat(update.price.replace(/,/g, '')));
    
            const lastPrice = prices[prices.length - 1];
            const lineColor = lastPrice > prices[prices.length - 2] ? green : red; 
            const backgroundColor = lastPrice > prices[prices.length - 2] ? transparentGreen : transparentRed; 
    

            updatePrice('currentPriceUSD',lastPrice);
    
            createChart(usd, 'line', prices, lineColor, backgroundColor, 'USD / TRY');
            
        } catch (error) {
            console.error('Error fetching Dow Jones data:', error);
        }
    }

    async function fetchEUR() {
        try {
            const currentChangeElement = document.getElementById('currentChangeEUR');

            const changeValue = parseFloat(currentChangeElement.innerText);
    
            if (changeValue > 0) {
                currentChangeElement.classList.add('up');
            } else if (changeValue < 0) {
                currentChangeElement.classList.add('down');
            }

            const response = await fetch("../../data/eur.json");
            const data = await response.json();
            
            // Extract updates from JSON
            const updates = data.updates;
            const prices = updates.map(update => parseFloat(update.price.replace(/,/g, '')));
    
            const lastPrice = prices[prices.length - 1];
            const lineColor = lastPrice > prices[prices.length - 2] ? green : red; 
            const backgroundColor = lastPrice > prices[prices.length - 2] ? transparentGreen : transparentRed; 
    

            updatePrice('currentPriceEUR',lastPrice);
    
            console.log("eur "+lineColor)
            createChart(eur, 'line', prices, lineColor, backgroundColor, 'EUR / TRY');
        } catch (error) {
            console.error('Error fetching Dow Jones data:', error);
        }
    }

    async function fetchFOIL() {
        try {
            const currentChangeElement = document.getElementById('currentChangeFOIL');

            const changeValue = parseFloat(currentChangeElement.innerText);
    
            if (changeValue > 0) {
                currentChangeElement.classList.add('up');
            } else if (changeValue < 0) {
                currentChangeElement.classList.add('down');
            }
            const response = await fetch("../../data/foil.json");
            const data = await response.json();
            
            // Extract updates from JSON
            const updates = data.updates;
            const prices = updates.map(update => parseFloat(update.price.replace(/,/g, '')));
    
            const lastPrice = prices[prices.length - 1];
            const lineColor = lastPrice > prices[prices.length - 2] ? green : red; 
            const backgroundColor = lastPrice > prices[prices.length - 2] ? transparentGreen : transparentRed; 
    

            updatePrice('currentPriceFOIL',lastPrice);
    
            console.log("foil "+lineColor)
            createChart(foil, 'line', prices, lineColor, backgroundColor, 'FOIL');
        } catch (error) {
            console.error('Error fetching Dow Jones data:', error);
        }
    }


    // Fetch data and create the chart initially
    fetchBist30();
    fetchBist100();
    fetchUSD();
    fetchEUR();
    fetchFOIL()


    // Optionally, set an interval to refresh the chart
    setInterval(fetchBist30, 60000); // Refresh every 60 seconds
});
