$(document).ready(function() {
  $('.note-edit-container').hide();
  $(".notes-list-container")
  .on('click' , '.note-delete', function(event) {
    $target = $(event.target)
    $.ajax({
      type: 'DELETE',
      url: '/notes',
      data: {
        note_id: $target.parent().parent().parent().attr('data-note-id')
      },
      success: function(response) {
        $target.parent().parent().parent().remove();
      },
      error: function(error) {
        console.log(error);
      }
    })
  });

  $(".notes-list-container")
  .on('click', '.note-edit', function(event) {
    $target = $(event.target);
    $target.parent().parent().hide();
    $target.parent().parent().parent().find('.note-edit-container').show();
  });

  $(".command-container")
  .on('click', '.search-note-button', function(event) {
    $target = $(event.target);
    var substring = $target.parent().find('.search-note-field').val();
    $(".notes-list")
    .children()
    .each(function( index ) {
      if(!$(this).find('.note-content').html().match(substring)){
        $(this).hide();
      }else{
        $(this).show();
      }
    });
  });

  $(".notes-list-container")
  .on('click', '.note-save', function(event) {
    $target = $(event.target);
    var note_body = $target.parent().parent().find(".note-edit-field").val();
    
    $.ajax({
      type: 'PUT',
      url: '/notes',
      data: {
        note_id: $target.parent().parent().parent().attr('data-note-id'),
        note_body: note_body
      },
      success: function(response) {

      },
      error: function(error) {
        console.log(error);
      },
      complete: function(){
        $target.parent().parent().hide();
        $target.parent().parent().parent().find('.note-content').html(note_body);
        $target.parent().parent().parent().find('.note-content-container').show();
      }
    })
  });

  var timer = setInterval(
  function(){
    $.ajax({
      type: 'GET',
      url: '/notes/check',
      success: function(response) {
        $next = $(response).filter('.notes-list');
        $curr = $('.notes-list');
        $curr.children().each(function(index){
          var id = 'li-' + $(this).attr('data-note-id');
          $content = $(this).find(".note-content-container");
          $nxt = $next.find("li#"+id);
          //if not edit mode
          if($content.is(":visible")){
            if($nxt.length){
              if( $(this).html() != $nxt.html())
                $(this).html($nxt.html());              
            }else{
              $(this).remove();
            }
          }
        }); 
        $curr.append($next.children().filter(function(){
          var id = 'li-' + $(this).attr('data-note-id');
          return !$curr.find("li#"+id).length	;
         }));
        
      },
      error: function(error) {
        console.log(error);
      }
    });
  },  
  10000);
})