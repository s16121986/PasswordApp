export default function ArgumentRequired(argName) {
	this.code = 2;
	this.key = 'argument-required';
	this.message = 'Argument [' + argName + '] required';
}
