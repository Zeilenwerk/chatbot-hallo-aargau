module.exports = {

    getAdressatengruppeCodeFromString: function(adressatengruppenString){

      //Get All Adressatengruppen from Config
      var adressatengruppen = process.env.KURS_ADRESSATENGRUPPEN.split(",");
      let adressatengruppenCode = 0;

      for (let i = 0; i < adressatengruppen.length; i++) {
          if(adressatengruppen[i].toLowerCase() === adressatengruppenString.toLowerCase()){
              adressatengruppenCode = i+1;
              break;
          }
      }

      return adressatengruppenCode;
  }

};