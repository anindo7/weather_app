// console.log('Hello')
const myform = document.querySelector('form')
const myinp = document.querySelector('input')
const text1 = document.querySelector('#msg1')
const text2 = document.querySelector('#msg2')

myform.addEventListener('submit',(e) =>{
	e.preventDefault()

	text2.textContent = ''
	text1.textContent = 'Loading...'
	fetch('http://localhost:3000/weather?place='+myinp.value).then((response) =>{
		response.json().then( (data) =>{
			// console.log(data)
			if(data.error){
				text1.textContent = data.error
			}
			else{
				text1.textContent = data.location
				text2.textContent = data.weather
			}
		})
	})
	// console.log(myinp.value)
})