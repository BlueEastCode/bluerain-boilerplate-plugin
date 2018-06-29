// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { BlueRain, Plugin } from '@blueeast/bluerain-os';

/**
 * Add Redux state management to BlueRain Apps
 * @property {string} pluginName "---Name---"
 * @property {string} slug "---slug---"
 */
export default class DummyPlugin extends Plugin {
	static pluginName = '---Name---';
	static slug = '---slug---';

	static initialize(_config: {} = {}, _BR: BlueRain) {
		// tslint:disable-next-line:no-console
		console.log('Plugin initialized!');
	}
}
