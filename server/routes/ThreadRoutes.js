const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Post = require('../models/post');
const { isUserLoggedIn, getPermissionToChange } = require('../acl/permission');

class ThreadRoutes{

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
    this.app.get('/api/forum/:_id/threads', async (req, res) => {
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
    this.app.get('/api/forums/:_id/threads/:_id', async (req, res)=>{
      try {
        let forumArticle = await Thread.findById(req.params._id)
          .populate('posts');
          if(!forumArticle) 
            return res.status(404).send("Article not found!");
          res.send(forumArticle);
      } catch(e) {
          return res.status(404).send("Article not found!");
      }
    })
  }

  // POST A NEW FORUM THREAD
  // postNewForumThread(){
  //   this.app.post('/api/forums/:_id/threads', isUserLoggedIn, async (req, res) => {
  //     await Thread.create(req.body, (err, text)=>{
  //       if (err) {
  //         res.json(err.message);
  //       }else{
  //         text.author.id = req.user._id;
  //         text.author.username = req.user.username;
  //         text.save();
  //         res.redirect('/api/forums')
  //       }
  //     })
  //   })
  // }

  // POST A NEW FORUM THREAD
  postNewForumThread(){
    this.app.post('/api/forums/:_id/threads', isUserLoggedIn, async (req, res)=>{
      try {
        let forumSubject = await Forum.findById(req.params._id);
        await Thread.create(req.body, (err, thread)=>{
          if (err) {
            res.json(err.message);
          }else{
            thread.author.id = req.user._id;
            thread.author.username = req.user.username;
            forumSubject.threads.push(thread);
            thread.save();
            forumSubject.save();
            res.redirect('/api/forums/' + req.params._id)
          }
        }) 
      } catch(e) {
          return res.status(404).send('This subject is no longer exist!');
      }
    })
  }


  // EDIT A THREAD
  editForumThread(){
    this.app.put('/api/forums/:_id/threads/:_id', getPermissionToChange(), async (req, res) => {
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
    this.app.delete('/api/forums/:_id/threads/:_id', getPermissionToChange(), async (req, res) => {
      try {
        let forumArticle = await Thread.findById(req.params._id);
        if (forumArticle) {
          await Thread.findByIdAndDelete(req.params._id, (err) => {
            if(err){
              res.redirect("/api/forums/" + req.params._id);
            }else{
              res.redirect("/api/forums");
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
    this.app.post('/api/forums/:_id/threads/:_id/posts', isUserLoggedIn, async (req, res)=>{
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
            res.redirect('/api/forums/' + req.params._id)
          }
        }) 
      } catch(e) {
          return res.status(404).send('This article is no longer exist!');
      }
    })
  }

}

module.exports = ThreadRoutes;