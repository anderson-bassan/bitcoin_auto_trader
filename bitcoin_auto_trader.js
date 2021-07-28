/* gets the HTML code from bitpreco 10 times per second*/
setInterval(() => fetch('https://market.bitpreco.com/trade').then(r => r.text()).then(data => console.log(data)), 1000);