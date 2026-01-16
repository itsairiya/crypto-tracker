const market = document.querySelector("#markets");

async function getCrypto() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=layer-1&price_change_percentage=1h%2C24h%2C7d&page=1&per_page=20&sparkline=false&x_cg_demo_api_key=CG-MoDGHaqpMYsAZUxhKVGcoGEk');
        if (res.ok) {
            const data = await res.json();
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
                    coinLogo.classList.add("pic");

                    const coinName = document.createElement("td");
                    coinName.textContent = `${coin.name}`;
                    const coinSymbol = document.createElement("td");
                    coinSymbol.textContent = `${coin.symbol}`;

                    //appends cells to row
                    coinDiv.append(coinLogo, coinName, coinSymbol);
                    row.append(coinDiv);

                    //creates cells for price
                    const coinPrice = document.createElement("td");
                    coinPrice.textContent = `${coin.current_price}`;

                    //creates % change cells
                    const coin24h = document.createElement("td");
                    coin24h.textContent = `${coin.price_change_percentage_24h_in_currency}`;

                    const coin1h = document.createElement("td");
                    coin1h.textContent = `${coin.price_change_percentage_1h_in_currency}`;

                    const coin7d = document.createElement("td");
                    coin7d.textContent = `${coin.price_change_percentage_7d_in_currency}`;

                    //creates market cap's cell
                    const coinMarketCap = document.createElement("td");
                    coinMarketCap.textContent = `${coin.market_cap}`;



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