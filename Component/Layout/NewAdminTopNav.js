import $ from 'jquery';
import { FaBeer } from 'react-icons/fa';
import { MdReorder } from 'react-icons/md';

const NewTopNav = () => {
	const toggleMenu = () => {
		$('#wrapper').toggleClass('toggled');
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom">
				<MdReorder
					onClick={toggleMenu}
					style={{ cursor: 'pointer' }}
					className="text-white"
				/>

				{/* <button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button> */}
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
						<li className="nav-item text-white">
							<a className="nav-link text-white" href="#">
								Link
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default NewTopNav;
