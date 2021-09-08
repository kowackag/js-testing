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
    newLiEl.innerText = element.name;
    newLiEl.classList.remove('.repos__item--prototype');
    const linkGH = newLiEl.querySelectorAll('.repos__item-linkG');
    return newLiEl;
}