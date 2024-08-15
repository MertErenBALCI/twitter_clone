/* eslint-disable indent */
module.exports = {
    info: {
      version: '1.0.1',
      title: `FAULT-REGISTRATION ${process.env.NODE_ENV} Swagger document`,
      description: 'FAULT-REGISTRATION Swagger document - Bu projede kullanılan bütün timestamp\'ler GMT +0 dır. lütfen kullanılacak konuma göre UX tarafında timezonunuza çevirin. Backende iletirken iligli timestamp\'leri GMT +0 olarak iletin! timestampler 10 haneli Interger değer olarak gönderiniz.',
    },
    security: {
      UserAuth: {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
      },
      IntAuth: {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
      },
      RefreshAuth: {
        'type': 'apiKey',
        'in': 'header',
        'name': 'refresh_token'
      },
      RefreshKey: {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
      },
    },
    'servers': [
      // {
      //    'url': 'https://development.gigantic-server.com/v1',
      //    'description': 'Development server'
      // }
      
    ],
    baseDir: __dirname,
    filesPattern: '../routes/**/*.js',
    swaggerUIPath: '/docs',
    apiDocsPath: '/docs-download',
    notRequiredAsNullable: false,

    exposeApiDocs: true,
    swaggerUiOptions: {
      swaggerOptions: {
        persistAuthorization: true
      },
    },
  };