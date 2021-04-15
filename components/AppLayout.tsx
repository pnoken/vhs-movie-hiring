import { Container } from 'react-bootstrap';

const AppLayout = ({ children }): JSX.Element => {
	return (
		<>
			<Container className="layout-container">{children}</Container>
		</>
	);
};

export default AppLayout;
