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
document.getElementById("formsection").style.display="none";
  var mailid;
  var teamkey;
  var useremail;
  var uploadkey;
  var setnum;
  var teamslot;
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log(user)
      // console.log(user.displayName)
    useremail=user.email
      // var profileimg=document.getElementById('profile_img')
      // profileimg.src=user.photoURL
    var databaseref; 
      firebase.database().ref("IdeaPlugin").child("Mails").orderByChild("Email").equalTo(useremail).once("value",snapshot => {
        if (snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
              mailid=childSnapshot.getKey()
              var teamData = childSnapshot.val();
              teamkey=teamData.key;
              // console.log(teamkey)
              displaynames();
              
            });
        }
        else{
          // console.log("what");
            window.location.replace("./index.html");
        }
      });
      setTimeout(() => {
        console.log(mailid)
       firebase.database().ref('IdeaPlugin/Mails/'+mailid+'/').on('value', function(snapshot) {
          //   console.log(content+"hello")
          var childData = snapshot.val();
          var teamkey=childData.key;
          firebase.database().ref('IdeaPlugin/Teams/'+teamkey+'/').on('value', function(snapshot) {
            var childData = snapshot.val();
            teamslot=childData.Slot;
            setnum=childData.Set;
            console.log(teamslot);
            firebase.database().ref('Admin/Timing/'+teamslot+'/').on('value', function(snapshot) {
              var childData = snapshot.val();
              console.log(childData);
              var starttime=childData.starttime;
              var endtime=childData.endtime;
              displaytimetostart(starttime,endtime);
            });
          });
        //     snapshot.forEach((childSnapshot) => {
        //         var childKey=childSnapshot.getKey()
        //         console.log(childKey)
        //         uploadkey=childKey;
        //         var childData = childSnapshot.val();
        //         console.log(childData)
        //         // document.getElementById('uploaddiv').style.display="block";
        //         // console.log(document.getElementById('uploaddiv').style.display)
        //         // console.log(content+"    k")
        // });
      });
      }, 6000);
      
      
    } else {
        // var profileimg=document.getElementById('profile_img')
        // profileimg.style.display='none'
        // window.location.replace("./index.html");
    }
  });

function displaytimetostart(countDownDate,endtime){
    var x = setInterval(function() {
      
      // Get today's date and time
      var now = new Date().getTime();
      countDownDate=new Date(countDownDate).getTime();
      endtime=new Date(endtime).getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // console.log(now);
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Output the result in an element with id="demo"
      document.getElementById("profile_exam_time").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
      
      // If the count down is over, write some text 
      if (distance < 0) {
      clearInterval(x);
      document.getElementById("formsection").style.display="block";
      document.getElementById("formtimesec").style.display="none";
      document.getElementById("Label_comp_end_time").innerHTML="Time remaining to access the round1 link";
      displaytimetoend(endtime);
      
        // databaseref=firebase.database().ref('dontinvolve/ok/my/id/dont/be/part/of/it/ok/thanks/').once('value')
        //   .then(function(snapshort){
        //       // console.log(snapshort.val());
        //       document.getElementById('btn_start').href=snapshort.val().URL;
        //       })
      }
  }, 1000);
}
function displaytimetoend(countDownDate){
  var x = setInterval(function() {
            
    // Get today's date and time
    var now = new Date().getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("comp_end_time").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
    clearInterval(x);
    document.getElementById("Label_comp_end_time").innerHTML="Time remaining to submit your design";
    document.getElementById("formsection").style.display="none";
    document.getElementById("formtimesec").style.display="none";
    document.getElementById("comp_end_time").innerHTML="Completed Time";
    
      // databaseref=firebase.database().ref('dontinvolve/ok/my/id/dont/be/part/of/it/ok/thanks/').once('value')
      //   .then(function(snapshort){
      //       // console.log(snapshort.val());
      //       document.getElementById('btn_start').href=snapshort.val().URL;
      //       })
    }
}, 1000);
}

function openlink()
{
  // console.log(usersetid)
    firebase.database().ref('Admin/Links/'+teamslot+'/'+setnum+"/").on('value', function(snapshot) {
      if (snapshot.exists()){
          // console.log(snapshot.val())
          var childData = snapshot.val();
          var link=childData.Round1Link;
          window.open(link);

          
          // Update the count down every 1 second
      }
      else{
        alert("Try again after 1 min");

      }
      });
}
  function displaynames() {
    firebase.database().ref("IdeaPlugin").child("Teams").orderByChild("Email").equalTo(useremail).once("value",snapshot => {
        if (snapshot.exists()){
          snapshot.forEach((childSnapshot) => {
              var childKey=childSnapshot.getKey()
              // console.log(childKey)
              childData = childSnapshot.val();
              // console.log(childData)
              document.getElementById('name1').innerText=childData.Name;
              document.getElementById('name2').innerText=childData.TeamName2;
              if(childData.TeamName3!=undefined)
              {
                  document.getElementById('name3').innerText=childData.TeamName3;
              }
              else{
                //   console.log( docume    nt.getElementById('name3').style.display)
                  document.getElementById('name3').style.display="none";
              }
          });
          
        }
        else{
        }
    });
  }