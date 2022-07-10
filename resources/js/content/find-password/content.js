import "../../common"
import Application from "../../app/app";
import Broadcast from "../../app/broadcast/broadcast";
import Data from "../../app/storage/data";
import Autocomplete from "./autocomplete";

async function execute() {
	new Application();

	app('broadcast', new Broadcast());
	app('data', new Data());

	await app('data').load();

	//console.log(location)

	const site = app('data').get('sites')
		.filter(s => s.passwords.count() > 0)
		.find(s => 0 === s.get('url').indexOf(location.origin));
	if (!site)
		return;

	const passwords = site.passwords;

	const autocomplete = new Autocomplete();

//if (passwords.count() === 1)
	autocomplete.fill(passwords.eq(0));
}

//self.addEventListener('load', async () => {
execute();
//});
//window === self;
