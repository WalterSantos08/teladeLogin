document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        });

        const data = await response.json();

        if (response.ok) {
            // Salvar dados no localStorage (simulando persistência)
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            alert(data.message); // Sucesso
        } else {
            alert(data.error); // Exibe o erro do servidor
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
});
