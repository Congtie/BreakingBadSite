document.addEventListener("DOMContentLoaded", function () {
    // Modificarea stilului unui element sau al unui grup de elemente
    const heroSection = document.querySelector('.hero');
    heroSection.style.backgroundColor = '#e0e0e0';

    // Manevrarea DOM-ului (selectare dupa id, tag, clasa, selectorCSS)
    const characterArticles = document.querySelectorAll('.grid-layout article');
    characterArticles.forEach(article => {
        article.style.border = '2px solid #333';
    });

    // Creare si stergere de elemente
    const newCharacterBtn = document.createElement('button');
    newCharacterBtn.textContent = 'Adaugă personaj';
    document.body.appendChild(newCharacterBtn);

    newCharacterBtn.addEventListener('click', () => {
        const newCharacter = document.createElement('article');
        newCharacter.innerHTML = `
            <img src="placeholder.jpg" alt="New Character">
            <h2>New Character</h2>
            <p>Descrierea personajului nou.</p>
        `;
        document.querySelector('.grid-layout').appendChild(newCharacter);
    });

    // Folosirea si modificarea evenimentelor generate de mouse si tastatura
    const heroTitle = document.querySelector('.hero h1');
    heroTitle.addEventListener('mouseover', () => {
        heroTitle.style.color = 'blue';
    });
    heroTitle.addEventListener('mouseout', () => {
        heroTitle.style.color = 'black';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            alert('Enter was pressed!');
        }
    });

    // Inputuri functionale
    const inputContainer = document.createElement('div');
    inputContainer.innerHTML = `
        <label for="nameInput">Nume:</label>
        <input type="text" id="nameInput">
        <button id="saveNameBtn">Salvează</button>
    `;
    document.body.appendChild(inputContainer);

    const nameInput = document.getElementById('nameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');

    saveNameBtn.addEventListener('click', () => {
        const name = nameInput.value;
        if (name) {
            localStorage.setItem('savedName', name);
            alert(`Numele ${name} a fost salvat!`);
        } else {
            alert('Introduceți un nume!');
        }
    });

    // setTimeout, setInterval
    setTimeout(() => {
        alert('Acesta este un mesaj de timeout!');
    }, 3000);

    setInterval(() => {
        console.log('Mesaj la fiecare 5 secunde');
    }, 5000);

    // Folosirea localStorage
    const savedName = localStorage.getItem('savedName');
    if (savedName) {
        alert(`Numele salvat este: ${savedName}`);
    }

    // Folosirea a cel putin unei metode din clasele: Math, Array, String, Date
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    heroSection.addEventListener('click', () => {
        heroSection.style.backgroundColor = randomColor();
    });

    // Folosirea proprietatilor classList, target, currentTarget
    heroTitle.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('highlight');
    });

    // Folosirea metodelor getComputedStyle si stopPropagation
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        article.addEventListener('click', (event) => {
            event.stopPropagation();
            const styles = getComputedStyle(event.currentTarget);
            alert(`Background color: ${styles.backgroundColor}`);
        });
    });

    // Validarea datelor dintr-un formular folosind expresii regulate
    saveNameBtn.addEventListener('click', () => {
        const name = nameInput.value;
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(name)) {
            alert('Numele poate conține doar litere și spații!');
            return;
        }
        localStorage.setItem('savedName', name);
        alert(`Numele ${name} a fost salvat!`);
    });
});
