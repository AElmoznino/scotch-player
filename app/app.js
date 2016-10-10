// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

//Import Search Component
import Search from './components/search.component';

//Import the Details component
import Details from './components/details.component';

//Import the Player component
import Player from './components/player.component';

// Component class
class App extends React.Component {

	// render method is most important - it returns a JSX template
	render() {
		return (
			<div>
				<Search />
				<Details title={'Track title'} />
				<Player />
			</div>
		);
	}
}

// Render to the element with ID 'content' in the DOM
ReactDOM.render( 
	<App/ > ,
	document.getElementById('content')
);