const digestPassword = async (passString) => {
  // String to Array Buffer
  const passBuff = new TextEncoder().encode(passString);

  const hashedPassword = await window.crypto.subtle
    .digest(
      {
        name: 'SHA-256',
      },
      new Uint8Array(passBuff) //The data you want to hash as an ArrayBuffer
    )
    .catch(function (err) {
      console.error(err);
    });
  return buff_to_base64(hashedPassword);
};

const buff_to_base64 = (buff) =>
  btoa(
    new Uint8Array(buff).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );

const isEqualBuff = (buff1, buff2) => {
  const str1 = buff_to_base64(buff1);
  const str2 = buff_to_base64(buff2);
  return str1 === str2;
};

export { digestPassword, buff_to_base64, isEqualBuff };
