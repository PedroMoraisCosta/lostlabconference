document
  .getElementById('registerForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault() // Evita envio padrão

    // Limpar mensagens de erro
    document
      .querySelectorAll('.error-message')
      .forEach(el => (el.textContent = ''))

    // Obter valores
    const name = document.getElementById('name').value.trim()
    const birth = document.getElementById('birthdate').value
    const email = document.getElementById('email').value.trim()
    const phone = document.getElementById('phone').value.trim()
    const privacy = document.getElementById('privacy').checked
    const submitButton = document.querySelector("button[type='submit']")

    let hasError = false

    // Validação de campos
    if (!name) {
      document.getElementById('error-name').textContent = 'Nome é obrigatório.'
      hasError = true
    }

    if (!birth) {
      document.getElementById('error-birthdate').textContent =
        'Data de nascimento é obrigatória.'
      hasError = true
    }

    if (!validateEmail(email)) {
      document.getElementById('error-email').textContent = 'Email inválido.'
      hasError = true
    }

    if (!validatePhone(phone)) {
      document.getElementById('error-phone').textContent = 'Telefone inválido.'
      hasError = true
    }

    if (!privacy) {
      document.getElementById('error-submit').textContent =
        'Aceite a política de privacidade.'
      hasError = true
    }

    if (hasError) return

    submitButton.disabled = true
    submitButton.innerHTML = 'A gerar código...'

    // Envio de dados para API
    try {
      const response = await fetch(
        'https://magest2api-3bbfb75c6660.herokuapp.com/lostlabcustomers',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, birth })
        }
      )

      if (!response.ok) throw new Error('Erro a gerar código. Tente novamente.')

      //alert("Registo concluído com sucesso!");
      //window.location.href = "codigo.html"; // Redirecionamento
    } catch (error) {
      hasError = true

      //alert(error.message);
      document.getElementById('error-submit').textContent =
        'Erro a submeter dados.'
      submitButton.disabled = false // Reativa o botão em caso de erro
      submitButton.innerHTML = 'Registar' // Restaura o texto original
    }

    if (!hasError) {
      window.location.href = 'codigo.html'
    }
  })

// Função para validar email
function validateEmail (email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Função para validar telefone (com ou sem indicativo)
function validatePhone (phone) {
  const re = /^(\+?\d{1,3})?\s?\d{9,}$/
  return re.test(phone)
}
