perguntarNome()
//colocar o nome e entrar na sala
function perguntarNome() {
	const nome = { name: prompt("Qual seu nome?") };
	console.log(nome)
	const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants', nome);

	requisicao.then(tratarSucesso);
	requisicao.catch(tratarError);
	function tratarSucesso() {
		alert("Você entrou com sucesso")
	}
	function tratarError(erro) {
		if (erro.response.status == 400) {
			alert('O nome de usuário escolhido já está sendo utilizado, por favor digite um nome diferente')
			perguntarNome()
		}
	}
}

chamarAxios();
setInterval(chamarAxios, 3000);

function chamarAxios() {
	const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')
	promessa.then(popularMensagens);
}
//funçao que é chamada após receber a resposta do servidor
function popularMensagens(resposta) {
	console.log(resposta.data);
	mensagens = resposta.data;
	colocarMensagem()
	console.log(mensagens.length)
}
//função que vai colocar as mensagens no HTML
function colocarMensagem() {
	const caixaDeMensagens = document.querySelector(".caixa-de-mensagens");
	caixaDeMensagens.innerHTML = "";
	for (let i = 0; i < mensagens.length; i++) {
		if (mensagens[i].type == 'status') {
			caixaDeMensagens.innerHTML += `
		<div class="mensagem status"><strong>${mensagens[i].from}</strong> ${mensagens[i].text}</div>`
		}
		else if (mensagens[i].type == 'message') {
			caixaDeMensagens.innerHTML += `
		 <div class="mensagem normal"><strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> : ${mensagens[i].text}</div>`
		}
		else if (mensagens[i].type == 'private_message') {
			caixaDeMensagens.innerHTML += `
		<div class="mensagem reservada"><strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</div>`
		}
	} window.scrollTo(0, document.body.scrollHeight);
}

