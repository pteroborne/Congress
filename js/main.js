import {senators} from "../json/senators.js";
import {representatives} from "../json/representatives.js";

class person {
  constructor(title, name, picture, seniority, party, id) {
    this.title = title;
    this.name = name;
    this.picture = picture;
    this.seniority = seniority;
    this.party = party;
    this.id = id;
  }
}

let senate = []
let reps = []

senators.forEach(item => {
  makePerson(item, senate)
});
representatives.forEach(item => {
  makePerson(item, reps)
})

function makePerson(item, list) {
  let party = ''
  switch (item.party) {
    case "D":
      party = 'Democrat';
      break;
    case "R":
      party = 'Republican';
      break;
    case "ID":
      party = 'Independent';
      break;
  }
  let name = item.first_name + ' ' + item.last_name;
  // list.push(new person(item.title, name, 'img/development.svg', item.seniority, party, item.id))
  list.push(new person(item.title, name, `https://www.govtrack.us/static/legislator-photos/${item.govtrack_id}-100px.jpeg`, item.seniority, party, item.id))
}


function createCard(person, group) {
  let col = document.createElement('div');
  col.className = 'col';
  let card = document.createElement('div');
  card.className = 'card h100';
  let image = document.createElement('img');
  image.src = person.picture;
  image.className = 'card-img-top';
  image.alt = 'Dev image';
  let body = document.createElement('div');
  body.className = 'card-body';
  let title = document.createElement('h5');
  title.innerText = person.name;
  let position = document.createElement('p');
  position.innerText = person.title;
  let body_text = document.createElement('span');
  body_text.innerText = 'Seniority: ';
  let seniority = document.createElement('span');
  seniority.id = 'Seniority_' + person.id;
  seniority.innerText = person.seniority;
  let party = document.createElement('p');
  party.innerText = person.party;

  let main_doc = document.getElementById(group);
  body.append(title, position, body_text, seniority, party);
  card.append(image);
  card.append(body);
  col.append(card)
  main_doc.append(col);
}

const showSenate = () => {
  senate.forEach((value) => {
    createCard(value, 'card-group-senate');
  })
};

function showReps() {
  reps.forEach(value => {
    createCard(value, 'card-group-rep');
  })
}

showSenate()
showReps()

function tester() {
  console.log('test')
}

let senate_id = document.getElementById('senate-group');
let rep_id = document.getElementById('rep-group');

function show_one(group1, group2) {
  group1.hidden = false;
  group2.hidden = true;
  return true
}

function show_all() {
  senate_id.hidden = false;
  rep_id.hidden = false;
}

function sort_seniority(list, element) {
  console.log('Running the sort')
  // sort by seniority
  list.sort(function (a, b) {
    return a.seniority - b.seniority
  });
  // Remove all of the current elements
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function sort_seniors() {
  // Sort both lists
  sort_seniority(senate, document.getElementById('card-group-senate'))
  sort_seniority(reps, document.getElementById('card-group-rep'))
  // Add both lists back
  showSenate()
  showReps()
}

function sort_party(list, element) {
  console.log('Running the sort')
  // sort by party
  list.sort(function (a, b) {
    let x = a.party.toLowerCase();
    let y = b.party.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  // Remove all of the current elements
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function reverse_list(list, element) {
  list.reverse();
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function reverser() {
  // Reverse Both
  reverse_list(senate, document.getElementById('card-group-senate'))
  reverse_list(reps, document.getElementById('card-group-rep'))
  // Add both lists back
  showSenate()
  showReps()
}

function sort_parties() {
  // Sort both lists
  sort_party(senate, document.getElementById('card-group-senate'))
  sort_party(reps, document.getElementById('card-group-rep'))
  // Add both lists back
  showSenate()
  showReps()
}

document.getElementById('senators').addEventListener("click", () => show_one(senate_id, rep_id))

document.getElementById('representatives').addEventListener("click", () => show_one(rep_id, senate_id))

document.getElementById('all').addEventListener("click", show_all)

document.getElementById('seniority').addEventListener("click", sort_seniors)

document.getElementById('party').addEventListener("click", sort_parties)

document.getElementById('reverse').addEventListener('click', reverser)


console.log('running')
