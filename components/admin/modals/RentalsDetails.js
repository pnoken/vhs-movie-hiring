import { useContext, useEffect } from 'react';
import { Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { ModalCtx } from '../../../contextStore/modalCtx';
import { formatCurrency, formatDateTime } from '../../../utils/shared';
import CloseButton from '../buttons/CloseButton';

const RentalDetails = ({ selected, setSelected }) => {
  const modalValues = useContext(ModalCtx);

  console.log(selected);

  useEffect(() => {
    modalValues.setShowModal(true);
  }, []);

  const closeModal = () => {
    modalValues.setShowModal(false);
    modalValues.setDetails(false);
    setSelected({});
  };
  return (
    <>
      <Modal
        show={modalValues.showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        id="rentalDetails"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Table striped bordered hover responsive>
                  <tr>
                    <th
                      className="text-white "
                      style={{ background: '#101644' }}
                    >
                      <h6>Date</h6>
                    </th>
                    <td>
                      <h6>{formatDateTime(selected.createdAt)}</h6>
                    </td>
                  </tr>
                  <tr>
                    <th
                      className="text-white "
                      style={{ background: '#101644' }}
                    >
                      <h6>Customer</h6>
                    </th>
                    <td>
                      <h6>{selected.user.username}</h6>
                    </td>
                  </tr>
                  <tr>
                    <th
                      className="text-white "
                      style={{ background: '#101644' }}
                    >
                      <h6>Movie(s)</h6>
                    </th>
                    <td>
                      {selected.movies.map((movie, index) => (
                        <h6 key={index}>
                          <span>
                            <b>Title:</b> {movie.name}
                          </span>
                          <div className="clearfix mt-2"></div>
                          <span>
                            <b>Price:</b> {formatCurrency(movie.price)}
                          </span>
                          <div className="clearfix mt-2"></div>
                          <span>
                            <b>Qty:</b> {movie.quantity}
                          </span>
                          {/* <hr /> */}
                        </h6>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <th
                      className="text-white "
                      style={{ background: '#101644' }}
                    >
                      <h6>Total Price</h6>
                    </th>
                    <td>
                      <h6> {formatCurrency(selected.total_cost)}</h6>
                    </td>
                  </tr>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <CloseButton action={closeModal} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RentalDetails;
