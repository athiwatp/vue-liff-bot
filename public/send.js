window.onload = function(e) {
  document.getElementById('send').addEventListener('click', function() {
    var ms = document.getElementById('message').value;
    liff
      .sendMessages([
        {
          type: 'text',
          text: ms
        }
      ])
      .then(function() {
        window.alert('送信完了');
        liff.closeWindow();
      })
      .catch(function(error) {
        window.alert('Error sending message: ' + error);
      });
  });
};
