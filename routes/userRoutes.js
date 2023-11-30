const userController = require('../controllers/usersController')

module.exports = (app, upload) => {
    app.post('/api/users/create', userController.create)
    app.post('/api/users/createWithImage', upload.array('image', 1), userController.createWithImage)
    app.post('/api/users/login', userController.login)
}