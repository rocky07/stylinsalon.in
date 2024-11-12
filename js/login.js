 // Enable popover
 $(function () {
    $('[data-toggle="popover"]').popover({
        content: $('#popoverContent').html(),
        html: true
    });
    
// Function to show login modal
function showLoginModal() {
    $('#loginModal').modal('show');
    }

$("#loginBtn").click(function(){
    // Retrieve user code
         var userCode = $("#userCode").val();

        // Make AJAX request to login API endpoint
        $.ajax({
            url: 'https://e7ljrkwmmou2ufsdlpggdsawtu0tzmlz.lambda-url.us-east-2.on.aws/?code=' + userCode,
            method: 'GET',
            success: function(respObj) {
                if(respObj.status===200){
                    const expirationTime = Date.now() + (1 * 60 * 1000); // 5 minutes in milliseconds
                    localStorage.setItem('apiKey', respObj.body);
                    localStorage.setItem('expirationTime', expirationTime);
                    console.log('Login successful. API key saved to local storage.');
                    $("#loginModal").modal('hide');
                    }
                else{
                    console.error('Error occurred during login:', error);
                    alert('Login failed. Please try again.');
                }

            },
            error: function(xhr, status, error) {
                console.error('Error occurred during login:', error);
                alert('Login failed. Please try again.');
            }
        });
       
    });


function isApiKeyValid() {
        // Retrieve the stored API key and expiration time
        const apiKey = localStorage.getItem('apiKey');
        const expirationTime = localStorage.getItem('expirationTime');

        // Check if API key and expiration time are set
        if (apiKey && expirationTime) {
            // Convert expiration time to milliseconds
            const expirationTimestamp = parseInt(expirationTime);

            // Check if current time is greater than expiration time
            if (Date.now() < expirationTimestamp) {
                return true; // API key is still valid
            }
        }
        return false; // API key is not set or expired
    }
    
// Check if API key is set and show modal if not
if (!isApiKeyValid()) {
    showLoginModal();
    }

    $('#loginModal').on('hidden.bs.modal', function () {
        console.log("window focus !!");
         // Check if the function is valid before proceeding
         const apiKey = localStorage.getItem('apiKey');
         const expirationTime = localStorage.getItem('expirationTime');
     
             // Check if API key and expiration time are set
         if (apiKey && expirationTime) {
             const expirationTimestamp = parseInt(expirationTime);
             if (Date.now() < expirationTimestamp) {
                     return true; // API key is still valid
                 }
             $("#loginModal").modal('show');
             console.log('not validated !!');
         } else {
             // Alert or handle the case where the function is not valid
             $("#loginModal").modal('show');
             console.log('not validated !!');
         }
     });

});
// code should check if local store is set if not call login 

