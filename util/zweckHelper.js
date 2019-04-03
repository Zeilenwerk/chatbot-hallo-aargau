module.exports = {

    getZweckCodeFromString: function(zweckString){

      //Get All Niveau from Config and add as Quick Replies
      let zweck = process.env.KURS_ZWECK.split(",");
      let zweckCode = 0;

      for (let i = 0; i < zweck.length; i++) {
          if(zweck[i].toLowerCase() === zweckString.toLowerCase()){
              zweckCode = i+1;
              break;
          }
      }

      return zweckCode;


  }

};