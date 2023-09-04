package com.bolsadeideas.springbootbackendapirest.models.entity.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bolsadeideas.springbootbackendapirest.models.dao.IClienteDao;
import com.bolsadeideas.springbootbackendapirest.models.dao.IFacturaDao;
import com.bolsadeideas.springbootbackendapirest.models.dao.IProductoDao;
import com.bolsadeideas.springbootbackendapirest.models.entity.Cliente;
import com.bolsadeideas.springbootbackendapirest.models.entity.Factura;
import com.bolsadeideas.springbootbackendapirest.models.entity.Producto;
import com.bolsadeideas.springbootbackendapirest.models.entity.Region;

@Service
public class ClienteServiceImpl implements IClienteService{
	
	@Autowired
	private IClienteDao clienteDao;
	
	@Autowired
	private IFacturaDao facturaDao;
	
	@Autowired
	private IProductoDao productoDao;
	
	@Override
	@Transactional(readOnly = true) //esto es una consulta
	public List<Cliente> findAll(){
		
		return (List<Cliente>) clienteDao.findAll(); //retorna un iterable
	}
	
	
	@Override
	@Transactional(readOnly = true)
	public Cliente findById(Long id) {
		return clienteDao.findById(id).orElse(null);
	}
	
	@Override
	@Transactional(readOnly = true)
	public Page<Cliente> findAll(Pageable pageable) {
		return clienteDao.findAll(pageable);
	}
	
	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		return clienteDao.save(cliente);
	}
	@Override
	@Transactional
	public void delete(Long id) {
		clienteDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Region> findAllRegiones() {
		return clienteDao.findAllRegiones(); //retornar el listado completo de las regiones
	}


	@Override
	@Transactional(readOnly = true)
	public Factura findFacturaById(Long id) {
		return facturaDao.findById(id).orElseGet(null);
	}

	@Override
	@Transactional
	public Factura saveFactura(Factura factura) {
		return facturaDao.save(factura);
	}

	@Override
	@Transactional
	public void deleteFacturaById(Long id) {
		facturaDao.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true) // transactional de lectura porque es una consulta
	public List<Producto> findProductoByNombre(String term) {
		return productoDao.findByNombre(term);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

