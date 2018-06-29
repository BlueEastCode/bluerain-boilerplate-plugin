import DummyComponent from '../../src/components/DummyComponent';
import React from 'react';
import storiesOf from '@blueeast/bluerain-storybook-addon';

storiesOf('DummyComponent', module)
  .add('Simple', () => <DummyComponent />);
