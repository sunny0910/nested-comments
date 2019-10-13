function node() {
    if (process.env.NODE_ENV === 'production') {
        return true;
    } else {
        return false
    }
}
const ROOT_URL = node()
    ? 'https://nested-comment.herokuapp.com/api/v1'
    : 'http://localhost:3000/api/v1';
export default ROOT_URL;
