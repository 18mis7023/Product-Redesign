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
firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
      document.getElementById('Register').innerText="Go To Profile";
      document.getElementById('Registers').innerText="Go To Profile";
      
   } else {
      // var profileimg=document.getElementById('profile_img')
      // profileimg.style.display='none'

   }
});


var provider = new firebase.auth.GoogleAuthProvider();
function googleSignin() {
//    console.log("Hello ");
   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         var registered=false
              firebase.database().ref("IdeaPlugin").child("Mails").orderByChild("Email").equalTo(user.email).once("value",snapshot => {
               if (snapshot.exists()){
                  registered=true
                  window.location.replace("./profile.html");
               }
              if(registered==false)
              {
                  window.location.replace("./contact.html");
              }

            });
      } else {
        //  console.log("Hello insode ");
         firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(token)
            console.log(user)
            console.log(user.email)
            console.log(user.displayName)
            window.location.replace("./contact.html");
         }).catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log(errorCode);		
             console.log(errorMessage);		
            });
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
