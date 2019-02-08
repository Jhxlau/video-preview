# video-preview.js

A minimalistic approach for cool animated things on web pages that will not upset people with uncontrolled annoying animation.

[Demo](https://lolwhoami.github.io/video-preview/example/) | [Example](./docs/index.html)

> We needed a way to show short videos for different features of our plugins, so I decided first to create short GIFs, which appeared to be a dumb way. Too heavy, bad quality, uncontrollable, etc. So then I tried to find a simple HTML5 video player JS library without controls, but with a progress indicator and which would launch the video when mouse was hovering over it. And it appeared that there was no such thing on the Internet. Or maybe I just didn't know how to google it right. Anyway, now there's at least one such library. Enjoy.

### Usage

__HTML:__
```html
<script src='video-preview.js'></script>
...
<video class='preview'>
	<source src='video1.mp4' type='video/mp4'>
</video>

<video class='preview'>
	<source src='video2.mp4' type='video/mp4'>
</video>
...
```

__JS:__
```js
document.addEventListener('DOMContentLoaded', function() {
	initVideoPreview('video.preview');
});
```

### Options

```js
initVideoPreview('...', {
	cors: false, // or 'anonymous', or 'use-credentials'
	loop: true,
	muted: true
});
```

### Credits

Supported by [KeenTools](https://keentools.io).

---

LICENSE: MIT

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
