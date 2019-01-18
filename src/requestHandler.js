const areMatching = function(req, route) {
  if (route.method && req.method != route.method) return false;
  if (route.url instanceof RegExp && route.url.test(req.url)) return true;
  if (route.url && route.url != req.url) return false;
  return true;
};

class Handler {
  constructor(url = []) {
    this.routes = url;
  }

  handleRequests(req, res) {
    let validRequests = this.routes.filter(route => areMatching(req, route));
    function next() {
      let currentReq = validRequests.shift();
      if (!currentReq) return;
      currentReq.handler(req, res, next);
      // next();
    }

    next();
  }

  view(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ url, handler });
  }
}

module.exports = Handler;
