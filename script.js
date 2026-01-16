const market = document.querySelector("#markets");

async function getCrypto() {
    try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false");
        if (res.ok) {
            const data = await res.json();
            console.log(data);

            
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