import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-storyshots/register';
import '@storybook/addon-console';
import '@storybook/addon-viewport/register'
import 'storybook-readme/register';
import 'react-storybook-addon-props-combinations/register';
import 'storybook-addon-intl/register';
import 'storybook-addon-specifications/register';
import { configure } from '@storybook/react';
import 'storybook-chrome-screenshot/register';
import 'storybook-addon-styled-component-theme/dist/register';

setDefaults({
  // overwrite global defaults here
})

configure(() => {
  // ...
}, module)