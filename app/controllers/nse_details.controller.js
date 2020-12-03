const Customer = require("../models/nse_details.model.js");
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



  
  //////////////////////////////////////////////////////////////
 // Customer.m_addBankDetail(req.body, (err, data) => {
    exports.mandate = (req, res) => {  
        console.log("mandate")
        const postarray= { email:req.body.email,
          acc_type:req.body.acc_type,
          ach_amt:req.body.ach_amount,
          ach_fromdate:req.body.ach_fromdate,
          ach_todate:req.body.ach_todate,
          process_mode:req.body.process_mode,      
          client_callback_url:req.body.client_callback_url,    
        }
       // return;
       Customer.mandate_normal(postarray.email,(err, data) => {
    
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
            ifsc_code: urs.fscode,
            bank_name: urs.bank_code,
            acc_no: resaccountNomy,
           acc_type: urs.acount_type,
          branch_name: urs.branch,
          micr_no: [],
          uc: 'Y',
          ach_fromdate: postarray.ach_fromdate,
          ach_todate: postarray.ach_todate,
          ach_amount: postarray.ach_amt,
          Bank_holder_name: urs.name,
          Bank_holder_name1: [],
          Bank_holder_name2: [],
          process_mode: postarray.process_mode,
          channel_type: 'AA',
          return_flag: 'Y',
          Existing_Bank: 'Y',
          client_callback_url: postarray.client_callback_url,       
           }//service_request
        } //NMFIIService
       } //else
        
        
         
         
       console.log(ash_arrk);
        let ash_xml_agamji=jsonxml(ash_arrk);  
       // console.log(ash_xml_agamji);
    
        
        //console.log(ash_xml_agamji);
        axios.post('https://uat.nsenmf.com/NMFIITrxnService/NMFTrxnService/ACHMANDATEREGISTRATIONS',
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
    
    
         let sql_purchase = `INSERT INTO mandate (user_id, Unique_No, Trxn_No, Application_No, Fund, Scheme, Scheme_Name, ach_amt, process_mode, Client_callback_url, ach_fromdate, ach_todate) VALUES  ('${userdata1}', '${ashdata1}','${ashdata2}','${ashdata3}','${ashdata4}','${ashdata5}','${ashdata6}','${userdata2}','${userdata1}','${userdata4}','${userdata3}','${userdata5}')`; 
         
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
      