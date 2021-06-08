import React from 'react';
import useForm from './useForm';
import { Button, Form, Alert, Row, Col } from 'react-bootstrap';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Route, Router, Link } from 'react-router-dom';
import { createMemoryHistory } from 'history';
//import momoimg from './../../public/assets/images/momo.png';
const history = createMemoryHistory();

const CreditCardForm = () => {
  const VisaPayment = () => {
    const { handleChange, handleFocus, handleSubmit, values, errors } =
      useForm();
    return (
      <div>
        <h6 className="mt-3" style={{ textAlign: 'center' }}>
          VISA PAYMENT OPTION
        </h6>
        <div className="creditCard mt-3">
          <Cards
            cvc={values.cardSecurityCode}
            expiry={values.cardExpiration}
            focused={values.focus}
            name={values.cardName}
            number={values.cardNumber}
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              id="cardName"
              data-testid="cardName"
              name="cardName"
              placeholder="Cardholder Name"
              value={values.cardName}
              onChange={handleChange}
              onFocus={handleFocus}
              isValid={errors.cname}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              id="cardNumber"
              data-testid="cardNumber"
              name="cardNumber"
              placeholder="Card Number (VISA Begins with 4)"
              value={values.cardNumber}
              onChange={handleChange}
              onFocus={handleFocus}
              isValid={errors.cnumber}
              maxLength="16"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="cardType"
                  id="cardType"
                  data-testid="cardType"
                  placeholder="Card Type"
                  value={values.cardType}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.ctype}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="cardExpiration"
                  data-testid="cardExpiration"
                  name="cardExpiration"
                  placeholder="Expiration Date"
                  value={values.cardExpiration}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cexp}
                  maxLength="4"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="cardSecurityCode"
                  data-testid="cardSecurityCode"
                  name="cardSecurityCode"
                  placeholder="Security Code"
                  value={values.cardSecurityCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.ccvv}
                  maxLength="3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  id="cardPostalCode"
                  data-testid="cardPostalCode"
                  name="cardPostalCode"
                  placeholder="Postal Code"
                  value={values.cardPostalCode}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cpostal}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Control
              type="number"
              id="amount"
              data-testid="amount"
              name="amount"
              placeholder="Amount"
              pattern="^\d*(\.\d{0,2})?$"
              value={values.amount}
              onChange={handleChange}
              onFocus={handleFocus}
              isValid={errors.amount}
              min={0.0}
              defaultValue={0.0}
              step="0.01"
            />
          </Form.Group>

          <Button
            size={'block'}
            data-testid="validateButton"
            id="validateButton"
            type="submit"
            style={{ width: '100%' }}
          >
            Pay
          </Button>
        </Form>
        <div className="mt-3" style={{ textAlign: 'center' }}>
          <Alert
            id="alertMessage"
            data-testid="alertMessage"
            variant={errors.variant}
            show={errors.show}
          >
            {errors.message}
          </Alert>{' '}
        </div>
      </div>
    );
  };
  const MobileMoney = () => {
    return (
      <div>
        <h6 className="mt-3" style={{ textAlign: 'center' }}>
          MOBILE MONEY PAYMENT OPTION
        </h6>
        {/* <div className="creditCard mt-3 mb-3" style={{textAlign:"center",margin:"0 auto"}}>
          <img src={momoimg} alt="Img" style={{width:"80%"}} />
       </div> */}
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              id="telephone"
              name="telephone"
              placeholder="Telephone"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              placeholder="Amount"
              pattern="^\d*(\.\d{0,2})?$"
              min={0.0}
              defaultValue={0.0}
              step="0.01"
            />
          </Form.Group>

          <Button size={'block'} type="submit" style={{ width: '100%' }}>
            Pay
          </Button>
        </Form>
        <div className="mt-3" style={{ textAlign: 'center' }}></div>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv mb-3">
            <h3 style={{ textAlign: 'center' }}>PAYMENT</h3> <hr />
            {/* <Router>
          <div style={{textAlign:"center"}}>
          <Link to="/"><button type="button" className="btn btn-outline-primary mr-2">VISA OPTION</button></Link>
          <Link to="/mobilemoney"><button type="button" className="btn btn-outline-secondary ml-2">MOBILE MONEY</button></Link>
          </div>

              <div>
                <Route path="/" exact component={VisaPayment} />
                <Route path="/mobilemoney" component={MobileMoney} />  
              </div>
        </Router> */}
            <Router history={history}>
              <div style={{ textAlign: 'center' }}>
                <Link to="/">
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    style={{ marginRight: '10px' }}
                  >
                    VISA OPTION
                  </button>
                </Link>
                <Link to="/mobilemoney">
                  <button
                    type="button"
                    className="btn btn-outline-secondary ml-2"
                  >
                    MOBILE MONEY
                  </button>
                </Link>
              </div>
              <Route path="/" exact component={VisaPayment} />
              <Route path="/mobilemoney" component={MobileMoney} />
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
