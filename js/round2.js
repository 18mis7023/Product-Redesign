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
            // window.location.replace("./index.html");
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


  function logout() {
    firebase.auth().signOut().then(function() {
        window.location.replace("../index.html");
      }).catch(function(error) {
        // An error happened.
      });
}

  function uploadoption()
  {
      round2headtopic=document.getElementById("round2headtopic").value;
      if(round2headtopic==""){
          alert("Please select a topic")
          return;
      }
      document.getElementById("submitRound2").style.display="none";
      document.getElementById('uploadprogress').innerHTML = "Please wait uploading the file";
      var dtime = new Date();
      const timestamp = dtime.getTime();
      const ref = firebase.storage().ref();
      const file = document.querySelector('#upload').files[0]
      const name = file.name+"-"+round2headtopic+"-"+useremail;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      document.getElementById('uploadprogress').innerHTML = "Uploading the file is done. Submitting the details";
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
          // console.log(url);
            firebase.database().ref('IdeaPlugin/Mails/' +mailid +'/round2/Submission/').set({
              fileurl: url,
              Date:dtime,
              Timestamp:timestamp,
              Topic:round2headtopic 
        });
        document.getElementById('uploadprogress').innerHTML = "Data Submitted successfully";
        alert("The file is uploaded ")
        document.getElementById('uploaddiv').innerHTML="Document is uploaded"
        })
        .catch(console.error);
  }
