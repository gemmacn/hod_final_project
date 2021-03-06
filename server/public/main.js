$('.message a').click(function () {
  $('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
})
console.log('Welcome to harbingers of Devastation')
$('.register-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value.toLowerCase(),
    password: e.target[1].value,
    email: e.target[2].value
  }
  const url = '/api_register'
  const method = 'POST'
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      window.location.reload()
    }, response => {
      toastr['error']('Error al crear el usuario, es posible que el usuario ya exista.')
    })
})

$('.login-form').on('submit', function (e) {
  e.preventDefault()
  const data = {
    username: e.target[0].value.toLowerCase(),
    password: e.target[1].value
  }
  const url = '/api_login'
  const method = 'POST'
  $.ajax({ url, method, data })
    .then(response => {
      toastr['success'](response.msg)
      window.location.pathname = '/'
    }, response => {
      toastr['error']('El usuario o la contraseña son incorrectos.')
    })
  })

  $('.imageUpload').on('submit', function (e) {
    e.preventDefault()
    const id = $(this).data('id')
    let data = new FormData()
    let file = e.target[0].files[0]
    // add the files to formData object for the data payload
    data.append('file', file)
    const url = `/user/${id}/modify/avatar`
    axios.post(url, data)
      .then(response => {
        toastr['success']('Avatar modificado correctamente')
        window.location.reload()
      }, response => {
        toastr['error']('Ha habido un problema al actualizar su avatar, intentelo de nuevo más tarde.')
      })
  })

    $('.userDataModify').on('submit', function (e) {
      e.preventDefault()
      const id = $(this).data('id')
      const data = {
        name: e.target[0].value,
        description: e.target[1].value,
        website: e.target[2].value
      }
      const url = `/user/${id}/modify/data`
      const method = 'POST'
      $.ajax({ url, method, data })
        .then(response => {
          toastr['success'](response.msg)
          window.location.reload()
        }, response => {
          toastr['error']('Ha habido un problema al actualizar su información, es posible que el usuario ya esté en uso..')
        })
      })
  $('#file').change(function () {
    var filepath = this.value
    var m = filepath.match(/([^\/\\]+)$/)
    var filename = m[1]
    $('#file-upload-label').text(filename)
  })
