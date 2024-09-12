document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
  
    xhr.onload = function () {
      const message = document.getElementById('message');
      if (xhr.status === 200) {
        message.innerHTML = '<div class="alert alert-success">File uploaded successfully!</div>';
      } else {
        message.innerHTML = '<div class="alert alert-danger">File upload failed.</div>';
      }
    };
  
    xhr.send(formData);
  });
  