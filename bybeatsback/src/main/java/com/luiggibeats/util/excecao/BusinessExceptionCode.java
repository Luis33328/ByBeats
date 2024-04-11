package com.luiggibeats.util.excecao;

public enum BusinessExceptionCode {

	CREDENCIAL_INVALIDA("Credenciais inválidas (USERNAME, PASSWORD)"),
	ARGUMENTO_INVALIDO("Argumento inválido"),
	ERRO_INDEFINIDO("Erro indefinido"),
	ERRO_HOST("Não foi possível obter o nome do host"),
	RG_OBRIGATORIO( "Rg obrigatório"),
	CPF_OBRIGATORIO("Cpf obrigatório"),
	DATA_NASCIMENTO_OBRIGATORIO("Data de Nascimento obrigatório"),
	CNPJ_OBRIGATORIO( "Cnpj obrigatório"),
	RAZAO_SOCIAL_OBRIGATORIO("Razão Social obrigatório"),
	NOME_FANTASIA_OBRIGATORIO("Nome Fantasia obrigatório"),
	DATA_ABERTURA_OBRIGATORIO("Data de Abertura obrigatório"),
	CLIENTE_NAO_ENCONTRADO("Cliente não encontrado"),
	MODELO_OBRIGATORIO("Modelo obrigatorio"),
	ESTADO_NAO_ENCONTRADO("UF não encontrado"),
	MUNICIPIO_NAO_ENCONTRADO("Município não encontrado"),
	MEDICOES_TANQUE_NAO_ENCONTRADO("Medicoes tanque nao encontrado"),
	VOLUME_MEDICAO_OBRIGATORIO("Volume de medição obrigatório"),
	CNH_OBRIGATORIO( "CNH Obrigatória"),
	MOTORISTA_OBRIGATORIO( "MOTORISTA Obrigatório"),
	DATA_VENCIMENTO_OBRIGATORIO( "Data de Vencimento Obrigatória"),
	PLACA_OBRIGATORIO("Placa Obrigatória"),
	HODOMETRO_OBRIGATORIO("Hodomêtro Obrigatório"),
	PRODUTO_NAO_ENCONTRADO("Produto não encontrado"),
	CODIGO_OBRIGATORIO("Código obrigatório"),
	DESCRICAO_OBRIGATORIO("Descrição obrigatório"),
	UNIDADE_MEDIDA_OBRIGATORIO("Unidade de medida obrigatório"),
	VALOR_UNITARIO_OBRIGATORIO("Valor unitário obrigatório"),
	FORNECEDOR_OBRIGATORIO("Fornecedor obrigatório"),
	SALDO_INICIAL_OBRIGATORIO("Saldo inicial obrigatório"),
	POSSUI_CAIXA_ABERTO(" Já possui um caixa aberto"),
	CAIXA_OBRIGATORIO("Caixa obrigatório"),
	CAIXA_NAO_EXISTENTE("Caixa não existente"),
	USUARIO_NAO_ENCONTRADO("Usuário não encontrado"),
	
	
	BEAT_NAO_ENCONTRADO("Beat não encontrado"),
	TITULO_OBRIGATORIO("Título obrigatório."),
	IMAGEM_OBRIGATORIO("Imagem obrigatória."),
	WAV_UNTAGGED_OBRIGATORIO("Arquivo wav sem tag obrigaório."),
	
	LOGIN_OBRIGATORIO( "Login Obrigatório"),
	SENHA_OBRIGATORIO( "Senha Obrigatória"),
	EMAIL_OBRIGATORIO( "Email Obrigatório"),
	
	NOME_OBRIGATORIO( "Nome Obrigatório"),
	PORCENTAGEM_OBRIGATORIO( "Porcentagem Obrigatória"),

	SERVICO_NAO_ENCONTRADO("Serviço não encontrado");
	
	private final String message;

	BusinessExceptionCode(final String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

}
