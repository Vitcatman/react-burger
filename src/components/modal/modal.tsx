import { useEffect, MouseEvent, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const portalContainer = document.getElementById("modal");

type TModal = {
  readonly close: (_?: MouseEvent) => void;
  readonly title?: string;
  readonly children: ReactNode;
}

const Modal: FC<TModal> = ({close, title, children}) => {
  useEffect(() => {
    const closeEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay close={close}/>
      <div className={styles.modal}>
        <h2 className={`${styles.title} mt-5 ml-10 text text_type_main-large`}>
          {title}
        </h2>
        <button className={styles.close_button} onClick={close}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    portalContainer!
  );
};


export default Modal;
