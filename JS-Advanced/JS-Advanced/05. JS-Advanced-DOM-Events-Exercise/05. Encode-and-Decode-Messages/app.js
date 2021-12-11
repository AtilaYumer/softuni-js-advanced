function encodeAndDecodeMessages() {
    const divs = document.querySelectorAll('main div');
    divs[0].children[2].addEventListener('click', decodeAndSend);
    divs[1].children[2].addEventListener('click', encodeAndShow);

    function decodeAndSend() {
        let result = '';
        let text = divs[0].children[1];
        for (let i = 0; i < text.value.length; i++) {
            result += String.fromCharCode(text.value.charCodeAt(i) + 1);
        }
        text.value = '';
        divs[1].children[1].value = result;
    }

    function encodeAndShow() {
        const decoded = divs[1].children[1].value;
        let encoded = '';
        for (let i = 0; i < decoded.length; i++) {
            encoded += String.fromCharCode(decoded.charCodeAt(i) - 1);
        }
        divs[1].children[1].value = encoded;
    }
}