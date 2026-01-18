const market = document.querySelector("#markets");
let data;

async function getCrypto() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&price_change_percentage=1h%2C24h%2C7d&page=1&per_page=20&sparkline=false&x_cg_demo_api_key=CG-MoDGHaqpMYsAZUxhKVGcoGEk');
        if (res.ok) {
            data = await res.json();
            console.log(data);
            

            function generateTable(data) {
                const tBody = document.querySelector("#markets-body");

                //clear existing rows
                tBody.textContent = "";

                for (let coin of data) {
                    // creating a new row in the table
                    const row = document.createElement("tr");
                    
                    //creates a div for coin info & adds class for them
                    const coinDiv = document.createElement("div");
                    coinDiv.classList.add("coin-info");

                    //creates image and cell element, after appends the image to the cell
                    const coinLogo = document.createElement("td");
                    const coinImg = document.createElement("img");
                    coinImg.src = `${coin.image}`;
                    coinLogo.append(coinImg);
                    coinImg.classList.add("pic");

                    const coinName = document.createElement("td");
                    coinName.textContent = `${coin.name}`;
                    const coinSymbol = document.createElement("td");
                    coinSymbol.textContent = `${coin.symbol}`;
                    
                    //appends cells to row
                    coinDiv.append(coinLogo, coinName, coinSymbol);
                    row.append(coinDiv);

                    //create formatting for the numbers
                    const currencyFormatter = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0
                    });
                    
                    const percentageFormatter = new Intl.NumberFormat('en-US', {
                        //style: 'percent',
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1
                    });

                    //
                    const coinPrice = document.createElement("td");
                    const rawPrice = coin.current_price;
                    const formattedPrice = currencyFormatter.format(rawPrice);
                    coinPrice.textContent = formattedPrice;
                    

                    //
                    const coin24h = document.createElement("td");
                    const raw24h = coin.price_change_percentage_24h_in_currency;
                    const formatted24h = percentageFormatter.format(raw24h);

                    //
                    if (raw24h < 0) {
                        coin24h.classList.add("negative");
                    } else {
                        coin24h.classList.add("positive");
                    }

                    coin24h.textContent = formatted24h + "%";

                    const coin1h = document.createElement("td");
                    const raw1h = coin.price_change_percentage_1h_in_currency;
                    const formatted1h = percentageFormatter.format(raw1h);

                    if (raw1h < 0) {
                        coin1h.classList.add("negative");
                    } else {
                        coin1h.classList.add("positive");
                    }

                    coin1h.textContent = formatted1h + "%";

                    const coin7d = document.createElement("td");
                    const raw7d = coin.price_change_percentage_7d_in_currency;
                    const formatted7d = percentageFormatter.format(raw7d);

                    if (raw7d < 0) {
                        coin7d.classList.add("negative");
                    } else {
                        coin7d.classList.add("positive");
                    }

                    coin7d.textContent = formatted7d + "%";

                    //creates market cap's cell, takes the raw amount, formats it and adds it to the cell
                    const coinMarketCap = document.createElement("td");
                    const rawMarketCap = coin.market_cap;
                    const formattedMarketCap = currencyFormatter.format(rawMarketCap);
                    coinMarketCap.textContent = formattedMarketCap;


                    row.append(coinPrice, coin1h, coin24h, coin7d, coinMarketCap);
                    tBody.append(row);
                    

            
                }
            }

            //calling the function to generate the data of the currencies in the table
            generateTable(data);

        } else if (res.status === 503) {
            console.error("Service is currently unavailable. Try again later.");
            //display it to user
        } else if (res.status === 400) {
            console.error("Invalid request, server was unable to process your request.");
            //display it to user
        } else if (res.status === 429) {
            console.error("Too many requests");
        }
        
    } catch (error) {
        console.log("Error:", error);
    }
}

getCrypto();
setInterval(() => {
    getCrypto();
}, 5 * 60 * 1000);

let inputOptions = [];

const inputSearch = document.querySelector("#search");
const suggestions = document.querySelector("#suggestions");

inputSearch.addEventListener("input", () => {
    const lower = inputSearch.value.trim().toLowerCase();

    //resetting
    inputOptions = [];
    suggestions.textContent = "";

    if (lower === "") return;

    //filters data
    for (let coin of data) {
        const name = coin.name.toLowerCase();
        const symbol = coin.symbol.toLowerCase();
        
        
        if (name.includes(lower) || symbol.includes(lower)) {
            inputOptions.push(coin);
            //console.log(inputOptions);
        }
    }

    //renders to suggestions
     for (let coin of inputOptions) {
            const item = document.createElement("div");;
            item.textContent = `${coin.name} (${coin.symbol})`;
            suggestions.append(item);
        }
        console.log(suggestions);
});