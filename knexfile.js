// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'cluckrdb',
      username: 'vidwad',
      password: 'abcd',
    },
    migrations: {
      directory: './db/migrations'
    }
  }
};
