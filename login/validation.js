const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
  let errors = []

  if (firstname_input) {
    // Si tenim un camp de firstname, estem en el formulari de registre
    errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
  } else {
    // Si no tenim un camp de firstname, estem en el formulari d'inici de sessió
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if (errors.length > 0) {
    // Si hi ha errors, prevenim l'enviament del formulari i mostrem els errors
    e.preventDefault()
    error_message.innerText = errors.join(". ")
  } else {
    // Si no hi ha errors, creem la cookie amb les dades del formulari
    const formData = {
      email: email_input.value
    }

    if (firstname_input) {
      formData.firstname = firstname_input.value  // Només si és un formulari de registre
    }

    // Codifiquem les dades del formulari a format JSON per emmagatzemar-les a la cookie
    const formDataString = JSON.stringify(formData)

    // Guardem les dades com una cookie (per exemple, durant 7 dies)
    document.cookie = `formData=${encodeURIComponent(formDataString)}; path=/; max-age=${60*60*24*7};`

    // Redirigim a la pàgina de "congratulations" després de guardar les dades
    window.location.href = "https://ula406.github.io/massatgesfonoll.beta/congratulations.html"
  }
})

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = []

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

function getLoginFormErrors(email, password) {
  let errors = []

  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})

// Al fitxer validation.js o en una etiqueta <script>
document.getElementById("back-button").addEventListener("click", function() {
  window.history.back(); // Redirigeix a la pàgina anterior
})
