package com.luiggibeats.favoritos.servico;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.servico.BeatServico;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.carrinho.repositorio.CarrinhoRepositorio;
import com.luiggibeats.favoritos.modelo.Favoritos;
import com.luiggibeats.favoritos.repositorio.FavoritosRepositorio;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.servico.UsuarioServico;
import com.luiggibeats.util.excecao.BusinessException;

@Service
public class FavoritosServico {
	
	
	@Autowired
    private FavoritosRepositorio favoritosRepositorio;
	
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
	
	public Favoritos addAosFavoritos(Integer guidBeat, Favoritos favoritos) {
		Beat beat = beatServico.buscarPorId(guidBeat);
		Usuario user = favoritos.getUsuario();
		Favoritos update = favoritosRepositorio.findByUsuarioAndBeat(favoritos.getUsuario(), beat);
		if(beat != null && user != null ) {
			if(update == null) {
				Favoritos favorito = new Favoritos(beat, user);
				return favoritosRepositorio.save(favorito);
			}
		}
		
		return null;
	}
	
	
	public List<Favoritos> getFavoritos(Usuario user){
		return favoritosRepositorio.findByUsuario(user);
	}
	
	public Favoritos checkFavorito(Integer guidBeat, Favoritos favoritos){
		Beat beat = beatServico.buscarPorId(guidBeat);
		return favoritosRepositorio.findByUsuarioAndBeat(favoritos.getUsuario(), beat);
	}
	
	public void deletar(Integer guidBeat, Favoritos favoritos) throws BusinessException {
		Beat beat = beatServico.buscarPorId(guidBeat);
		System.out.println(beat);
        this.favoritosRepositorio.deleteByUsuarioAndBeat(favoritos.getUsuario(), beat);
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
