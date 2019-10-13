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
    if ('depth' in req.body) {
        data.depth = req.body.depth
    }
    const comment = new Comment(data);
    comment.save()
    .then(comment => res.json({
        comment: comment
    }))
    .catch(err => res.status(500).json({error: err}))
}

const updateComment = (req, res) => {
    let comment = req.body;
    Comment.updateOne({_id: comment.id}, {$set: {commentText: comment.commentText}})
    .exec()
    .then(result => res.status(200).json({
        message: "Comment Updated",
        comment: comment
    }))
    .catch(err => res.status(500).json({error: err}))
}

const getComments = (req, res) => {
    Comment.find({postId: '1'}).sort({postedDate: 1}).lean().exec()
    .then(comments => {
        let rec = (comment, threads) => {
            for (var thread in threads) {
                value = threads[thread];

                if (thread.toString() === comment.parentId.toString()) {
                    value.children[comment._id] = comment;
                    return;
                }

                if (value.children) {
                    rec(comment, value.children)
                }
            }
        }
        let threads = {}, comment
        for (let i=0; i<comments.length; i++) {
            comment = comments[i]
            comment['children'] = {}
            let parentId = comment.parentId
            if (!parentId) {
                threads[comment._id] = comment
                continue
            }
            rec(comment, threads)
        }
        res.json({
            'count': comments.length,
            'comments': threads
        })
    })
    .catch(err => res.status(500).json({error: err}))
}

module.exports = {
    addComment: addComment,
    updateComment: updateComment,
    getComments: getComments
}