package com.luiggibeats.pedido.recurso;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.luiggibeats.beat.modelo.Beat;
import com.luiggibeats.beat.servico.BeatServico;
import com.luiggibeats.pedido.modelo.OrderProduct;
import com.luiggibeats.pedido.modelo.OrderStatus;
import com.luiggibeats.pedido.modelo.Pedido;
import com.luiggibeats.pedido.servico.OrderProductServico;
import com.luiggibeats.pedido.servico.PedidoServico;
import com.luiggibeats.util.base.BaseController;
import com.luiggibeats.util.excecao.BusinessException;
import com.luiggibeats.util.filtro.FiltroGenerico;
import org.springframework.util.CollectionUtils;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping(value = "/private/luiggibeats/pedido")
public class PedidoRecurso extends BaseController {

    @Autowired
    private PedidoServico pedidoServico;
    private BeatServico beatServico;
    private OrderProductServico orderProductServico;

    @Operation(description = "Endpoint para buscar beat por ID")
    @GetMapping(value = "/buscarPorId/{id}", produces = "application/json")
    public Pedido buscarPorId(@PathVariable(name = "id") Integer id) throws BusinessException {
        return this.pedidoServico.buscarPorId(id);
    }

    @Operation(description = "Endpoint para listar todos os beats")
    @GetMapping(value = "/listar", produces = "application/json")
    public List<Pedido> listar() throws BusinessException {
        return this.pedidoServico.listar();
    }

    @Operation(description = "Endpoint para listar todas os beats com paginação")
    @PostMapping(value = "/listar/page", produces = "application/json")
    public Page<Pedido> listarPage(@RequestBody FiltroGenerico filtroGenerico) throws Exception {
        return this.pedidoServico.listarPage(PageRequest.of(
                filtroGenerico.getPageIndex()-1,
                filtroGenerico.getPageSize(),
                Sort.Direction.ASC,
                "guidPedido"));
    }

    @Operation(description = "Endpoint para salvar um beat")
    @PostMapping(value = "/salvar", produces = "application/json")
    public Pedido salvar(@RequestBody Pedido pedido) throws BusinessException {
    	//this.beatServico.uploadToLocalFileSystem(beat.getImagem());
        return this.pedidoServico.salvar(pedido);
    }

    @Operation(description = "Endpoint para atualizar um beat")
    @PutMapping(value = "/atualizar", produces = "application/json")
    public Pedido atualizar(@RequestBody Pedido pedido) throws BusinessException {
        return this.pedidoServico.atualizar(pedido);
    }

    @Operation(description = "Endpoint para deletar um beat")
    @DeleteMapping(value = "/deletar/{id}", produces = "application/json")
    public void deletar(@PathVariable(name = "id") Integer id) throws BusinessException {
        this.pedidoServico.deletar(id);
    }
    
    @PostMapping(value = "/create", produces = "application/json")
    public ResponseEntity<Pedido> create(@RequestBody OrderForm form) {
        List<OrderProduct> formDtos = form.getProductOrders();
        validateProductsExistence(formDtos);
        // create order logic
        // populate order with products
        Pedido order = new Pedido();
        
        order.setStatus(OrderStatus.PAID.name());
        order = this.pedidoServico.salvar(order);

        List<OrderProduct> orderProducts = new ArrayList<>();
        for (OrderProduct dto : formDtos) {
            orderProducts.add(orderProductServico.create(new OrderProduct(order, beatServico.buscarPorId(dto
              .getBeat()
              .getGuidBeat()))));
        }
        
        
        order.setOrderProducts(orderProducts);
        this.pedidoServico.atualizar(order);

        String uri = ServletUriComponentsBuilder
          .fromCurrentServletMapping()
          .path("/orders/{id}")
          .buildAndExpand(order.getGuidPedido())
          .toString();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", uri);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }
    
    
    private void validateProductsExistence(List<OrderProduct> orderProducts) {
        List<OrderProduct> list = orderProducts
          .stream()
          .filter(op -> Objects.isNull(beatServico.buscarPorId(op
            .getBeat()
            .getGuidBeat())))
          .collect(Collectors.toList());

        if (!CollectionUtils.isEmpty(list)) {
            //new ResourceNotFoundException("Product not found");
        }
    }
    
    
    public static class OrderForm {

        private List<OrderProduct> productOrders;

        public List<OrderProduct> getProductOrders() {
            return productOrders;
        }

        public void setProductOrders(List<OrderProduct> productOrders) {
            this.productOrders = productOrders;
        }
    }
       

}
