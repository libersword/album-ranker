module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/albums", function(req, res) {
    album.getAlbum(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/albums", function(req, res) {
    album.addAlbum(req.body, function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/albums/:id", function(req, res) {
    album.deleteAlbum(req.params.id, function(results) {
      res.json(results);
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/albums", function(req, res) {
    album.editAlbum(req.body, function(results) {
      res.json(results);
    });
  });
};
