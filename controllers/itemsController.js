const Item = require('../models/Item');

const getAllItems = async (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(400).json(err))
};


const createItem = async (req, res) => {
    const newItem = new Item({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
  });

  await newItem
		.save()
		.then(item => res.json({ message: 'Item was created successfully', item }))
		.catch(err => res.status(400).json(err))
};



const updateItem = async (req, res) => {
	const id = req.params.id;
	await Item.updateOne(
		{ _id: id },
		{
			$set: req.body,
		}
	)
		.then(item => res.json(item))
		.catch(err => res.status(400).json(err))
}



const deleteItem = (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove())
		.then(() => res.json({ success: true, message: 'Item deleted successfully' }))
		.catch(err => res.status(404).json({ err: 'Item not found' }))
}


module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
}