import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { FC, MouseEvent } from "react";

type TModalOverlay = {
  readonly close: (_:MouseEvent) => void
}

const ModalOverlay: FC<TModalOverlay> = ({close}) => {
  return <div className={styles.overlay} onClick={close} />;
};

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
