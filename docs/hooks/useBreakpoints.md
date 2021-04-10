# useBreakpoints

This hook bootstraps with **react-responsive** to share values for mobile, tablet, and desktop sizing across your application. It defaults to using min-width but can be overwritten to use max-width queries instead. Component specific breakpoints can be set in the hook using the config object.

This rendering/un-rendering happens dynamically on resizing on the screen, allowing you to test layouts with browser devTools without having to do a refresh.

## Index

1. [Usage](#usage)
2. [Config Options](#config-options)

## Usage

```tsx
const { isMobile, isTablet, isDesktop } = useBreakpoints();
```

```tsx
const Component: FC = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoints();

  return (
    <>
      {isMobile && <p>I will render on mobile</p>}
      {isTablet && <p>I will render on tablet</p>}
      {isDesktop && <p>I will render on desktop</p>}
    </>
  );
};

export default Component;
```

In this example the component is rendered by default, visible is set with a 1ms delay (default), and the component is unrendered with a 200ms delay (default). The component will apply the fade-in styles on mounting and will fade-out when the toggle is clicked. This will work seemlessy with a transition property set at 0.2s.

## Config Options

```typescript
const defaultValues = {
  minWidth: true,
  mobile: 320,
  tablet: 600,
  desktop: 1024,
};
```

- minWidth: Used to toggle between minWidth and maxWidth queries.
- mobile: Used to set the mobile pixel breakpoint.
- tablet: Used to set the tablet pixel breakpoint.
- desktop: Used to set the desktop pixel breakpoint.
