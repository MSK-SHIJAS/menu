import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/menuDB')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true }, 
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);


app.post('/api/menu', async (req, res) => {
    try {
      const items = req.body; 
      const newItems = await MenuItem.insertMany(items); 
      res.status(201).json({ message: 'Menu items added successfully', items: newItems });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add menu items' });
    }
  });
  

app.get('/api/menu/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.listen(4000, () => {
    console.log('Server running on port 4000');
  });
  
