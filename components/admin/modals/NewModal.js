// this modal is used for creating new records
import { useEffect, useContext } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { ModalCtx } from '../../../contextStore/modalCtx';
import CloseButton from '../buttons/CloseButton';
import SubmitButton from '../buttons/SubmitButton';
import MovieForm from '../movies/MovieForm';
import _ from 'lodash';

const NewModal = ({ src, selected, setSelected }) => {
  const modalValues = useContext(ModalCtx);

  useEffect(() => {
    modalValues.setShowModal(true);
  }, []);

  const closeModal = () => {
    modalValues.setShowModal(false);
    modalValues.setCreate(false);
    setSelected({});
  };

  let title = '';
  if (_.isEmpty(selected)) {
    title = 'Add New ';
  } else {
    title = 'Update ';
  }

  let formRender = null;
  let formId = null;

  switch (src) {
    case 'movie':
      title = `${title}  Movie`;
      formRender = <MovieForm selected={selected} closeModal={closeModal} />;
      formId = 'movieForm';
      break;

    default:
      break;
  }

  return (
    <>
      <Modal
        show={modalValues.showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        id="newRecord"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>{formRender}</Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton form={formId} />
          <CloseButton action={closeModal} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewModal;
