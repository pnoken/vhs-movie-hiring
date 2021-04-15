import AppHead from '../components/AppHead';
import {Button, Col, Row} from "react-bootstrap";
import Link from 'next/link'
import {Routes} from "../utils/routes";

const Home = (): JSX.Element => {
	return (
		<>
			<AppHead pageTitle="VHS | Home" />
            <Row  className="justify-content-center">
				<Col className={'text-center'}>
                   <h3>Welcome to VHS Movies</h3>
					<Link href={Routes.Admin.Dashboard}>
						<Button>
    						Go to Dashboard
						</Button>

					</Link>
				</Col>
			</Row>
		</>
	);
};

export default Home;
