/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Designer","Youtuber","Developer"],
    loop : true,
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.project-box',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})



/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})




document.querySelector('.form-button button').addEventListener('click', function(e) {
  e.preventDefault(); 

  // Get the form input values
  const name = document.querySelector('input[placeholder="Name"]').value;
  const email = document.querySelector('input[placeholder="Email"]').value;
  const message = document.querySelector('textarea').value;

  // Prepare data to send in the request
  const formData = {
      name: name,
      email: email,
      message: message
  };

  // Send data using fetch API
  fetch('http://localhost:3001/submit-message', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
      alert(data.message);  // Show success message
      
      // Optionally, display the new message on the page
      const messagesContainer = document.querySelector('.messages-container');
      const newMessage = document.createElement('div');
      newMessage.classList.add('message');
      newMessage.innerHTML = `
          <strong>${data.name}</strong> (${data.email}): 
          <p>${data.message}</p>
      `;
      messagesContainer.appendChild(newMessage);
  })
  .catch(error => {
      alert('There was an error submitting the message');
  });
});

// Fetch all messages after page loads
window.onload = function() {
  fetch('http://localhost:3001/messages')
  .then(response => response.json())
  .then(messages => {
      const messagesContainer = document.querySelector('.messages-container');
      messages.forEach(msg => {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message');
          messageDiv.innerHTML = `
              <strong>${msg.name}</strong> (${msg.email}):
              <p>${msg.message}</p>
          `;
          messagesContainer.appendChild(messageDiv);
      });
  })
  .catch(error => {
      console.error('Error fetching messages:', error);
  });
};
