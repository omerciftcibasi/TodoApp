# TodoApp
Node GraphQL JWT Todo App
# Setup
Run following command to install required packages
`
    npx sequelize-cli db:migrate

`

# DB Setup
Configure your db connection using the file config/config.json

Run following command to create required tables.
`
    npx sequelize-cli db:migrate

`

# Security Setup
Add your web ui origin to config/corsOrigins.js file

# Run App
Run following command to run app
`
    node server.js

`
