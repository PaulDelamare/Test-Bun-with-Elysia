// Import Elysia
import { Elysia } from "elysia";

//? Create plugiçn to use in app when we instance it with .use()
export const plugin = (version:number = 66) => new Elysia()
  //* Create plugin store with value 3
  .state('plugin', 3) 
  //* Add route for check store value
  .get('api/plugin', ({ store: {plugin} }) => plugin)
  //* Get parameters value (version = 1)
  .get('api/plugin-params', () => version);

//? Can also export plugin like this
// export  {plugin}