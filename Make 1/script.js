// script.js

class Cat {
  constructor(name, color, where, age, image) {
      this.name = name;
      this.color = color;
      this.where = where;
      this.age = age;
      this.image = image;
  }
}

document.getElementById('cat-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const color = document.getElementById('color').value;
  const where = document.getElementById('where').value;
  const age = document.getElementById('age').value;
  const image = document.getElementById('image').value;

  const cat = new Cat(name, color, where, age, image);
  displayCat(cat);
});

function displayCat(cat) {
  const catDisplay = document.getElementById('cat-display');
  catDisplay.innerHTML = `
      <h2>${cat.name}</h2>
      <p>Color: ${cat.color}</p>
      <p>Where: ${cat.where}</p>
      <p>Age: ${cat.age}</p>
      <img src="${cat.image}" alt="${cat.name}">
  `;
}
