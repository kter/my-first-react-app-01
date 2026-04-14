import MyButton from './MyButton'
import { userEvent, within, expect, fn } from 'storybook/test';

export default {
  title: 'MyApp/MyButton',
  component: MyButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
      }}>
      <Story />
      </div>
    )
  ],
  argTypes: {
    primary: {
      type: 'boolean',
      description: 'Primary color',
    },
    backgroundcolor: {
      type: 'string',
      description: 'background color'
    },
    size: {
      type: 'enum',
      options: ['small', 'medium', 'large'],
      description: 'button size'
    },
    label: {
      type: 'string',
      description: 'button of caption'
    },
    onClick: {
      type: 'function',
      description: 'click handler',
    },
  },
};

// export const Index = {
//   render: () => <MyButton primary size="medium" label="Button" onClick={() => console.log('Hello, Storybook')} />
// };

export const Index = {
  args: {
    primary: true,
    size: 'medium',
    label: 'Button',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

// export const White = {
//   render: () => <MyButton size="small" label="Button" backgroundColor="#fff" />
// };
export const White = {
  args: {
    size: 'small',
    label: 'Button',
    backgroundColor: '#fff'
  }
};

export const Yellow = {
  args: {
    ...White.args,
    backgroundColor: 'lightyellow'
  }
};
