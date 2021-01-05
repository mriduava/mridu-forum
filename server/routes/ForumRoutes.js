const Forum = require('../models/forum');

class ForumRoutes{

  constructor(expressApp){
    this.app = expressApp
    this.getAllForumSubjects();
    this.getForumSubjectById();
    this.postNewForumSubject();
    this.editForumSubject();
    this.deleteForumSubject();
  }

  // GET ALL FORUM SUBJECTS
  getAllForumSubjects(){
    this.app.get('/api/forums', async (req, res) => {
      await Forum.find({}, (err, thread)=>{
        if (err) {
          res.json(err);
        }else{
          res.json(thread);
        }
      })
    })
  }

  // GET FORUM SUBJECT BY ID
  getForumSubjectById(){
    this.app.get('/api/forums/:_id', async (req, res)=>{
      try {
        let forumSubject= await Forum.findById(req.params._id)
          .populate('threads');
          if(!forumSubject) 
            return res.status(404).send("Forum not found!");
          res.send(forumSubject);
      } catch(e) {
          return res.status(404).send("Forum not found!");
      }
    })
  }

  // POST A NEW FORUM THREAD
  postNewForumSubject(){
    this.app.post('/api/forums', async (req, res) => {
      await Forum.create(req.body, (err, text)=>{
        if (err) {
          res.json(err.message);
        }else{
          text.save();
          res.redirect('/api/forums')
        }
      })
    })
  }

  // EDIT A FORUM SUBJECT
  editForumSubject(){
    this.app.put('/api/forums/:_id', async (req, res) => {
      try {
        let forumSubject = await Forum.findById(req.params._id);
        if (forumSubject) {
          await Forum.findByIdAndUpdate(req.params._id, req.body, (err) =>{
            if(err){
              res.redirect("/api/forums");
            }else{
              res.redirect("/api/forums/" + req.params._id);
            }
          });
        }else{
          return res.status(404).send('This subject is no longer exist!');
        }
      } catch (e) {
        return res.status(404).send('This subject is no longer exist!');
      }
    });
  }

  // DELETE A FORUM SUBJECT
  deleteForumSubject(){
    this.app.delete('/api/forums/:_id', async (req, res) => {
      try {
        let forumSubject = await Forum.findById(req.params._id);
        if (forumSubject) {
          await Forum.findByIdAndDelete(req.params._id, (err) => {
            if(err){
              res.redirect("/api/forums/" + req.params._id);
            }else{
              res.redirect("/api/forums");
            }
          });
        }else{
          return res.status(404).send('This subject is no longer exist!');
        }
      } catch (e) {
        return res.status(404).send('This subject is no longer exist!');
      }
    });
  }

}

module.exports = ForumRoutes;