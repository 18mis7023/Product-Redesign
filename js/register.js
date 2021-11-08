const firebaseConfig = {
  apiKey: "AIzaSyCowzyMXx_glMT8gM91rA5VKiqhy3k3BhQ",
  authDomain: "product-designing.firebaseapp.com",
  projectId: "product-designing",
  storageBucket: "product-designing.appspot.com",
  messagingSenderId: "744455672507",
  databaseURL:"https://product-designing-default-rtdb.firebaseio.com/",
  appId: "1:744455672507:web:b51579ebe33d4e837d4f9e",
  measurementId: "G-BQ8DW9BDHP"
};

  firebase.initializeApp(firebaseConfig);
//checking condition
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log(user)
      // console.log(user.displayName)
      var useremail=user.email
      // var profileimg=document.getElementById('profile_img')
      document.getElementById('reg_email_input').value=user.email
      var regemail=document.getElementById('reg_email_input').value
      // profileimg.src=user.photoURL
      
    var databaseref; 
        firebase.database().ref("IdeaPlugin").child("Mails").orderByChild("Email").equalTo(useremail).once("value",snapshot => {
          if (snapshot.exists()){
             window.location.replace("./profile.html");
          }
          else{
              
          }
      });
        
      
    } else {
        // var profileimg=document.getElementById('profile_img')
        // profileimg.style.display='none'
        window.location.replace("./index.html");
    }
  });
 
  function submit() {
    console.log("In submit")
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var databasee = firebase.database();
            var dtime = new Date();
            const timestamp = dtime.getTime();
            var year =document.getElementById('dateY');
            year=dtime.getFullYear();
            var month=document.getElementById('dateM');
            month =dtime.getMonth()+1;
            var hours=document.getElementById('dateh');
            hours=dtime.getHours();
            var min= document.getElementById('datem');
            min=dtime.getMinutes();
            var sec= document.getElementById('dates');    
            sec=dtime.getSeconds();
            var date=dtime.getDate();
            console.log(dtime);
             var val=""+date+month+year+hours+min+sec;
            //  
            var regname=document.getElementById('reg_name_input').value
            var regemail=user.email 
            var collegename=document.getElementById('reg_college_name').value
            var mobilenum=document.getElementById('reg_mobile_input').value
            // 
            var regname2=document.getElementById('reg_name_input2').value
            var regemail2=document.getElementById('reg_email_input2').value
            var collegename2=document.getElementById('reg_college_name2').value
            var mobilenum2=document.getElementById('reg_mobile_input2').value
            timestamp2=timestamp*100;
            console.log(timestamp2)
            // 
            var regname3=document.getElementById('reg_name_input3').value
            var regemail3=document.getElementById('reg_email_input3').value 
            var collegename3=document.getElementById('reg_college_name3').value
            var mobilenum3=document.getElementById('reg_mobile_input3').value
            var refferealcode=document.getElementById('reg_reff_input').value
            var slotselect=document.getElementById('slotselection').value
            timestamp3=timestamp*100+1;
            console.log(timestamp3)
            var setarr = ["Set1","Set2","Set3"];
            var set=setarr[Math.floor(Math.random()* setarr.length)];
            console.log(set)
            var check=false;
            if(regname=="" || regemail=="" || collegename=="" || mobilenum=="" || regname2=="" || regemail2=="" || collegename2=="" || mobilenum2=="")
            {
              check=false;
              alert("Please fill the details otherwise your data is not recorded");
            }
            else if(regname!="" && regemail!="" && collegename!="" && mobilenum!="" && regname2!="" && regemail2!="" && collegename2!="" && mobilenum2!="" && regname3!="" && regemail3!="" && collegename3!="" && mobilenum3!=""){
              check=true;
              databasee.ref('IdeaPlugin/Mails/'+timestamp3).set({
                Email:regemail3,
                Name:regname3,
                CollegeName:collegename3,
                MobileNumber:mobilenum3,
                Year:year,
                Month:month,
                Date:date,
                Hour:hours,
                Set:set,
                ID:timestamp3,
                key:val
              });
              databasee.ref('IdeaPlugin/Teams/'+val).set({
                Email:regemail,
                Name:regname,
                CollegeName:collegename,
                MobileNumber:mobilenum,
                TeamEmail2:regemail2,
                TeamName2:regname2,
                TeamCollegeName2:collegename2,
                TeamMobileNumber2:mobilenum2,
                TeamEmail3:regemail3,
                TeamName3:regname3,
                TeamCollegeName3:collegename3,
                TeamMobileNumber3:mobilenum3,
                Year:year,
                Month:month,
                Date:date,
                Hour:hours,
                Minute:min,
                Seconds:sec,
                Day:dtime,
                Set:set,
                ID:timestamp3,
                key:timestamp,
                RefId:refferealcode,
                Slot:slotselect
              });
            }
            else
            {
              check=true;
              databasee.ref('IdeaPlugin/Teams/'+val).set({
                Email:regemail,
                Name:regname,
                CollegeName:collegename,
                MobileNumber:mobilenum,
                TeamEmail2:regemail2,
                TeamName2:regname2,
                TeamCollegeName2:collegename2,
                TeamMobileNumber2:mobilenum2,
                Year:year,
                Month:month,
                Date:date,
                Hour:hours,
                Minute:min,
                Seconds:sec,
                Set:set,
                Day:dtime,
                ID:timestamp3,
                key:timestamp,
                RefId:refferealcode,
                Slot:slotselect
              });
            }
            if(check)
            {
              databasee.ref('IdeaPlugin/Mails/'+timestamp).set({
                Email:regemail,
                Name:regname,
                CollegeName:collegename,
                MobileNumber:mobilenum,
                Year:year,
                Month:month,
                Date:date,
                Hour:hours,
                Set:set,
                ID:timestamp,
                key:val
              });
              databasee.ref('IdeaPlugin/Mails/'+timestamp2).set({
                Email:regemail2,
                Name:regname2,
                CollegeName:collegename2,
                MobileNumber:mobilenum2,
                Year:year,
                Month:month,
                Date:date,
                Hour:hours,
                Set:set,
                ID:timestamp2,
                key:val
              });
              setTimeout(() => {
                alert("Updated Sucessfully !! Lets go for next One");
                 window.location.replace("./profile.html");   
              }, 5000);
            }
        }else{
            window.location.replace("./Dashboard.html");
        }
      });
    }
function logout() {
    firebase.auth().signOut().then(function() {
        window.location.replace("../index.html");
      }).catch(function(error) {
        // An error happened.
      });
}
