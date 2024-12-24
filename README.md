<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Video Downloader</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        input, button {
            margin: 10px 0;
            padding: 10px;
            font-size: 16px;
        }
    </style>
</head>
<body>

    <h1>YouTube Video Downloader</h1>
    <p>Enter the YouTube video URL below to download:</p>
    
    <input type="text" id="url" placeholder="Enter YouTube URL" />
    <button id="downloadButton">Download Video</button>
    
    <div id="downloadLink" style="display: none;">
        <a id="videoDownloadLink" href="#" download>Download Video</a>
    </div>

    <script>
        document.getElementById('downloadButton').addEventListener('click', function() {
            const url = document.getElementById('url').value;

            if (!url) {
                alert('Please enter a valid YouTube URL');
                return;
            }

            // Send URL to backend for processing
            fetch('http://localhost:3000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const downloadLink = document.getElementById('videoDownloadLink');
                    downloadLink.href = data.videoUrl; // Video URL provided by backend
                    document.getElementById('downloadLink').style.display = 'block';
                } else {
                    alert('Error: ' + (data.message || 'Something went wrong'));
                }
            })
            .catch(error => {
                alert('Error: ' + error.message);
            });
        });
    </script>

</body>
</html>
