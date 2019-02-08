function initVideoPreview(selector, options) {
	options = Object.assign({
		cors: false,
		loop: true,
		muted: true,
		preload: 'auto',
		autoplay: false
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
			var _afterPlay = function() {
				video._playing = true;
				container.classList.add('playing');
			}

			var result = video.play();

			if(result && typeof result.then === 'function') {
				result.then(_afterPlay)
				.catch(function(error) {
					console.warn('state?', video.readyState);
					setTimeout(video._play, 100); //weird behaviour that drops a DOMException sometimes, probably will investigate later
				});
			}
			else
				_afterPlay();
		}

		video._stop = function() {
			var _afterStop = function() {
				video.currentTime = 0;
				video._playing = false;
				container.classList.remove('playing');
			}

			var result = video.pause();

			if(result && typeof result.then === 'function')
				result.then(_afterStop)
			else
				_afterStop();
		}

		video._togglePlay = function() {
			video._playing ? video._stop() : video._play();
		}

		video._toggleLoadingState = function(flag) {
			video._loading = flag;
			return flag ? container.classList.add('loading') : container.classList.remove('loading');
		}
		video._toggleLoadingState(true);

		container.addEventListener('mouseover', video._play);
		container.addEventListener('mouseout', video._stop);
		container.addEventListener('click', video._togglePlay);
		video.addEventListener('timeupdate', video._updateProgress);
		video.addEventListener('canplaythrough', function() { video._toggleLoadingState(false); });

		return container;
	}

	if(typeof vpInjectCSS === 'function')
		vpInjectCSS();

	document.querySelectorAll(selector).forEach(wrapVideo);
}
