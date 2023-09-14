function login()
{
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const loginData = {
        email,
        password,
    };
    localStorage.setItem("loginData", JSON.stringify(loginData));
    console.log(loginData);

    // Basic email format validation
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if password is not empty
    if (password === "") {
        alert("Password cannot be empty.");
        return;
    }
    console.log("Login successful!");
}

function signup() 
{
    const firstName = document.getElementById("signup-firstname").value;
    const lastName = document.getElementById("signup-lastname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const address = document.getElementById("signup-address").value;
    const phone = document.getElementById("signup-phone").value;
    const imageDataURL = document.getElementById("signup-image").value;
    const liveImageURL = document.getElementById("captured-image").value; 

    const signupData = {
        firstName,
        lastName,
        email,
        password,
        address,
        phone,
        imageDataURL,
        liveImageURL 
    };
    console.log(signupData);
    console.log(signupData.liveImageURL );
    
    localStorage.setItem("signupData", JSON.stringify(signupData));
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if password is not empty
    if (password === "") {
        alert("Password cannot be empty.");
        return;
    }
    alert("Signup successful!");
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function togglePasswordVisibility(inputId)
{
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(`show-${inputId}`);
    if (passwordInput.type === "password")
    {
        passwordInput.type = "text";        
        passwordIcon.textContent = "👁️";    
    } 
    else 
    {
        passwordInput.type = "password";
        passwordIcon.textContent = "👁️";
    }
}

let videoStream = null;

// Open camera and show live feed in an iframe
function openCamera() {
    const openCameraBtn = document.getElementById("open-camera-btn");
    const cameraFeed = document.getElementById("camera-feed");
    const captureImageBtn = document.getElementById("capture-image-btn");

    openCameraBtn.style.display = "none"; // Hide the "Open Camera" button

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoStream = stream;

            // Show the camera feed in the iframe
            cameraFeed.srcObject = stream; // Set the source object of the iframe
            cameraFeed.style.display = "block"; // Make the iframe visible

            // Show the capture button
            captureImageBtn.style.display = "block";
        })
        .catch((error) => {
            console.error("Error accessing camera:", error);
        });
}


// Capture an image from the live feed
function captureImage() {
    const capturedImage = document.getElementById("captured-image");

    if (videoStream) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const videoElement = document.createElement("video");

        // Set the video element to the live feed
        videoElement.srcObject = videoStream;

        videoElement.onloadedmetadata = function () {
            // Wait for the video to be loaded and start playing
            videoElement.play().then(() => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Display the captured image
                capturedImage.src = canvas.toDataURL("image/png");
                capturedImage.style.display = "block";
                // Stop the video stream
                videoStream.getTracks().forEach((track) => track.stop());

                // Hide the iframe and capture button
                const cameraFeed = document.getElementById("camera-feed");
                const captureImageBtn = document.getElementById("capture-image-btn");
                cameraFeed.style.display = "none";
                captureImageBtn.style.display = "none";
            });
        };
    }
}
