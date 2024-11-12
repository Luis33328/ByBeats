package com.luiggibeats.pedido.servico;


import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.servico.BeatServico;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.carrinho.repositorio.CarrinhoRepositorio;
import com.luiggibeats.compra.modelo.Compra;
import com.luiggibeats.compra.repositorio.CompraRepositorio;
import com.luiggibeats.favoritos.modelo.Favoritos;
import com.luiggibeats.pedido.modelo.Pedido;
import com.luiggibeats.pedido.repositorio.PedidoRepositorio;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.servico.UsuarioServico;
import com.luiggibeats.util.excecao.BusinessException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Service
public class PedidoServico {
	
	
	@Autowired
    private PedidoRepositorio pedidoRepositorio;
	
	@Autowired
    private BeatServico beatServico;
	
	@Autowired
    private UsuarioServico usuarioServico;
	
	/*public Carrinho addAoCarrinho(Integer guidBeat, String user, String price) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario userGet = usuarioServico.buscarPorId(Integer.parseInt(price));
		if(beat != null && user != null ) {
			Carrinho cart = new Carrinho(beat, userGet, price);
			return carrinhoRepositorio.save(cart);
		}
		
		return null;
	}*/
	
	/*public Compra saveCompra(Integer guidBeat, Compra compra) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario user = compra.getUsuario();
		if(beat != null && user != null ) {
			Compra compraSave = new Compra(beat, user, compra.getLicenca());
			return compraRepositorio.save(compraSave);

		}
		
		return null;
	}*/
	
	public Pedido save(Pedido pedido) {
        LocalDate localDate = LocalDate.now();
        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        
        pedido.setDataPedido(date);
        
        return pedidoRepositorio.save(pedido);
    }

	
	public List<Pedido> getPedido(Usuario user){
		return pedidoRepositorio.findByUsuario(user);
	}
	
	public void deletar(Integer guidCompra) throws BusinessException {
        this.pedidoRepositorio.deleteById(guidCompra);
    }
	
	/*public Carrinho atualizar(Carrinho carrinho) {
		Carrinho update = carrinhoRepositorio.findByUsuarioAndBeat(carrinho.getUsuario(), carrinho.getBeat());
        return this.addAoCarrinho(carrinho.getBeat().getGuidBeat(), update);
    }*/

    /*

    public List<Carrinho> listar() throws BusinessException {
        return this.carrinhoRepositorio.findAll();
    }

    public Page<Carrinho> listarPage(Pageable pageable) throws Exception {
        return this.carrinhoRepositorio.findAll(pageable);
    }

    public Carrinho buscarPorId(Integer id) throws BusinessException {
        return this.carrinhoRepositorio.findById(id)
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.SERVICO_NAO_ENCONTRADO));
    }

    public Carrinho atualizar(Carrinho desconto) throws BusinessException {
        return this.salvar(desconto);
    }

    public void deletar(Integer id) throws BusinessException {
        this.carrinhoRepositorio.deleteById(id);
    }

    public Carrinho salvar(Carrinho desconto) throws BusinessException {




        return this.carrinhoRepositorio.save(desconto);
    }*/

}
