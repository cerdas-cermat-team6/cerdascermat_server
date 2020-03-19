'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Questions', [
        {
          "question": "Apa yang suka orang lakukan ketika hujan?",
          "answers": "makan mie,minum kopi,*****,tidur,melamun",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "1 + 1 = ?",
          "answers": "dua,2,banyak",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Bank yang ada di Indonesia? (singkatan)",
          "answers": "bca,bri,mandiri,uob,ctbc,bni,btpn,danamon,permata",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Macam - macam search engine?",
          "answers": "google,bing,yahoo,ask,instruktur",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Apa yang akan orang lakukan ketika berduaan dengan pacar?",
          "answers": "makan,minum,nonton,ngobrol,berantem,pemantapan,bercanda",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Apa yang murid lakukan ketika di sekolah?",
          "answers": "kencing,sisiran,main hp,ngobrol,makan",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Apa yang mahasiswa lakukan ketika di kampus?",
          "answers": "tidur,makan,kencing,sisiran,rapat,ngobrol",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Apa yang mahasiswa lakukan ketika tidak di kampus?",
          "answers": "tidur,makan,mandi,main,rebahan",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Bagaimana bunyi anjing?",
          "answers": "guk,anjing,woof",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Universitas yang ada di Indonesia? (singkatan)",
          "answers": "ui,ugm,ub,unpar,unpad,unpak,umn,uph,prasmul,unsri,unbraw,usu,itb,unair,ipb,its",
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "question": "Fase yang ada di Hacktiv8?",
          "answers": "0,1,2,3,pemantapan",
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
       ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
