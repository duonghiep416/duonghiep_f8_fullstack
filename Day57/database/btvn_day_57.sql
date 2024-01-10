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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, status, created_at, updated_at) FROM stdin;
1	duonghiep	$2b$10$WL3TjGQKpYR3dYtcR1/6UeAEOe5Sa1d3zyWgcWMHHYOQIcWbSWcvy	f	2024-01-09 08:29:05.49663+07	2024-01-09 08:29:05.49663+07
3	duonghiep0312	$2b$10$zCCDVAJwSFOAK2T8zNaZYOTodCA/N2ktXoKiJG/Cs8DMLhH69DLZO	f	2024-01-09 11:29:38.796728+07	2024-01-09 11:29:38.796728+07
4	duonghieptrue	$2b$10$OJ3hg5Qnvm1Z5c5yjwUGCuQ17bzXANFBssLdVPGv2kI0niPTai0/a	t	2024-01-09 14:24:18.850048+07	2024-01-09 14:24:18.850048+07
5	duonghiepfalse	$2b$10$RH4Id29LoL2RGhTtE5uxkOLep514wDDe0A5GQtRfUfY0uWAcOPeQu	f	2024-01-09 14:25:12.794759+07	2024-01-09 14:25:12.794759+07
6	duonghiep111	$2b$10$BXZxpXem/bFnCLoygG6kUOdZFt/8XN/3apzAUnKoWVGVzvSSemY1y	f	2024-01-09 14:48:24.727186+07	2024-01-09 14:48:24.727186+07
7	user123	$2b$10$7fuNg4vD6qGA7EqekOpuPe7B8D/MZITCbwGpX8gPrJvImfKUwgFQy	f	2024-01-09 14:50:25.256181+07	2024-01-09 14:50:25.256181+07
8	duonghiep11111	$2b$10$VmUAmLTmAPE60qatpLiAc.2.f6tqEtaDTfFSjsLqSdDwjfitQcqXi	f	2024-01-09 18:59:12.863861+07	2024-01-09 18:59:12.863861+07
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

