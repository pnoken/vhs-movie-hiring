import { Card, Col, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
	dailyLabels,
	dailyMovieData,
	dailyRevData,
	monthlyLabels,
	monthlyMovieData,
    monthlyRevData,
} from '../../utils/charts';

const ChartRow = (): JSX.Element => {
	return (
		<>
			<h3>Daily Report</h3>
			<Row>
				<Col sm={12} md={6}>
					<Card>
						<Card.Body>
							<Line
								data={{
									labels: dailyLabels,
									datasets: [
										{
											label: 'Daily Hirings',
											data: dailyMovieData,
											backgroundColor: 'rgba(54, 162, 235, 0.2)',
										},
									],
								}}
								options={{
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Number of Movies',
												},
											},
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Days',
												},
											},
										],
									},
								}}
							/>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={6}>
					<Card>
						<Card.Body>
							<Line
								data={{
									labels: dailyLabels,
									datasets: [
										{
											label: 'Daily Revenue',
											data: dailyRevData,
											backgroundColor: 'rgba(255, 99, 132, 0.2)',
										},
									],
								}}
								options={{
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Amount ',
												},
												ticks: {
													callback: function (value) {
														return `$ ${value}`;
													},
												},
											},
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Days',
												},
											},
										],
									},
								}}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<h3>Monthly Report</h3>
			<Row>
				<Col sm={12} md={6}>
					<Card>
						<Card.Body>
							<Line
								data={{
									labels: monthlyLabels,

									datasets: [
										{
											label: 'Monthly Hirings',
											data: monthlyMovieData,
											backgroundColor: 'rgba(255, 159, 64, 0.2)',
										},
									],
								}}
								options={{
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Number of Movies',
												},
											},
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Months',
												},
											},
										],
									},
								}}
							/>
						</Card.Body>
					</Card>
				</Col>
				<Col sm={12} md={6}>
					<Card>
						<Card.Body>
							<Line
								data={{
									labels: monthlyLabels,
									datasets: [
										{
											label: 'Monthly Revenue',
											data: monthlyRevData,
											backgroundColor: 'rgba(153, 102, 255, 0.2)',
										},
									],
								}}
								options={{
									scales: {
										yAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Amount ',
												},
												ticks: {
													callback: function (value) {
														return `$ ${value}`;
													},
												},
											},
										],
										xAxes: [
											{
												scaleLabel: {
													display: true,
													labelString: 'Days',
												},
											},
										],
									},
								}}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<div className="clearfix" />
			<br />
		</>
	);
};

export default ChartRow;
