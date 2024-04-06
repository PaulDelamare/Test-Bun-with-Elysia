// Import Elysia
import { Elysia } from "elysia";
//? Import plugin form an other file to use it in app
import { plugin } from './plugin'

//? Create Elysia app
const app = new Elysia()

  //* define basic route for access route in group (/api)
  .group('/api', (app) => 
    //* Basic route
    app
      .get('/', () => "Hello Elysia")

      //* Route with params
      .get('id/:id', ({ params: { id } }) => id)


      
      //* Can additionnal group
      .group('/test', (app) =>
        app.get('/', () => "test")
      )
  )

  //* Route other status
  .get('api/status', ({ error }) => error(419, "Kirifuji Nagisa"))

  //* Use the store
  //* Create store with first value
  .state('first', 1)
  //* Access store 
  .get('api/store', ({ store }) => store.first + 1)

  //* Accesses the store by storing the value in a variable
  .get('api/store-second', ({ store: {first} }) => first)

  //* Plugin instance in app
  .use(plugin())
  //* Get plugin information
  .get('api/store-plugin', ({ store }) => store.plugin)

  //* Retrun error if route doesn't exist
  .onError(({ code }) => {
    if (code === 'NOT_FOUND')
      return 'Route not found :('
  })

  //* Start the server on 3000 port
  .listen(3000);

//? Test request
app.handle(new Request('http://localhost:3000/api/plugin')).then(console.log)