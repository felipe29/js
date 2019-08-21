//Definicoes Globais
const express = require('express');
const server = express();
server.use(express.json());
server.use((req, res, next) => {
  total = total + 1;
  console.log(`sum of request to application ${total}`);
  next();
});
//Stores
var projects = [];
var total = 0;
//middlewares Functions
function verifyParameterOfRequest(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Your not send project title' });
  }
  if (!req.body.id) {
    return res.status(400).json({ error: 'Your not send project id' });
  }
  return next();
}

function verifyOfExistsOnArray(req, res, next) {
  if (!projects[req.params.id]) {
    return res.status(404).json({ error: 'Project not found' });
  }
  return next();
}

//Routes
server.post('/projects', verifyParameterOfRequest, (req, res) => {
  const { title } = req.body;
  const { id } = req.body;
  const { tasks } = req.body;
  const projeto = new Object();
  projeto.title = title;
  projeto.id = id;
  projeto.tasks = tasks;
  projects.push(projeto);
  return res.json(projects);
});

server.post('/projects/:id/tarefas', verifyOfExistsOnArray, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;
  const tarefas = [];

  projects[id].tasks.push(tasks);
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', verifyOfExistsOnArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects[id].title = title;
  return res.status(200).json(projects[id]);
});
server.delete('/projects/:id', verifyOfExistsOnArray, (req, res) => {
  const { id } = req.params;
  projects = projects.slice(id, id + 0);
  console.log(projects);
  return res.status(200).json(projects);
});

server.listen(3001);
