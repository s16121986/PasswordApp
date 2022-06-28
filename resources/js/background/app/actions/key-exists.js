export default async function keyExists() {
	return app('encoder').hasKey();
}
