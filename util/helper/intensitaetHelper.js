module.exports = {

  getIntensitaetCodeFromString: function(intensitaetString){

      //Get All Niveau from Config and add as Quick Replies
      let intensitaet = process.env.KURS_INTENSITAET.split(",");
      let intensitaetCode = 0;

      for (let i = 0; i < intensitaet.length; i++) {
          if(intensitaet[i].toLowerCase() === intensitaetString.toLowerCase()){
              intensitaetCode = i+1;
              break;
          }
      }

      return intensitaetCode;


  }

};