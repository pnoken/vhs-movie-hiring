import { useRouter } from 'next/router';
import { useContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import { Modal, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ModalContext from '../../Contexts/ModalContext';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';

const UserForm = ({ id, onClose, current }) => {
	const router = useRouter();
	const modalValues = useContext(ModalContext);
	const { register, handleSubmit, errors, watch } = useForm();
	const [exists, setExists] = useState('');
	const [phoneExist, setPhoneExist] = useState('');

	const [email, setEmail] = useState('');
	const [firstName, setFirstname] = useState('');
	const [lastName, setLastName] = useState('');
	const [contact, setContact] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const password = useRef({});
	password.current = watch('password', '');

	// show modal on component mount
	useEffect(() => {
		modalValues.setShow(true);

		if (!_.isEmpty(current)) {
			setEmail(current.email);
			setFirstname(current.firstName);
			setLastName(current.lastName);
			setContact(current.contact);
			setIsAdmin(current.isAdmin);
		}
	}, []);

	let title = '';
	if (_.isEmpty(current)) {
		title = 'Add';
	} else {
		title = 'Update';
	}

	const closeModal = () => {
		modalValues.setShow(false);
		onClose();
	};

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const submitForm = async (formData) => {
		delete formData['confirm_password'];
		if (formData.isAdmin) formData.role = 'Admin';
		else formData.role = 'Customer';

		let res = null;
		// check if email already exists

		try {
			res = await axios.get(
				`${baseUrl}/users?email=${formData.email}&status=${true}`,
			);
			// const data = await res.data;
			// console.log(JSON.stringify(data));
			if ((await res.data.length) > 0) {
				if (_.isEmpty(current)) {
					setExists('email already exists');
					return false;
				}

				// console.log('exists ', exists);
			}

			res = await axios.get(
				`${baseUrl}/users?contact=${formData.contact}&status=${true}`,
			);

			if ((await res.data[0].contact) === formData.contact) {
				if (_.isEmpty(current)) {
					setPhoneExist('contact already exists');
					return false;
				}
			}
			// return false;
		} catch (error) {
			console.log('Something went wrong', error);
		}

		// create user
		try {
			if (_.isEmpty(current)) {
				formData.status = true;
				res = await axios.post(`${baseUrl}/users`, formData);
			} else
				res = await axios.patch(`${baseUrl}/users/${current.id}`, formData);

			if (res.status === 201 || res.status === 200) {
				refreshData();
				closeModal();
			}
		} catch (error) {
			console.log('Something went wrong', error);
		}
	};

	return (
		<>
			<Modal
				show={modalValues.show}
				backdrop="static"
				onHide={closeModal}
				keyboard={false}
				id={id}
			>
				<Modal.Header>
					<Modal.Title>{title} User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<Row>
							<Col>
								<Form
									id="userForm"
									autoComplete="off"
									onSubmit={handleSubmit(submitForm)}
								>
									<Form.Row>
										<Form.Group as={Col} sm={12} md={6}>
											<Form.Label>Email</Form.Label>
											<Form.Control
												name="email"
												ref={register({ required: true })}
												defaultValue={email}
												onChange={(e) => setEmail(e.target.value)}
											/>

											<>
												{errors.email && (
													<span className={'validationError'}>
														Email is required
													</span>
												)}
												{exists && (
													<span className="validationError">{exists}</span>
												)}
											</>
										</Form.Group>
										<Form.Group as={Col} sm={12} md={6}>
											<Form.Label>First Name</Form.Label>
											<Form.Control
												name="firstName"
												ref={register({ required: true })}
												defaultValue={firstName}
												onChange={(e) => setFirstname(e.target.value)}
											/>
											{errors.firstName && (
												<span className={'validationError'}>
													First name is required
												</span>
											)}
										</Form.Group>
										<Form.Group as={Col} sm={12} md={6}>
											<Form.Label>Last Name</Form.Label>
											<Form.Control
												name="lastName"
												ref={register({ required: true })}
												defaultValue={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
											{errors.lastName && (
												<span className={'validationError'}>
													Last name is required
												</span>
											)}
										</Form.Group>
										<Form.Group as={Col} sm={12} md={6}>
											<Form.Label>Contact</Form.Label>
											<Form.Control
												name="contact"
												ref={register({
													required: {
														value: true,
														message: 'contact required',
													},
													maxLength: {
														value: 10,
														message: 'should be 10 characters maximum',
													},
												})}
												defaultValue={contact}
												onChange={(e) => setContact(e.target.value)}
											/>
											<>
												{errors.contact && (
													<span className={'validationError'}>
														{errors.contact.message}
													</span>
												)}
												{phoneExist && (
													<span className="validationError">{phoneExist}</span>
												)}
											</>
										</Form.Group>

										{_.isEmpty(current) && (
											<>
												<Form.Group as={Col} sm={12} md={6}>
													<Form.Label>Password</Form.Label>
													<Form.Control
														name="password"
														type="password"
														ref={register({
															required: 'Password is required',
															minLength: {
																value: 8,
																message:
																	'Password should be at least 8 characters',
															},
														})}
													/>
													{errors.password && (
														<span className={'validationError'}>
															{errors.password.message}
														</span>
													)}
												</Form.Group>
												<Form.Group as={Col} sm={12} md={6}>
													<Form.Label>Confirm Password</Form.Label>
													<Form.Control
														name="confirm_password"
														type="password"
														ref={register({
															validate: (value) =>
																value === password.current ||
																'Passwords do not match',
														})}
													/>
													{errors.confirm_password && (
														<span className={'validationError'}>
															{errors.confirm_password.message}
														</span>
													)}
												</Form.Group>
											</>
										)}
										<Form.Group as={Col} sm={12} md={6}>
											<Form.Check
												type="checkbox"
												name="isAdmin"
												label="Is Admin?"
												ref={register}
												defaultValue={isAdmin}
												checked={isAdmin}
												onChange={(e) => setIsAdmin(!isAdmin)}
											/>
										</Form.Group>
									</Form.Row>
								</Form>
							</Col>
						</Row>
					</Container>
					<Modal.Footer>
						<Button type="submit" variant="primary" size="sm" form="userForm">
							Submit
						</Button>
						<Button variant="dark" size="sm" onClick={closeModal.bind(this)}>
							close
						</Button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default UserForm;