const db = require('../config/config')

const Rol = {}

Rol.create = (id_user, id_rol, result) => {
    const sql = `
        INSERT INTO user_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)`;

        db.query
    (
        sql,
        [id_user, id_rol, new Date(), new Date()],
        (err, res) => {
            if(err) {
                console.log('create rol: Error:', err)
                result(err, null)
            } else {
                console.log('create rol: User obtenido: ', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

module.exports = Rol;