package com.bolsadeideas.springbootbackendapirest.models.entity.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bolsadeideas.springbootbackendapirest.models.entity.Cliente;
import com.bolsadeideas.springbootbackendapirest.models.entity.Factura;
import com.bolsadeideas.springbootbackendapirest.models.entity.Producto;
import com.bolsadeideas.springbootbackendapirest.models.entity.Region;

public interface IClienteService {
	
	//empezamos con los metodos del CRUD
	//1- FIND ALL
	
	public List<Cliente> findAll();
	
	public Page<Cliente> findAll(Pageable pageable);
	
	public Cliente save(Cliente cliente);
	
	public void delete(Long id);
	
	public Cliente findById(Long id);
	
	public List<Region> findAllRegiones();
	
	public Factura findFacturaById(Long id);
	
	public Factura saveFactura(Factura factura);
	
	public void deleteFacturaById(Long id);
	
	public List<Producto> findProductoByNombre(String term);
	
}
