document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector('.hero');
  heroSection.style.backgroundColor = '#e0e0e0';

  const characterArticles = document.querySelectorAll('.grid-layout article');
  characterArticles.forEach(article => {
    article.style.border = '2px solid #333';
  });

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

  const heroTitle = document.querySelector('.hero h1');
  heroTitle.addEventListener('mouseover', () => {
    heroTitle.style.color = 'blue';
  });
  heroTitle.addEventListener('mouseout', () => {
    heroTitle.style.color = 'black';
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      alert('Enter was pressed!');
    }
  });

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
    if (!name) {
      alert('Introduceți un nume!');
      return;
    }
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
      alert('Numele poate conține doar litere și spații!');
      return;
    }
    localStorage.setItem('savedName', name);
    alert(`Numele ${name} a fost salvat!`);
  });

  setTimeout(() => {
    alert('Acesta este un mesaj de timeout!');
  }, 3000);

  setInterval(() => {
    console.log('Mesaj la fiecare 5 secunde');
  }, 5000);

  const savedName = localStorage.getItem('savedName');
  if (savedName) {
    alert(`Numele salvat este: ${savedName}`);
  }

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

  heroTitle.addEventListener('click', event => {
    event.currentTarget.classList.toggle('highlight');
  });

  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    article.addEventListener('click', event => {
      event.stopPropagation();
      const styles = getComputedStyle(event.currentTarget);
      alert(`Background color: ${styles.backgroundColor}`);
    });
  });
});
