import React from 'react';
import PropTypes from 'prop-types';
import Preview from 'components/Preview';
import { Grid, Button, Icon, Header } from 'semantic-ui-react';

const CheckoutSummary = (props) => {
	return (
		<>
			<Grid columns='two' stackable>
				<Grid.Row verticalAlign='middle' style={{padding: '2rem'}}>
					<Grid.Column textAlign='center'>
						<Header as='h2' icon textAlign='center'>
							<Icon name='heart' circular />
							<Header.Content>We hope it tastes well</Header.Content>
						</Header>
						<Button.Group>
							<Button animated onClick={props.checkoutCancel}>
								<Button.Content visible>Go back</Button.Content>
								<Button.Content hidden>
									<Icon name='left arrow' />
								</Button.Content>
							</Button>
							<Button.Or />
							<Button positive animated onClick={props.checkoutContinue}>
								<Button.Content visible>Place order</Button.Content>
								<Button.Content hidden>
									<Icon name='right arrow' />
								</Button.Content>
							</Button>
						</Button.Group>
					</Grid.Column>
					<Grid.Column textAlign='center'>
						<Preview ingredients={props.ingredients}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
};

CheckoutSummary.propTypes = {
	ingredients: PropTypes.object,
	checkoutCancel: PropTypes.func,
	checkoutContinue: PropTypes.func,
}

export default CheckoutSummary;