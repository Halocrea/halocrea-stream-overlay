import { promises as fs } from 'fs'
import cookieParser       from 'cookie-parser'
import express            from 'express'
import jwt                from 'express-jwt'
import { subs }           from '../../io'

require('dotenv').config()

const cors        = require('cors')
const app         = express()
const path        = 'data/resources-config.json'
const getFileJson = async () => {
	try {
		await fs.access(path)
		return JSON.parse(await fs.readFile(path, { encoding: 'utf8' }))
	} catch (e) {
		return null
	}
}

app.use(cookieParser())
app.use(express.json())

// JWT middleware
app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['sha1', 'RS256', 'HS256']
	})
)

// add a message to an alert type
app.post('/message/:type', cors(), async ({ params, body }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.type) || !body.message)
		return res.status(404).send('Could not find the alert type to update')

	resources[params.type].messages.push(body.message)

	try {
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.status(200).json(resources)
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// edit an alert message
app.patch('/message/:type/:index', cors(), async ({ params, body }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.type) ||
		!resources[params.type].messages[params.index] ||
		!body.message
	)
		return res.status(404).send('Could not find the item to update')

	resources[params.type].messages[params.index] = body.message

	try {
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.status(200).json(resources)
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// delete an alert message
app.delete('/message/:type/:index', cors(), async ({ params }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.type) ||
		resources[params.type].messages.length < params.index
	)
		return res.status(404).send('Could not find the item to delete')

	resources[params.type].messages.splice(params.index, 1)

	try {
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.status(200).json(resources)
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// delete a gif
app.delete('/gif/:type/:index', cors(), async ({ params }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.type) ||
		resources[params.type].gifs.length < params.index
	)
		return res.status(404).send('Could not find the item to delete')

	try {
		await fs.unlink(`./static/gifs/${resources[params.type].gifs[params.index]}`)
		resources[params.type].gifs.splice(params.index, 1)
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.status(200).json(resources)
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// delete a sound
app.delete('/sound/:type/:index', cors(), async ({ params }, res) => {
	const resources = await getFileJson()
	if (!Object.keys(resources).includes(params.type) ||
		resources[params.type].sounds.length < params.index
	)
		return res.status(404).send('Could not find the item to delete')

	try {
		await fs.unlink(`./static/sounds/${resources[params.type].sounds[params.index]}`)
		resources[params.type].sounds.splice(params.index, 1)
		await fs.writeFile(path, JSON.stringify(resources), { encoding: 'utf8' })
		subs.forEach(s => s.emit('resourcesUpdated', resources))
		res.status(200).json(resources)
	} catch (e) {
		console.warn('Could not update the resources-config.json file')
		res.status(500).end('Could not update the resources-config.json file')
	}
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private-config')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-resources',
	handler: app
}
