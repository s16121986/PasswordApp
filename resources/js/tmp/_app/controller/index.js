import Controller from "./controller";
import Dashboard from "../view/dashboard";

export default class Index extends Controller {
	dashboard() {
		this.list(new Dashboard())
	}
}
