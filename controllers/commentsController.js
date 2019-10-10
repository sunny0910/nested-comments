const Comment = require('../models/commentsModel')

const addComment = (req, res) => {
    let data = {
        author: {
            id: req.body.id,
            name: req.body.name
        },
        commentText: req.body.commentText
    }
    if ('parentId' in req.body) {
        data.parentId = req.body.parentId
    }
    const comment = new Comment(data);
    comment.save()
    .then(comment => res.json({
        comment: comment
    }))
    .catch(err => res.status(500).json({error: err}))
}

const updateComment = (req, res) => {
    let {id, ...updatedComment} = req.body;
    Comment.update({id: id}, {$set: {updatedComment}})
    .exec()
    .then(res => res.statue(200).json({
        message: "Comment Updated"
    }))
    .catch(err => res.status(500).json({error: err}))
}

module.exports = {
    addComment: addComment,
    updateComment: updateComment,
}