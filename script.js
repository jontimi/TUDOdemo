// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const dimensionsTextElement = document.getElementById("model-dimensions"); // Get the P tag for dimensions
const annotationButton = modelViewer.querySelector('button[slot="hotspot-dimensions"]'); // Get the annotation button

const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button"); 
const qrModal = document.getElementById("qr-modal");       
const closeQrModal = document.getElementById("close-qr-modal"); 
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Feature: Set Annotation Dimensions ---
function setAnnotationDimensions() {
    if (dimensionsTextElement && annotationButton) {
        const dimensions = dimensionsTextElement.textContent;
        annotationButton.setAttribute('data-label', dimensions);
        console.log("Annotation dimensions set to:", dimensions);
    } else {
        console.warn("Could not set annotation dimensions: 'model-dimensions' p tag or annotation button not found.");
    }
}

// Set annotation dimensions when the DOM is loaded
document.addEventListener("DOMContentLoaded", setAnnotationDimensions);
// Also set them when the model loads, in case there's a timing issue
modelViewer.addEventListener("model-load", setAnnotationDimensions);


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