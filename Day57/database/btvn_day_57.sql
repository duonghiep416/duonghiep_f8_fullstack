--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    user_id integer,
    browser character varying(255),
    os character varying(30),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true,
    ip character varying
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.devices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.devices_id_seq OWNER TO postgres;

--
-- Name: devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    status boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devices (id, user_id, browser, os, created_at, status, ip) FROM stdin;
1	4	Edge 120.0.0.0	Windows 10	2024-01-13 08:23:35.315053+07	f	\N
2	4	Edge 120.0.0.0	Windows 10	2024-01-13 08:45:24.781977+07	f	\N
3	4	Edge 120.0.0.0	Windows 10	2024-01-13 08:45:57.002257+07	f	\N
5	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:07:24.580392+07	f	\N
6	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:07:44.080303+07	f	\N
7	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:11:20.828502+07	f	\N
8	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:30:52.22042+07	f	\N
9	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:35:57.987315+07	f	\N
10	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:42:17.049574+07	f	\N
11	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:42:34.992957+07	f	\N
12	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:52:04.141436+07	f	\N
13	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:54:06.078018+07	f	\N
14	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:54:56.114358+07	f	172.16.0.2
15	4	Edge 120.0.0.0	Windows 10	2024-01-13 09:55:25.996906+07	f	192.168.1.6
16	4	Edge 120.0.0.0	Windows 10	2024-01-13 10:00:49.102921+07	f	192.168.1.6
17	4	Edge 120.0.0.0	Windows 10	2024-01-13 10:02:09.105741+07	f	192.168.1.6
18	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:18:48.602342+07	f	127.0.0.1
19	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:32:19.989408+07	f	192.168.1.7
20	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:32:37.862411+07	f	192.168.1.7
21	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:37:55.489867+07	f	192.168.1.7
22	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:40:06.659329+07	f	192.168.1.7
23	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:41:10.46109+07	f	192.168.1.7
24	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:41:33.879937+07	f	192.168.1.7
25	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:47:05.21093+07	f	192.168.1.7
26	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:51:59.958108+07	f	192.168.1.7
4	4	Edge 120.0.0.0	Windows 10	2024-01-13 08:54:34.13046+07	f	\N
27	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:56:53.830886+07	f	192.168.1.7
28	4	Edge 120.0.0.0	Windows 10	2024-01-13 14:58:28.665866+07	f	192.168.1.7
29	4	Edge 120.0.0.0	Windows 10	2024-01-13 15:00:34.265802+07	f	192.168.1.7
30	4	Edge 120.0.0.0	Windows 10	2024-01-13 15:01:07.17096+07	f	192.168.1.7
31	4	Edge 120.0.0.0	Windows 10	2024-01-13 15:03:02.274836+07	f	192.168.1.7
32	4	Edge 120.0.0.0	Windows 10	2024-01-13 19:11:15.438149+07	f	192.168.1.7
33	4	Edge 120.0.0.0	Windows 10	2024-01-13 19:11:35.874741+07	f	192.168.1.7
34	4	Edge 120.0.0.0	Windows 10	2024-01-13 19:12:38.165625+07	f	192.168.1.7
35	4	Edge 120.0.0.0	Windows 10	2024-01-13 19:13:34.002539+07	t	192.168.1.7
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, status, created_at, updated_at) FROM stdin;
1	duonghiep	$2b$10$WL3TjGQKpYR3dYtcR1/6UeAEOe5Sa1d3zyWgcWMHHYOQIcWbSWcvy	f	2024-01-09 08:29:05.49663+07	2024-01-09 08:29:05.49663+07
3	duonghiep0312	$2b$10$zCCDVAJwSFOAK2T8zNaZYOTodCA/N2ktXoKiJG/Cs8DMLhH69DLZO	f	2024-01-09 11:29:38.796728+07	2024-01-09 11:29:38.796728+07
5	duonghiepfalse	$2b$10$RH4Id29LoL2RGhTtE5uxkOLep514wDDe0A5GQtRfUfY0uWAcOPeQu	f	2024-01-09 14:25:12.794759+07	2024-01-09 14:25:12.794759+07
6	duonghiep111	$2b$10$BXZxpXem/bFnCLoygG6kUOdZFt/8XN/3apzAUnKoWVGVzvSSemY1y	f	2024-01-09 14:48:24.727186+07	2024-01-09 14:48:24.727186+07
7	user123	$2b$10$7fuNg4vD6qGA7EqekOpuPe7B8D/MZITCbwGpX8gPrJvImfKUwgFQy	f	2024-01-09 14:50:25.256181+07	2024-01-09 14:50:25.256181+07
8	duonghiep11111	$2b$10$VmUAmLTmAPE60qatpLiAc.2.f6tqEtaDTfFSjsLqSdDwjfitQcqXi	f	2024-01-09 18:59:12.863861+07	2024-01-09 18:59:12.863861+07
9	hiep	$2b$10$OHnlAETRXim1.grTRdF6AejHtCTNJCqtakLzYQjvFDoxoUOJHUUXO	f	2024-01-12 20:42:36.659827+07	2024-01-12 20:42:36.659827+07
10	hiep123	$2b$10$g3l.9Vf7.MGDVV1WVetR/./rkmwZILLm/DlHZu8YgaQPke2vDzCi2	t	2024-01-12 20:48:15.070104+07	2024-01-12 20:48:15.070104+07
4	duonghieptrue	$2b$10$vdFOuz9bLY/nbLWm1FtIJOWPAYoGJQVbI4E/P2qfZF4JQuVnyQM1O	t	2024-01-09 14:24:18.850048+07	2024-01-09 14:24:18.850048+07
\.


--
-- Name: devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.devices_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: devices devices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

