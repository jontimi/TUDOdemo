// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const dimensionsText = document.getElementById("model-dimensions");
const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button"); // New AR QR button
const qrModal = document.getElementById("qr-modal");       // New QR modal
const closeQrModal = document.getElementById("close-qr-modal"); // New close button
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Feature: Display Dimensions ---
function updateDimensions() {
    if (modelViewer && modelViewer.model && modelViewer.model.boundingBox) {
        const bbox = modelViewer.model.boundingBox.size;
        const length = bbox.x.toFixed(2); // Length/Width
        const height = bbox.y.toFixed(2); // Height
        const depth = bbox.z.toFixed(2); // Depth
        dimensionsText.textContent = `Dimensions: L ${length}m x H ${height}m x D ${depth}m`;
        // Console log for debugging dimensions
        console.log("Model dimensions loaded:", {length, height, depth});
    } else {
        dimensionsText.textContent = "Dimensions: Loading...";
        console.log("Model or bounding box not yet available for dimensions.");
    }
}

// Listen for the model to load to get its dimensions
modelViewer.addEventListener("model-load", updateDimensions);
// Initial call in case model is already loaded (e.g., from cache)
// Also ensures "Loading..." is displayed until update
updateDimensions();

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
            qrCodeImage.style.display = 'block'; // Ensure image is visible in the modal
            qrCodeLink.href = pageUrl; // Make the link clickable
            console.log("QR Code generated for:", pageUrl);
        } catch (error) {
            console.error("Error generating QR code:", error);
            qrCodeImage.style.display = 'none'; // Hide if generation fails
        }
    } else {
        qrCodeImage.style.display = 'none';
        console.log("QR code generation skipped: URL or QRious library not ready.");
    }
}

// Event listener for the "AR QR" button to show the modal
if (arQrButton) {
    arQrButton.addEventListener("click", () => {
        qrModal.style.display = "flex"; // Use flex to center content
        generateQRCode(); // Generate/regenerate QR when modal is opened (ensure it's current)
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
// This ensures the QR is ready even if the button is pressed quickly.
modelViewer.addEventListener("model-load", generateQRCode);
// Also try to generate on initial DOM content load for robustness
document.addEventListener("DOMContentLoaded", generateQRCode);