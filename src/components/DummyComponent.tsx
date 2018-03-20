import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain-os';
import React from 'react';

const DummyComponent = () => (
	<BlueRainConsumer>
		{(BR: BlueRain) => (<BR.Components.Text>Hello, World! 😀 😎 👍 💯</BR.Components.Text>)}
	</BlueRainConsumer>
);

export default DummyComponent;
