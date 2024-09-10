package com.luiggibeats.carrinho.servico;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.servico.BeatServico;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.carrinho.repositorio.CarrinhoRepositorio;
import com.luiggibeats.favoritos.modelo.Favoritos;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.servico.UsuarioServico;
import com.luiggibeats.util.excecao.BusinessException;

@Service
public class CarrinhoServico {
	
	
	@Autowired
    private CarrinhoRepositorio carrinhoRepositorio;
	
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
	
	public Carrinho addAoCarrinho(Integer guidBeat, Carrinho carrinho) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario user = carrinho.getUsuario();
		Carrinho update = carrinhoRepositorio.findByUsuarioAndBeat(carrinho.getUsuario(), beat);
		if(beat != null && user != null ) {
			if(update == null) {
				Carrinho cart = new Carrinho(beat, user, carrinho.getPrecoBeat());
				return carrinhoRepositorio.save(cart);
			}
			else {
				update.setPrecoBeat(carrinho.getPrecoBeat());
				return carrinhoRepositorio.save(update);
			}
		}
		
		return null;
	}
	
	public String getBeatPrice(Integer guidBeat, Carrinho carrinho) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario user = carrinho.getUsuario();
		Carrinho update = carrinhoRepositorio.findByUsuarioAndBeat(user, beat);
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
	
	public List<Carrinho> getCarrinho(Usuario user){
		return carrinhoRepositorio.findByUsuario(user);
	}
	
	public void deletar(Integer guidCarrinho) throws BusinessException {
        this.carrinhoRepositorio.deleteById(guidCarrinho);
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
