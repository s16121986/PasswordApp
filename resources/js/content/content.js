import "../common"
import Application from "../app/app";
import Broadcast from "../app/broadcast/broadcast";
import Data from "../app/storage/data";
import Cache from "./cache";
import Autocomplete from "./autocomplete";

async function loadData() {
	await app('data').load();
	dataLoaded = true;
}

let dataLoaded = false;

self.addEventListener('load', async () => {
	new Application();

	app('broadcast', new Broadcast());
	app('data', new Data());
	app('cache', new Cache());

	let data;
	const cacheData = await app('cache').read();
	if (cacheData) {
		data = JSON.parse(cacheData);
	} else {
		await loadData();

		const sites = app('data').get('sites');
		data = {
			sites: sites
				.filter(s => s.passwords.count() > 0)
				.map(s => s.get('url'))
		};

		await app('cache').write(JSON.stringify(data));
	}

	console.log(location, data.sites)
	const siteFound = data.sites.find(url => 0 === url.indexOf(location.origin));
	if (!siteFound)
		return;

	if (!dataLoaded)
		await loadData();

	const site = app('data').get('sites').find(s => 0 === s.get('url').indexOf(location.origin));
	if (!site)
		return;

	const passwords = site.passwords;

	const autocomplete = new Autocomplete();

	//if (passwords.count() === 1)
		autocomplete.fill(passwords.eq(0));
});
//window === self;
