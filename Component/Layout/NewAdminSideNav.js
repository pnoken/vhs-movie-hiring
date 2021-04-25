import Link from 'next/link';
import { Routes } from '../../utils/routes';

const NewSideNav = () => {
	return (
		<>
			<div className="bg-light border-right" id="sidebar-wrapper">
				<div className="sidebar-heading text-center">
					<b>VHS MOVIES</b>
				</div>
				<div className="list-group list-group-flush">
					<Link href={Routes.Admin.Dashboard}>
						<a className="list-group-item list-group-item-action bg-light">
							Dashboard
						</a>
					</Link>
					<Link href={Routes.Admin.Users}>
						<a className="list-group-item list-group-item-action bg-light">
							Users
						</a>
					</Link>
					<Link href={Routes.Admin.Movies}>
						<a className="list-group-item list-group-item-action bg-light">
							Movies
						</a>
					</Link>
					<Link href={Routes.Admin.Hirings}>
						<a className="list-group-item list-group-item-action bg-light">
							Hirings
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default NewSideNav;
