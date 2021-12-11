function getArticleGenerator(input) {
    let content = document.getElementById('content');

    return () => {
        if (input.length) {
            const article = document.createElement('article');
            article.textContent = input.shift();
            content.appendChild(article);

        }
    }
}
