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
