import {createIdea} from "../api/data.js";

export function setUpCreate(section, navigation) {
    const form = section.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const img = formData.get('imageURL').trim();

        if (!title || !description || !img) {
            return alert('All fields are required!');
        }
        if (title.length < 6) {
            return alert('Title should be minimum of 6 characters long!');
        }
        if (description.length < 10) {
            return alert('Description should be minimum of 10 characters long!');
        }
        if (img.length < 5) {
            return alert('Image url should be minimum of 5 characters long!')
        }
        await createIdea(title, description, img);
        form.reset();
        await navigation.goToView('dashboard');
    });

    return showCreate;

    function showCreate() {
        return section;
    }
}