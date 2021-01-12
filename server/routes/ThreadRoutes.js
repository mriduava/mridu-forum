const Forum = require('../models/forum');
const Thread = require('../models/thread');
const Post = require('../models/post');
const { isUserLoggedIn } = require('../acl/permission');

class ThreadRoutes{

  constructor(expressApp){
    this.app = expressApp
    this.getForumThreadById();
    this.postNewForumThread();
    this.postThreadPost();
    this.editForumThread();
    this.deleteForumThread();
    this.getMyThreads();
  }

  // GET MY THREADS
  getMyThreads(){
    this.app.get("/search/mythreads", isUserLoggedIn, (req, res) => {
      let query = { "author.username": req.query.username }
      Thread.find(query, (err, mythreads) => {
        if (err) {
            console.log(err);
        } else {
            res.json(mythreads);
        }
      });
    });
  }

  // GET FORUM THREAD BY ID
  getForumThreadById(){
    this.app.get('/api/forums/:_id1/:_id2', async (req, res)=>{
      try {
        let forumSubject= await Forum.findById(req.params._id1);
          if(!forumSubject) {
            return res.status(404).send("Forum not found!");
          }else{
            let threadTopic = await Thread.findById(req.params._id2).populate('posts');
            if(!threadTopic){
              return res.status(404).send("Thread not found!");
            }else{
               res.send(threadTopic);
            }
          }        
      } catch(e) {
          return res.status(404).send("Page not found!");
      }
    })
  }

  // POST A NEW FORUM THREAD
  postNewForumThread(){
    this.app.post('/api/forums/:_id', isUserLoggedIn, async (req, res)=>{
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
            res.status(200).send('Thread submission successful!')
          }
        }) 
      } catch(e) {
          return res.status(404).send('This subject is no longer exist!');
      }
    })
  }


  // EDIT A THREAD
  editForumThread(){
    this.app.put('/api/forums/:_id1/:_id2', isUserLoggedIn, (req, res) => {
      try {
        let forum = Forum.findById(req.params._id1);
        if (!forum) {
          return res.status(404).send('This forum is no longer exist!');          
        }else{                   
          Thread.findById(req.params._id2, (err, thread)=>{  
            try {
              if (thread.author.id.equals(req.user._id) 
                  || (req.user.role === 'admin')||(req.user.role==='moderator')) {
                 Thread.findByIdAndUpdate(req.params._id2, req.body, err=>{
                  if (err) {
                    res.send(err)
                  }else{
                    res.send("The thread updated successfully!")
                  }
                })                               
              }else{
                res.send('You are not allowed to make a change!')
              }
            } catch (error) {
              res.send("Thread not found!")
            }             
          });        
        }
      } catch (e) {
        return res.status(404).send('This forum is no longer exist!');
      }
    });
  }

  // DELETE A THREAD
  deleteForumThread(){
    this.app.delete('/api/forums/:_id1/:_id2', isUserLoggedIn, (req, res) => {
      try {
        let forum = Forum.findById(req.params._id1);
        if (!forum) {
          return res.status(404).send('This forum is no longer exist!');          
        }else{                   
          Thread.findById(req.params._id2, (err, thread)=>{  
            try {
              if (thread.author.id.equals(req.user._id) 
                  || (req.user.role === 'admin')||(req.user.role==='moderator')) {
                Thread.findByIdAndDelete(req.params._id2, err=>{
                  if (err) {
                    res.send(err)
                  }else{
                     Forum.findByIdAndUpdate(req.params._id1, {$pull: {threads: req.params._id2}}, err=>{
                       if (err) {
                         res.send(err)
                       }else{
                          res.send("The thread deleted successfully!")
                       }
                     })                    
                  }
                })                               
              }else{
                res.send('You are not allowed to make a change!')
              }
            } catch (error) {
              res.send("Thread not found!")
            }             
          });        
        }
      } catch (e) {
        return res.status(404).send('This forum is no longer exist!');
      }
    });
  }

  // POST THREAD POST
  postThreadPost(){
    this.app.post('/api/forums/:_id1/:_id2', isUserLoggedIn, async (req, res)=>{
      try {
        let forumSubject= await Forum.findById(req.params._id1);
          if(!forumSubject) {
            return res.status(404).send("Forum not found!");
          }else{
            let threadTopic = await Thread.findById(req.params._id2);
            if(!threadTopic){
              return res.status(404).send("Thread not found!");
            }else{
              await Post.create(req.body, (err, post)=>{
                if (err) {
                  res.json(err.message);
                }else{
                  post.author.id = req.user._id;
                  post.author.username = req.user.username;
                  threadTopic.posts.push(post);
                  post.save();
                  threadTopic.save();
                  res.json('Post submitting successful!')
                }
              }) 
            }
          }        
      } catch(e) {
          return res.status(404).send("Page not found!");
      }
    })
  }

}

module.exports = ThreadRoutes;