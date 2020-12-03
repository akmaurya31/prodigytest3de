const Customer = require("../models/nse_sip.model.js");
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


  exports.test = (req, res) => {
    //console.log(linkvar)
    
    linkvar="<a href='https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d'>https://uat.nsenmf.com/Transactions/MFDMakePayment.aspx?joJOfnmoxoVHW7E39JcLLHpmZFMO5i%2bA0w0%2fh8LHIohbsy6tTTu8ttvENchBlJ9jtmSwjA9Hgexmi5A0bsaT%2fmZ0fd7IaOGH6bmWeG5bZXmBB36tUFp472snObCfL7vCDmOYL9GUXhQz8SVw35kWN0PVx1%2ftScEUgJu4nFNEssOKfolcYxdcrADhh1A09y%2fjxs4tGRckwHt9wnM4UOHPYxZPfNCDKsu1D%2fEJdpedgRgM%2fURp42gZ08j779OXFSFY7nNF1PKd5cPKHi04IAg1eUaDYGuAwnPlf1uA6aCpotYIOlLDvOAYMQQxvC7uUD6ai8yW1qGEzz6M35j73Tdt9GxFV8CToGeUSNZ3kBXnMWQ%3d</a>";
 
 linkvar=linkvar.substring(9,(linkvar.length+3)*.5);
  console.log(linkvar)
   }; 
  ///////////////////////////////////////////////////////////////  
  exports.SIP = (req, res) => {  
    console.log("sip")
    const postarray= { 
         
      email:req.body.email,
      trxn_type:req.body.trxn_type,//
      trxn_acceptance:req.body.trxn_acceptance,//
      debit_amt_type:req.body.debit_amt_type,//

      sip_paymech:req.body.sip_paymech,//
      ach_amt:req.body.ach_amt,//
      ach_fromdate:req.body.ach_fromdate,//
      ach_enddate:req.body.ach_enddate,//
      until_cancelled:req.body.until_cancelled,//

      ach_exist:req.body.ach_exist,//
      amc:req.body.amc,//
      folio:req.body.folio,//
      product_code:req.body.product_code,//
      reinvest:req.body.reinvest,//
      amt_unit_type:req.body.amt_unit_type,//
      amt_unit:req.body.amt_unit,//
      input_ref_no:req.body.input_ref_no,//
      perpetual_flag:req.body.perpetual_flag,//
      frequency:req.body.frequency,//
      periodicity:req.body.periodicity,
      period_day: req.body.period_day,
      FREEDOM_TARGET_SCHEME: req.body.FREEDOM_TARGET_SCHEME,
      FREEDOM_TENURE: req.body.FREEDOM_TENURE,
      FREEDOM_SWP_AMOUNT: req.body.FREEDOM_SWP_AMOUNT,   
      all_unit:req.body.all_unit,//a
      from_date: req.body.from_date,//
      to_date: req.body.to_date,// 
      target_product:req.body.target_product
    }
   // return;
   Customer.SIP_normal(postarray.email,(err, data) => {

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
        trxn_type:postarray.trxn_type,        
        dp_id: [],        
        euin_opted: 'Y',
        trxn_acceptance:postarray.trxn_acceptance,
        sub_brok_arn: [],
        euin: 'E073161',
        sip_paymech: postarray.sip_paymech,
        bank: urs.bank_code,
        acc_no: resaccountNomy,
       acc_type: urs.acount_type,
        branch: urs.branch,
        micr_no: [],
        ifsc_code: urs.fscode,
        debit_amt_type: postarray.debit_amt_type,
        umrn: [],
        ach_amt: postarray.ach_amt,
        ach_fromdate: postarray.ach_fromdate,
        ach_enddate: postarray.ach_enddate,
        until_cancelled: postarray.until_cancelled,
        Bank_holder_name: urs.name,
        Bank_holder_name1: [],
        Bank_holder_name2: [],
        trxn_initiator: 'O',
        trans_count: '1',
        ach_exist: postarray.ach_exist,
        poa: 'N',
        frequency:postarray.frequency
      },
        childtrans: { 
          amc: postarray.amc,
          folio:postarray.folio,
          product_code: postarray.product_code,
          source_ft_acc_no: [],
          target_product:postarray.target_product,
          target_ft_acc_no:[],
          reinvest: postarray.reinvest,
          amt_unit_type: postarray.amt_unit_type,
          amt_unit: postarray.amt_unit,
          all_unit:postarray.all_unit,
          from_date: postarray.from_date,
          to_date: postarray.to_date,
          periodicity:postarray.periodicity,
          period_day: postarray.period_day,
          input_ref_no: postarray.input_ref_no,
          perpetual_flag: postarray.perpetual_flag,
          insurance_enabled: 'N',
          GOAL_BASED_SIP: [],
          GOAL_TYPE: [],
          GOAL_AMOUNT: [],
          FREEDOM_SIP: 'Y',
          FREEDOM_TARGET_SCHEME: postarray.FREEDOM_TARGET_SCHEME,
          FREEDOM_TENURE: postarray.FREEDOM_TENURE,
          FREEDOM_SWP_AMOUNT: postarray.FREEDOM_SWP_AMOUNT         
        
     }  
    }//service_request
  } //NMFIIService
  //else    
     
   console.log(ash_arrk);
  // return
    let ash_xml_agamji=jsonxml(ash_arrk);  
   // console.log(ash_xml_agamji);

    
    //console.log(ash_xml_agamji);
    axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/SYSTRXNREG',
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
      console.log("ashC- Output XML - Link:789");   
      //return       
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

    userdata1=postarray.process_mode;
    userdata2=postarray.ach_amt;    
    userdata3=postarray.ach_fromdate;
    userdata4=postarray.client_callback_url;   
    userdata5=postarray.ach_todate;   
    
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


     let sql_purchase = `INSERT INTO sipregular (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES  ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`; 
     
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
        console.log("ashC- Output XML - Link:827"); 
        if(typeof fatcaresult2.return_msg !== "undefined" && fatcaresult2.return_msg._text !== null){
        console.log(fatcaresult2.return_msg._text); 
        msg=fatcaresult2.return_msg._text;
        }
        //console.log(fatcaresult2.Status_Desc._text); 
       // msg=fatcaresult2.Status_Desc._text;
       if(typeof fatcaresult2.Status_Desc !== "undefined" && fatcaresult2.Status_Desc._text !== null){
        console.log(fatcaresult2.Status_Desc._text); 
       msg=fatcaresult2.Status_Desc._text;

       }
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
  
  