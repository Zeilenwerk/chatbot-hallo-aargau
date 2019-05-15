module.exports = {

  getNiveauCodeFromString: function(niveauString){

      //Get All Niveau from Config and add as Quick Replies
      let niveau = process.env.KURS_NIVEAU.split(",");
      let niveauCode = 0;

      for (let i = 0; i < niveau.length; i++) {
          if(niveau[i].toLowerCase() === niveauString.toLowerCase()){
              niveauCode = i+1;
              break;
          }
      }

      return niveauCode;


  }

};