
const totalLikes = (blogs) => (blogs.reduce((p, curr)=>(p + curr.likes), 0))
const favouriteBlog = (blogs) => (blogs.reduce((p, curr)=> (p.likes > curr.likes) ? p:curr));

const mostBlogs = (blogs) => {
   
}

module.exports = {
    totalLikes,
    favouriteBlog
}