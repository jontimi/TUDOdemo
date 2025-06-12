// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const dimensionsText = document.getElementById("model-dimensions");
const resetButton = document.getElementById("reset-view-button");
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Feature: Display Dimensions ---
function updateDimensions() {
    // Check if modelViewer and its model are loaded
    if (modelViewer && modelViewer.model && modelViewer.model.boundingBox) {
        const bbox = modelViewer.model.boundingBox.size;
        // Format dimensions to two decimal places and add 'm' for meters
        const length = bbox.x.toFixed(2);
        const height = bbox.y.toFixed(2);
        const depth = bbox.z.toFixed(2);
        dimensionsText.textContent = `Dimensions: L ${length}m x H ${height}m x D ${depth}m`;
    } else {
        dimensionsText.textContent = "Dimensions: Loading...";
    }
}

// Listen for the model to load to get its dimensions
modelViewer.addEventListener("model-load", updateDimensions);

// --- Feature: Reset 3D View ---
if (resetButton) {
    resetButton.addEventListener("click", () => {
        // This sets the camera orbit to a default "front-ish" view.
        // The 'auto' for the last value calculates the distance automatically.
        modelViewer.cameraOrbit = "0deg 75deg auto"; 
        modelViewer.fieldOfView = "40deg"; // Resets any zoom level
    });
}

// --- Feature: QR Code Link ---
function generateQRCode() {
    // The QR code should link to the current page URL, as model-viewer handles AR activation from the page
    const pageUrl = window.location.href;

    if (pageUrl && typeof QRious !== 'undefined' && qrCodeImage) {
        try {
            const qr = new QRious({
                element: qrCodeImage, // Direct element to render into
                value: pageUrl,
                size: 100, // Size of the QR code image
                level: 'H' // Error correction level (High)
            });
            qrCodeImage.style.display = 'block'; // Show the image once generated
            qrCodeLink.href = pageUrl; // Make the link clickable
        } catch (error) {
            console.error("Error generating QR code:", error);
            qrCodeImage.style.display = 'none'; // Hide if generation fails
        }
    } else {
        qrCodeImage.style.display = 'none'; // Ensure hidden if QRious is not loaded or no URL
    }
}

// Generate QR code when model loads or page is ready
modelViewer.addEventListener("model-load", generateQRCode);
// Also try to generate on initial load in case model is cached (for DOMContentLoaded)
document.addEventListener("DOMContentLoaded", generateQRCode);