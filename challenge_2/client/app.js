var postData = (data) => {
  $.ajax({
    url: 'http://127.0.0.1:3000/',
    type: 'POST',
    data: data,
    cache: false,
    processData: false,
    contentType: false
  }).done((response) => {
    $('.fileUpload').append(response);
  });
};

$('form').on('submit', (e) => {
  e.preventDefault();
  let data = new FormData();
  let file = $('input')[0].files[0];
  console.log(file);

  data.set('jsonData', file);

  postData(data);
});
