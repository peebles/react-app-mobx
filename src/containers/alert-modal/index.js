import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

// How to inject the store into a stateless component

const AlertModal = observer( ["store"], ({ store }) => {
  const { alert } = store.ux;
  return(
    <Modal
        className="global-alert-modal"
	bsSize={alert.size}
        show={alert.open}
        onHide={() => alert.close()}
        aria-labelledby="ModalHeader">
      <Modal.Header closeButton>
        <Modal.Title id='ModalHeader'>{alert.title || 'Alert'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{alert.message}</p>
      </Modal.Body>
      <Modal.Footer>
	<Button onClick={() => alert.close()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AlertModal;
