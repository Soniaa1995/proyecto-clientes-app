package com.bolsadeideas.springbootbackendapirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springbootbackendapirest.models.entity.Producto;

public interface IProductoDao extends CrudRepository<Producto, Long>{
	
	@Query("select p from Producto p where p.nombre like %?1%")
	//con % buscar en cualquier parte de la cadena es forma manual
	public List<Producto> findByNombre(String term);

	public List<Producto> findByNombreContainingIgnoreCase(String term); //buscamos por nombre que contenga esa palabra ignorando mayus y minuscula
	
	public List<Producto> findByNombreStartingWithIgnoreCase(String term); //busca solo al cominezo de la cadena

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
