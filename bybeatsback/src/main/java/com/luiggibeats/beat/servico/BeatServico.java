package com.luiggibeats.beat.servico;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.apache.commons.io.IOUtils;
//import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.repositorio.BeatRepositorio;
import com.luiggibeats.carrinho.modelo.Carrinho;
import com.luiggibeats.usuario.modelo.Usuario;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.excecao.BusinessExceptionCode;

@Service
public class BeatServico {

    @Autowired
    private BeatRepositorio beatRepositorio;
    
    public final String storageDirectoryPath = "C:\\Users\\luigg\\Desktop\\html\\bybeats\\ByBeats\\bybeatsfront\\src\\assets\\uploads";
    
    public List<Beat> getMeusBeats(Usuario user){
		return beatRepositorio.findByUsuario(user);
	}

    public List<Beat> listar() throws BusinessException {
        return this.beatRepositorio.findAll();
    }
    
    public List<Beat> listarDesc() throws BusinessException {
        return this.beatRepositorio.findAllByOrderByGuidBeatDesc();
    }

    public Page<Beat> listarPage(Pageable pageable) throws Exception {
        return this.beatRepositorio.findAll(pageable);
    }

    public Beat buscarPorId(Integer id) throws BusinessException {
        return this.beatRepositorio.findById(id)
                .orElseThrow(() -> new BusinessException(BusinessExceptionCode.BEAT_NAO_ENCONTRADO));
    }

    public Beat atualizar(Beat beat) throws BusinessException {
        return this.salvar(beat);
    }

    public void deletar(Integer id) throws BusinessException {
        this.beatRepositorio.deleteById(id);
    }

    public Beat salvar(Beat beat) throws BusinessException {

	    	/*if (StringUtils.isEmpty(beat.getTitulo())) {
	            throw new BusinessException(BusinessExceptionCode.TITULO_OBRIGATORIO);
	        }
            if (StringUtils.isEmpty(beat.getImagem())) {
                throw new BusinessException(BusinessExceptionCode.IMAGEM_OBRIGATORIO);
            }
            if (StringUtils.isEmpty(beat.getWavUntagged())) {
                throw new BusinessException(BusinessExceptionCode.WAV_UNTAGGED_OBRIGATORIO);
            }*/
    	//Usuario user = beat.getUsuario();
    	System.out.println(beat.getUsuario());



        return this.beatRepositorio.save(beat);
    }
    
    
    
    public ResponseEntity<String> uploadToLocalFileSystem(MultipartFile file) {
        /* we will extract the file name (with extension) from the given file to store it in our local machine for now
        and later in virtual machine when we'll deploy the project
         */
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        /* The Path in which we will store our image . we could change it later
        based on the OS of the virtual machine in which we will deploy the project.
        In my case i'm using windows 10 .
         */
        Path storageDirectory = Paths.get(storageDirectoryPath);
        /*
        * we'll do just a simple verification to check if the folder in which we will store our images exists or not
        * */
        if(!Files.exists(storageDirectory)){ // if the folder does not exist
            try {
                Files.createDirectories(storageDirectory); // we create the directory in the given storage directory path
            }catch (Exception e){
                e.printStackTrace();// print the exception
            }
        }

        Path destination = Paths.get(storageDirectory.toString() + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);// we are Copying all bytes from an input stream to a file

        } catch (IOException e) {
            e.printStackTrace();
        }
        // the response will be the download URL of the image
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/private/luiggibeats/beat/getImage/")
                .path(fileName)
                .toUriString();
        // return the download image url as a response entity
        return ResponseEntity.ok(fileDownloadUri);
    }

    public  byte[] getImageWithMediaType(String imageName) throws IOException {
        Path destination =   Paths.get(storageDirectoryPath+"\\"+imageName);// retrieve the image by its name
        
        return IOUtils.toByteArray(destination.toUri());
    }

}
