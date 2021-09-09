import GitHubSDK from "./GitHubSDK";

document.addEventListener('DOMContentLoaded', init);

const admin = 'kowackag';
const secret = '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'
const ulEl = document.querySelector('.repos__list');
const github = new GitHubSDK(admin, secret);
const prototypeRepo = document.querySelector('.repos__item--prototype');
function init() {
    getRepo(admin);
}

function getRepo(login) {
    github.getRepo(login)
        .then(data => insertRepo(data))
        .catch(err => console.error(err))
}

function insertRepo(data) {
    ulEl.innerHTML = '';
    data.forEach(item => {
        const newLi = createLiEl(item);
        ulEl.appendChild(newLi);
    })
}

// -------------------------------

function createLiEl(element) {
    const newLiEl = prototypeRepo.cloneNode(true);
    newLiEl.dataset.id = element.id;
    const titleEl = newLiEl.querySelector('.repo__title');
    titleEl.innerText = element.name;
    newLiEl.classList.remove('.repos__item--prototype');
    const linkGH = newLiEl.querySelector('.repos__item-linkGH');
    linkGH.setAttribute('href', element.html_url)
    return newLiEl;
}



// function createLiEl(element) {
//     const newLiEl = prototypeExcursion.cloneNode(true);
//     newLiEl.dataset.id = element.id;
//     const titleEl = newLiEl.querySelector('.excursions__title');
//     titleEl.innerText = element.name;
//     const descriptionEl = newLiEl.querySelector('.excursions__description');
//     descriptionEl.innerText = element.description;
//     newLiEl.classList.remove('excursions__item--prototype');
//     const fieldList = newLiEl.querySelectorAll('.excursions__field-price');
//     fieldList[0].innerText = element.adultsPrice;
//     fieldList[1].innerText = element.childrenPrice;
//     return newLiEl;
// }
