import authModule from './node_modules/@nuxtjs/auth-next/dist/module'

export default {
	auth: {
		redirect: {
			callback: 'callback',
			logout: '/'
		},
		strategies: {
			local: {
				token: {
					property: 'token.accessToken'
				},
				config: {
					property: 'config'
				}
			},
			localRefresh: {
				scheme: 'refresh',
				token: {
					property: 'token.accessToken',
					maxAge: process.env.TOKEN_DURATION
				},
				refreshToken: {
					property: 'token.refreshToken',
					data: 'refreshToken',
					maxAge: false
				}
			}
		}
	},

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.BASE_URL
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend (config, ctx) {
			if (ctx.isDev)
				config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'

			if (ctx.isClient) {
				config.node = {
					fs: 'empty'
				}
			}
		}
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		{ src: '~assets/styles/main.scss', lang: 'scss' }
	],

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'HaloCréa Stream Overlay',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	io: {
		// https://nuxt-socket-io.netlify.app/configuration
		sockets: [{
			name   : 'main',
			default: true,
			url    : process.env.BASE_URL,
			vuex   : {
				mutations: [
					'configStreamStatusChanged --> config/setStreamStatus',
					'configUpdated --> config/setConfig',
					'discordBotJoinedChannel --> discord/setInfos',
					'discordBotLeftChannel --> discord/clearInfos',
					'twitchNewFollower --> twitch/setLatestFollower',
					'twitchSubAlert --> twitch/setLatestSubscriber',
					'twitchSubgiftAlert --> twitch/setLatestSubscriber',
					'twitchResubAlert --> twitch/setLatestSubscriber',
					'twitchStreamStateChanged --> config/setStreamStatus'
				]
			}
		}]
	},

	loading: {
		color : '#00b159',
		height: '.2rem',
		zIndex: '1000'
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		['@nuxtjs/dotenv', { only: ['BASE_URL', 'TWITCH_CLIENT_ID'] }],
		'nuxt-socket-io',
		'@nuxtjs/svg-sprite',
		authModule
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/user-config-helper', mode: 'server' },
		'~/plugins/flex',
		{ src: '~/plugins/discord-store-watcher', mode: 'client' },
		{ src: '~/plugins/no-this-is-not-an-easter-egg-go-away', mode: 'client' }
	],

	serverMiddleware: [
		'~/server/api/public/auth',
		'~/server/api/private/config',
		'~/server/api/private/discord',
		'~/server/api/private/resources',
		'~/server/api/private/uploads',
		'~/server/api/private/twitch',
		'~/server/api/public/config',
		'~/server/api/public/discord',
		'~/server/api/public/twitch',
		'~/server/api/public/twitch-oauth2'
	]
}
