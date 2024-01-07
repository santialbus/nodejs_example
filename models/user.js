const db = require('../config/config')
const bcrypt = require('bcryptjs')

const User = {};

User.findById = (id, result) => {
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            image,
            password
        FROM
            users
        WHERE 
            id = ?
    `;

    db.query
    (
        sql,
        [id],
        (err, user) => {
            if(err) {
                console.log('FindById: Error:', err)
                result(err, null)
            } else {
                console.log('FindById: User obtenido: ', user)
                result(null, user)
            }
        }
    )
}

User.findByEmail = (email, result) => {
    const sql = `
        SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone,
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
        FROM
            users AS U
        INNER JOIN
            user_roles AS UR
        ON 
            UR.id_user = U.id
        INNER JOIN
            roles AS R
        ON 
            UR.id_rol = R.id
        WHERE 
            U.email = ?
        GROUP BY
            U.id
    `;

    db.query
    (
        sql,
        [email],
        (err, user) => {
            if(err) {
                console.log('FidnbyEmail: Error:', err)
                result(err, null)
            } else {
                console.log('FidnbyEmail: User obtenido: ', user[0])
                result(null, user[0])
            }
        }
    )
}

User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO  
            users(
                email, 
                name, 
                lastname, 
                phone, 
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?,?,?,?,?,?,?,?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err) {
                console.log('Error:', err)
                result(err, null)
            } else {
                console.log('Id del nuevo usuario: ', res.insertId)
                result(null, res.insertId)
            }
        }
    )
}

module.exports = User;