import { Card, Col, Row } from 'react-bootstrap';

const TopRow = (): JSX.Element => {
	return (
		<Row>
			<Col sm={12} md={3}>
				<Card className="text-center text-white" bg="info">
					<Card.Header as="h4">Today's Hiring</Card.Header>
					<Card.Body className={'card-height'}>
						<h4>25</h4>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={12} md={3}>
				<Card className="text-center text-white" bg="success">
					<Card.Header as="h4">Today's Revenue</Card.Header>
					<Card.Body className={'card-height'}>
						<h4>$ 1650</h4>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={12} md={3}>
				<Card className="text-center text-white" bg="danger">
					<Card.Header as="h4">Total Revenue</Card.Header>
					<Card.Body className={'card-height'}>
						<h4>$ 102465</h4>
					</Card.Body>
				</Card>
			</Col>
			<Col sm={12} md={3}>
				<Card className="text-center text-white" bg="dark">
					<Card.Header as="h4">Total Owings</Card.Header>
					<Card.Body className={'card-height'}>
						<h4>$ 60000</h4>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default TopRow;
