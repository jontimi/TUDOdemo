// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const dimensionsText = document.getElementById("model-dimensions");
const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button"); 
const qrModal = document.getElementById("qr-modal");       
const closeQrModal = document.getElementById("close-qr-modal"); 
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Feature: Display Dimensions ---
function updateDimensions() {
    console.log("Attempting to update dimensions...");
    if (modelViewer && modelViewer.model) {
        console.log("ModelViewer and model object available.");
        if (modelViewer.model.boundingBox) {
            console.log("Bounding box found! Calculating dimensions.");
            const bbox = modelViewer.model.boundingBox.size;
            
            // Convert from meters (model-viewer default) to millimeters (mm)
            // Round to whole numbers as millimeters are often integers
            // model-viewer typically reports: bbox.x = width, bbox.y = height, bbox.z = depth
            const width = (bbox.x * 1000).toFixed(0); 
            const height = (bbox.y * 1000).toFixed(0);
            const depth = (bbox.z * 1000).toFixed(0);
            
            dimensionsText.textContent = `Dimensions: W ${width}mm x H ${height}mm x D ${depth}mm`;
            
            console.log(`Model dimensions calculated: W ${width}mm x H ${height}mm x D ${depth}mm`);
        } else {
            dimensionsText.textContent = "Dimensions: Bounding box not available yet...";
            console.warn("Model loaded, but boundingBox is not yet available. Retrying shortly...");
            // Retry after a small delay if boundingBox isn't immediately available
            setTimeout(updateDimensions, 200); // Retry after 200ms
        }
    } else {
        dimensionsText.textContent = "Dimensions: Loading...";
        console.log("ModelViewer or model object not available yet.");
    }
}

// Listen for the model to load to get its dimensions
modelViewer.addEventListener("model-load", updateDimensions);
// Initial call on DOMContentLoaded in case model loads very fast or is cached
document.addEventListener("DOMContentLoaded", updateDimensions);


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
modelViewer.addEventListener("model-load", generateQRCode);
// Also try to generate on initial DOM content load for robustness
document.addEventListener("DOMContentLoaded", generateQRCode);