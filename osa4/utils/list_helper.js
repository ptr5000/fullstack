
const totalLikes = (blogs) => (blogs.reduce((p, curr)=>(p + curr.likes), 0))
const favouriteBlog = (blogs) => (blogs.reduce((p, curr)=> (p.likes > curr.likes) ? p:curr));

const mostBlogs = (blogs) => {
    let b = blogs.reduce((p, curr) => {
        if(p[curr.author] == undefined) p[curr.author] = 1;
        else p[curr.author]++;
        return p
    }, []);

    let out = {blogs: -1};
    for(let key in b) {
        if(b[key] > out.blogs) {
            out = {author: key, blogs: b[key]}
        }
    }

    return out;
}

const mostLikes = (blogs) => {
    let b = blogs.reduce((p, curr) => {
        if(p[curr.author] == undefined) p[curr.author] = curr.likes;
        else p[curr.author]+=curr.likes;
        return p
    }, []);
    
    let out = {likes: -1}

    for(let key in b) {
        if(b[key] > out.likes) {
            out = {author: key, likes: b[key]}
        }
    }

    return out;
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}