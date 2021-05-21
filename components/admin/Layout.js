import ProjectHead from '../projectHead';
import AdminTopNav from './TopNav';
import AdminSideNav from './SideNav';

export default function AdminLayout({ children }) {
	return (
		<>
			{/* import head section */}
			<ProjectHead title="Admin| VHS Movies" />
			{/* render top navbar component */}
			<AdminTopNav />
			{/* render top navbar component */}

			<div id="wrapper" className="toggled">
				<div className="container-fluid">
					{/* render sidebar component */}
					<AdminSideNav />
					{/* render sidebar component */}

					<div id="page-content-wrapper">
						<div className="container-fluid">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
}
