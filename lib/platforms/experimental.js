module.exports = function() {
  var session;
 
  function doSomething(job, cb) {
    console.log('doSomething', job);
    cb(null, 'job done!');
  }

  return {
    init: function(setSession) {
      session = setSession;
      var promise = session.promising();  // session object from sockethub
      promise.fulfill();  // fulfill promise, you can also reject()
      return promise;
    },
    cleanup: function() {
      var promise = session.promising();
      promise.fulfill();
      return promise;
    },
    post: function (job) {
      var promise = session.promising();
      doSomething(job, function(err, data) {
        session.send({
          err: err,
          data: data
        });
      });
      promise.fulfill();
      return promise;
    }
  };
};
