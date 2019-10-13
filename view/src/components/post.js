import React, {Component} from 'react';
import {Paper, Input, Button} from '@material-ui/core';
import apiRequest, {handleErrors} from '../apiRequest';
import apiUrl from '../apiUrl';
import getDataFromCookie from '../getDataFromCookie';
import Comment from './comment';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            comments: [],
            commentsCount: 0
        }
        this.getData();
    }

    getData() {
        apiRequest(apiUrl + '/comments/', 'GET').then(handleErrors)
        .then(result => {
            if (result.status === 500) {
                console.log(result);
                return;
            }
            result.json()
            .then(json => {
                let comments =[]
                for (let [id, comment] of Object.entries(json.comments)) {
                    comments.push(comment)
                }
                this.setState({
                    commentsCount: json.count,
                    comments: comments,
                    comment: ""
                })
            })
            .catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        })
    }

    editComment = (e) => {
        this.setState({comment: e.target.value})
    }

    addComment = (replyComment=false, parentComment=null, commentText=null) => {
        if (replyComment === false && this.state.comment === "") {
            return
        }
        let data = {
            id: getDataFromCookie('userId'),
            name: getDataFromCookie('name'),
            commentText: replyComment === true ? commentText: this.state.comment
        }
        if (replyComment === true) {
            data.parentId = parentComment._id;
            data.depth = parentComment.depth + 1
        }
        data = JSON.stringify(data);
        apiRequest(apiUrl + "/comments/", "POST", data).then(handleErrors).then(result => {
            if (result.status === 500) {
              console.log(result);
              return;
            }
            result
              .json()
              .then(json => {
                    this.getData();
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            console.log(err);
          })
    }

    refreshCommentsAfterEdit = (editedComment) => {
        this.getData();
        return
    }

    displayComments = (allComments) => {
        let comments = []
        for (let [id, comment] of Object.entries(allComments)) {
            comments.push(<Comment
                loggedIn = {this.props.loggedIn}
                commentData = {comment}
                key={comment._id}
                refreshCommentsAfterEdit={this.refreshCommentsAfterEdit}
                addComment={this.addComment}
            />)
            if (comment.children && Object.keys(comment.children).length > 0) {
                let replies = this.displayComments(comment.children)
                comments = comments.concat(replies)
            }
        }
        return comments
    }

    render() {
        let comments = this.displayComments(this.state.comments)
        return (
            <div className="content">
                <div className="post">
                    <Paper>
                    Post/Article
                    </Paper>
                </div>
                <div>
                    <Input value={this.state.comment} disabled={!this.props.loggedIn} multiline rows="2" rowsMax="3" placeholder={!this.props.loggedIn?"Login to comment":"Type your comment..."} style={{width: "100%"}} onChange={this.editComment}/>
                </div>
                <Button size="small"
                disabled={!this.props.loggedIn}
                color="primary"
                variant="contained"
                style={{backgroundColor: '#2196f3', marginTop: "1%"}}
                onClick={this.addComment}>Submit</Button>
                <div>
                    <span>{this.state.commentsCount} Comments</span>
                    <div>
                        {comments}
                    </div>
                </div>
            </div>
        )
    }
}
export default Post;