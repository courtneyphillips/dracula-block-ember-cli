if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  var posts = [
    {
      id: 1,
      title: 'bananas',
      body: "A banana is an edible fruit",
      author: 1,
      comment: [1,3]
    },
    {
      id: 2,
      title: 'monkey',
      body: "Monkeys are haplorhine",
      author: 1,
      comment: [2]
    }
  ];

  var authors = [
    {
      id: 1,
      name: 'George',
      posts: [1,2]
    }
  ];

  var comment = [
    {
      id: 1,
      text: "this is so interesting omg"
    },
    {
      id: 2,
      text: "hahah your 'SO' makes me want to punch myself in the face."
    },
    {
      id: 3,
      text: "al;ksfjlaweighwoeigj"
    }
  ];

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'authors': authors,
      "comment": comment
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      "post": posts.find(function(post){
        return post.id == req.params.id
      }),
      "authors": authors,
      "comment": comment
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
