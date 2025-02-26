/*const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");   //folosim ejs

app.use(express.static(path.join(__dirname, 'views')));    //folosim folder-ul "views"
app.use(bodyParser.json()); //pentru POST request cu application/json
app.use(express.text());    //pentru POST request cu text/plain

app.get('/', (req, res) => {    //redirectionare catre index.html
    res.status(200);
    res.render('index');
})

app.use((req, res,) => {      //daca nu exista pagina, aruncam un 404 cu o pagina custom 
    res.status(404);
    res.render('error');
});

//



//

app.listen(PORT, (error) => {    //dam run la aplicatie
    if (!error) {
        console.log(PORT);
    } else {
        console.log(error);
    }
});
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const users = require('./views/JSON/date.json');


var information = {
    info: "Pentru logare",
    info2: "admin",
    info3: "admin"
};


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //pentru POST request cu application/json
app.use(express.text());    //pentru POST request cu text/plain



app.get('/', (req, res) => {    //redirectionare catre index.html
    res.status(200);
    res.render('index');
})

// Middleware pentru sesiuni
app.use(session({
    secret: 'secret_key', // Secretul folosit pentru semnarea cookie-urilor de sesiune
    resave: false,
    saveUninitialized: true
}));



// Ruta pentru procesarea cererilor de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificare simplă a datelor de autentificare (poți folosi o bază de date sau orice altceva aici)
    if (username === 'admin' && password === 'admin') {
        // Setează o variabilă de sesiune pentru a marca utilizatorul ca autentificat
        req.session.authenticated = true;
        res.redirect('/'); // Redirectează către pagina principală după autentificare
    } else {
        res.send('Autentificare eșuată. Verifică numele de utilizator și parola.');
    }
});

// Ruta pentru logout
app.get('/logout', (req, res) => {
    // Șterge variabila de sesiune care marchează utilizatorul ca autentificat
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/login'); // Redirectează către pagina de login după logout
        }
    });
});

// Verificare dacă utilizatorul este autentificat înainte de a permite accesul la anumite rute
function requireLogin(req, res, next) {
    if (req.session.authenticated) {
        next(); // Continuă la următoarea rută
    } else {
        res.redirect('/login'); // Redirectează către pagina de login dacă utilizatorul nu este autentificat
    }
}

// Rute protejate care necesită autentificare
app.get('/protected', requireLogin, (req, res) => {
    res.send('Pagina protejată. Doar utilizatorii autentificați pot accesa această pagină.');
});

// Ruta pentru preluarea datelor JSON
app.get('/users', (req, res) => {

    res.render('users');
});

app.get('/api/get_users', (req, res) => {
    res.send(users);

});
app.get('/login/', (req, res) => {
    res.status(200);
    res.render('login', { information });
});


// Ruta pentru gestionarea paginilor inexistente (404)
app.use((req, res) => {
    res.status(404).render('error');
});

app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});
