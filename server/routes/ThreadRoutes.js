const Thread = require('../models/thread');
const Post = require('../models/post');
const { isUserLoggedIn, getPermissionToChange } = require('../acl/permission');

class ForumRoutes{

  constructor(expressApp){
    this.app = expressApp
    this.getAllForumThreads();
    this.getForumThreadById();
    this.postNewForumThread();
    this.postThreadPost();
    this.editForumThread();
    this.deleteForumThread();
  }

  // GET ALL FORUM THREADS
  getAllForumThreads(){
    this.app.get('/api/forum', async (req, res) => {
      await Thread.find({}, (err, thread)=>{
        if (err) {
          res.json(err);
        }else{
          res.json(thread);
        }
      })
    })
  }

  // GET FORUM THREAD BY ID
  getForumThreadById(){
    this.app.get('/api/forum/:_id', async (req, res)=>{
      try {
        let forumArticle = await Thread.findById(req.params._id)
          .populate('comments');
          if(!forumArticle) 
            return res.status(404).send("Article not found!");
          res.send(forumArticle);
      } catch(e) {
          return res.status(404).send("Article not found!");
      }
    })
  }

  // POST A NEW FORUM THREAD
  postNewForumThread(){
    this.app.post('/api/forum', isUserLoggedIn, async (req, res) => {
      await Thread.create(req.body, (err, text)=>{
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

  // EDIT A THREAD
  editForumThread(){
    this.app.put('/api/forum/:_id', getPermissionToChange(), async (req, res) => {
      try {
        let forumArticle = await Thread.findById(req.params._id);
        if (forumArticle) {
          await Thread.findByIdAndUpdate(req.params._id, req.body, (err) =>{
            if(err){
              res.redirect("/api/forum");
            }else{
              res.redirect("/api/forum/" + req.params._id);
            }
          });
        }else{
          return res.status(404).send('This article is no longer exist!');
        }
      } catch (e) {
        return res.status(404).send('This article is no longer exist!');
      }
    });
  }

  // DELETE A THREAD
  deleteForumThread(){
    this.app.delete('/api/forum/:_id', getPermissionToChange(), async (req, res) => {
      try {
        let forumArticle = await Thread.findById(req.params._id);
        if (forumArticle) {
          await Thread.findByIdAndDelete(req.params._id, (err) => {
            if(err){
              res.redirect("/api/forum/" + req.params._id);
            }else{
              res.redirect("/api/forum");
            }
          });
        }else{
          return res.status(404).send('This article is no longer exist!');
        }
      } catch (e) {
        return res.status(404).send('This article is no longer exist!');
      }
    });
  }

  // POST THREAD POST
  postThreadPost(){
    this.app.post('/api/forum/:_id/posts', isUserLoggedIn, async (req, res)=>{
      try {
        let forumArticle = await Thread.findById(req.params._id);
        await Post.create(req.body, (err, comment)=>{
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
      } catch(e) {
          return res.status(404).send('This article is no longer exist!');
      }
    })
  }

}

module.exports = ForumRoutes;