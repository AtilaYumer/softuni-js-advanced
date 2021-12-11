function solution(command) {
    if (command === 'upvote') {
        this.upvotes++;
    } else if (command === 'downvote') {
        this.downvotes++;
    } else if (command === 'score') {
        return score(this);
    }

    function score(post) {
        let obfuscationRate = Math.ceil(Math.max(post.upvotes, post.downvotes) * 0.25);
        let totalPosts = post.upvotes + post.downvotes;
        let obfuscatedUpvote = totalPosts > 50 ? post.upvotes + obfuscationRate : post.upvotes;
        let obfuscatedDownvote = totalPosts > 50 ? post.downvotes + obfuscationRate : post.downvotes;
        let balance = post.upvotes - post.downvotes;
        let rate = 'new';
        if (totalPosts < 10) {
            rate = 'new';
        } else if (post.upvotes / totalPosts * 100 > 66) {
            rate = 'hot';
        } else if (balance >= 0 && totalPosts > 100) {
            rate = 'controversial';
        } else if (balance < 0) {
            rate = 'unpopular';
        }
        return [obfuscatedUpvote, obfuscatedDownvote, balance, rate];
    }
}

let post = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};
solution.call(post, 'upvote');
solution.call(post, 'downvote');
let score = solution.call(post, 'score');
console.log(score)                       // [127, 127, 0, 'controversial']
for (let i = 0; i < 50; i++) {
    solution.call(post, 'downvote');         // (executed 50 times)
}
score = solution.call(post, 'score');
console.log(score);                     // [139, 189, -50, 'unpopular']