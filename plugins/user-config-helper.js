// simple server plugin to create the default user configuration files if it doesn't exist yet
import { promises as fs } from 'fs'

const userConfigFilePath      = 'data/userConfig.json'
const resourcesConfigFilePath = 'data/resourcesConfig.json'

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

	try {
		await fs.access(resourcesConfigFilePath)
	} catch (e) {
		// file doesn't exist yet, need to create it
		await fs.writeFile(resourcesConfigFilePath, JSON.stringify({
			bitsAlert: {
				messages: ['Thanks for the {{bits}}bits, {{username}}!'],
				gifs    : ['dmr.gif'],
				sounds  : ['follow-sound.mp3']
			},
			followAlert: {
				messages: ['Thanks for following, {{username}}!'],
				gifs    : ['yapyap.gif'],
				sounds  : ['follow-sound.mp3']
			},
			hostAlert: {
				messages: ['{{username}} is hosting us, WOW!'],
				gifs    : ['tbag.gif'],
				sounds  : ['follow-sound.mp3']
			},
			raidAlert: {
				messages: ['{{username}} is raiding us! Welcome, raiders!'],
				gifs    : ['fabulous-hogs.gif'],
				sounds  : ['alert-sound-01.mp3']
			},
			subAlert: {
				messages: ['Thanks for subscribing, {{username}}!'],
				gifs    : [
					'fabulous-hogs.gif',
					'dmr.gif',
					'bonus-hog-passenger.gif',
					'tbag.gif',
					'wtfrench-omg.gif'
				],
				sounds  : [
					'alert-sound-01.mp3',
					'alert-sound-02.mp3',
					'alert-sound-03.mp3',
					'alert-sound-04.mp3',
					'alert-sound-05.mp3',
					'alert-sound-06.mp3',
					'alert-sound-07.mp3'
				]
			},
			emotes: [
				'arbicroissant', 'catjam', 'creatune', 'fail', 'forkllift', 'grena',
				'honhon', 'kappa', 'love', 'maurice', 'mimoune', 'ouioui', 'really', 'tektek'
			]
		}), { encoding: 'utf8' })
	}
}
