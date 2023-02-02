import {configValue} from './index.d'

function config () : configValue {

  const standard: configValue = {
    db: {
      port: 3306,
      user: 'athlon38',
      database: 'mystore',
      password: 'trine-73-glf',
      host: 'localhost'
    },
    server: 'http://localhost:3300',
    bookstore: 'http://localhost:3300'
  }

  if (process.env.DOCKER) {
    standard.db.host = 'mysql'
    return standard
  }

  // pt er vagrant uændret som standard på hosten
  if (process.env.VAGRANT) {
    return standard
  }

  // Hosten
  return standard

}

export default config()
