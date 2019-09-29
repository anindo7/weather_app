const request=require('request')
const access_token = 'pk.eyJ1IjoiYW5pbmRvNyIsImEiOiJjazExaWFwYjMwMWczM21xb3ZlZ3FtaGE5In0.DicrqRc6vnstwUmFEIOtLQ'

const geocode = (address, callback) => {
	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+access_token

	request({url, json:true }, (error,{ body } = {}) => {
		if(error){
			callback('unable to connect to url',undefined)
		}
		else if(body.features.length===0){
			callback('location not available',undefined)
		}
		else{
			// console.log(body.features)
			const data = {
				latitude: body.features[0].center[0],
				longitude: body.features[0].center[1],
				place: body.features[0].place_name
			}
			// console.log('geocode data: ',data)
			callback(undefined,data)
		}
	})
}

module.exports=geocode