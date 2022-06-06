import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/users', 'UsersController.index')
    Route.get('/users/edit/:id', 'UsersController.edit').middleware('is_admin:web,api')
    Route.post('/users/edit', 'UsersController.update').middleware('is_admin:web,api')
    Route.get('/users/add', 'UsersController.create')
    Route.post('/users/add', 'UsersController.store')
    Route.post('/users/delete', 'UsersController.destroy')
    Route.get('/mail', 'MailController.index')
    Route.get('/mail/edit/:id', 'MailController.edit')
    Route.post('/mail/edit', 'MailController.update')
  })

  .prefix('/admin')
  .middleware('auth:web,api')