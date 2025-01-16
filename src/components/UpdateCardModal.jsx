import React from "react";
import { Modal } from "react-bootstrap";
import UpdateCard from "./updatCard";

function UpdatCardModal({ show, onHide, requestRender, card }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateCard
          onHide={onHide}
          requestRender={requestRender}
          initialCard={card} 
        />
      </Modal.Body>
    </Modal>
  );
}

export default UpdatCardModal;
