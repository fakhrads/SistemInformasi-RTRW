import Route from '@ioc:Adonis/Core/Route'

Route
  .group(() => {
    Route.get('/mail', 'WargaMailsController.index')
    Route.get('/mail/new', 'WargaMailsController.create')
    Route.post('/mail/new', 'WargaMailsController.store')
  })
  .prefix('/warga')