package com.luiggibeats.usuario.servico;


import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.luiggibeats.seguranca.servico.EmailServico;
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

    public Usuario envioEmailOTP(Usuario usuario) throws BusinessException {
        Random rand = new Random();
        int num = rand.nextInt(90000) + 10000;
        usuario.setOtp(num);
        String body = "<!DOCTYPE html>\n" +
                        "<html>\n" +
                        "<head>\n" +
                        "    <style>\n" +
                        "        body {\n" +
                        "            color: black;\n" +
                        "            background-color: #f0f0f0;\n" +
                        "            font-family: Arial, sans-serif;\n" +
                        "        }\n" +
                        "        .container {\n" +
                        "            margin: 0 auto;\n" +
                        "            width: 80%;\n" +
                        "            padding: 20px;\n" +
                        "            background-color: white;\n" +
                        "            border-radius: 5px;\n" +
                        "        }\n" +
                        "        .code {\n" +
                        "            color: red;\n" +
                        "            font-weight: bold;\n" +
                        "        }\n" +
                        "        .footer {\n" +
                        "            color: grey;\n" +
                        "            font-size: 0.8em;\n" +
                        "        }\n" +
                        "    </style>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "    <div class=\"container\">\n" +
                        "        <h2>Alteração de senha</h2>\n" +
                        "        <p>\n" +
                        usuario.getLogin() +", Você solicitou uma alteração de senha. Utilize o seguinte código para alterar sua senha:\n" +
                        "        </p>\n" +
                        "        <p class=\"code\">\n" +
                                    num + "\n" +
                        "        </p>\n" +
                        "        <p>\n" +
                        "            Se você não solicitou a alteração de senha, por favor ignore esse email.\n" +
                        "        </p>\n" +
                        "        <p class=\"footer\">\n" +
                        "            Com atenção, <br>\n" +
                        "            ByBeats\n" +
                        "        </p>\n" +
                        "    </div>\n" +
                        "</body>\n" +
                        "</html>";
        EmailServico emailServico = new EmailServico();
        emailServico.sendEmail(usuario.getEmail(), "Recuperação de senha",body);
        return this.usuarioRepositorio.save(usuario);
    }

}
