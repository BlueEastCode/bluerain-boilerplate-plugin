import React from 'react';
import { storiesOf } from '@blueeast/bluerain-storybook-addon';

import DummyComponent from '../../src/components/DummyComponent';

storiesOf('DummyComponent', module)
  .add('Simple', () => <DummyComponent />);
