const request=require('request')

const forecast = (latitude,longitude,callback) => {
	const url = 'https://api.darksky.net/forecast/8e94e17c3dd35119272bb97e9439d7ca/'+latitude+','+longitude

	request({url, json:true}, (error,{body} = {}) => {
		if(error){
			callback('unable to connect to url',undefined)
		}
		else if(body.error){
			callback('location not valid',undefined)
		}
		else{
			// console.log(response.body.currently)
			let data = body.currently.summary + '. The temperature currently is '+body.currently.temperature+' degrees, feels like '+ body.currently.apparentTemperature
			data = data + ' degrees. The chances of rain is '+(body.currently.precipProbability*100)
			data = data + '% and the current humidity is '+(body.currently.humidity*100)+'%.'
			callback(undefined,data)
		}
	})
}

module.exports=forecast
