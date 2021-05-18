// simple server plugin to create the default user configuration if it doesn't exist yet
import { promises as fs } from 'fs'

const userConfigFilePath = 'data/userConfig.json'

export default async function () {
	try {
		await fs.access(userConfigFilePath)
	} catch (e) {
		// file doesn't exist yet, need to create it
		await fs.writeFile(userConfigFilePath, JSON.stringify({
			discordBotStatus        :'disconnected',
			discordBotChannel       :'',
			isStreamOn              :false,
			limitMembersShown       :8,
			selectedVoiceChatOverlay:'menu',
			showLatestFollow        :false,
			showLatestSub           :false,
			showTwitchAlerts        :false,
			showVoiceChat           :true,
			useTwitchFeatures       :false
		}), { encoding: 'utf8' })
	}
}
