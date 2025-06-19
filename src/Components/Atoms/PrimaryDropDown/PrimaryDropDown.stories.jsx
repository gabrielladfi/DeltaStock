import  PrimaryDropDown  from '@/Components/Atoms/PrimaryDropDown/index.jsx';

export default {
    title: 'Components/Atoms/PrimaryDropDown',
    component: PrimaryDropDown,
    parameters: {
        layout: 'lefted',
    },
    tags:[ 'autodocs'],
    argTypes: {
        propOptions: { control: 'array' },
        propName: { control: 'text' },
        propValue: { control: 'text' },
        propOnchangeFn: { action: 'clicked' },
        propOnFocusFn: { action: 'clicked' },
        propPlaceholderOption: { control: 'text' },
    },
};

export const Primary = {
    args: {
        propPlaceholderOption: 'Ingrese un valor',
        propOptions: [{id: 0, value: 'Opcion 1'}, {id: 1, value: 'Opcion 2'}, {id: 2, value: 'Opcion 3'}],
        propName: 'propName',
        propValue: 'propValue',
        propOnchangeFn: () => console.log('select option'),
        propOnFocusFn: () => console.log('focus'),
    },
  };