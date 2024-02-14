// Importing Modules/Packages
const { User, Post } = require('../../models');
const dayjs = require('dayjs');
const post = require('express').Router();


// Gets All Posts
post.get('/Api', async (req, res) => {
    const { queryAll } = req.query;
    if(queryAll === 'false') {
        const data = await Post.findAll({ where: { UserID: req.session.userID }});
        const userPosts = data.map(element => element.dataValues);
        res.json(userPosts);
    }
    else {
        const data = await Post.findAll({
            include: { model: User, attributes: ['Username'] }
        });
        const userPosts = data.map(function({ dataValues }) {
            dataValues.User = dataValues.User.Username;
            return dataValues;
        });
        res.json(userPosts);
    }
})


// Creates a Users Posts
post.post('/Api/Create', async (req, res) => {
    const { Title, Content } = req.body;
    const { dataValues } = await Post.create({
        Title: Title,
        Content: Content,
        Date: dayjs().format('MM/DD/YYYY'),
        UserID: req.session.userID
    });
    res.json('Success!');
})


// Updates a Users Posts
post.put('/Api/:id', (req, res) => {
    const { Username, Password } = req.body;
    res.json('Successful UPDATE/PUT Route!');
})


// Deletes a Users Posts
post.delete('/Api/:id', (req, res) => {
    res.json('Successful Delete Route!');
})


// Exporting Module
module.exports = post;