const Customer = require("../models/nse_purchase.model.js");
const substrings = require("../../node_modules/substrings");
// const substr = require("../../node_modules/substr");
//  const parser = require('../../node_modules/xml2json');
//onst https = require('../../node_modules/https');
var mysql = require('../../node_modules/mysql');
var jsonxml  = require('../../node_modules/xml2js');
var jsonxml  = require('../../node_modules/jsontoxml');
var convert = require('../../node_modules/xml-js');

const axios = require('../../node_modules/axios');

var fs = require('fs');
const { ECONNABORTED } = require("constants");
const dbConfig = require("../config/db.config.js");
const sql = require("../models/db.js");


exports.purchase = (req, res) => {  
  console.log("purchase")
  const postarray= { email:req.body.email,
    sub_trxn_type:req.body.sub_trxn_type,
    trxn_acceptance:req.body.trxn_acceptance,
    payment_mode:req.body.payment_mode,
    instrm_amount:req.body.instrm_amount,
    debit_amount_type:req.body.debit_amount_type,
    Return_paymnt_flag:req.body.Return_paymnt_flag,
    Client_callback_url:req.body.Client_callback_url,
    ach_exist:req.body.ach_exist,
    amc:req.body.amc,
    product_code:req.body.product_code,
    reinvest:req.body.reinvest,
    amount:req.body.amount,
    input_ref_no:req.body.input_ref_no,
    perpetual_flag:req.body.perpetual_flag,
    instrm_date:req.body.instrm_date,
    rtgs_code:req.body.rtgs_code,
    umrn:req.body.umrn,
    folio:req.body.folio
  }
 // return;
 Customer.purchase_normal(postarray.email,(err, data) => {

  if(data!=null){        
    if (!Array.isArray(data) || !data.length) {                
   return res.json({
     success: 200,
     message: "Bank Data not Found in user table"
   });
 }}
 
 let urs=data[0]
 let resdatemy=String(urs.date_of_birrth);   
  let resaccountNomy=urs.accountNo;
  console.log("res line 844",urs.bank_code);
  //return
 let xb=resdatemy.split(" ");     
 let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
 let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
 //console.log("res line 844",urs);
 //return
  //Customer.perchase_normal((err, data) => {
   
    let ash_arrk={NMFIIService:{
      service_request:{
      appln_id:'MFS21399',
      password:'Account@2121',
      broker_code:'ARN-21399',
      iin:urs.iin,
      sub_trxn_type:postarray.sub_trxn_type,
      poa: 'N',
      poa_bank_trxn_type: [],
      trxn_acceptance:postarray.trxn_acceptance,
      demat_user: 'N',
      dp_id: [],
      bank: urs.bank_code,
      ac_no: resaccountNomy,
      ifsc_code: urs.fscode,
      sub_broker_arn_code: [],
      sub_broker_code: [],
      euin_opted: 'N',
      euin: 'E073161',
      trxn_execution: [],
      remarks: [],
      payment_mode: postarray.payment_mode,
      billdesk_bank: urs.bank_code,
      instrm_bank:  urs.bank_code,
      instrm_ac_no: [],
      instrm_no: [],
      instrm_amount:postarray.instrm_amount,
      instrm_date: postarray.instrm_date,
      instrm_branch: urs.branch,
      instrm_charges: [],
      micr: [],
      rtgs_code: [],
      neft_ifsc: [],
      advisory_charge: [],
      dd_charge: [],
      cheque_deposit_mode: [],
      debit_amount_type: postarray.debit_amount_type,
      sip_micr_no: [],
      sip_bank: [],
      sip_branch: [],
      sip_acc_no: [],
      sip_ac_type: [],
      sip_ifsc_code: [],
      sip_paymech: [],
      umrn: [],
      ach_amt: [],
      ach_fromdate: [],
      ach_enddate: [],
      until_cancelled: [],
      Return_paymnt_flag: postarray.Return_paymnt_flag,
      Client_callback_url: postarray.Client_callback_url,
      Bank_holder_name: urs.name,
      Bank_holder_name1: [],
      Bank_holder_name2: [],
      iin_conf_flag: 'Y',
      trxn_initiator: 'O',
      trans_count: '1',
      utr_no: [],
      transfer_date: '15-Feb-2020',
      investor_auth_log: [],
      ach_exist: postarray.ach_exist,
      instrm_bank: urs.bank_code,

      rtgs_code:postarray.rtgs_code,
      umrn:postarray.umrn
      },
      childtrans: { 
      amc: postarray.amc,
      folio: postarray.folio,
      product_code: postarray.product_code,
      ft_acc_no: [],
      reinvest: postarray.reinvest,
      amount: postarray.amount,
      sip_from_date: [],
      sip_end_date: [],
      sip_freq: [],
      sip_amount: [],
      sip_period_day: [],
      input_ref_no: postarray.input_ref_no,
      perpetual_flag: postarray.perpetual_flag,
      insurance_enabled: [],
      GOAL_BASED_SIP: [],
      GOAL_TYPE: [],
      GOAL_AMOUNT: [],
      FREEDOM_SIP: [],
      FREEDOM_TARGET_SCHEME: [],
      FREEDOM_TENURE: [],
      FREEDOM_SWP_AMOUNT: [],
      iin: [],
      sub_broker_arn_code: [],
      sub_broker_code: [],
      instrm_date: [],
      instrm_branch: [],
      instrm_charges: [],
      micr: [],
      rtgs_code: [],
      neft_ifsc: [],
      advisory_charge: [],
      dd_charge: [],
      cheque_deposit_mode: [],
      debit_amount_type: [],
      sip_micr_no: [],
      sip_bank: [],
      sip_branch: [],
      sip_acc_no: [],
      sip_ac_type: [],
      sip_ifsc_code: [],
      sip_paymech: [],
      umrn: [],
      ach_amt: [],
      ach_fromdate: [],
      ach_enddate: []
     }  
    }//service_request
  } //NMFIIService
  //else
  
  
   
   
 console.log(ash_arrk);
  let ash_xml_agamji=jsonxml(ash_arrk);  
 // console.log(ash_xml_agamji);

  
  //console.log(ash_xml_agamji);
  axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
  ash_xml_agamji,
  {headers:
    {'Content-Type': 'text/xml'}
  }).then(res22=>{
   console.log("C- Output XML - Line 946", res22)  


   let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
        let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
        let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
   //  console.log("C- Output XML - Line 950", result1)
     //   console.log("C- Output XML - Line 951", fatcaresult)
      //  console.log("C- Output XML - Line 956", fatcaresult2)
  //console.log("i am cool 880");
  //var gi=typeof fatcaresult2[0].return_msg;
  //console.log("c- 881- ", gi);
  
  let newdata0= fatcaresult2[0];
  let newdata0_0= fatcaresult2[1];
  let adddata1="";
  let	adddata2="";
  let msg="";
  
  if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
  let newdata1= fatcaresult2[0].return_msg;
  let newdata2= fatcaresult2[1].return_msg;
  
  let newdata3= fatcaresult2[0].Status_Desc;
  let newdata4= fatcaresult2[1].Status_Desc;
  if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
    adddata1= fatcaresult2[0].return_msg._text
    adddata2= fatcaresult2[1].return_msg._text
    
  }else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
    adddata1= fatcaresult2[0].Status_Desc._text
    adddata2= fatcaresult2[1].Status_Desc._text
  }else{
    adddata1="";
    adddata2="";
    
  }
  }
  
  if(fatcaresult==0){
    //console.log("ashC- Output XML - Link:789");          
  console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
  console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
  console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
  console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)    
  console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
  console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
  console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
  link_var='';
  if (typeof fatcaresult2.Paymentlink !== 'undefined' && fatcaresult2.Paymentlink._text !== null){
  console.log("C- Output XML - Link:", fatcaresult2.Paymentlink._text)
  link_var=fatcaresult2.Paymentlink._text;
 }
  //	console.log("C- Output XML - Line 960", fatcaresult2[6].return_msg._text)
    //console.log("C- Output XML - Line 960", fatcaresult2[7].return_msg._text)
  userdata1=urs.user_id;
  userdata2=postarray.sub_trxn_type;
  userdata3=postarray.trxn_acceptance;
  userdata4=postarray.payment_mode;
  userdata5=postarray.instrm_amount;
  userdata6=postarray.debit_amount_type;
  userdata7=postarray.Return_paymnt_flag;
  userdata8=postarray.Client_callback_url;
  userdata9=postarray.ach_exist;
  userdata10=postarray.amc;
  userdata11=postarray.product_code;
  userdata12=postarray.reinvest;
  userdata13=postarray.input_ref_no;
  userdata14=postarray.perpetual_flag;
  userdata15=postarray.instrm_date;
  userdata16=postarray.rtgs_code;
  userdata17=postarray.umrn;    
  userdata18=postarray.amount;    
  
   ashdata1=fatcaresult2.Unique_No._text;
   ashdata2=fatcaresult2.Trxn_No._text;
   ashdata3=fatcaresult2.Application_No._text;
   ashdata4=fatcaresult2.Fund._text;
   ashdata5=fatcaresult2.Scheme._text;
   ashdata6=fatcaresult2.Scheme_Name._text;
   ashdata7=fatcaresult2.Amt._text;
   ashdata8=fatcaresult2.Status_Desc._text;
   ashdata9=fatcaresult2.Status_code._text;
   ashdata10=fatcaresult2.Input_ref_no._text;


   let sql_purchase = `INSERT INTO purchase (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, Amount,sub_trxn_type, trxn_acceptance, payment_mode, instrm_amount, debit_amount_type, Return_paymnt_flag, Client_callback_url, ach_exist, amc, product_code, reinvest, input_ref_no, perpetual_flag, instrm_date, rtgs_code, umrn) VALUES  ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata18}','${userdata2}','${userdata3}','${userdata4}','${userdata5}','${userdata6}','${userdata7}','${userdata8}','${userdata9}','${userdata10}','${userdata11}','${userdata12}','${userdata13}','${userdata14}','${userdata15}','${userdata16}','${userdata17}')`; 
   
   sql.query(sql_purchase, function (err, resvv) {
    console.log(sql_purchase,resvv);
      console.log("Data Saved:",resvv);
     // result(null,{ status:200, message:"Data Saved:",  data:resvv });
      
    });


  }
  else 
  { 
    
    if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
      fatcaresult2.forEach(element => { 
        console.log(element.return_msg._text); 
        msg=msg+element.return_msg._text + '||';
      }); 
  //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
    }
    else{
      //console.log("ashC- Output XML - Link:827"); 
      console.log(fatcaresult2.return_msg._text); 
      msg=fatcaresult2.return_msg._text;
    }
  //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
  }


    let agmess='';  
    
    if(fatcaresult==0){    
      agmess= {
         status:200,
         message:'Successfull',            
        data:  { "Unique_No": ashdata1,"Trxn_No": ashdata2 ,"Application_No": ashdata3, "Fund": ashdata4,"Scheme": ashdata5, "Scheme_Name": ashdata6, "Amt": ashdata7,"Status_Desc":ashdata8,"Status_code":ashdata9,"Input_ref_no":ashdata10,"Paymentlink":link_var.substring(9,(link_var.length+3)*.5),},  
         message_full: fatcaresult2 ,
       }
     }else{
       agmess= {
         status:400,
         message:msg,
        // message_1: fatcaresult2,               
        //data:  msg,
         //"1": ashdata2 ,"2": ashdata3, "3": ashdata4,"4": ashdata5, "5": ashdata6, "6": ashdata7},              
    //message_third_api:'FAILED',
   message_full:fatcaresult2,
        }
     }
     return res.status(200).json(agmess)
    }).catch(err=>{console.log(err)});
    console.log("res last line 829");



  });
};



  
  
  ////////////////
  exports.purchase_sip = (req, res) => {  
    console.log("purchase")
    const postarray= { email:req.body.email,
      
      trxn_acceptance:req.body.trxn_acceptance,
      payment_mode:req.body.payment_mode,
      instrm_amount:req.body.instrm_amount,
      

      sip_ac_type:req.body.sip_ac_type,
      sip_paymech:req.body.sip_paymech,
      ach_amt:req.body.ach_amt,
      
      until_cancelled:req.body.until_cancelled,

     
      ach_exist:req.body.ach_exist,
      amc:req.body.amc,
      product_code:req.body.product_code,
      reinvest:req.body.reinvest,
      amount:req.body.amount,
      input_ref_no:req.body.input_ref_no,
      perpetual_flag:req.body.perpetual_flag,
      transfer_date:req.body.transfer_date,// '10-Nov-2020',
      sip_from_date:req.body.sip_from_date,// '01-Jan-2021',
        sip_end_date:req.body.sip_end_date,// '31-Dec-2099',
        sip_freq:req.body.sip_freq,// 'OM',
        sip_amount:req.body.sip_amount,// '2000',
        sip_period_day:req.body.sip_period_day,// '01',
        rtgs_code:req.body.rtgs_code,
        umrn:req.body.umrn,
        folio:req.body.folio,   

    }
   // return;
   Nse_purchase.purchase_sip(postarray.email,(err, data) => {

    if(data!=null){        
      if (!Array.isArray(data) || !data.length) {                
     return res.json({
       success: 200,
       message: "Bank Data not Found in user table"
     });
   }}
   
   let urs=data[0]
   let resdatemy=String(urs.date_of_birrth);   
    let resaccountNomy=urs.accountNo;
    console.log("res line 844",urs.bank_code);
   
   let xb=resdatemy.split(" ");     
   let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
   let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
   
     
      let ash_arrk={NMFIIService:{
        service_request:{
        appln_id:'MFS21399',
        password:'Account@2121',
        broker_code:'ARN-21399',
        iin:urs.iin,
        sub_trxn_type:'S',
        poa: 'N',
        poa_bank_trxn_type: [],
        trxn_acceptance:postarray.trxn_acceptance,
        demat_user: 'N',
        dp_id: [],
        bank: urs.bank_code,
        ac_no: resaccountNomy,
        ifsc_code: urs.fscode,
        sub_broker_arn_code: [],
        sub_broker_code: [],
        euin_opted: 'N',
        euin: 'E073161',
        trxn_execution: [],
        remarks: [],
        payment_mode: postarray.payment_mode,
        billdesk_bank: urs.bank_code,
        instrm_bank:  urs.bank_code,
        instrm_ac_no: urs.accountNo,
        instrm_no: [],
        instrm_amount:postarray.instrm_amount,
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: urs.fscode,
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: 'M',
        sip_micr_no: [],
        sip_bank: urs.bank_code,
        sip_branch: urs.branch,
        sip_acc_no: urs.accountNo,
        sip_ac_type: urs.acoount_type,
        sip_ifsc_code: urs.fscode,
        sip_paymech: postarray.sip_paymech,
        umrn: postarray.umrn,
        rtgs_code:postarray.rtgs_code,
        ach_amt: postarray.ach_amt,
        ach_fromdate: urs.ach_fromdate,
        ach_enddate: urs.ach_todate,
        until_cancelled: postarray.until_cancelled,
        Return_paymnt_flag: "Y",
        Client_callback_url: "API URL",
        Bank_holder_name: urs.name,
        Bank_holder_name1: [],
        Bank_holder_name2: [],
        iin_conf_flag: 'Y',
        trxn_initiator: 'O',
        trans_count: '1',
        utr_no: [],
        transfer_date: postarray.transfer_date,
        investor_auth_log: [],
        ach_exist: postarray.ach_exist,
        instrm_bank: urs.bank_code
        },
        childtrans: { 
        amc: postarray.amc,
        folio: postarray.folio,
        product_code: postarray.product_code,
        ft_acc_no: [],
        reinvest: postarray.reinvest,
        amount: postarray.amount,

        sip_from_date: postarray.sip_from_date,
        sip_end_date: postarray.sip_end_date,
        sip_freq: postarray. sip_freq,
        sip_amount: postarray.sip_amount,
        sip_period_day: postarray.sip_period_day,

        input_ref_no: postarray.input_ref_no,
        perpetual_flag: postarray.perpetual_flag,
        insurance_enabled: 'N',
        GOAL_BASED_SIP: [],
        GOAL_TYPE: [],
        GOAL_AMOUNT: [],
        FREEDOM_SIP: [],
        FREEDOM_TARGET_SCHEME: [],
        FREEDOM_TENURE: [],
        FREEDOM_SWP_AMOUNT: [],
        iin: [],
        sub_broker_arn_code: [],
        sub_broker_code: [],
        instrm_date: [],
        instrm_branch: [],
        instrm_charges: [],
        micr: [],
        rtgs_code: [],
        neft_ifsc: [],
        advisory_charge: [],
        dd_charge: [],
        cheque_deposit_mode: [],
        debit_amount_type: [],
        sip_micr_no: [],
        sip_bank: [],
        sip_branch: [],
        sip_acc_no: [],
        sip_ac_type: [],
        sip_ifsc_code: [],
        sip_paymech: [],
        //umrn: postarray.umrn,
        ach_amt: [],
        ach_fromdate: [],
        ach_enddate: []
       }  
      }//service_request
    } //NMFIIService
    //else
    
    
     
     
   console.log(ash_arrk);
    let ash_xml_agamji=jsonxml(ash_arrk);  
    //console.log(ash_xml_agamji);
    let msg="";
    
    console.log(ash_xml_agamji);
    axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/PURCHASETRXN',
    ash_xml_agamji,
    {headers:
      {'Content-Type': 'text/xml'}
    }).then(res22=>{
     console.log("C- Output XML - Line 946", res22)  


     let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
          let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
          let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
     //  console.log("C- Output XML - Line 950", result1)
       //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
		//console.log("i am cool 880");
		//var gi=typeof fatcaresult2[0].return_msg;
		//console.log("c- 881- ", gi);
		
		let newdata0= fatcaresult2[0];
		let newdata0_0= fatcaresult2[1];
		let adddata1="";
		let	adddata2="";
		
		if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
		let newdata1= fatcaresult2[0].return_msg;
		let newdata2= fatcaresult2[1].return_msg;
		
		let newdata3= fatcaresult2[0].Status_Desc;
		let newdata4= fatcaresult2[1].Status_Desc;
		if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
			adddata1= fatcaresult2[0].return_msg._text
			adddata2= fatcaresult2[1].return_msg._text
			
		}else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
			adddata1= fatcaresult2[0].Status_Desc._text
		//	adddata2= fatcaresult2[1].Status_Desc._text
		}else{
			adddata1="";
			adddata2="";
			
		}
    }
    
    if(fatcaresult==0){    
    console.log("C- Output XML - Unique_No:", fatcaresult2.Unique_No._text)
    console.log("C- Output XML - Trxn_No:", fatcaresult2.Trxn_No._text)
		console.log("C- Output XML - Application_No:", fatcaresult2.Application_No._text)
    console.log("C- Output XML - Fund:", fatcaresult2.Fund._text)    
    console.log("C- Output XML - Scheme:", fatcaresult2.Scheme._text)
		console.log("C- Output XML - Scheme_Name:", fatcaresult2.Scheme_Name._text)
    console.log("C- Output XML - Amt:", fatcaresult2.Amt._text)
    link_var='';
    if (typeof fatcaresult2.Paymentlink !== 'undefined' && fatcaresult2.Paymentlink._text !== null){
    console.log("C- Output XML - Link:", fatcaresult2.Paymentlink._text)
    link_var=fatcaresult2.Paymentlink._text;
   }//	console.log("C- Output XML - Line 960", fatcaresult2[6].return_msg._text)
			//console.log("C- Output XML - Line 960", fatcaresult2[7].return_msg._text)
     ashdata1=fatcaresult2.Unique_No._text;
     ashdata2=fatcaresult2.Trxn_No._text;
     ashdata3=fatcaresult2.Application_No._text;
     ashdata4=fatcaresult2.Fund._text;
     ashdata5=fatcaresult2.Scheme._text;
     ashdata6=fatcaresult2.Scheme_Name._text;
     ashdata7=fatcaresult2.Amt._text;
     ashdata8=fatcaresult2.Status_Desc._text;
     ashdata9=fatcaresult2.Status_code._text;
     ashdata10=fatcaresult2.Input_ref_no._text;
    }
    else 
    { 
      
      
      
    if (Array.isArray(fatcaresult2) && fatcaresult2.length) {
      fatcaresult2.forEach(element => { 
      // console.log(element.return_msg._text); 
      //  msg=msg+element.return_msg._text + '||';
      }); 
  //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
    }
    else{
      //console.log("ashC- Output XML - Link:827"); 
      console.log(fatcaresult2.return_msg._text); 
      msg=fatcaresult2.return_msg._text;
    }
  //console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
  //console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
  }



      let agmess='';  
		  
      if(fatcaresult==0){    
        agmess= {
           status:200,
           message:'Successfull',            
           data:  { "Unique_No": ashdata1,"Trxn_No": ashdata2 ,"Application_No": ashdata3, "Fund": ashdata4,"Scheme": ashdata5, "Scheme_Name": ashdata6, "Amt": ashdata7,"Status_Desc":ashdata8,"Status_code":ashdata9,"Input_ref_no":ashdata10,"Paymentlink":link_var.substring(9,(link_var.length+3)*.5),},  
           //fatcaresult2.Paymentlink._text.substring(9,fatcaresult2.Paymentlink._text.length-4).InnerHtnl
           message_full: fatcaresult2 ,
         }
       }else{
         agmess= {
           status:400,
           message:msg,
          // message_1: fatcaresult2, 
          //data:  msg,
           //"1": ashdata2 ,"2": ashdata3, "3": ashdata4,"4": ashdata5, "5": ashdata6, "6": ashdata7},              
      //message_third_api:'FAILED',
     message_full:fatcaresult2,
          }
       }
       return res.status(200).json(agmess)
      }).catch(err=>{console.log(err)});
      console.log("res last line 829");



    });
  };
  
  exports.test = (req, res) => {
    //console.log(linkvar)
    
    linkvar="<a href='https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d'>https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d</a>";
 
 linkvar=linkvar.substring(9,(linkvar.length+3)*.5);
  console.log(linkvar)
   }; 
  ///////////////////////////////////////////////////////////////  
  
  ////////////////


