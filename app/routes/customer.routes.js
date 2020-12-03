module.exports = app => {
  //const nse_purchase = require("../controllers/nse_purchase.controller.js");
 // const nse_details = require("../controllers/nse_details.controller.js");
  const bank = require("../controllers/bank.controller.js");
 // const nse_sip = require("../controllers/nse_sip.controller.js");
//  const nse_redeem_switch = require("../controllers/nse_redeem_switch.controller.js");

 //   app.post("/purchase_sip",nse_purchase.purchase_sip);//prodigy_final2
 //   app.post("/credit_mandate",nse_details.mandate);//prodigy_final2
    app.get("/getUserDetails",bank.getUserDetails);//prodigy_final2
//    app.post("/regularSIP",nse_sip.SIP);//prodigy_final2
 //   app.get("/test",nse_sip.test);

    app.post("/changePbank",bank.changePbank);
    app.post("/deletebank",bank.deletebank);
   // app.post("/redeem",nse_redeem_switch.redeem);
 //   app.post("/switch",nse_redeem_switch.switch);

   app.post("/addBankDetail", bank.addBankDetail);//prodigy_final2
  app.post("/bankDetails", bank.showDetails);//   prodigy_final2
   app.post("/productApi", bank.findAllProducts);
  app.post("/bankverify",bank.bankverify);//
    app.post("/bankverify2",bank.bankverify2);//
   app.get("/users/:emailId", bank.findOne1users);//
    app.get("/getNSEBank", bank.getnsebank);//
  //  app.post("/readFatca1",nse_purchase.readFatca1_nov);//
 //   app.post("/purchase",nse_purchase.purchase);//prodigy_final2
   
};
