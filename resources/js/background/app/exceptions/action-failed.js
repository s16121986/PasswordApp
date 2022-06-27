export default function ActionFailed(actionName) {
	this.key = 'action-failed';
	this.message = 'Action [' + actionName + '] failed';
}
