package com.bolsadeideas.springbootbackendapirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bolsadeideas.springbootbackendapirest.models.entity.Cliente;
import com.bolsadeideas.springbootbackendapirest.models.entity.Region;

public interface IClienteDao extends JpaRepository<Cliente, Long> {
	
	@Query("from Region") //trabajamos con objetos, no con tablas
	public List<Region> findAllRegiones();

}
