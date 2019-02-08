function initVideoPreview(selector, options) {
	options = Object.assign({
		cors: false,
		loop: true,
		muted: true
	}, options);

	function wrapVideo(srcVideo) {
		var video = document.createElement('video');
		video.innerHTML = srcVideo.innerHTML;
		video._playing = false;

		var opts = {
			loop: options.loop,
			muted: options.muted,
			crossorigin: options.cors,
			playsinline: 1,
			controls: 0
		};

		Object.keys(opts).forEach(function(k) {
			opts[k] ? video.setAttribute(k, opts[k]) : video.removeAttribute(k);
		});

		['width', 'height', 'class'].forEach(function(a) {
			var value = srcVideo.getAttribute(a);
			if(value)
				video.setAttribute(a, value);
		});

		var controls = document.createElement('div');
		controls.classList.add('controls');
		controls.innerHTML =	'<div class=progress>' +
								' <span class=progress-bar></span>' +
								'</div>' +
								'<div class=play-button></div>';

		var container = document.createElement('div');
		container.classList.add('video-preview-container');
		container.appendChild(video);
		container.appendChild(controls);
		srcVideo.parentNode.replaceChild(container, srcVideo);

		var progressBar = container.querySelector('.controls .progress-bar');


		video._updateProgress = function() {
			progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
		}

		video._play = function() {
			video.play();
			video._playing = true;
			container.classList.add('playing');
		}

		video._stop = function() {
			video.pause();
			video.currentTime = 0;
			video._playing = false;
			container.classList.remove('playing');
		}

		video._togglePlay = function() {
			video._playing ? video._stop() : video._play();
		}

		container.addEventListener('mouseover', video._play);
		container.addEventListener('mouseout', video._stop);
		container.addEventListener('click', video._togglePlay);
		video.addEventListener('timeupdate', video._updateProgress);

		return container;
	}

	if(typeof vpInjectCSS === 'function')
		vpInjectCSS();

	document.querySelectorAll(selector).forEach(wrapVideo);
}
