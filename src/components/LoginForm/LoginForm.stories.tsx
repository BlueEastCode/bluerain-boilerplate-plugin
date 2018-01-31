import React from 'react';

// tslint:disable-next-line:no-implicit-dependencies
import storiesOf from '../../../storybook/storiesOf';

import LoginForm from './LoginForm.component';

import BR from '@blueeast/bluerain-os';

const View = BR.Components.get('View');

storiesOf('LoginForm', module)
  .add('Full width', () => (
    <LoginForm />));

storiesOf('LoginForm', module)
  .add('LoginForm in a parent of 300px', () => (
    <View style={{alignItems:'center'}}><View style={{flex:1,width:300}}><LoginForm /></View></View>));
