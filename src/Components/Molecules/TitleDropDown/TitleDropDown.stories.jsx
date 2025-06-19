import { fn } from '@storybook/test';

import  TitleDropDown  from '@/Components/Molecules/TitleDropDown/index.jsx';

export default {
    title: 'Components/Molecules/TitleDropDown',
    component: TitleDropDown,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        propTitle: { control: 'text' },
        state: { control: 'boolean' },
    },
    args: { onchange: fn() },
};

export const Primary = {
    args: {
      primary: true,
      label: 'Button',
      propTitle: 'Text Title',
    },
  };