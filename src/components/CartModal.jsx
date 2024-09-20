// CartModal.jsx
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      id="modal"
      ref={dialog}
      className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="overflow-auto max-h-80 mb-4">
        <Cart />
      </div>
      <form
        method="dialog"
        id="modal-actions"
        className="flex justify-end space-x-4"
      >
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
