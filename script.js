
const promessa=axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages')
promessa.then(popularMensagens);

function popularMensagens(resposta) {
	console.log(resposta.data);
	mensagens=resposta.data;
	colocarMensagem()
	console.log(mensagens.length)
}

function colocarMensagem(){
	const caixaDeMensagens=document.querySelector(".caixa-de-mensagens");
	caixaDeMensagens.innerHTML+="";
  for(let i=0;i<mensagens.length;i++){
		caixaDeMensagens.innerHTML+=`
		<div class="mensagem status"><strong>${mensagens[i].from}</strong> entra na sala</div>
		
		
		
		
		`
}
}