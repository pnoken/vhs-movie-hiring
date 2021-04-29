import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import NewAdminLayout from '../../../Component/Layout/NewAdminLayout';
import { baseUrl } from '../../../utils/constants';
import UserForm from '../../../Component/Forms/UserForm';

export async function getServerSideProps() {
	const res = await axios.get(
		`${baseUrl}/movies?status=${true}&_sort=id&_order=desc`,
	);
	const userData = await res.data;

	if (!userData) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			users: userData,
		},
	};
}

export default function Users({ users }) {
	const router = useRouter();

	const [createNewUser, setCreateNewUser] = useState(false);
	const [seletectedUSer, setSelectedUser] = useState({});

	const newUser = () => {
		setCreateNewUser(true);
		setSelectedUser({});
	};

	const editUser = (user) => {
		setCreateNewUser(true);
		setSelectedUser(user);
	};

	const refreshData = () => {
		router.replace(router.asPath);
	};

	// delete the user
	const handleDelete = async (userId, onClose) => {
		try {
			const res = await axios.patch(`${baseUrl}/movies/${userId}`, {
				status: false,
			});
			console.log(JSON.stringify(res));
			if (res.status === 200 || res.status == 204) {
				refreshData();
			}
		} catch (error) {
			console.log(`error ${error}`);
		}
		onClose();
		refreshData();
	};

	// confirm dialog
	const deleteUser = (userId) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div
						className="modal-dialog modal-confirm"
						style={{ marginTop: '-12%' }}
					>
						<div className="modal-content" style={{ marginTop: '-150%' }}>
							<div className="modal-header flex-colum">
								<h4 className="modal-title w-100 text-center">Are you sure?</h4>
							</div>
							<div className="modal-body">
								<p className="text-center">
									Do you really want to delete this record? This process cannot
									be undone
								</p>
								<div className="modal-footer justify-content-center">
									<button
										className="btn btn-secondary btn-sm"
										onClick={onClose}
									>
										No
									</button>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => handleDelete(userId, onClose)}
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			},
		});
	};

	return (
		<>
			{createNewUser && (
				<UserForm
					id="newUser"
					onClose={() => setCreateNewUser(false)}
					current={seletectedUSer}
				/>
			)}

			<NewAdminLayout>
				<Row>
					<Col sm={12} md={{ span: 10, offset: 1 }}>
						<br />
						<Button size="sm" onClick={newUser}>
							New
						</Button>
						<br />
						<br />
						<h4 className="text-center">Users</h4>
						<Table striped bordered hover responsive size="sm">
							<thead>
								<tr className="bg-secondary">
									<th>#</th>
									<th>Name</th>
									<th>Category</th>
									<th>Price</th>
									<th>Release Year</th>
									<th>Rating</th>
									<th colSpan={3}></th>
								</tr>
							</thead>
							<tbody>
								{users &&
									users.map((user, index) => (
										<tr key={index + 1}>
											<td>{index + 1}</td>
											<td>{user.name}</td>
											<td>{user.Category}</td>
											<td>GHS {user.price}</td>
											<td>{user.release_year}</td>
											<td>{user.rating}</td>
											<td className="btnTD">
												<Button
													type="button"
													variant="secondary"
													size="sm"
													className="myBtn"
													onClick={() => editUser(user)}
												>
													Edit
												</Button>
											</td>
											<td className="btnTD">
												<Button
													type="button"
													variant="danger"
													size="sm"
													className="myBtn"
													onClick={() => deleteUser(user.id)}
												>
													Delete
												</Button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</NewAdminLayout>
		</>
	);
}
