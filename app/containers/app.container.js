// Import React library
import React from 'react';

// Import Axios of Ajax
import Axios from 'axios';

// Import React Sound component
import Sound from 'react-sound';

// AppContainer Class
class AppContainer extends React.Component {
	// AppContainer constructor
	constructor(props) {
		super(props);

		// Client ID
		this.client_id = 'YOUR_CLIENT_ID';

		// Initial State
		this.state = {
			// Whatever is returned, we only need these 3 values initially:
			track: {stram_url: '', title: '', artwork_url: ''},
			playStatus: Sound.status.STOPPED,
			elapsed: '00:00',
			total: '00:00',
			position: 0,
			playFromPosition: 0
		}
	}

	handleSongPlaying(audio) {
		this.setState({  elapsed: this.formatMilliseconds(audio.position),
				total: this.formatMilliseconds(audio.duration),
				position: audio.position / audio.duration })
	}

	handleSongFinished () {
		// Call random Track
		this.randomTrack();
	}

	formatMilliseconds(milliseconds) {
		// Format hours
		var hours = Math.floor(milliseconds / 3600000);
		milliseconds = milliseconds % 3600000;

		// Format minutes
		var minutes = Math.floor(milliseconds / 60000);
		milliseconds = milliseconds % 60000;

		// Format seconds
		var seconds = Math.floor(milliseconds / 1000);
		milliseconds = Math.floor(milliseconds % 1000);

		// Return as string
		return (minutes < 10 ? '0' : '') + minutes + ':' +
		(seconds < 10 ? '0' : '') + seconds;
	}

	// componentDidMount lifecycle method. Called once a component is loaded
	componentDidMount() {
		this.randomTrack();
	}

	randomTrack() {
		let _this = this;

		// Request for a playlist via SoundCloud using a client ID
		Axios.get(`https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`)
				.then(function (response) {
						// Store the length of the tracks
						const trackLength = response.data.tracks.length;

						// Pick a random number
						const randomNumber = Math.floor((Math.random() * trackLength) + 1);

						// Set the track state with a random track from the playlist
						_this.setState({track: response.data.tracks[randomNumber]});
				})
				.catch(function (err) {
						// If something goes wrong, let us know
						console.log(err);
				});
	}

	prepareUrl(url) {
		// Attach client id to stream url
		return `${url}?client_id=${this.client_id}`
	}

	// Render
	render() {
		return (
			<div className="scotch_music">
					<Sound
					 url={this.prepareUrl(this.state.track.stream_url)}
					 playStatus={this.state.playStatus}
					 onPlaying={this.handleSongPlaying.bind(this)}
					 playFromPosition={this.state.playFromPosition}
					 onFinishedPlaying={this.handleSongFinished.bind(this)}/>
				</div>
		);
	}
}

export default AppContainer