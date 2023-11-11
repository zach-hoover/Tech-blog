const router = require('express').Router();
const{ BlogPost, User, Comment} = require('../models')

router.get('/', async(req,res)=> {
    try{

        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['comment','user_id'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true}));
        res.render('homepage',{blogs} )
    }catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async(req, res) => {
    try{
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['comment']
                }
            ]
        });
        const blog = blogData.get({plain: true})

        res.render('homepage',{blog})

    }catch(err) {
        res.status(500).json(err)
    }
});

router.get('/submit', (req, res) => {
    res.render('submit');
  });

module.exports = router