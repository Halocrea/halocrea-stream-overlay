import updateConfig from '../utils/_configUpdater'

export default function (subs) {
	return {
		async configUpdate ({ prop, value }) {
			let config
			if (prop === 'useTwitchFeatures') {
				config = await updateConfig([
					'useTwitchFeatures',
					'showTwitchAlerts',
					'showLatestFollow',
					'showLatestSub'
				], [value, value, value, value])
			} else
				config = await updateConfig(prop, value)

			if (!config)
				return { status: 'error' }

			subs.forEach(s => s.emit('configUpdated', config))
			return { status: 'ok', config }
		}
	}
}
