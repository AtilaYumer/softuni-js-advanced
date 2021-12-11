function requestValidator(obj) {
    const methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

    const uriPattern = /(^[\w.+]+$)/gm;
    const messagePattern = /(^[^<>\\&'"]+$)/gm;

    if (!methods.includes(obj.method)) {
        throw Error('Invalid request header: Invalid Method');
    } else if (!obj.uri || !uriPattern.test(obj.uri)) {
        throw Error('Invalid request header: Invalid URI');
    } else if (!versions.includes(obj.version)) {
        throw Error('Invalid request header: Invalid Version');
    } else if (obj.message !== '' && (!messagePattern.test(obj.message) || !obj.message)) {
        throw Error('Invalid request header: Invalid Message');
    }

    return obj;
}

const obj = {
    method: 'POST',
    version: 'HTTP/2.0',
    message: 'rm -rf /*'
}

console.log(requestValidator(obj));