exports.readFatca1_nov= (req, res) => {  

  const postarray= { email:req.body.email }

  Customer.getFatcamm_nov(postarray.email,(err, data) => {

    if(data!=null){        
      if (!Array.isArray(data) || !data.length) {                
     return res.json({
       success: 200,
       message: "Email Record not Found in user table"
     });
   }}
   
   let urs=data[0]
   let resdatemy=String(urs.date_of_birrth);        
   let xb=resdatemy.split(" ");     
   let mydob_xb=xb[2]+"-"+xb[1]+"-"+xb[3]
   let pep= (urs.exposedPolitically == '1') ? "N" : "Y";
   //console.log("res line 844",urs);
   //return

   
   let arrk={NMFIIService:{service_request:{
    appln_id:'MFS21399',
    password:'Account@2121',
    broker_code:'ARN-21399',
    pan:urs.pan_card,
    tax_status:'01',
    investor_name:urs.name,
    chkExempIndValid:'N',
    editor_id:'KGNANA',
    ubo_applicable_count:'2',
    iin:urs.iin,
    kyc:{
      app_income_code:urs.income_range,
      net_worth_sign:'+',
      net_worth:'5000',
      net_worth_date:'31-Jul-2015',
     // pep: testBoolean ? "attributeTwo" : "attributeTwoToo",
    //  pep: if(urs.exposedPolitically == '1') ? "N" : "Y",
       pep:pep,
      occ_code:urs.occupation,
      source_wealth:'03',
      corp_servs:'01'
    },
    Fatca:{
         dob:mydob_xb,   //timezone issue
         addr_type:"1",  //<--- from table doc address
         data_src:"E", //<---  from Phycial or Email
        log_name:urs.email,     //email id already dynamic
         country_of_birth:'IND', //<---
          place_birth: urs.city,
        tax_residency:NaN,  //<---
       country_tax_residency1:urs.taxcountry,  //<---
        tax_payer_identityno1:'PYBQI9229X',  //<---
         id1_type:'C',  //<---
        country_tax_residency2:'',
       tax_payer_identityno2:'',
        id2_type:'',
        country_tax_residency3:'',
        tax_payer_identityno3:'',
        id3_type:'',
        country_tax_residency4:'',
        tax_payer_identityno4:'',
        id4_type:'',
        ffi_drnfe:'',
        nffe_catg:'',
        nature_bus:'',
        act_nfe_subcat:'',
        stock_exchange:'',
        listed_company:'',
        us_person:'N',
        exemp_code:'',
        giin_applicable:'',
        giin:'',
        giin_exem_cat:'',
        sponcer_availability:'',
        sponcer_entity:'',
        giin_not_app:'',
        fatca_dec_received:'Y',
    },
    ubo:{
           ubo_add1:'df',
           ubo_add2:'ddd',
           ubo_add3:'dd',
           ubo_master_codes:'C04',
           ubo_pan_no:'THTHT1234P',
           ubo_name:'BDDD',
           ubo_country_tax_residency:'IND',
           ubo_cob:'TN',
           ubo_cocn:'IND',
           ubo_country:'IND',
          ubo_dob:'14-Jan-1988',
          ubo_father_nam:'JDFD',
          ubo_gender:'M',
          ubo_holding_perc:'100',
          ubo_occ_code:'3D',
          ubo_tel_no:'5151515',
          ubo_mobile:'9876543121',
          ubo_pincode:'123123',
          ubo_city:'SDF',
          ubo_state:'SDF',
         ubo_add_type:'1',
         ubo_id_type:'C',
         ubo_tin_no:'SADFD6265D'
    }//ubo  
  }//service_request
} //NMFIIService
}//else

let xml_agamji=jsonxml(arrk);

axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/FATCAKYCUBOREG',
        xml_agamji,
        {headers:
          {'Content-Type': 'text/xml'}
        }).then(res22=>{

          console.log("C- Output XML - Line 946", res22)
          let result1 = convert.xml2js(res22.data, {compact: true, spaces: 4});
          let fatcaresult=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_status.service_return_code._text;
          let fatcaresult2=result1.DataSet['diffgr:diffgram'].NMFIISERVICES.service_response;
     //  console.log("C- Output XML - Line 950", result1)
       //   console.log("C- Output XML - Line 951", fatcaresult)
        //  console.log("C- Output XML - Line 956", fatcaresult2)
		//console.log("i am cool 880");
		//var gi=typeof fatcaresult2[0].return_msg;
		//console.log("c- 881- ", gi);
		
		let newdata0= fatcaresult2[0];
		let newdata0_0= fatcaresult2[1];
		let adddata1="";
		let	adddata2="";
		
		if(typeof newdata0 !== "undefined"  || typeof newdata0_0 !== "undefined"){
		let newdata1= fatcaresult2[0].return_msg;
		let newdata2= fatcaresult2[1].return_msg;
		
		let newdata3= fatcaresult2[0].Status_Desc;
		let newdata4= fatcaresult2[1].Status_Desc;
		if( typeof newdata1 !== "undefined"  || typeof newdata2 !== "undefined"){
			adddata1= fatcaresult2[0].return_msg._text
			adddata2= fatcaresult2[1].return_msg._text
			
		}else if(typeof newdata3 !== "undefined"  || typeof newdata4 !== "undefined"){
			adddata1= fatcaresult2[0].Status_Desc._text
			adddata2= fatcaresult2[1].Status_Desc._text
		}else{
			adddata1="";
			adddata2="";
			
		}
		}
		
		
		
	
			//  console.log("C- Output XML - Line 958", fatcaresult2[0].return_msg._text)
			//  console.log("C- Output XML - Line 960", fatcaresult2[1].return_msg._text)
	
		  
          let agammess='';
		  
		  

          if(fatcaresult==0){    
            agammess= {
               status:200,
               message:'Successfully',            
               message_full: fatcaresult2  
             }
           }else{
             agammess= {
               status:200,
               message:'Successfully',
              // message_1: fatcaresult2,               
               data:  { "0": adddata1, "1": adddata2 },              
 			   message_third_api:'FAILED',
			   message_full:fatcaresult2,
              }
           }
           return res.status(200).json(agammess)
        }).catch(err=>{console.log(err)});
console.log("res last line 969");
  });
  }   

  //////////////////////////////////////////////////////////////