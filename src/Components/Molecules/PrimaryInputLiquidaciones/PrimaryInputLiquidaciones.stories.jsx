import { fn } from '@storybook/test';

import  PrimaryInputLiquidaciones  from '@/Components/Molecules/PrimaryInputLiquidaciones/index.jsx';

export default {
    title: 'Components/Molecules/PrimaryInputLiquidaciones',
    component: PrimaryInputLiquidaciones,
    parameters: {
        layout: 'lefted',
    },
    argTypes: {
        labelText: { control: 'text' },
        propValue: { control: 'text' },
        propFnInput: { action: 'clicked' },
        propPlaceholder: { control: 'text' },
    },
    args: { onchange: fn() },
};

export const Primary = {
    args: {
      primary: true,
      label: 'Button',
      labelText: 'Label Text',
      propPlaceholder: 'Ingrese un valor',
    },
  };