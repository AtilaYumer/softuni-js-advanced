import {getRecentIdeas} from "../api/data.js";
import {e} from '../dom.js'

export function setUpDashboard(section, navigationHandler) {

    const emptyPlaceHolder = section.querySelector('h1');
    emptyPlaceHolder.remove();

    return showDashboard;

    async function showDashboard() {
        try {
            const ideas = await getRecentIdeas();
            const cards = ideas.map(createIdeaPreview);

            const documentFragment = document.createDocumentFragment();
            cards.forEach(c => documentFragment.append(c));
            section.innerHTML = '';
            cards.length ? section.appendChild(documentFragment) : section.appendChild(emptyPlaceHolder);
            return section;
        } catch (e) {
            alert(e.message);
        }
    }

    function createIdeaPreview(idea) {
        return e('div', {className: 'card overflow-hidden current-card details', style: 'width: 20rem; height: 18rem;'},
            e('div', {className: 'card-body'},
                e('p', {className: 'card-text'}, idea.title)),
            e('img', {className: 'card-image', src: idea.img, alt: 'Card image cap'}),
            e('a', {className: 'btn', onclick: () => navigationHandler.goToView('details', idea._id)}, 'Details'));
    }
}