import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

// How to inject the store into a stateless component

const AlertModal = observer( ["store"], ({ store }) => {
  const { ux } = store;
  return(
    <Modal
        className="global-alert-modal"
	bsSize={ux.modalSize}
        show={ux.modalOpen}
        onHide={() => ux.alertClose()}
        aria-labelledby="ModalHeader">
      <Modal.Header closeButton>
        <Modal.Title id='ModalHeader'>{ux.modalTitle || 'Alert'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{ux.modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
	<Button onClick={() => ux.alertClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AlertModal;
