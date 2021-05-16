import updateConfig from '../utils/_configUpdater'

export default function (subs) {
	return {
		async configUpdate ({ prop, value }) {
			const config = await updateConfig(prop, value)
			if (!config)
				return { status: 'error' }

			subs.forEach(s => s.emit('configUpdated', config))
			return { status: 'ok', config }
		}
	}
}
