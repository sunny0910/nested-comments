import React, {Component} from 'react';
import { Button, Input } from '@material-ui/core';
import apiUrl from '../apiUrl';
import apiRequest, {handleErrors} from '../apiRequest';
import getDataFromCookie from '../getDataFromCookie';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editClicked: false,
            replyClicked: false,
            comment: ""
        }
    }

    editComment = (commentText) => {
        this.setState({
            editClicked: true,
            comment: commentText
        })
    }

    saveEdit = (comment) => {
        let data = JSON.stringify({
            id: comment._id,
            commentText: this.state.comment
        });
        apiRequest(apiUrl + "/comments/edit", "POST", data).then(handleErrors).then(result => {
            if (result.status === 500) {
              return;
            }
            result
              .json()
              .then(json => {
                this.props.refreshCommentsAfterEdit(json.comment)
                this.setState({
                    editClicked: false,
                    comment: ""
                });
              })
              .catch(err => {
                console.log(err);
              });
          }).catch(err => {
            console.log(err)
          })
    }

    replyToComment = () => {
        this.setState({replyClicked: true})
    }

    cancelEdit = () => {
        this.setState({
            editClicked: false,
            comment: ""
        })
    }

    typeComment = (e) => {
        this.setState({comment: e.target.value})
    }

    replyCancel = () => {
        this.setState({
            replyClicked: false,
            comment: ""
        })
    }

    replySumbit = (parentComment) => {
        this.props.addComment(true, parentComment, this.state.comment)
        this.setState({
            replyClicked: false,
            comment: ""
        })
    }

    render() {
        let comment = this.props.commentData;
        let date = new Date(comment.postedDate).toLocaleString();
        let replyActionsStyle = {backgroundColor: '#2196f3', margin: "5px 0 0 5px", lineHeight: "1"};
        // let className = comment.depth == 1 ? "single-comment" : "child-comment";
        let marginleft = (comment.depth-1)*10+'%';
        // .single-comment {
        //     margin: 0.5% 0;
        //   }
        //   .child-comment {
        //     margin: 0.5% 0 0 10% 
        //   }
        return (
            <div className='single-comment' style={{marginLeft: marginleft}}>
                <div className="comment-header">
                    <div style={{float: "left"}}>{comment.author.name}:</div><div style={{float: "right"}}>{date}</div>
                </div>
                <div className="comment-content">
                    {this.state.editClicked ? 
                        <Input value={this.state.comment} multiline rows="3" rowsMax="5" placeholder="Type your comment..." style={{width: "100%"}} onChange={this.typeComment}/>:
                        <div className="comment-text">
                            {comment.commentText}
                        </div>
                    }
                    <div className="comment-actions">
                        {comment.author.id === getDataFromCookie('userId') ?
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                style={{backgroundColor: '#2196f3'}}
                                onClick={this.state.editClicked ? () => this.saveEdit(comment) : () => this.editComment(comment.commentText)}
                            >
                                {this.state.editClicked ? "Save" : "Edit"}
                            </Button> : ''
                        }
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            style={{backgroundColor: '#2196f3'}}
                            onClick={this.state.editClicked ? this.cancelEdit : this.replyToComment}
                        >
                            {this.state.editClicked ? "Cancel" : "Reply"}
                        </Button>
                    </div>
                </div>
                {this.state.replyClicked ? 
                <div className="reply-input">
                    <Input value={this.state.comment} multiline rows="2" rowsMax="3" disabled={!this.props.loggedIn} placeholder={!this.props.loggedIn?"Login to comment":"Type your reply..."} style={{width: "100%"}} onChange={this.typeComment}/>
                    <div className="comment-action">
                        <Button disabled={!this.props.loggedIn} size="small" color="primary" variant="contained" style={replyActionsStyle} onClick={() => this.replySumbit(comment)}>Submit</Button>
                        <Button size="small" color="primary" variant="contained" style={replyActionsStyle} onClick={this.replyCancel}>Cancel</Button>
                    </div>
                </div>:
                ""}
            </div>
        )
    }
}

export default Comment