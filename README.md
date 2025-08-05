# Simple 3D AR Webpage Addon Template

https://jontimi.github.io/TUDOdemo/

This repository provides a basic template for embedding a single 3D model with Augmented Reality (AR) capabilities onto a webpage. It's designed to be a simple, copy-paste solution for product pages.

## Usage for Clients:

1.  **Host your `.glb` model and a `poster.png` preview image.**
2.  **Include the `model-viewer` script tag once** in your website's main HTML template (e.g., in the `<head>` or before `</body>`).
    ```html
    <script type="module" src="[https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js](https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js)"></script>
    ```
3.  **Add the provided CSS** to your website's custom CSS.
4.  **Copy the `<div class="product-3d-viewer-container">...</div>` block** for each product page, replacing `src` and `poster` attributes with your specific model and image URLs.

## Included Files:

* `index.html`: Demonstrates a single `model-viewer` embed.
* `style.css`: Basic styling for the viewer.
* `models/cube.glb`: A placeholder 3D model (you'll replace this with your client's models).
* `poster.png`: A placeholder image (you'll replace this with your client's product images).
