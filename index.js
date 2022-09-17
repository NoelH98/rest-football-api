const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const teams = [
     {id: 1, name: 'Arsenal'},
     {id: 2, name: 'Man City'},
     {id: 3, name: 'Liverpool'},
     {id: 4, name: 'Chelsea'}
];

app.get('/',(req,res) =>{
    res.send('Welcome to The Team Selector');
});

app.get('/api/teams', (req, res) => {
    res.send(teams);
});

app.get('/api/teams/:id',(req,res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id));
    if (!team) res.status(404).send('The team given id doesnt exist!!!');
    res.send(team);
});

app.post('/api/teams', (req,res) => {
    const schema = {
        name: Joi.string().min(4).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const team = {
        id: teams.length + 1,
        name : req.body.name
    };
    teams.push(team);
    res.send(team);
});


 app.put ('/api/teams/:id',(res,req) => {
    const team = teams.find(c => c.id === parseInt(req.params.id));
    if (!team)  return res.status(404).send('The team given id doesnt exist!!!');

    const schema = {
        name: Joi.string().min(4).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    team.name = req.body.name;
    res.send(team);
 });

 app.delete('/api/teams/:id', (req,res) => {
    const team = teams.find(c => c.id === parseInt(req.params.id));
    if (!team) return res.status(404).send('The team given id doesnt exist!!!');

    const index = teams.indexOf(team);
    teams.splice(index, 1);
    res.send(team);
 });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
