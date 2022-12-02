import songsMap from '../../../songs/songsMap';
import Song from '../../../songs/interface/Song';
import PresetSong from './PresetSong';

export default () => {
	const container = document.getElementById('js-preset-songs') as HTMLDivElement;

	songsMap.forEach((song: Song) => {
		const presetSong = new PresetSong(song);

		container.appendChild(presetSong.createHTML());
	});
};
