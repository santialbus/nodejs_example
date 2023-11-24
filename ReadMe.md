ERRORES COMUNES:

    · Si sale este error:
        code: 'ER_NOT_SUPPORTED_AUTH_MODE',

        errno: 1251,

        sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',

        sqlState: '08004',

        fatal: true

        Solución:

        En la bbdd hacer:

        ALTER USER 'tuUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tuContraseña';

CURL POSTMAN DE ENDPOINTS:

curl --location 'http://localhost:3333/api/users/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "name": "test",
    "lastname": "First",
    "phone": "678987654",
    "password": "pass"
}'

Dependencias que se han instalado:

"npm i.."

bcryptjs
cors
express
http
morgan
mysql
passport
passport-jwt
jsonwebtoken