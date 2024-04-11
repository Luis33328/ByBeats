package com.luiggibeats.carrinho.recurso;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.carrinho.servico.CarrinhoServico;
import com.luiggibeats.desconto.modelo.Desconto;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.util.base.BaseController;
import com.luiggibeats.util.excecao.BusinessException;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(value = "/private/luiggibeats/carrinho")
public class CarrinhoRecurso extends BaseController {

	
	@Autowired
    private CarrinhoServico carrinhoServico;
	
	
    @PostMapping(value = "/addCarrinho/{guidBeat}")
    public Carrinho addAoCarrinho(@PathVariable(name = "guidBeat") Integer guidBeat,@RequestBody Carrinho carrinho) {
    	return carrinhoServico.addAoCarrinho(guidBeat, carrinho);
    }
    
    @PostMapping(value = "/getCarrinho")
    public List<Carrinho> getCarrinho(@RequestBody Usuario user) {
    	return carrinhoServico.getCarrinho(user);
    }
    
    @PostMapping(value = "/getBeatPrice/{guidBeat}")
    public String getBeatPrice(@PathVariable(name = "guidBeat") Integer guidBeat,@RequestBody Carrinho carrinho) {
    	return carrinhoServico.getBeatPrice(guidBeat, carrinho);
    }
    
    

    
	
    /*@Autowired
    private DescontoServico descontoServico;

    @Operation(description = "Endpoint para buscar desconto por ID")
    @GetMapping(value = "/buscarPorId/{id}", produces = "application/json")
    public Desconto buscarPorId(@PathVariable(name = "id") Integer id) throws BusinessException {
        return this.descontoServico.buscarPorId(id);
    }

    @Operation(description = "Endpoint para listar todas os descontos")
    @GetMapping(value = "/listar", produces = "application/json")
    public List<Desconto> listar() throws BusinessException {
        return this.descontoServico.listar();
    }

    @Operation(description = "Endpoint para listar todas os descontos com paginação")
    @PostMapping(value = "/listar/page", produces = "application/json")
    public Page<Desconto> listarPage(@RequestBody FiltroGenerico filtroGenerico) throws Exception {
        return this.descontoServico.listarPage(PageRequest.of(
                filtroGenerico.getPageIndex()-1,
                filtroGenerico.getPageSize(),
                Sort.Direction.ASC,
                "guidDesconto"));
    }

    @Operation(description = "Endpoint para salvar um desconto")
    @PostMapping(value = "/salvar", produces = "application/json")
    public Desconto salvar(@RequestBody Desconto desconto) throws BusinessException {
        return this.descontoServico.salvar(desconto);
    }

    @Operation(description = "Endpoint para atualizar um desconto")
    @PutMapping(value = "/atualizar", produces = "application/json")
    public Desconto atualizar(@RequestBody Desconto desconto) throws BusinessException {
        return this.descontoServico.atualizar(desconto);
    }

    @Operation(description = "Endpoint para deletar um desconto")
    @DeleteMapping(value = "/deletar/{id}", produces = "application/json")
    public void deletar(@PathVariable(name = "id") Integer id) throws BusinessException {
        this.descontoServico.deletar(id);
    }*/

}
