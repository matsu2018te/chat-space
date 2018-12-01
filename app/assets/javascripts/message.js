$(function(){

  function buildHTML(message){
    var insertImage = (message.image)? `<img class="lower-message__image" src="${message.image}">` : "";
    var massage_html = `
        <div class="message">
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
            ${insertImage}
            </div>

          </div>
        </div>
        `
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
      var message_html = buildHTML(message_data);
      $('.messages').append(message_html)
    })
    .fail(function(){
      alert('error');
    })
  })
});
