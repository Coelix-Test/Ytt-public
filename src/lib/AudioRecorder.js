
let _mediaRecorder,
		_record;
const _audioChunks = [];

const recorderIsInitialized = () => {
	if(!_mediaRecorder)
		throw new Error(`Media recorder didn't initialized`);
};

class AudioRecorder{
	
	get record(){
		return _record;
	}
	
	constructor() {
		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(stream => {
				_mediaRecorder = new MediaRecorder(stream);
				_mediaRecorder.addEventListener('dataavailable', event => {
					_audioChunks.push(event.data);
				});
				_mediaRecorder.addEventListener('stop', () => {
					_record = new Blob(_audioChunks,{ type: 'audio/mpeg-3' });
					_record.name = 'record.mp3';
					_record.lastModifiedDate = new Date();
				});
				
			})
			.catch(console.error);
	}
	
	start(){
		recorderIsInitialized();
		_mediaRecorder.start();
	}
	
	stop(){
		recorderIsInitialized();
		_mediaRecorder.stop();
	}
	
	
}

export default AudioRecorder;
