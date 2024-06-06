package com.luiggibeats.usuario.recurso;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.usuario.servico.UsuarioServico;
import com.luiggibeats.util.base.BaseController;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.filtro.FiltroGenerico;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(value = "/private/luiggibeats/usuario")
public class UsuarioRecurso extends BaseController {

    @Autowired
    private UsuarioServico usuarioServico;

    @Operation(description = "Endpoint para buscar usuario por ID")
    @GetMapping(value = "/buscarPorId/{id}", produces = "application/json")
    public Usuario buscarPorId(@PathVariable(name = "id") Integer id) throws BusinessException {
        return this.usuarioServico.buscarPorId(id);
    }

    @Operation(description = "Endpoint para buscar usuario por username")
    @GetMapping(value = "/buscarPorUsername", produces = "application/json")
    public Usuario buscarPorUsername(Principal principal) throws BusinessException {
        return this.usuarioServico.buscarPorUsername(principal.getName());
    }
    
    @Operation(description = "Endpoint para buscar usuario por email")
    @GetMapping(value = "/buscarPorEmail/{email}", produces = "application/json")
    public Usuario buscarPorEmail(@PathVariable(name = "email")String email) throws BusinessException {
        return this.usuarioServico.buscarPorEmail(email);
    }

    @Operation(description = "Endpoint para listar todos usuarios")
    @GetMapping(value = "/listar", produces = "application/json")
    public List<Usuario> listar() throws BusinessException {
        return this.usuarioServico.listar();
    }

    @Operation(description = "Endpoint para salvar um usuario")
    @PostMapping(value = "/salvar", produces = "application/json")
    public Usuario salvar(@RequestBody Usuario usuario) throws BusinessException {
        return this.usuarioServico.salvar(usuario);
    }
    
    @Operation(description = "Endpoint para editar um usuario")
    @PostMapping(value = "/editar", produces = "application/json")
    public Usuario editar(@RequestBody Usuario usuario) throws BusinessException {
        return this.usuarioServico.editar(usuario);
    }

    @Operation(description = "Endpoint para atualizar um usuario")
    @PutMapping(value = "/atualizar", produces = "application/json")
    public Usuario atualizar(@RequestBody Usuario usuario) throws BusinessException {
        return this.usuarioServico.atualizar(usuario);
    }
    
    @Operation(description = "Endpoint para atualizar a OTP do usuário e enviar e-mail")
    @PutMapping(value = "/atualizarOTP", produces = "application/json")
    public Usuario atualizarOTP(@RequestBody Usuario usuario) throws BusinessException {
        return this.usuarioServico.envioEmailOTP(usuario);
    }

    @Operation(description = "Endpoint para deletar um usuario")
    @DeleteMapping(value = "/deletar/{id}", produces = "application/json")
    public void deletar(@PathVariable(name = "id") Integer id) throws BusinessException {
        this.usuarioServico.deletar(id);
    }

}
