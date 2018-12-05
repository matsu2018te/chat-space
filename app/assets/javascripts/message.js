 $(document).on('turbolinks:load', function() {
  function buildHTML(message){

    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : '';
    var massage_html = `
    <div class="message" data-message-id = "${message.id}">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.name}
    </div>
    <div class="upper-message__date">
    ${message.created_at}
    </div>
    </div>
    <div class="lower-meesage">
    ${message.content}
    </div>
    ${image}
    </div>
    </div>`;
    return massage_html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    .done(function(message_data){
      if (message_data.length !== 0){
        var message_html = buildHTML(message_data);
        $('.messages').append(message_html);
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},"fast");
      }
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  })

  // $(function () {
  //   var interval = setInterval(function(){
  //     if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  //       var last_message_id = $('.message').last().data('message-id');

  //       $.ajax({
  //         url: location.href,
  //         type: 'GET',
  //         data: { id: last_message_id },
  //         dataType: 'json'
  //       })

  //       .done(function(messages) {
  //         if (messages.length !== 0 ){
  //           messages.forEach(function(messages) {
  //             var insertHTML = buildHTML(messages);
  //             $('.messages').append(insertHTML);
  //           });
  //           $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},"first");
  //         }
  //       })
  //       .fail(function(messages) {
  //         alert('Automatic update failed');
  //       });
  //     } else {
  //       clearInterval(interval);
  //     }
  //   } , 3000);
  // });
});
