
INSERT INTO regiones(id, nombre) VALUES (1, 'Europa');
INSERT INTO regiones(id, nombre) VALUES (2, 'Sudamérica');
INSERT INTO regiones(id, nombre) VALUES (3, 'Norteamérica');
INSERT INTO regiones(id, nombre) VALUES (4, 'Asia');
INSERT INTO regiones(id, nombre) VALUES (5, 'Oceanía');
INSERT INTO regiones(id, nombre) VALUES (6, 'África');
INSERT INTO regiones(id, nombre) VALUES (7, 'Antártida');
INSERT INTO regiones(id, nombre) VALUES (8, 'Europa-Occidental');


INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, 'Pepe', 'Garcia', 'pepe@gmail.com', '2023-07-13');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2, 'Martin', 'Garcia', 'martin@gmail.com', '2023-07-1');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3, 'Daniela', 'Garcia', 'daniela@gmail.com', '2023-07-3');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, 'Mario', 'Garcia', 'mario@gmail.com', '2023-07-12');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (5, 'Adrian', 'Garcia', 'adrian@gmail.com', '2023-07-2');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (6, 'Marta', 'Garcia', 'marta@gmail.com', '2023-07-14');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (7, 'Rocio', 'Garcia', 'rocio@gmail.com', '2023-07-4');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (8, 'Alma', 'Garcia', 'alma@gmail.com', '2023-07-5');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, 'Ismael', 'Garcia', 'ismael@gmail.com', '2023-07-18');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2, 'Leo', 'Garcia', 'leo@gmail.com', '2023-07-15');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3, 'Vega', 'Garcia', 'vega@gmail.com', '2023-07-8');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, 'Sofia', 'Garcia', 'sofia@gmail.com', '2023-07-9');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (5, 'Guille', 'Garcia', 'guille@gmail.com', '2023-07-19');


/*probando tabla producto */

INSERT INTO productos (nombre, precio, create_at) VALUES ('Televisor LG', 1250, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Ordenador', 750, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Xaomi redmi 7', 100, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Zapatillas Converse', 70, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Tablet', 300, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Nevera', 500, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Lavadora', 250, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Ducha', 2000, NOW());

/*creamos facturas */
INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura equipos de oficina', null, 1, NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1, 1, 2);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (2, 1, 4);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1, 1, 5);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1, 1, 7);

INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura nueva', 'Alguna nota importante', 1, NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (3, 2, 6);








