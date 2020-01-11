require('dotenv').config()
module.exports = {
  "development": {
    "username": "root",
    "password": process.env.PASS,
    "database": "album_ranker",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.JAWS_USER,
    "password": process.env.JAWS_PASS,
    "host": "localhost",
    "database": process.env.JAWS_DB,
    "use_env_variable" : "JAWSDB_URL",
    "dialect":"mysql"
  }
}
