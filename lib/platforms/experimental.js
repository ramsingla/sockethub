var Q = require('q');

module.exports = function() {
  var session;
 
  function doSomething(job, cb) {
    console.log('doSomething', job);
    cb(null, 'job done!');
  }

  return {
    init: function(setSession) {
      session = setSession;  // session object from sockethub
      var q = Q.defer();
      q.resolve();  // fulfill promise, you can also reject()
      return q.promise;
    },
    cleanup: function() {
      var q = Q.defer();
      q.resolve();
      return q.promise;
    },
    post: function (job) {
      var q = Q.defer();
      doSomething(job, function(err, data) {
        session.send({
          err: err,
          data: data
        });
      });
      q.resolve();
      return q.promise;
    }
  };
};
