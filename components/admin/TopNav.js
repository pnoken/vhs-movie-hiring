import Image from 'next/image';
import { useEffect } from 'react';
import $ from 'jquery';

import { BiMenu } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';

const AdminTopNav = () => {
	const toggleNav = () => {
		$('#wrapper').toggleClass('toggled');
	};

	useEffect(() => {
		$('#wrapper').toggleClass('toggled');
	}, []);

	return (
		<>
			<nav className="navbar sticky-top  navbar-expand-lg navbar-light   top-nav">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<Image
							src="/assets/images/logo.png"
							alt="logo"
							height="36px"
							width="139px"
						/>
					</a>
					<BiMenu
						size={30}
						style={{
							position: 'absolute',
							left: '240.63px',
							top: '12.29px',
							cursor: 'pointer',
						}}
						onClick={toggleNav}
					/>
					{/* <button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button> */}
					<div
						className="collapse navbar-collapse d-flex justify-content-end"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
							<li className="nav-item ">
								<a className="nav-link text-white" href="#">
									<FaUserCircle size={20} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default AdminTopNav;
