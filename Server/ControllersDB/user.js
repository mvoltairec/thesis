const knex = require('../dbConfig.js').knex
const User = require('../ModelsDB/user.js')

// userController = {
// 	findOrCreateUser : function(body){
//
// 		return knex.select('*').from('user').where('google_id', body.google_id)
// 			.then((profileCheck) => {
// 				console.log('in controller', profileCheck)
// 				if (profileCheck.length > 0) {
// 					// knex('user').where('google_id', body.google_id).update({'accessToken': body.accessToken}).then(rows => {
// 					// 	return knex.select('*').from('user').where('google_id', body.google_id)
// 					// 		.then((profileCheck => {
// 					// 			console.log('in profilecheck user ', profileCheck[0])
// 								return profileCheck[0]
// 							// }))
// 					})
// 				} else {
// 						const newUser = new User({
// 						name: body.name,
// 						img: body.img,
// 						google_id: body.google_id,
// 						etag: body.etag,
// 						email: body.email,
// 						accessToken: body.accessToken,
// 						refreshToken: body.refreshToken
// 					})
// 					return newUser.save()
// 						.then(user => user.attributes)
// 				}
// 			}
// 		// )
//
// 	},
userController = {
	findOrCreateUser : function(body){
		console.log('BODYYYYDOSIJDJSLJDSJDLKJ', body)
		return knex.select('*').from('user').where('google_id', body.google_id)
			.then((profileCheck) => {
				if (profileCheck.length > 0) {
					var updates = {email: body.email, accessToken: body.accessToken, refreshToken: body.refreshToken}
					return this.editFields(profileCheck[0].id, updates).then(() => this.getUser(null, body.google_id)).catch(x => console.log(err))
				} else {
					console.log('fuck u', body.google_id)
						const newUser = new User({
						name: body.name,
						img: body.img,
						google_id: body.google_id,
						etag: body.etag,
						email: body.email,
						accessToken: body.accessToken,
						refreshToken: body.refreshToken
					})
					return newUser.save()
						.then(user => user.attributes)
						.catch(x => console.log(x))
				}
			}).catch(x => console.log(x))

	},
	getUser: async function(id, google_id, hash) {
	   if (google_id !== null && google_id !== undefined){
		  console.log('are these equal', google_id === '104716379930543675137', typeof google_id)
			let result =  await knex.select('*').from('user').where('google_id', google_id)
		  return result[0]
		} else if(hash !== null && hash !== undefined){
			console.log('looking for hash')
			let result =  await knex.select('*').from('user').where('hash', hash)
		  return result[0]
		} else {
			console.log('looking for id')
			let result =  await knex.select('*').from('user').where('id', id)
			console.log(result[0])
		  return result[0]
		}
	},
	getToken: function() {
		return knex.select('accessToken').from('user').where('id', id)
	},
	findAll : function(){
    return knex.select('*').from('user')
	},
	deleteUser: function(id){
		return knex('user').where('id', id).del()
	},
	editField: function(id, field, newValue){

		return knex('user').where('id', id).update(field, newValue)
	},
	editFields: function(id, obj){
				console.log('fuckkkkkkk uuuuuuuuuuuuuu', obj )
		return knex('user').where('id', id).update(obj)
	}
}



module.exports = userController
