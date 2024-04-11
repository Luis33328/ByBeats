package com.luiggibeats.desconto.servico;


import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.luiggibeats.desconto.modelo.Desconto;
import com.luiggibeats.desconto.repositorio.DescontoRepositorio;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.excecao.BusinessExceptionCode;

@Service
public class DescontoServico {

    @Autowired
    private DescontoRepositorio descontoRepositorio;

    public List<Desconto> listar() throws BusinessException {
        return this.descontoRepositorio.findAll();
    }

    public Page<Desconto> listarPage(Pageable pageable) throws Exception {
        return this.descontoRepositorio.findAll(pageable);
    }

    public Desconto buscarPorId(Integer id) throws BusinessException {
        return this.descontoRepositorio.findById(id)
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.SERVICO_NAO_ENCONTRADO));
    }

    public Desconto atualizar(Desconto desconto) throws BusinessException {
        return this.salvar(desconto);
    }

    public void deletar(Integer id) throws BusinessException {
        this.descontoRepositorio.deleteById(id);
    }

    public Desconto salvar(Desconto desconto) throws BusinessException {

	    	if (StringUtils.isEmpty(desconto.getNome())) {
	            throw new BusinessException(BusinessExceptionCode.NOME_OBRIGATORIO);
	        }
            if (StringUtils.isEmpty(desconto.getPorcentagem())) {
                throw new BusinessException(BusinessExceptionCode.PORCENTAGEM_OBRIGATORIO);
            }




        return this.descontoRepositorio.save(desconto);
    }

}
