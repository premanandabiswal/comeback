const express = require('express');
const path = require('node:path');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myapp';

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    error: null,
    user: null,
    editMode: false,
    formAction: '/create',
    values: { name: '', email: '', imageUrl: '' }
  });
});

app.post('/create', async(req, res) => {
  let {name, email, imageUrl} = req.body;
  let userCreated = await userModel.create({ name, email,  imageUrl });
  res.redirect(`/read`p;);
});
app.get('/read', async(req, res) => {
  let users = await userModel.find();
  res.render('read', { users: users });
}
);

app.get('/edit/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }

  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }

    res.render('index', {
      error: null,
      user: null,
      editMode: true,
      formAction: `/edit/${user._id}`,
      values: { name: user.name, email: user.email, imageUrl: user.imageUrl }
    });
  } catch (error) {
    console.error('Failed to load user for editing:', error);
    res.sendStatus(500);
  }
});

app.post('/edit/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }

  const values = {
    name: req.body.name,
    email: req.body.email,
    imageUrl: req.body.imageUrl
  };

  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, values, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.sendStatus(404);
    }

    res.redirect('/read');
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(400).render('index', {
      error: 'Could not update user. Check that the name and email are unique and all fields are valid.',
      user: null,
      editMode: true,
      formAction: `/edit/${req.params.id}`,
      values
    });
  }
});

app.post('/delete/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.sendStatus(404);
  }

  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }

    res.redirect('/read');
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.sendStatus(500);
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exitCode = 1;
  }
}

startServer();
