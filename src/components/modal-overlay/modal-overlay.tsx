import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={() => props.close()}></div>;
};

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ModalOverlay;
