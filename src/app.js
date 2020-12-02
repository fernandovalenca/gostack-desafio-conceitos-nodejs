const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(), title, url, techs, likes: 0
  }

  if (!isUuid(repository.id)) {
    return response.status(400).json({ message: 'Id invalid' })
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not exists' })
  }

  const repository = {
    id, title, url, techs, likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not found' })
  }

  repositories.splice(repositoryIndex, 1);

  return response.sendStatus(204);

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: 'Repository not exists' })
  };

  const repository = repositories[repositoryIndex];

  repository.likes = repository.likes + 1

  return response.json(repository)
});

module.exports = app;
