package com.bolsadeideas.springbootbackendapirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springbootbackendapirest.models.entity.Factura;

public interface IFacturaDao extends CrudRepository<Factura, Long> {

}
