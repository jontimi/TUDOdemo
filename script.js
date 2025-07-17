// Ensure the script runs after the entire page (DOM) is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal, iframe, and close button elements
    var modal = document.getElementById('arModal');
    var iframe = document.getElementById('arIframe');
    var closeButton = document.querySelector('.close-button');

    // Get a reference to your "3D\AR" button (the one with class 'my-3d-button')
    var my3dButton = document.querySelector('.my-3d-button');

    // Check if essential elements exist before adding listeners to prevent errors
    if (modal && iframe && closeButton && my3dButton) {
        // When the "3D\AR" button is clicked
        my3dButton.addEventListener('click', function() {
            // ⭐ CRITICAL FIX: Ensure the '?brand=tudo' query parameter is included here ⭐
            var arViewerURL = 'https://jontimi.github.io/3dModelARviewer/?brand=tudo'; 
            
            // Set the iframe's source to load your AR mockup with the brand parameter
            iframe.src = arViewerURL;
            
            // Show the modal by changing its display style to flex
            modal.style.display = 'flex';
            console.log("3D/AR button clicked. Opening modal with TUDO branded viewer.");
        });

        // When the close button is clicked
        closeButton.addEventListener('click', function() {
            // Hide the modal
            modal.style.display = 'none';
            // Clear the iframe source to stop any video/audio playback and release resources
            iframe.src = ''; 
            console.log("Modal closed by close button.");
        });

        // When the user clicks anywhere outside of the modal content, close it
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                iframe.src = ''; 
                console.log("Modal closed by outside click.");
            }
        });
    } else {
        console.error("One or more required elements (modal, iframe, close button, or 3D/AR button) were not found.");
    }
});