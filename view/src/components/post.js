import React, {Component} from 'react';
import logo from '../logo.svg';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    Post/Article
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div>
                    Comments
                    <div>
                        ...
                    </div>
                </div>
            </div>
        )
    }
}
export default Post;