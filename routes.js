var routes = function(app, data) {

  // Index Page
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Index'
    });
  });

  // Index Page
  app.get('/rsvp', function(req, res) {
    res.render('rsvp');
  });

  // app.get('/:page', pjaxRewrite, function(req, res, next){
  // res.send(req.param.page);
  // });


  // Middleware

  // function pjaxRewrite(req, res, next) {
  //   console.log('headers', req.headers);
  //   if (req.header('X-Pjax')) {
  //     console.log('TRUE!');
  //     req.url = req.url.replace(/([a-zA-Z0-9\_\-]+)/, "/snippets/$1.html");
  //   }
  //   next();
  // }

};

module.exports = routes;