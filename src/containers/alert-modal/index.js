import React from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';

// How to inject the store into a stateless component

const AlertModal = observer( ["store"], ({ store }) => {
  const { alert } = store.ux;
  return(
    <Modal
        className="global-alert-modal"
	size={alert.size}
        open={alert.open}
        onClose={() => alert.close()}
        basic={alert.basic}>
      <Header content={alert.title || 'Alert'} />
      <Modal.Content>
        <p>{alert.message}</p>
      </Modal.Content>
      <Modal.Actions>
	<Button color="green" onClick={() => alert.close()} inverted>
	  <Icon name='checkmark' /> Got it
	</Button>
      </Modal.Actions>
    </Modal>
  );
});

export default AlertModal;
