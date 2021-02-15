import React from 'react';
import PropTypes from 'prop-types';
import QtySwitcher from 'components/Controls/QtySwitcher';
import Summary from 'components/Summary';
import { Button, Icon, Modal, List, Dimmer, Loader, Statistic, Segment, Item } from 'semantic-ui-react';
import INGREDIENT_PRICES from 'constants/ingredient-prices';

const controlPreview = [
	{label: 'Strawberry', type: 'strawberry'},
	{label: 'Chocolate', type: 'chocolate'},
	{label: 'Mint', type: 'mint'},
	{label: 'Vanilla', type: 'vanilla'}
];

const Controls = (props) => {
	let orderSummary = <Summary price={props.totalPrice} ingredients={props.ingredients}/>

	if (props.loading) {
		orderSummary = <Dimmer active>
			<Loader>Loading</Loader>
		</Dimmer>;
	}

	return (
		<>
			<List>
			{controlPreview.map(ctrl => (
				<List.Item key={ctrl.label} style={{marginBottom: '2rem'}}>
					<Item.Group unstackable>
						<Item>
							<Item.Content>
								<Item.Header>{ctrl.label} </Item.Header>
								<Item.Meta>{INGREDIENT_PRICES[ctrl.type]}$</Item.Meta>
								<Item.Description>
									<QtySwitcher
										plus={() => props.ingredientAdded(ctrl.type)}
										minus={() => props.ingredientRemoved(ctrl.type)}
										disabled={props.disabledControls[ctrl.type]}/>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</List.Item>
			))}
			</List>
			<Segment style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Statistic style={{marginBottom: '0'}}>
					<Statistic.Value>{props.totalPrice.toFixed(2)}$</Statistic.Value>
					<Statistic.Label>Total</Statistic.Label>
				</Statistic>
				<Modal
					onClose={() => props.ordered(false)}
					onOpen={() => props.ordered(true)} 
					open={props.purchasing}
					trigger={
						<Button animated>
							<Button.Content 
								visible 
								disabled={!props.purchasable}>Order now!</Button.Content>
							<Button.Content hidden>
								<Icon name='arrow right' />
							</Button.Content>
						</Button>
					}>
					<Modal.Content>
						<Modal.Description>
							{orderSummary}
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color='black' onClick={() => props.ordered(false)}>
							Cancel
						</Button>
						<Button
							content='Place order'
							labelPosition='right'
							icon='checkmark'
							onClick={() => props.toCheckout()}
							positive
						/>
					</Modal.Actions>
				</Modal>
			</Segment>
		</>
	)
}

Controls.propTypes = {
	ingredientAdded: PropTypes.func,
	ingredientRemoved: PropTypes.func,
	disabledControls: PropTypes.object,
	totalPrice: PropTypes.number,
	purchasable: PropTypes.bool,
	ordered: PropTypes.func,
	purchasing: PropTypes.bool,
	ingredients: PropTypes.object,
	placeOrder: PropTypes.func,
	toCheckout: PropTypes.func,
	loading: PropTypes.bool,
}

export default Controls;
