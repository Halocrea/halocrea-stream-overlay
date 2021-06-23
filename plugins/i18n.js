import Vue     from 'vue'
import VueI18n from 'vue-i18n'

require('dotenv').config()

Vue.use(VueI18n)

export default ({ app }) => {
	// Set i18n instance on app
	// This way we can use it in middleware and pages asyncData/fetch
	app.i18n = new VueI18n({
		locale        : process.env.LANG,
		fallbackLocale: 'en',
		messages: {
			en: require('~/locales/en.json'),
			fi: require('~/locales/fi.json'),
			fr: require('~/locales/fr.json')
		}
	})
}
