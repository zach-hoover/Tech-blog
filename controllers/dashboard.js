const router = require('express').Router();
const{ BlogPost, User, Comment} = require('../models')
const withAuth = require('../helpers/auth');

router.get('/',withAuth, async (req,res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: BlogPost,
                    attributes: ['id','title', 'post'],
                },
                {
                    model: Comment,
                    attributes: ['id','comment', 'blog_post_id'],
                }
            ]
        });
        const user = userData.get({ plain: true });
        res.render('dashboard',{user});
    }catch (err) {
        res.status(500).json(err)
    };
})

module.exports = router