# useSSRMultistep

This hook bootstraps with **useResizeDetector** and allows for the creation of multi step/page forms or content while leveraging the benefits of SSR/ISA/SSG. The multi-step works like a film camera where you have a window and a strip of film. The frames creates the strip, the strip is shown by the window depending on the selected frame.

Window > Strip > Frame

The window can be resized dynamically, the width value is used to set the width value of each frame which enlarges the strip. Once a frame is triggered/moved, the strip is moved to accomodate the frame that should be displayed. Each frame has a preset opacity animation which is set to 0 and transitioned to 1 if the frame is selected. The content uses the **visiblity** property to move between visible and hidden which disables tab interaction and undesired DOM interaction.

Crawlers indexing your page will be able to read the entirety of your content and the behaviour when users interact with the page emulates the behaviour of a CSR app.

## Index

1. [Usage](#usage)
2. [Config Options](#config-options)
3. [Possible Type Issues](#possible-type-issues)

## Usage

```tsx
const {
  frame,
  setFrame,
  ref,
  windowStyles,
  stripStyles,
  frameStyles,
} = useSSRMultistep({ minWidth: 288, maxWidth: 592 });
```

```tsx
const Component: FC = () => {
  const {
    frame,
    setFrame,
    ref,
    windowStyles,
    stripStyles,
    frameStyles,
  } = useSSRMultistep({ minWidth: 288, maxWidth: 592 });

  return (
    <div style={windowStyles} ref={ref}>
      <div style={stripStyles}>
        <div style={frameStyles(0)}>
          <button onClick={() => setFrame(frame + 1)}>Next Step</button>
          <Step1Content />
        </div>
        <div style={frameStyles(1)}>
          <button onClick={() => setFrame(frame + 1)}>Next Step</button>
          <button onClick={() => setFrame(frame - 1)}>Previous Step</button>
          <Step2Content />
        </div>
        <div style={frameStyles(2)}>
          <button onClick={() => setFrame(frame - 1)}>Previous Step</button>
          <Step3Content />
        </div>
      </div>
    </div>
  );
};

export default Component;
```

To use this hook you need 3 containers:

1. The top level container, **window** uses **windowStyles** and **NEEDS** to have the **ref** property. This is what is used to get the width of the container dynamically to resize the frames and strip.
2. The second container, **strip** uses **stripStyles** and arranges the frames in a row and holds the _transition_ & _tranform_ properties to move between pieces of content.
3. The third container, **frame** uses the **frameStyles()** function to set the base styles and hold effects/styles that are applied when the frame value matches the number of the frame that is currently going to be displayed.

- The **frame** property is used to manage the styles and behaviour of the strip and frame. This determines how much the strip should be moved and what frame is the one being displayed.
- The **setFrame** function allows you to move between frames, the logic for style changes is handled by the hook internally.

In this example you have buttons to change the frame in each **frame** and its content beneath it. The **window** has a minWidth of 288px and a maxWidth of 592px. Clicking the buttons will move the strip along, you could jump between further frames by using a hardcoded value in **setFrame**.

Ideally **setFrame** would be passed to the component in the frame as a prop so that it can be used to handle navigation between frames internally.

## Config Options

```typescript
interface SSRMultistepConfig {
  minWidth: number;
  maxWidth: number;
  transition?: number;
}

const defaultValues = {
  transition: 0.3,
};
```

- minWidth: This property sets the minWidth of the window.
- maxWidth: This property sets the maxWidth of the window.
- transition: This property sets the transition time used for moving the strip and fading-in/out the content of each frame.

## Possible Type Issues

This hook uses inline styles, React uses the **CSSProperties** interface, but it might be missing the **visibility** property as a vaild **style** object property. To fix this, create a **css.d.ts** file with the following content:

```typescript
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    visibility?: string;
  }
}
```

This allows you to extend valid properties for inline styles when using TypeScript with React.
