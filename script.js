// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button"); 
const shareButton = document.getElementById("share-button"); // NEW: Get the Share button

const qrModal = document.getElementById("qr-modal");       
const closeQrModal = document.getElementById("close-qr-modal"); 
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Feature: Reset 3D View ---
if (resetButton) {
    resetButton.addEventListener("click", () => {
        modelViewer.cameraOrbit = "0deg 75deg auto"; 
        modelViewer.fieldOfView = "40deg"; // Resets any zoom level
        console.log("3D View Reset.");
    });
}

// --- Feature: QR Code Pop-up ---
function generateQRCode() {
    const pageUrl = window.location.href; // QR code links to the current page

    if (pageUrl && typeof QRious !== 'undefined' && qrCodeImage) {
        try {
            new QRious({
                element: qrCodeImage, 
                value: pageUrl,
                size: 100, 
                level: 'H' 
            });
            qrCodeImage.style.display = 'block'; 
            qrCodeLink.href = pageUrl; 
            console.log("QR Code generated for:", pageUrl);
        } catch (error) {
            console.error("Error generating QR code:", error);
            qrCodeImage.style.display = 'none'; 
        }
    } else {
        qrCodeImage.style.display = 'none';
        console.log("QR code generation skipped: URL or QRious library not ready.");
    }
}

// Event listener for the "AR QR" button to show the modal
if (arQrButton) {
    arQrButton.addEventListener("click", () => {
        qrModal.style.display = "flex"; 
        generateQRCode(); 
        console.log("QR Modal opened.");
    });
}

// Event listener for the close button inside the modal
if (closeQrModal) {
    closeQrModal.addEventListener("click", () => {
        qrModal.style.display = "none";
        console.log("QR Modal closed.");
    });
}

// Close the modal if the user clicks outside of the modal content
if (qrModal) {
    window.addEventListener("click", (event) => {
        if (event.target == qrModal) {
            qrModal.style.display = "none";
            console.log("QR Modal closed by outside click.");
        }
    });
}

// Generate QR code when model loads (it will be hidden until button press)
// This listener remains for the QR code functionality
modelViewer.addEventListener("model-load", generateQRCode);
// Also try to generate on initial DOM content load for robustness
document.addEventListener("DOMContentLoaded", generateQRCode);


// --- NEW FEATURE: Share Button ---
if (shareButton) {
    shareButton.addEventListener("click", async () => {
        if (navigator.share) { // Check if Web Share API is supported
            try {
                await navigator.share({
                    title: document.title, // Uses the page title
                    url: window.location.href // Uses the current page URL
                });
                console.log('Page shared successfully');
            } catch (error) {
                // User cancelled the share or an error occurred
                console.error('Error sharing the page:', error);
            }
        } else {
            console.warn('Web Share API not supported in this browser/context. Providing fallback.');
            // Fallback for desktop or unsupported browsers: copy link to clipboard
            // (Note: Clipboard API also requires secure context (HTTPS) or localhost)
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert("Share feature not supported. The link has been copied to your clipboard!");
                console.log('Link copied to clipboard as fallback.');
            } catch (err) {
                // If clipboard API fails (e.g., not secure context, permission issues)
                alert("Share feature not supported. You can manually copy the link: " + window.location.href);
                console.error('Failed to copy link to clipboard:', err);
            }
        }
    });
}