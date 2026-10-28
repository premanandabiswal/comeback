const express= require('express');
const path= require('path');
const app= express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const formData = {
        name: typeof name === 'string' ? name.trim() : '',
        email: typeof email === 'string' ? email.trim() : '',
        message: typeof message === 'string' ? message.trim() : ''
    };

    if (
        !formData.name ||
        formData.name.length > 100 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
        formData.email.length > 254 ||
        !formData.message ||
        formData.message.length > 5000
    ) {
        return res.status(400).render('index', {
            feedback: 'Please enter a valid name, email, and message (up to 5,000 characters).',
            feedbackType: 'error'
        });
    }

    res.render('index', {
        feedback: 'Thank you! Your message was received. Message delivery is not configured yet.',
        feedbackType: 'success'
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});