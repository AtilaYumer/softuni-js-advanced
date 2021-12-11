function solve() {
    const sections = document.querySelectorAll('section');
    const openSectionDiv = sections[1].lastElementChild;
    const inProgressSectionDiv = sections[2].lastElementChild;
    const completeSectionDiv = sections[3].lastElementChild;
    const form = {
        task: document.getElementById('task'),
        description: document.getElementById('description'),
        date: document.getElementById('date'),
        button: document.getElementById('add')
    }
    form.button.addEventListener('click', addTask);

    function addTask(e) {
        e.preventDefault();
        let [task, description, date] = Object.values(form).map(v => v.value);
        if (task !== '' && description !== '' & date !== '') {
            const article = document.createElement('article');
            article.innerHTML = `<h3>${task}</h3>
                                <p>Description: ${description}</p>
                                <p>Due Date: ${date}</p>
                                <div class="flex">
                                    <button class="green">Start</button>
                                    <button class="red">Delete</button>
                                </div>`;
            article.querySelector('.green').addEventListener('click', startTask);
            article.querySelector('.red').addEventListener('click', deleteTask);
            openSectionDiv.appendChild(article);
            Object.values(form).forEach(v => v.value = '');
        }
    }

    function startTask(e) {
        const article = e.target.parentNode.parentNode;
        article.querySelector('.green').remove();
        const finishBtn = document.createElement('button');
        finishBtn.classList.add('orange');
        finishBtn.innerText = 'Finish';
        finishBtn.addEventListener('click', completeTask)
        article.lastElementChild.appendChild(finishBtn);
        inProgressSectionDiv.appendChild(article);
    }

    function completeTask(e) {
        const article = e.target.parentNode.parentNode;
        article.lastElementChild.remove();
        completeSectionDiv.appendChild(article);
    }

    function deleteTask(e) {
        console.log(e);
        e.target.parentNode.parentNode.remove();
    }
}