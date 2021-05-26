import { useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';

import { ModalCtx } from '../../../contextStore/modalCtx';
import { Movies } from '../../../utils/apiEndpoint';
import { DELETE } from '../../../utils/request';
import notify from '../../../utils/toast';
import { Store } from '../../../contextStore';
import { STORETYPES } from '../../../utils/shared';

const ConfirmModal = ({ src, selected, setSelected }) => {
  const modalValues = useContext(ModalCtx);
  const { state: movieState, dispatch } = useContext(Store);

  useEffect(() => {
    modalValues.setShowModal(true);
  }, []);

  const closeModal = () => {
    modalValues.setShowModal(false);
    modalValues.setConfirm(false);
    setSelected({});
  };

  const handleConfirm = async () => {
    let url;
    switch (src) {
      case 'movie':
        url = Movies.adminMovies;
        break;
      default:
        break;
    }
    try {
      const resp = await DELETE(`${url}/${selected._id}`);
      console.log('Delete resp ' + JSON.stringify(resp));
      if (resp.statusText === 'OK') {
        dispatch({
          type: STORETYPES.MOVIES,
          payload: _.filter(movieState.movies, movie => {
            return movie._id != selected._id;
          }),
        });
        notify().success(resp.data.message);
        closeModal();
      }
    } catch (error) {
      console.log('error ' + error);
    }
  };

  return (
    <Modal
      show={modalValues.showModal}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      id="confirmDelete"
    >
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">
          You are about to delete a record. This action cannot be reverted.
          <br />
          <b> Do you want to continue?</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark btn-sm" onClick={closeModal}>
          NO
        </Button>
        <Button variant="danger btn-sm" onClick={handleConfirm}>
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
