import { BlueRain, Plugin } from '@blueeast/bluerain-os';
/**
 * Add Redux state management to BlueRain Apps
 * @property {string} pluginName "---Name---"
 * @property {string} slug "---slug---"
 */
export default class DummyPlugin extends Plugin {
    static pluginName: string;
    static slug: string;
    static initialize(_config: {} | undefined, _BR: BlueRain): void;
}
