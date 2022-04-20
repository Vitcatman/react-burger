import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const portalContainer = document.getElementById("modal");

const Modal = (props) => {
  useEffect(() => {
    const closeEsc = (evt) => {
      if (evt.key === "Escape") {
        props.close();
      }
    };
    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay {...props} />
      <div className={styles.modal}>
        <h2 className={`${styles.title} mt-5 ml-10 text text_type_main-large`}>
          {props.title}
        </h2>
        <button className={styles.close_button} onClick={props.close}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </>,
    portalContainer!
  );
};

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
