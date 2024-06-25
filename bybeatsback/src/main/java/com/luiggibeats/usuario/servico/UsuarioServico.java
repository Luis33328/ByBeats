package com.luiggibeats.usuario.servico;


import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.luiggibeats.seguranca.servico.EmailServico;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.repositorio.UsuarioRepositorio;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.excecao.BusinessExceptionCode;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private EmailServico emailServico;

    public List<Usuario> listar() throws BusinessException {
        return this.usuarioRepositorio.findAll();
    }

    public Usuario buscarPorUsername(String username) throws BusinessException {
        Optional<Usuario> usuarioSearch = this.usuarioRepositorio.findByLogin(username);
        return usuarioSearch.orElseThrow(() -> new BusinessException(BusinessExceptionCode.USUARIO_NAO_ENCONTRADO));
    }
    
    public Usuario buscarPorEmail(String email) throws BusinessException {
        Optional<Usuario> usuarioSearch = this.usuarioRepositorio.findByEmail(email);
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
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        return this.usuarioRepositorio.save(usuario);
    }
    
    public Usuario editar(Usuario usuario) throws BusinessException {
        return this.usuarioRepositorio.save(usuario);
    }

    public void deletar(Integer id) throws BusinessException {
        this.usuarioRepositorio.deleteById(id);
    }
    
    public Usuario envioEmailOTP(Usuario usuario) throws BusinessException {
        Random rand = new Random();
        int num = rand.nextInt(90000) + 10000;
        usuario.setOtp(num);
        String body =   usuario.getLogin() +", Você solicitou uma alteração de senha. Utilize o seguinte código para alterar sua senha:\n" +
                                    num + "\n" +
                        "            Se você não solicitou a alteração de senha, por favor ignore esse email.\n" +
                        "            Com atenção,\n" +
                        "            ByBeats\n";
        String retorno = emailServico.sendEmail(usuario.getEmail(), "Recuperação de senha",body);
        System.out.println(retorno);
        return this.usuarioRepositorio.save(usuario);
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
