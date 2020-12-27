const Forum = require('../models/forum');
const Comment = require('../models/comment');

class ForumRoutes{

  constructor(expressApp){
    this.app = expressApp
    this.getAllForumArticles();
    this.getForumArticleById();
    this.postNewForumArticle();
    this.postComment();
    this.editForumArticle();
    this.deleteForumArticle();
  }


  // CHECK IF THE USER IS LOGGED IN 
  isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
  }


  // GET ALL FORUM POSTS
  getAllForumArticles(){
    this.app.get('/api/forum', async (req, res) => {
      await Forum.find({}, (err, post)=>{
        if (err) {
          res.json(err);
        }else{
          res.json(post);
        }
      })
    })
  }

  // GET FORUM ARTICLE BY ID
  getForumArticleById(){
    this.app.get('/api/forum/:_id', async (req, res)=>{
      try {
        let forumArticle = await Forum.findById(req.params._id)
          .populate('comments');
          if(!forumArticle) 
            return res.status(404).send("Article not found!");
          res.send(forumArticle);
      } catch(e) {
          return res.status(404).send("Article not found!");
      }
    })
  }

  // POST A NEW FORUM
  postNewForumArticle(){
    this.app.post('/api/forum/newpost', this.isUserLoggedIn, async (req, res) => {
      await Forum.create(req.body, (err, text)=>{
        if (err) {
          res.json(err.message);
        }else{
          text.author.id = req.user._id;
          text.author.username = req.user.username;
          text.save();
          res.redirect('/api/forum')
        }
      })
    })
  }

  // EDIT AN ARTICLE
  editForumArticle(){
    this.app.put('/api/forum/:_id', async (req, res) => {
      await Forum.findByIdAndUpdate(req.params._id, req.body, (err, updated) =>{
        if(err){
          res.redirect("/api/forum");
        }else{
          res.redirect("/api/forum/" + req.params._id);
        }
      });
    });
  }

  // DELETE AN ARTICLE
  deleteForumArticle(){
    this.app.delete('/api/forum/:_id', async (req, res) => {
      await Forum.findByIdAndRemove(req.params._id, (err) => {
        if(err){
          res.redirect("/api/forum/" + req.params._id);
        }else{
          res.redirect("/api/forum");
        }
      });
    });
  }

  // POST COMMENT
  postComment(){
    this.app.post('/api/forum/:_id/comments', this.isUserLoggedIn, async (req, res)=>{
      let forumArticle = await Forum.findById(req.params._id);
      await Comment.create(req.body, (err, comment)=>{
        if (err) {
          res.json(err.message);
        }else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          forumArticle.comments.push(comment);
          comment.save();
          forumArticle.save();
          res.redirect('/api/forum/' + req.params._id)
        }
      })
    })
  }

}

module.exports = ForumRoutes;