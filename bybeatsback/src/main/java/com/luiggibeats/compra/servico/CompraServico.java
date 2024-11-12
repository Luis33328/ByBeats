package com.luiggibeats.compra.servico;


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
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.servico.UsuarioServico;
import com.luiggibeats.util.excecao.BusinessException;

@Service
public class CompraServico {
	
	
	@Autowired
    private CompraRepositorio compraRepositorio;
	
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
	
	public Compra saveCompra(List<Compra> compras) {
		
		
		Compra[] comprasA = compras.toArray(new Compra[0]);
		
		for(int i=0; i<compras.size(); i++) {
			Beat beat = comprasA[i].getBeat();
			Usuario user = comprasA[i].getUsuario();
			Pedido pedido = comprasA[i].getPedido();
			System.out.println(beat);
			System.out.println(user);
			System.out.println(pedido);
			if(beat != null && user != null ) {
				Compra compraSave = new Compra(beat, user, comprasA[i].getLicenca(), pedido);
				return compraRepositorio.save(compraSave);
	
			}
		}
		
		return null;
	}
	
	public String getBeatPrice(Integer guidBeat, Carrinho carrinho) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario user = carrinho.getUsuario();
		Carrinho update = compraRepositorio.findByUsuarioAndBeat(user, beat);
		if(beat != null && user != null ) {
			if(update == null) {
				System.out.println("oieee");
				return null;
			}
			else {
				return update.getPrecoBeat();
			}
		}
		
		return null;
	}
	
	public List<Compra> getCompra(Usuario user){
		return compraRepositorio.findByUsuario(user);
	}
	
	public void deletar(Integer guidCompra) throws BusinessException {
        this.compraRepositorio.deleteById(guidCompra);
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
