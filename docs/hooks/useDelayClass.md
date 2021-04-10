# useDelayClass

This hook allwos for delayed class setting and unsetting as well as dynamic rendering and un-rendering of components. This allows mainly 2 things:

1. Dynamic rendering and unrendering of components without interrupting fade-in/out animations.
2. Delayed animation on page load for SPA behavior emulation on SSR/SSG page navigation.

## Index

1. [Dynamic rendering with animations](#dynamic-rendering-with-animations)
2. [Delayed Animation](#delayed-animation)
3. [Config Options](#config-options)

## Usage

### Dynamic rendering with animations

```tsx
const { visible, render } = useDelayClass();
```

- **visible**: boolean used to set/un-set a class for animations.
- **render**: booleand used to conditionally render/un-render a component.

```tsx
const Component: FC = () => {
  const [show, setShow] = useState(true);
  const { visible, render } = useDelayClass({ show });

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {render && (
        <div className={`${visible ? styles.fadeIn : ''}`}>
          <Content />
        </div>
      )}
    </>
  );
};

export default Component;
```

In this example the component is rendered by default, visible is set with a 1ms delay (default), and the component is unrendered with a 200ms delay (default). The component will apply the fade-in styles on mounting and will fade-out when the toggle is clicked. This will work seemlessy with a transition property set at 0.2s.

### Delayed Animation

This use case is much simpler and requires no configuration on the hook.

```tsx
const Component: FC = () => {
  const [show, setShow] = useState(true);
  const { visible } = useDelayClass();

  return (
    <div className={`${visible ? styles.active : ''}`}>
      <Content />
    </div>
  );
};
```

In this example the active class is set 1ms after the component renders. This will apply the animation once when the component is rendered. This is especially usefull for setting **active** classes on navbar items using the route they are matched to.

## Config Options

```typescript
const defaultValues = {
  show: true,
  startDelay: 1,
  unrenderDelay: 200,
};
```

- show: Used to toggle the visible and render properties returned by the hook.
- startDelay: How long after **show** is true the visible boolean is toggled.
- unrenderDelay: How long after **show** is false will the component be un-rendered.
