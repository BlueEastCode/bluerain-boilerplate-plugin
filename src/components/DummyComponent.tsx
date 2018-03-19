import React from 'react';
import { BlueRain, BlueRainConsumer } from '@blueeast/bluerain-os';

const DummyComponent = (props: any) => (
	<BlueRainConsumer>
		{(BR: BlueRain) => (<BR.Components.Text>Hello, World! 😀 😎 👍 💯</BR.Components.Text>)}
	</BlueRainConsumer>
);

export default DummyComponent;
