import React, { useState } from 'react';
import Builder from 'containers/Builder';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Icon } from 'semantic-ui-react'

const App = () => {
	const [activeItem, setActiveItem] = useState('home')

	const handleItemClick = (e, { name }) => {
		setActiveItem(name);
	}

	return (
		<>
			<Menu stackable>
				<Menu.Item>
					<Icon name='snowflake' style={{fontSize: '2rem'}}/> Snowflake
				</Menu.Item>
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
				>
					<Icon name='home'/> Home
				</Menu.Item>
				<Menu.Item
					name='builder'
					active={activeItem === 'builder'}
					onClick={handleItemClick}
				>
					<Icon name='cogs'/> Builder
				</Menu.Item>
			</Menu>
			<Builder/>
		</>
	);
}

export default App;
