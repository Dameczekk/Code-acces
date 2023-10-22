const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const accessCode = '0011'; // Twój kod dostępu

// Middleware do uwierzytelniania
const authenticate = (req, res, next) => {
  const code = req.body.code;
  if (code === accessCode) {
    return next();
  } else {
    res.render('login', { error: 'Nieprawidłowy kod dostępu' });
  }
};

// Strona główna - zabezpieczona kodem dostępu
app.get('/', (req, res) => {
  res.render('admin');
});

// Strona logowania
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Obsługa logowania
app.post('/login', authenticate, (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});