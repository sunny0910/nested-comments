# Nested/Threaded Comments
A NodeJs application which uses MongoDB to store nested/threaded comments.
User Comments can be one of the primary things in any Social or Collaborative website. The applications like Instagram, YouTube, Reddit etc have great implementations of User Comments.

## Techincal Specifications
* The Backend is a REST API built in ExpressJS which is an MVC web-application framework for NodeJs.
* MongoDB is used for the NoSQL Database along with ExpressJs in the backend Rest API. Mongoose, a MongoDB ODM(object data modelling) has also been used along with MongoDB in the database layer.
* The Frontend is built using ReactJs along with Material-UI and React-Router.

## Project Specifications
* Home page has a demo post where users can add their comments.
* Users can Add a new comment or reply to an existing comment.
* Users can also Edit their own comment
* Their can be no limit to the nesting of comments, but ideally, for the optimum performace and better user experience, I added a restriction to the depth value of nesting comments as 4.
* For Instance, Instagram only allow one level of reply to a comment, that is nesting level of 2 (parent, one-child)

## Requirements
* Express 4.x
* MongoDB 3.x
* Mongoose 5.x
* Node 8.x
* React-Router 5.x

## Installation
Clone the repository and Run the following commands in the terminal:
* ```npm run_script install_all``` (This will install the server's and the client's dependency packages)
* ```npm start``` (This will start the backend server. Alternatively, you can also run `npm run_script start_dev` to start the server with _nodemon_, which will look for the changes in the files and restart the server everytime)
* ```cd view && npm start``` (This will start the FrontEnd React application for Dev Environment. For Production, run `npm build` to build the FrontEnd for [deployment](https://bit.ly/CRA-deploy))

## About
Examples of Threaded Comments?
> [Hacker News](https://news.ycombinator.com/)

How to store Threded Comments?
```
Threaded Comments are basically hierarchical data, with parent & child relation.
Their are bunch of ways to store the hierarchical data in Relational/non-Relational database
```

## References
* https://docs.mongodb.com/ecosystem/use-cases/storing-comments/
* https://www.slideshare.net/billkarwin/models-for-hierarchical-data
* https://www.sitepoint.com/hierarchical-data-database/