// simple server plugin to create the default user configuration files if it doesn't exist yet
import { promises as fs } from 'fs'

const userConfigFilePath      = 'data/user-config.json'
const resourcesConfigFilePath = 'data/resources-config.json'

export default async function () {
	try {
		await fs.access(userConfigFilePath)
	} catch (e) {
		// file doesn't exist yet, need to create it
		await fs.writeFile(userConfigFilePath, JSON.stringify({
			canUseTwitch            : !!(process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET),
			discordBotStatus        : 'disconnected',
			discordBotChannel       : '',
			isStreamOn              : false,
			limitMembersShown       : 8,
			selectedVoiceChatOverlay: 'menu',
			showLatestFollow        : false,
			showLatestSub           : false,
			showTwitchAlerts        : false,
			showVoiceChat           : true,
			voiceChatTitle          : 'Voice Chat',
			useTwitchFeatures       : false,
			bitsAlerts              : true,
			followAlerts            : true,
			hostAlerts              : true,
			raidAlerts              : true,
			resubAlerts             : true,
			subAlerts               : true,
			subgiftAlerts           : true,
			socialNetworks          : [],
			introMsgs               : ['Stream starting soon!'],
			interludeMsgs           : ['Be back in a minute!'],
			outroMsgs               : ['Thanks for watching!']
		}), { encoding: 'utf8' })
	}

	try {
		await fs.access(resourcesConfigFilePath)
	} catch (e) {
		// file doesn't exist yet, need to create it
		await fs.writeFile(resourcesConfigFilePath, JSON.stringify({
			bitsAlerts: {
				messages: ['Thanks for the {{bits}}bits, {{username}}!'],
				gifs    : ['saxo-cosplay-j4ckpot234.gif'],
				sounds  : ['jazzy-odst-01.mp3']
			},
			followAlerts: {
				messages: ['Thanks for following, {{username}}!'],
				gifs    : ['yapyap.gif'],
				sounds  : ['follow-sound.mp3']
			},
			hostAlerts: {
				messages: ['{{username}} is hosting us, WOW!'],
				gifs    : ['halfjaw-speech.gif'],
				sounds  : ['cello-theme-01.mp3']
			},
			raidAlerts: {
				messages: ['{{username}} is raiding us! Welcome, raiders!'],
				gifs    : ['sword.gif'],
				sounds  : ['h2-follow-01.mp3']
			},
			resubAlerts: {
				messages: ['Thanks for resubscribing, {{username}}!'],
				gifs    : ['bonus-hog-passenger.gif'],
				sounds  : ['cello-theme-02.mp3']
			},
			subAlerts: {
				messages: ['Thanks for subscribing, {{username}}!'],
				gifs    : ['wtfrench-omg.gif'],
				sounds  : ['icyhot-cover-01.mp3']
			},
			subgiftAlerts: {
				messages: [
					'{{sender}} gifted a sub to {{recipient}}!'
				],
				gifs    : [
					'fabulous-hogs.gif',
					'dmr.gif',
					'tbag.gif'
				],
				sounds  : [
					'icyhot-cover-01.mp3',
					'icyhot-cover-02.mp3',
					'icyhot-cover-03.mp3',
					'icyhot-cover-04.mp3',
					'icyhot-cover-05.mp3',
					'icyhot-cover-06.mp3',
					'icyhot-cover-07.mp3'
				]
			},
			emotes: [
				'arbicroissant', 'catjam', 'creatune', 'fail', 'forkllift', 'grena',
				'honhon', 'kappa', 'love', 'maurice', 'mimoune', 'ouioui', 'really', 'tektek'
			]
		}), { encoding: 'utf8' })
	}
}
