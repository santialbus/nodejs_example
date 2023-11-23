const User = require('../models/user')

module.exports = {
    create(req, res) {
        const user = req.body; //capturo datos
        User.create(user, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error con el registro del usuario',
                    error: err
                })
            } 

            return res.status(201).json({
                succes: true,
                message: 'Se registro completamente',
                data: data //Id del nuevo usuario que se registro
            })
        })

    }
}