package com.luiggibeats.usuario.servico;


import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.repositorio.UsuarioRepositorio;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.excecao.BusinessExceptionCode;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> listar() throws BusinessException {
        return this.usuarioRepositorio.findAll();
    }

    public Usuario buscarPorUsername(String username) throws BusinessException {
        Optional<Usuario> usuarioSearch = this.usuarioRepositorio.findByLogin(username);
        return usuarioSearch.orElseThrow(() -> new BusinessException(BusinessExceptionCode.USUARIO_NAO_ENCONTRADO));
    }

    public Page<Usuario> listarPage(Pageable pageable) throws Exception {
        return this.usuarioRepositorio.findAll(pageable);
    }

    public Usuario buscarPorId(Integer id) throws BusinessException {
        return this.usuarioRepositorio.findById(id)
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.USUARIO_NAO_ENCONTRADO));
    }

    public Usuario atualizar(Usuario usuario) throws BusinessException {
        return this.salvar(usuario);
    }

    public void deletar(Integer id) throws BusinessException {
        this.usuarioRepositorio.deleteById(id);
    }

    public Usuario salvar(Usuario usuario) throws BusinessException {
    	
    	
    	if (StringUtils.isEmpty(usuario.getLogin())) {
            throw new BusinessException(BusinessExceptionCode.LOGIN_OBRIGATORIO);
        }
        if (StringUtils.isEmpty(usuario.getSenha())) {
            throw new BusinessException(BusinessExceptionCode.SENHA_OBRIGATORIO);
        }
        if (StringUtils.isEmpty(usuario.getEmail())) {
            throw new BusinessException(BusinessExceptionCode.EMAIL_OBRIGATORIO);
        }
        //usuario.setEmail(usuario.getLogin());
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuario.setRole("user");
        
        return this.usuarioRepositorio.save(usuario);
    }

}
