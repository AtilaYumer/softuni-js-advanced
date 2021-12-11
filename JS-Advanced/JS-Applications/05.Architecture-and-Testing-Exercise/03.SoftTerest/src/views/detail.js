import {deleteIdeaById, getIdeaById} from "../api/data.js";
import {e} from "../dom.js"

export function setUpDetails(section, navigation) {

    return showDetails;

    async function showDetails(ideaId) {
        const idea = await getIdeaById(ideaId);
        section.innerHTML = '';
        section.appendChild(createIdeaCard(idea));
        return section;
    }

    function createIdeaCard(idea) {
        const documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(e('img', {className: 'det-img', src: idea.img, alt: 'Card image cap'}));
        documentFragment.appendChild(e('div', {className: 'desc'},
            e('h2', {className: 'display-5'}, idea.title),
            e('p', {className: 'infoType'}, 'Description:'),
            e('p', {className: 'idea-description'}, idea.description)));
        if (idea._ownerId === sessionStorage.getItem('userId')) {
            documentFragment.appendChild(e('div', {className: 'text-center'},
                e('a', {className: 'btn detb', href: '', onclick: () => deleteIdea(idea._id)}, 'Delete')));
        }
        return documentFragment;
    }

    async function deleteIdea(ideaId) {
        await deleteIdeaById(ideaId);
        await navigation.goToView('home');

    }
}