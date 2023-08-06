const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll( {
    include: [{model: Product}]
    })
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params?.id, {
      include:[{model: Product}]
    })
    .then(tag => {
      if(tag){
        return res.status(200).json(tag);
      }
      return res.status(404).json({ message: `Tag with id - ${req.params?.id} not found` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  const {tag_name} = req.body;
  Tag.create({
    tag_name:tag_name
  }).then(createdTag => {
    res.status(201).json(createdTag);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const {id} = req.params;
  const {tag_name} = req.body;

  Tag.update({
      tag_name:tag_name
    },
    {
      where: {
        id:id
      }
    })
    .then(updated => {
      if (updated[0] === 0) {
        res.status(303).json({ message: `Tag with id - ${req.params?.id} not modified.` });
      }
      else {
        res.status(200).json({id:id,tag_name:tag_name});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id:req.params?.id
    }
  })
  .then(deleted => {
    if(deleted === 0){
      res.status(303).json({ message: `Tag with id - ${req.params?.id} not deleted.` });
    }else{
      res.status(204).end();
    }
  }).catch(error => {
    res.status(500).json(error);
  });
});

module.exports = router;
