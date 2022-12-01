--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-19 19:27:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 24593)
-- Name: Orden; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Orden" (
    "Orden_ID" uuid NOT NULL,
    "Usuario_ID" uuid NOT NULL,
    "Monto" integer,
    "Direccion" character varying(100),
    "Fecha" timestamp without time zone NOT NULL
);


ALTER TABLE public."Orden" OWNER TO sebastianb;

--
-- TOC entry 218 (class 1259 OID 24598)
-- Name: Orden_producto; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Orden_producto" (
    "Orden_producto_ID" uuid NOT NULL,
    "Orden_ID" uuid NOT NULL,
    "Producto_ID" uuid NOT NULL
);


ALTER TABLE public."Orden_producto" OWNER TO sebastianb;

--
-- TOC entry 221 (class 1259 OID 24613)
-- Name: PC_Armado; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."PC_Armado" (
    "PC_Armado_ID" uuid NOT NULL,
    "Nombre" character varying(30),
    "Descripcion" character varying(100)
);


ALTER TABLE public."PC_Armado" OWNER TO sebastianb;

--
-- TOC entry 220 (class 1259 OID 24608)
-- Name: PC_Armado_Producto; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."PC_Armado_Producto" (
    "PC_Armado_Producto_ID" uuid NOT NULL,
    "PC_Armado_ID" uuid NOT NULL,
    "Producto_ID" uuid NOT NULL
);


ALTER TABLE public."PC_Armado_Producto" OWNER TO sebastianb;

--
-- TOC entry 219 (class 1259 OID 24603)
-- Name: Producto; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Producto" (
    "Producto_ID" uuid NOT NULL,
    "Nombre" character varying(25),
    "Precio" integer,
    "Descripcion" character varying(150),
    "Categoria" character varying(30),
    "Marca" character varying(50),
    "URL" character varying(150)
);


ALTER TABLE public."Producto" OWNER TO sebastianb;

--
-- TOC entry 215 (class 1259 OID 24583)
-- Name: Reporte; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Reporte" (
    "Reporte_ID" uuid NOT NULL,
    "Usuario_ID" uuid NOT NULL,
    "Correo" character varying(50),
    "Nombre" character varying(20),
    "Telefono" integer,
    "Asunto" character varying(50),
    "Descripcion" character varying(150)
);


ALTER TABLE public."Reporte" OWNER TO sebastianb;

--
-- TOC entry 216 (class 1259 OID 24588)
-- Name: Resena; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Resena" (
    "Resena_ID" uuid NOT NULL,
    "Usuario_ID" uuid NOT NULL,
    "Puntaje" integer,
    "Comentario" character varying(100),
    "Video_infl" character varying(100),
    "Link_infl" character varying(100),
    "Tipo_resena" character varying(100)
);


ALTER TABLE public."Resena" OWNER TO sebastianb;

--
-- TOC entry 214 (class 1259 OID 24578)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: sebastianb
--

CREATE TABLE public."Usuario" (
    "Usuario_ID" uuid NOT NULL,
    "Nombre" character varying(20),
    "Apellido" character varying(40),
    "Correo" character varying(40) NOT NULL,
    "Contrasena" character varying(40) NOT NULL,
    "Direccion" character varying(60),
    "Departamento" character varying(50),
    "Ciudad" character varying(30),
    "Codigo_postal" integer,
    "Telefono" integer
);


ALTER TABLE public."Usuario" OWNER TO sebastianb;

--
-- TOC entry 3207 (class 2606 OID 24597)
-- Name: Orden Orden_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Orden"
    ADD CONSTRAINT "Orden_pkey" PRIMARY KEY ("Orden_ID");


--
-- TOC entry 3209 (class 2606 OID 24602)
-- Name: Orden_producto Orden_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Orden_producto"
    ADD CONSTRAINT "Orden_producto_pkey" PRIMARY KEY ("Orden_producto_ID");


--
-- TOC entry 3213 (class 2606 OID 24612)
-- Name: PC_Armado_Producto PC_Armado_Producto_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."PC_Armado_Producto"
    ADD CONSTRAINT "PC_Armado_Producto_pkey" PRIMARY KEY ("PC_Armado_Producto_ID");


--
-- TOC entry 3215 (class 2606 OID 24617)
-- Name: PC_Armado PC_Armado_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."PC_Armado"
    ADD CONSTRAINT "PC_Armado_pkey" PRIMARY KEY ("PC_Armado_ID");


--
-- TOC entry 3211 (class 2606 OID 24607)
-- Name: Producto Producto_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Producto"
    ADD CONSTRAINT "Producto_pkey" PRIMARY KEY ("Producto_ID");


--
-- TOC entry 3203 (class 2606 OID 24587)
-- Name: Reporte Reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_pkey" PRIMARY KEY ("Reporte_ID");


--
-- TOC entry 3205 (class 2606 OID 24592)
-- Name: Resena Resena_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Resena"
    ADD CONSTRAINT "Resena_pkey" PRIMARY KEY ("Resena_ID");


--
-- TOC entry 3201 (class 2606 OID 24582)
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Usuario_ID");


--
-- TOC entry 3221 (class 2606 OID 24648)
-- Name: PC_Armado_Producto FK_AProducto_PCArmado; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."PC_Armado_Producto"
    ADD CONSTRAINT "FK_AProducto_PCArmado" FOREIGN KEY ("PC_Armado_ID") REFERENCES public."PC_Armado"("PC_Armado_ID") NOT VALID;


--
-- TOC entry 3222 (class 2606 OID 24643)
-- Name: PC_Armado_Producto FK_AProducto_Producto; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."PC_Armado_Producto"
    ADD CONSTRAINT "FK_AProducto_Producto" FOREIGN KEY ("Producto_ID") REFERENCES public."Producto"("Producto_ID") NOT VALID;


--
-- TOC entry 3219 (class 2606 OID 24633)
-- Name: Orden_producto FK_OProducto_Orden; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Orden_producto"
    ADD CONSTRAINT "FK_OProducto_Orden" FOREIGN KEY ("Orden_ID") REFERENCES public."Orden"("Orden_ID") NOT VALID;


--
-- TOC entry 3220 (class 2606 OID 24638)
-- Name: Orden_producto FK_OProducto_Producto; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Orden_producto"
    ADD CONSTRAINT "FK_OProducto_Producto" FOREIGN KEY ("Producto_ID") REFERENCES public."Producto"("Producto_ID") NOT VALID;


--
-- TOC entry 3218 (class 2606 OID 24628)
-- Name: Orden FK_Orden_Usuario; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Orden"
    ADD CONSTRAINT "FK_Orden_Usuario" FOREIGN KEY ("Usuario_ID") REFERENCES public."Usuario"("Usuario_ID") NOT VALID;


--
-- TOC entry 3216 (class 2606 OID 24623)
-- Name: Reporte FK_Reporte_Usuario; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "FK_Reporte_Usuario" FOREIGN KEY ("Usuario_ID") REFERENCES public."Usuario"("Usuario_ID") NOT VALID;


--
-- TOC entry 3217 (class 2606 OID 24618)
-- Name: Resena FK_Resena_Usuario; Type: FK CONSTRAINT; Schema: public; Owner: sebastianb
--

ALTER TABLE ONLY public."Resena"
    ADD CONSTRAINT "FK_Resena_Usuario" FOREIGN KEY ("Usuario_ID") REFERENCES public."Usuario"("Usuario_ID") NOT VALID;


-- Completed on 2022-11-19 19:27:53

--
-- PostgreSQL database dump complete
--
