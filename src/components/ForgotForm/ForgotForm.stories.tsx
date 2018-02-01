import React from 'react';

// tslint:disable-next-line:no-implicit-dependencies
import storiesOf from '../../../storybook/storiesOf';

import ForgotForm from './ForgotForm.component';

import BR from '@blueeast/bluerain-os';

const View = BR.Components.get('View');

storiesOf('ForgotForm', module)
  .add('Full width', () => (
    <ForgotForm />));

storiesOf('ForgotForm', module)
  .add('ForgotForm in a parent of 300px', () => (
    <View style={{alignItems:'center'}}><View style={{flex:1,width:300}}><ForgotForm /></View></View>));
