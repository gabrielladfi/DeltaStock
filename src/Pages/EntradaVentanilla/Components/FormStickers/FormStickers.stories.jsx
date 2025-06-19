import FormStickers from '@/Pages/EntradaVentanilla/Components/FormStickers';

export default {
  title: 'Ruta/Componente',
  component: FormStickers,
  argTypes: {
    propFnForm: { action: 'propFnForm called' }, // Función de callback simulada
    propLabel: { control: 'text' },              // Texto editable en Storybook
    propTextButton: { control: 'text' },
    propFnInputData: { action: 'propFnInputData called' },
    propInputName: { control: 'text' },
    propValueInput: { control: 'text' },
    propTitleForm: { control: 'text' },
    propFnCloseForm: { action: 'propFnCloseForm called' },
  },
};

const Template = (args) => <FormStickers {...args} />;

export const Default = Template.bind({});
Default.args = {
  propTitleForm: 'Título del formulario',
  propLabel: 'Fecha de Entrada',
  propTextButton: 'Generar Sticker',
  propInputName: 'nombre',
  propValueInput: 'Valor inicial',
  propFnForm: () => console.log('Formulario enviado'),
  propFnInputData: () => console.log('Datos de entrada'),
  propFnCloseForm: () => console.log('Formulario cerrado'),
};
