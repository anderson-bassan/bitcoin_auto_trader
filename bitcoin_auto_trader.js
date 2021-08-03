let openBitpreco = async (tabs) => {
	console.log('\t\t\tinside openbitpreco...');

	browser.tabs.create({url: 'https://market.bitpreco.com/'});

	return true;
}

let isBitprecoOpen = async (tabs) => {

	/* creates a promisse that searchs for bitpreco tabs */
	let querying_tabs = browser.tabs.query({url: 'https://market.bitpreco.com/*'});

	/* returns true if it finds any open bitpreco tabs, false otherwise */
	return querying_tabs.then((tab) => {

		/* if the number of open tabs in https://market.bitpreco.com is bigger than 0 return true */
		return tab.length > 0 ? true : false; 

	}).catch((err) => {
		
		/* if querying tabs fails logs a message */
		console.log(err);

	});

}

let getBitcoinPrice = async (tabs) => {

	/* verifies if bitpreco is open */
	let guarantees_bitpreco_is_open =  isBitprecoOpen().then(is_open => {
		if (!is_open ) {
			return openBitpreco().then(e => e);
		} else {
			return true;
		}
	
	});

	let gets_bitpreco_tab_id =  guarantees_bitpreco_is_open.then(() => {
		let gets_bitpreco_tab_id = browser.tabs.query({url: 'https://market.bitpreco.com/*'}).then(tab => tab[0]);

		return gets_bitpreco_tab_id;
	});

	let get_bitcoin_price = gets_bitpreco_tab_id.then((tab, tabs) => {
		// let hilights_tab = browser.tabs.highlight({tabs: [tab.index],windowId: tab.WindowId});
		// hilights_tab.then(e => console.log(e));

		let get_current_btc_price_code = `document.querySelectorAll('#root div div header div div div:nth-of-type(2) div')[6].innerText.slice(16).replace('.', '').replace(',', '.');`;

		let run_code_in_tab = browser.tabs.executeScript(tab.id, {code: get_current_btc_price_code});
		
		run_code_in_tab.then(e => {return e});

		return run_code_in_tab;

	});

	return get_bitcoin_price;

};

let main = async (tabs) => {
	getBitcoinPrice().then(e => console.log('get bitcoin price -> ', e[0]));

};

main();