package com.luiggibeats.beat.recurso;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.servico.BeatServico;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.util.base.BaseController;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.filtro.FiltroGenerico;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@RequestMapping(value = "/private/luiggibeats/beat")
public class BeatRecurso extends BaseController {

    @Autowired
    private BeatServico beatServico;
    
    @PostMapping(value = "/getMeusBeats")
    public List<Beat> getMeusBeats(@RequestBody Usuario user) {
    	System.out.println(user);
    	return beatServico.getMeusBeats(user);
    }

    @Operation(description = "Endpoint para buscar beat por ID")
    @GetMapping(value = "/buscarPorId/{id}", produces = "application/json")
    public Beat buscarPorId(@PathVariable(name = "id") Integer id) throws BusinessException {
        return this.beatServico.buscarPorId(id);
    }
    
    @Operation(description = "Endpoint para listar todos os beats com data")
    @GetMapping(value = "/listarDate", produces = "application/json")
    public List<Beat> listarDate() throws BusinessException {
        return this.beatServico.listarDate();
    }

    @Operation(description = "Endpoint para listar todos os beats")
    @GetMapping(value = "/listar", produces = "application/json")
    public List<Beat> listar() throws BusinessException {
        return this.beatServico.listar();
    }
    
    @Operation(description = "Endpoint para listar todos os beats descrescentemente")
    @GetMapping(value = "/listarDesc", produces = "application/json")
    public List<Beat> listarDesc() throws BusinessException {
        return this.beatServico.listarDesc();
    }

    @Operation(description = "Endpoint para listar todas os beats com paginação")
    @PostMapping(value = "/listar/page", produces = "application/json")
    public Page<Beat> listarPage(@RequestBody FiltroGenerico filtroGenerico) throws Exception {
        return this.beatServico.listarPage(PageRequest.of(
                filtroGenerico.getPageIndex()-1,
                filtroGenerico.getPageSize(),
                Sort.Direction.ASC,
                "guidBeat"));
    }

    @Operation(description = "Endpoint para salvar um beat")
    @PostMapping(value = "/salvar", produces = "application/json")
    public Beat salvar(@RequestBody Beat beat) throws BusinessException {
    	//this.beatServico.uploadToLocalFileSystem(beat.getImagem());
        return this.beatServico.salvar(beat);
    }

    @Operation(description = "Endpoint para atualizar um beat")
    @PutMapping(value = "/atualizar", produces = "application/json")
    public Beat atualizar(@RequestBody Beat beat) throws BusinessException {
        return this.beatServico.atualizar(beat);
    }

    @Operation(description = "Endpoint para deletar um beat")
    @DeleteMapping(value = "/deletar/{id}", produces = "application/json")
    public void deletar(@PathVariable(name = "id") Integer id) throws BusinessException {
        this.beatServico.deletar(id);
    }
    
    //@PostMapping(value ="/upload")
    @RequestMapping(value = "/upload")
    public ResponseEntity<String> uploadImage( MultipartFile[] files){
    	
    	
    	try {

    	      Arrays.asList(files).stream().forEach(file -> {
    	    		//System.out.println(file.getOriginalFilename());
    	    		this.beatServico.uploadToLocalFileSystem(file);
    	      });

    	    } catch (Exception e) {
    	    	System.out.println("nao deu");

    	    }
    	
    	return ResponseEntity.ok("Ta ok");
    }
    @GetMapping(
            value = "/getImage/{imageName:.+}",
            produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_PNG_VALUE}
    )
    public @ResponseBody byte[] getFileName(@PathVariable(name = "imageName") String fileName) throws IOException {
    	return this.beatServico.getImageWithMediaType(fileName);
    }
       

}
