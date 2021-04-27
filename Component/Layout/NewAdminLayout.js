import NewSideNav from './NewAdminSideNav';
import NewTopNav from './NewAdminTopNav';
import $ from 'jquery';

const NewAdminLayout = ({ children }) => {
	return (
		<>
			<div className="d-flex" id="wrapper">
				<NewSideNav />
				<div id="page-content-wrapper">
					<NewTopNav />
					<div className="container-fluid">{children}</div>
				</div>
			</div>
		</>
	);
};

export default NewAdminLayout;
