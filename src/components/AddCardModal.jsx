import React from "react";
import { Modal } from "react-bootstrap";
import AddCard from "./AddCard";

function AddCardModal({ show, onHide, requestRender }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddCard onHide={onHide} requestRender={requestRender} />
      </Modal.Body>
    </Modal>
  );
}

export default AddCardModal;
