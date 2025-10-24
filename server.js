const express = require("express");
const db = require("./database.json");
const app = express();
const port = 3000;

let tasks = db.tasks;

app.use(express.json());

//GET ALL
app.get('/tasks', (req, res) =>{
    res.json(tasks);
});

//GET
app.get('/tasks', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(x => x.id === id);

    if (!task) 
        return res.status(404).send('Tarefa não encontrada.');

});

//POST
app.post('/tasks', (req, res) => {

    const newTask = req.body

    if(!newTask.title || !newTask.completed)
        res.status(400).send("Título e campo 'completo' precisam ter valores!");

    tasks.push(newTask);

    res.status(201).json(newTask);
});

//DELETE
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = tasks.length;

    tasks = tasks.filter(x => x.id !== id);
    if (tasks.length === initialLength)
        return res.status(404).send('Tarefa não encontrada.');

    res.status(204).send();
});

//PUT
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(p => p.id === id);
    if (taskIndex === -1)
        return res.status(404).send('Tarefa não encontrada.');

    const taskBody = req.body;
    const task = tasks[taskIndex];

    if (taskBody.title !== undefined) 
        task.title = taskBody.title;

    if (taskBody.completed !== undefined)
        task.completed = taskBody.completed;

    res.json(tasks);
});

app.listen(port, () => {console.log(`Servidor rodando em http://localhost:${port}`);});