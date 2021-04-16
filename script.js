let pergunta="";
perguntarNome()

//colocar o nome e entrar na sala
function perguntarNome() {
	pergunta=prompt("Qual seu nome?");
	const nome = { name: pergunta };
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

setInterval(manterConexao, 5000);
function manterConexao(){
	const nome = { name: pergunta };
	const requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', nome);

}

chamarAxios();
setInterval(chamarAxios, 3000);

function chamarAxios() {
	const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')
	promessa.then(popularMensagens);
}
//funçao que é chamada após receber a resposta do servidor
function popularMensagens(resposta) {
	
	mensagens = resposta.data;
	colocarMensagem()
	
}
//função que vai colocar as mensagens no HTML
function colocarMensagem() {
	const caixaDeMensagens = document.querySelector(".caixa-de-mensagens");
	caixaDeMensagens.innerHTML = "";
	for (let i = 0; i < mensagens.length; i++) {
		if (mensagens[i].type == 'status') {
			caixaDeMensagens.innerHTML += `
		<div class="mensagem status"><span>(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> ${mensagens[i].text}</div>`
		}
		else if (mensagens[i].type == 'message') {
			caixaDeMensagens.innerHTML += `
		 <div class="mensagem normal"><span>(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> : ${mensagens[i].text}</div>`
		}
		else if (mensagens[i].type == 'private_message' && mensagens[i].to===pergunta) {
			caixaDeMensagens.innerHTML += `
		<div class="mensagem reservada"><span>(${mensagens[i].time})</span> <strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}</div>`
		}
	} window.scrollTo(0, document.body.scrollHeight);
}

function enviarMensagem(){
	const texto=document.querySelector(".campo-de-mensagem");
	console.log(texto);
	console.log(pergunta);
	const msg={
		from: pergunta,
		to: "Todos",
		text: texto.value,
		type: "message" 
	};
	console.log(msg)
	const enviando = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages',msg );
	texto.value="";


	enviando.then(tratarEnvio);
	enviando.catch(tratarFalha);
	
	function tratarEnvio(){
		chamarAxios()
	}
	function tratarFalha(){	
		window.location.reload()		
	}	
}
var inputText = document.querySelector(".campo-de-mensagem");
inputText.addEventListener("keyup", function(event) {
	 if (event.keyCode === 13) {
			event.preventDefault();
			document.querySelector(".botao").click();
	 }
});

pegarUsuarios()
setInterval(pegarUsuarios, 10000)
function pegarUsuarios(){
	const promise=axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants')
	promise.then(colocarUsuario)
}
function colocarUsuario(resposta) {
	usuarios =resposta.data
	console.log(usuarios)
	const caixaDeUsuarios = document.querySelector(".caixa-usuarios");
	caixaDeUsuarios.innerHTML = `
	<div class="opcoes" onclick="marcar(this)">
	<ion-icon name="people"></ion-icon>
	<p>Todos</p>
	<ion-icon name="checkmark" class="check escondido aparecido"></ion-icon>
	</div>`;
	for (let i = 0; i < usuarios.length; i++){
		caixaDeUsuarios.innerHTML+=`
		<div class="opcoes" onclick="marcar(this)" >
		<ion-icon name="person-circle"></ion-icon>
		<p>${usuarios[i].name}</p>
		<ion-icon name="checkmark" class="check escondido"></ion-icon>
	</div>  `
	}
}

function mostrarParticipantes(){
	const telaParticipantes=document.querySelector(".tela-participantes")
	telaParticipantes.classList.remove("escondido")
	const telaSombreada=document.querySelector(".parte-sombreada")
	telaSombreada.classList.remove("escondido")

}

function voltar(){
	const telaParticipantes=document.querySelector(".tela-participantes")
	telaParticipantes.classList.add("escondido")
	const telaSombreada=document.querySelector(".parte-sombreada")
	telaSombreada.classList.add("escondido")
}

function marcar(elemento){
	desmarcarOutras()
	
	const teste=elemento.children[2]
	console.log(teste)
	teste.classList.add("aparecido")
}

function desmarcarOutras(){
	const user = document.querySelector(".tela-participantes .opcoes .aparecido");
	console.log(user)
  if(user!==null){    
    console.log('aaa')
		user.classList.remove('aparecido')
  }
}