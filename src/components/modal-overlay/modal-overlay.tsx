import styles from "./modal-overlay.module.css";
import { FC, MouseEvent } from "react";

type TModalOverlay = {
  readonly close: (_:MouseEvent) => void
}

const ModalOverlay: FC<TModalOverlay> = ({close}) => {
  return <div className={styles.overlay} onClick={close} />;
};

export default ModalOverlay;
