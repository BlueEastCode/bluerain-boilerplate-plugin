import React from 'react';

// tslint:disable-next-line:no-implicit-dependencies
import storiesOf from '../../../storybook/storiesOf';

import SignupForm from './SignupForm.component';

import BR from '@blueeast/bluerain-os';

const View = BR.Components.get('View');

storiesOf('SignupForm', module)
  .add('Full width', () => (
    <SignupForm />));

storiesOf('SignupForm', module)
  .add('SignupForm in a parent of 300px', () => (
    <View style={{alignItems:'center'}}><View style={{flex:1,width:300}}><SignupForm /></View></View>));
