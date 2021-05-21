import { promises as fs } from 'fs'
import cookieParser       from 'cookie-parser'
import express            from 'express'
import jwt                from 'express-jwt'
import multer             from 'multer'
import { subs }           from '../../io'

require('dotenv').config()

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['sha1', 'RS256', 'HS256']
	}).unless({
		path: ['/api/auth/login', '/api/auth/refresh']
	})
)

const path        = 'data/resources-config.json'
const getFileJson = async () => {
	try {
		await fs.access(path)
		return JSON.parse(await fs.readFile(path, { encoding: 'utf8' }))
	} catch (e) {
		return null
	}
}

const storageGif = multer.diskStorage({
	destination (req, file, cb) { cb(null, './static/gifs/') },
	filename (req, file, cb) {
		if (!file.mimetype.match(/(gif)$/)) {
			const err = new Error('Wrong file type')
			err.code = 'filetype'
			return cb(err)
		} else
			cb(null, file.originalname)
	}
})

const storageSound = multer.diskStorage({
	destination (req, file, cb) { cb(null, './static/sounds/') },
	filename (req, file, cb) {
		if (!file.mimetype.match(/(mp3|mpeg)$/)) {
			const err = new Error('Wrong file type')
			err.code = 'filetype'
			return cb(err)
		} else
			cb(null, file.originalname)
	}
})

const uploadGif = multer({
	limits : { fileSize: 20971520 }, // Max file size: 20MB
	storage: storageGif
}).single('file')

const uploadSound = multer({
	limits : { fileSize: 20971520 }, // Max file size: 20MB
	storage: storageSound
}).single('file')

app.post('/:alert/gif', uploadGif, async ({ body, file, params }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.alert))
		return res.status(404).end('Wrong alert type')

	resources[params.alert].gifs.push(file.originalname)

	try {
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.json({ path: file.originalname })
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

app.post('/:alert/sound', uploadSound, async ({ body, file, params }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.alert))
		return res.status(404).end('Wrong alert type')

	resources[params.alert].sounds.push(file.originalname)

	try {
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.json({ path: file.originalname })
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private/uploads')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-upload',
	handler: app
}
