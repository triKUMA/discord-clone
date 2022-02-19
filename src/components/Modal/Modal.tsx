import { ReactNode, useEffect, useState } from "react";
import "./styles/Modal.css";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  active: boolean;
  handleDisable: () => void;
  children?: ReactNode;
}

function Modal(props: ModalProps) {
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (props.active) setModalActive(true);
  }, [props.active]);

  function disableModal() {
    props.handleDisable();
    setTimeout(() => {
      setModalActive(false);
    }, 150);
  }

  return (
    <>
      {modalActive && (
        <div
          className={
            "modal-container" + (!props.active && modalActive ? " disable" : "")
          }
          onClick={() => disableModal()}
          id={"modal"}
        >
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {props.children}
            <IoMdClose
              className="close-button"
              onClick={() => disableModal()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
