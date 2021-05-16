export default {
	props   : {
		blurred: {
			type	: Boolean,
			required: false,
			default : false
		}
	},

	data () {
		return {
			bgArr           : [],
			interval        : null,
			wallpaperSources: [
				'/backgrounds/bg-01.jpg',
				'/backgrounds/bg-02.jpg',
				'/backgrounds/bg-03.jpg',
				'/backgrounds/bg-04.jpg',
				'/backgrounds/bg-06.jpg',
				'/backgrounds/bg-07.jpg',
				'/backgrounds/bg-08.jpg',
				'/backgrounds/bg-09.jpg'
			]
		}
	},

	mounted () {
		this._initBgImage()
	},

	methods	 : {
		fetchWallpaper () {
			const image      = new Image()
			const filteredBg = this.wallpaperSources.filter(b => !this.bgArr.includes(b))
			const url        = filteredBg[Math.floor(Math.random() * filteredBg.length)]

			this._imgLoad(image).then(() => {
				this.bgArr.push(url)
				setTimeout(() => this.bgArr.splice(0, 1), 3000)
			})
			image.src = url
		},

		_imgLoad (elem) {
			return new Promise((resolve) => { elem.onload = resolve })
		},

		_initBgImage () {
			const image = new Image()
			const url   = this.wallpaperSources[Math.floor(Math.random() * this.wallpaperSources.length)]

			this._imgLoad(image).then(() => {
				this.bgArr.push(url)
				this._wallpaperInterval(10000)
			})

			image.src = url
		},

		_wallpaperInterval () {
			if (this.interval)
				clearInterval(this.interval)

			this.interval = self.setInterval(() => {
				this.fetchWallpaper()
			}, 30 * 1000)
		}
	}
}
