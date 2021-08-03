let isBitprecoOpen = async (tabs) => {
	/* function that verify if bitpreco is open */

	/* gets a promisse the tabs of the open windows in the browser */
	let querying_tabs = browser.tabs.query({});

	let is_bitpreco_open = await querying_tabs.then(
		/* if the promise succeeds then */
		
		(tabs) => {
			let open_tabs = [];

			/* add the url of the tabs to open tabs list */
			for (let tab of tabs) {
				open_tabs.push(tab.url);
			}

			/* return the current state of bitpreco as a boolean promisse */
			if (open_tabs.includes('https://market.bitpreco.com/trade')) {
				return true;	
			
			} else {
				return false;
			};

		}).catch(
			/* if it fails then log the error message (kinda useless) */
			(e) => {console.log(e)}

		);

	return is_bitpreco_open;


};

let openBitpreco = (tabs) => {
	/* insert wholesome code here */

	/* opens bitpreco in a new tab */
	browser.tabs.create({url: 'https://market.bitpreco.com/trade'});
}

let getBitcoinPrice = () => {
	/* insert wholesome code here */

}

let playAudio = () => {
	/* insert wholesome code here */

}

let main = () => {
	/* the desired price to play a sound when reached */
	let desired_price = 190000;

	let verifing_bitpreco_open = isBitprecoOpen()
		.then(is_bitpreco_open => {
		/* If bitpreco is not open opens it */

		if (! is_bitpreco_open ) {
			openBitpreco();
		
		}
	});

	/* after opening bitpreco if it's not open get the bitcoin price and if it equal or bellow the deired price play a sound */
	verifing_bitpreco_open
	.finally( e => {
		if (getBitcoinPrice() < desired_price) {
			playAudio();
		}
	});
}

main()