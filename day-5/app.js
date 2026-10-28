const express = require('express'); 
const app = express();
const userModel = require('./mongoose.js');

app.get('/create', async (req, res) => {
  try {
    const createdUser =  await userModel.create({
      name: 'Prem Biswal',
      email: 'prem@example.com',
      password: 'password2004'
    });
     createdUser.save();
    res.send(createdUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/update', async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate({name: 'Prem Biswal'}, {name: 'Prem'}, {returnDocument: 'after'}
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/read', async (req, res) => {
  try {
    const User = await userModel.find(
    );
    res.send(User);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('/delete', async (req, res) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({name: 'Prem Biswal'});
    res.send(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 