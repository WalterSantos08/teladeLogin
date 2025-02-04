document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores de e-mail e senha
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Recupera as credenciais salvas no localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    // Verifica se as credenciais no localStorage correspondem ao que foi digitado
    if (savedEmail === null || savedPassword === null) {
        alert("Não há credenciais salvas. Faça o cadastro primeiro.");
        return;
    }

    if (email === savedEmail && password === savedPassword) {
        alert("Login realizado com sucesso!");
        window.location.href = "https://waltersantosdev.netlify.app/"; // Redireciona para uma nova página
    } else {
        alert("E-mail ou senha incorretos. Tente novamente.");
    }
});
