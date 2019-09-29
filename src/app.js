const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

const pubpath = path.join(__dirname, '../public')
const partialpath = path.join(__dirname, '../views/partials')

const port= process.env.PORT || 3000

// console.log(pubpath)

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(pubpath))

hbs.registerPartials(partialpath)

app.get('/about',(req,res)=>{
	res.render('about',{
		title: 'About',
		name: 'Anindo'
	})
})

// app.get('/help',(req,res)=>{
// 	res.send('Help!')
// })

app.get('/',(req,res)=>{
	res.render('index',{
		title: 'Weather',
		name: 'Anindo'
	})
})

app.get('/weather',(req,res)=>{
	if(!req.query.place){
		return res.send({
			error: 'Enter a location'
		})
	}
	geocode(req.query.place,(error,{latitude, longitude, place} = {}) =>{
		if(error){
			return res.send({error})
		}
		forecast(latitude, longitude, (error, data) => {
			if(error){
				return res.send({error})
			}
			res.send({
				search: req.query.place,
				weather: data,
				location: place
			})
			// console.log(place)
			// console.log(data)
		})
	})
	
})

app.get('/help/*',(req,res) =>{
	res.render('404',{
		title: '404',
		name: 'Anindo',
		msg: 'Help page not found.'
	})
})

app.get('*', (req,res) =>{
	res.render('404',{
		title: '404',
		name: 'Anindo',
		msg: 'Internet has crashed!'
	})
})

app.listen(port, () =>{
	console.log('server started...')
})