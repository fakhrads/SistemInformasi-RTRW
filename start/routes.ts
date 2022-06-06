/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/admin'
import './routes/warga'
import './routes/auth'

Route.get('/', async ({ auth, response }) => {
  await auth.use('web').authenticate()
  console.log(auth.use('web').user!.id)
  response.redirect().toRoute('/dashboard')
})

Route.get('/dashboard', 'DashboardController.index')
