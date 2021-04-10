# Modal

This component uses the **useDelayClass** hook to animate a modal in and out. Since this is done with SSR, an additional step is required to have the modal work using a portal because it cannot be pre-rendered:

```tsx
// Delay for creating  modal
useEffect(() => {
  setIsBrowser(true);
}, [setIsBrowser]);

if (isBrowser) {
  return ReactDOM.createPortal(
    ModalContent,
    document.getElementById('modal-root')!
  );
} else {
  return null;
}
```

This modal has a set styling and renders the children within it as content.

## Index

1. [usage](#usage)
2. [props](#props)

## Usage

```tsx
<Modal show={!openModal} onOverlayClick={() => setOpenModal(false)}>
  <ModalContent />
</Modal>
```

In this example we use a **state** property to display or hide the modal. Rendering/animation logic is handled internally. The content shown is whatever goes inside the modal.

## Props

```typescript
interface ModalProps {
  show: boolean;
  onOverlayClick?: () => any;
}
```

- show: Boolean value used to trigger rendering and animation of the modal.
- onOverlayClick: Optional prop used to determine what is to be done when a user clicks on the backdrop of the modal.
