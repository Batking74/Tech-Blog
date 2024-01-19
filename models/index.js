const User = require('./User');
const Post = require('./Posts');


// A user can have many posts referenced from the UserID to specific users posts 
User.hasMany(Post, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE'
})

Post.belongsTo(User, {
    foreignKey: 'UserID'
})