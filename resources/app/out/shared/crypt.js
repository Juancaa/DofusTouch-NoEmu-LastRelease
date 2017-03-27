"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let crypto;
try {
    crypto = global.nodeRequire('crypto');
}
catch (error) {
    crypto = require('crypto');
}
const algorithm = 'aes-256-ctr';
class Crypt {
    static encrypt(text, password) {
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    static decrypt(text, password) {
        var decipher = crypto.createDecipher(algorithm, password);
        var dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
    static createHash(text) {
        return crypto.createHash('md5').update(text).digest("hex");
    }
}
exports.Crypt = Crypt;

//# sourceMappingURL=crypt.js.map
