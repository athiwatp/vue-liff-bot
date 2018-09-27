window.onload = function(e) {
  document.getElementById('send').addEventListener('click', function() {
    console.log('hello!!');
    var ms = document.getElementById('message').value;
    liff
      .sendMessages([
        {
          type: 'text',
          text: ms
        },
        {
          type: 'sticker',
          packageId: '2',
          stickerId: '144'
        }
      ])
      .then(function() {
        window.alert('送信完了');
      })
      .catch(function(error) {
        window.alert('Error sending message: ' + error);
      });
  });
};
