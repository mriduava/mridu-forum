const crypto = require('crypto');

module.exports = class Encrypt {

  static encrypt(password) {
    return crypto
      .createHmac('sha256', "someUnusualString#4%maybeRandomGeneratorCharacters")
      .update(password)
      .digest('hex');
  }
  
  static multiEncrypt(password, encryptTimes = 9999) {
    while (encryptTimes--) { password = this.encrypt(password); }
    return password;
  }
}