--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-07 13:21:46

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
-- TOC entry 210 (class 1259 OID 16442)
-- Name: conf; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.conf (
    id uuid NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.conf OWNER TO evaluaciones;

--
-- TOC entry 211 (class 1259 OID 16447)
-- Name: equipos; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.equipos (
    id uuid NOT NULL,
    nombre character varying(150),
    grupo_id uuid NOT NULL,
    confederacion_id uuid NOT NULL
);


ALTER TABLE public.equipos OWNER TO evaluaciones;

--
-- TOC entry 209 (class 1259 OID 16432)
-- Name: grupo; Type: TABLE; Schema: public; Owner: evaluaciones
--

CREATE TABLE public.grupo (
    id uuid NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.grupo OWNER TO evaluaciones;

--
-- TOC entry 3174 (class 2606 OID 16446)
-- Name: conf confederacion_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.conf
    ADD CONSTRAINT confederacion_pkey PRIMARY KEY (id);


--
-- TOC entry 3176 (class 2606 OID 16451)
-- Name: equipos equipo_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipo_pkey PRIMARY KEY (id);


--
-- TOC entry 3172 (class 2606 OID 16436)
-- Name: grupo grupo_pkey; Type: CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_pkey PRIMARY KEY (id);


--
-- TOC entry 3178 (class 2606 OID 16457)
-- Name: equipos fk_equipo_confederacion; Type: FK CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_equipo_confederacion FOREIGN KEY (confederacion_id) REFERENCES public.conf(id) NOT VALID;


--
-- TOC entry 3177 (class 2606 OID 16452)
-- Name: equipos fk_equipo_grupo; Type: FK CONSTRAINT; Schema: public; Owner: evaluaciones
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT fk_equipo_grupo FOREIGN KEY (grupo_id) REFERENCES public.grupo(id);


-- Completed on 2022-11-07 13:21:47

--
-- PostgreSQL database dump complete
--

