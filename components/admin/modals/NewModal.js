// this modal is used for creating new records
import { useEffect, useContext } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { ModalCtx } from '../../../contextStore/modalCtx';
import CloseButton from '../buttons/CloseButton';
import SubmitButton from '../buttons/SubmitButton';
import MovieForm from '../movies/MovieForm';
import RentalForm from '../rentals/RentalForm';
import _ from 'lodash';
import UserForm from '../users/UserForm';

const NewModal = ({ src, selected, setSelected }) => {
  const modalValues = useContext(ModalCtx);

  useEffect(() => {
    modalValues.setShowModal(true);
  }, []);

  const closeModal = () => {
    modalValues.setShowModal(false);
    modalValues.setCreate(false);
    if (setSelected) setSelected({});
  };

  let title = '';
  if (_.isEmpty(selected)) {
    title = 'Add New ';
    if (src === 'rental') title = 'Rent a movie out';
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
    case 'user':
      title = `${title}  User`;
      formRender = <UserForm selected={selected} closeModal={closeModal} />;
      formId = 'userForm';
      break;
    case 'rental':
      title = `${title}`;
      formRender = <RentalForm closeModal={closeModal} />;
      formId = 'rentalForm';
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
