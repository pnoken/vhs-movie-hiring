import { MdDashboard, MdLocalMovies, MdPayment } from 'react-icons/md';
import { RiMovieLine } from 'react-icons/ri';
import { FiUsers } from 'react-icons/fi';

import ActiveLink from '../ActiveLink';
import { Admin } from '../../utils/routes';

const AdminSideNav = () => {
	return (
		<>
			<div id="sidebar-wrapper">
				<ul className="sidebar-nav">
					<li>
						<ActiveLink activeClassName="active" href={Admin.dashboard}>
							<a>
								<MdDashboard /> Dashboard
							</a>
						</ActiveLink>
					</li>
					<li>
						<ActiveLink activeClassName="active" href={Admin.movies}>
							<a>
								<MdLocalMovies /> Movies
							</a>
						</ActiveLink>
					</li>
					<li>
						<ActiveLink activeClassName="active" href={Admin.rentals}>
							<a>
								<RiMovieLine /> Rentals
							</a>
						</ActiveLink>
					</li>
					<li>
						<ActiveLink activeClassName="active" href={Admin.users}>
							<a>
								<FiUsers /> Users
							</a>
						</ActiveLink>
					</li>
					<li>
						<ActiveLink activeClassName="active" href={Admin.payments}>
							<a>
								<MdPayment /> Payments
							</a>
						</ActiveLink>
					</li>
				</ul>
			</div>
		</>
	);
};

export default AdminSideNav;
