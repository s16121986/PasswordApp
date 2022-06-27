import Key from "./key";

(async () => {
	const keyTemp = '/OQ4MMjjP3gd+C3iRM0uqaYbSHBVc/r3/Wzra5xOeVc=';
	const key = new Key();
	await key.importKey(keyTemp);
	//console.log(key.key)
	const encrypted = 'eyJjaXBoZXIiOiIzTU9PdElkdURpNHpxOUpkcG96RmNtbllFUEhEcEJHOFBRPT0iLCJpdiI6InljRFFZa3lLdHVVL0Q2U3oifQ==';
	//const encrypted = await key.encrypt('test text');
	//console.log(encrypted);
	const decrypted = await key.decrypt(encrypted);
	console.log(decrypted);
})();
