# HESTABIT TRAINING TASKS -> [WEEK-1-->WEEK-9]
---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Weekly Breakdown](#weekly-breakdown)
  - [Week 1 — Engineering Mindset Bootcamp](#week-1--engineering-mindset-bootcamp)
  - [Week 2 — Frontend Fundamentals](#week-2--frontend-fundamentals)
  - [Week 3 — Advanced Frontend (Next.js + TailwindCSS)](#week-3--advanced-frontend-nextjs--tailwindcss)
  - [Week 4 — Advanced Backend Engineering](#week-4--advanced-backend-engineering)
  - [Week 5 — Server Side Foundations with Docker & DevOps](#week-5--server-side-foundations-with-docker--devops)
  - [Week 6 — Machine Learning Engineering](#week-6--machine-learning-engineering)
  - [Week 7 — GenAI & Multimodal RAG Engineering](#week-7--genai--multimodal-rag-engineering)
  - [Week 8 — LLM Fine-Tuning, Quantisation & Optimised Inference](#week-8--llm-fine-tuning-quantisation--optimised-inference)
  - [Week 9 — Agentic AI & Multi-Agent System Design](#week-9--agentic-ai--multi-agent-system-design)
- [Completion Status](#completion-status)

---

## Overview

This repository documents a 9-week intensive engineering internship program at Hestabit Technologies. The program progresses from core engineering fundamentals through full-stack development, DevOps, and into production-grade AI/ML systems — simulating real-world engineering workflows at every stage.

Each week has a dedicated folder with day-wise deliverables, screenshots, and documentation.

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=for-the-badge&logo=xgboost&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)

---

## Weekly Breakdown

---

### Week 1 — Engineering Mindset Bootcamp

> **Objective:** Transition from "coder" to **engineer** — research, debugging, performance measurement, documentation, and disciplined delivery.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | System Reverse Engineering + Terminal Mastery | `system-report.md`, `introspect.js`, `logs/day1-perf.json` |
| Day 2 | Node CLI + Large Data Processing | `wordstat.js`, `output/stats.json`, `logs/perf-summary.json` |
| Day 3 | Git Mastery + Version Control Forensics | `bisect-session.txt`, `MERGE-POSTMORTEM.md` |
| Day 4 | HTTP / API Forensics | `curl-lab.txt`, `server.js`, Postman screenshots |
| Day 5 | Automation + Mini-CI Pipeline | `validate.sh`, Husky hooks, `artifacts/build-*.tgz`, `WEEK1-RETRO.md` |

**Skills Gained:**
- Terminal mastery — NVM, PATH, environment variables
- Node.js performance benchmarking (Stream vs Buffer)
- Git internals — bisect, revert, stash, conflict resolution
- HTTP deep dive — headers, ETags, caching, cURL forensics
- Automation — ESLint, Prettier, Husky pre-commit hooks, cron scheduling

---

### Week 2 — Frontend Fundamentals

> **Objective:** Build responsive, accessible, interactive web applications using HTML5, CSS3, and modern JavaScript (ES6+).

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | HTML5 + Semantic Layout | `blog.html` — semantic blog page, no CSS |
| Day 2 | CSS Layout Mastery (Flexbox + Grid) | `index.html` + `style.css` — UI replication |
| Day 3 | JavaScript ES6 + DOM Manipulation | FAQ accordion, counter, dropdown |
| Day 4 | JS Utilities + LocalStorage | Todo App with full CRUD + persistence |
| Day 5 | Capstone — E-commerce UI | Fetch API product listing with search + sort |

**Skills Gained:**
- Semantic HTML5 tags, ARIA accessibility, form validation
- CSS Grid + Flexbox — 2D and 1D layouts, mobile-first responsive design
- ES6+ — arrow functions, destructuring, spread, `map/filter/reduce`
- DOM manipulation, event listeners, event delegation
- LocalStorage persistence, DevTools debugging with breakpoints

---

### Week 3 — Advanced Frontend (Next.js + TailwindCSS)

> **Objective:** Build modern, production-grade frontends using Next.js App Router and TailwindCSS utility-first design system.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | TailwindCSS + UI System Basics | Dashboard layout — `Navbar.jsx`, `Sidebar.jsx` |
| Day 2 | Tailwind Advanced + Component Library | `Button`, `Input`, `Card`, `Badge`, `Modal` + `UI-COMPONENT-DOCS.md` |
| Day 3 | Next.js Routing + Layout System | Multi-page app — `/`, `/about`, `/dashboard`, `/dashboard/profile` |
| Day 4 | Dynamic UI + Image Optimization | Responsive landing page + `next/image` + SEO metadata |
| Day 5 | Capstone — Full Multi-Page UI | Login, Dashboard, Users table, Profile — no backend |

**Skills Gained:**
- Next.js App Router — file-based routing, nested layouts, `layout.js`
- TailwindCSS — utility classes, custom theme, responsive breakpoints
- Atomic design — atoms → molecules → sections → pages
- `next/image` for optimized image rendering, metadata for SEO
- Client Component (`"use client"`) vs Server Component architecture

---

### Week 4 — Advanced Backend Engineering

> **Objective:** Build production-grade Node.js APIs with Mongoose, repository pattern, security hardening, and async job queues.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | Backend Foundations | Express setup, middleware, MVC structure |
| Day 2 | Database Modeling + Indexing + Advanced CRUD | `User.js`, `Product.js`, `user.repository.js`, `product.repository.js` |
| Day 3 | High-Performance REST API + Advanced Query Engine | Dynamic filter engine, soft deletes, `QUERY ENGINE DOC.md` |
| Day 4 | Security + Validation + Rate Limiting + Hardening | `validate.js`, `security.js`, `SECURITY REPORT.md` |
| Day 5 | Job Queues + Logging + API Docs + Capstone | `email.job.js`, BullMQ worker, Postman collection, `DEPLOYMENT NOTES.md` |

**Skills Gained:**
- Mongoose schemas — pre-save hooks, virtual fields, compound indexes, sparse indexes
- Repository Pattern — decoupled data access from business logic
- Dynamic query engine — search, filter, sort, pagination in one endpoint
- Soft deletes — `deletedAt` flag instead of hard removal
- API security — Helmet, CORS, rate limiting, NoSQL injection prevention, Zod/JOI validation
- BullMQ job queues — retry + exponential backoff, worker processes
- Request tracing — `X-Request-ID` correlation IDs across all logs

---

### Week 5 — Server Side Foundations with Docker & DevOps

> **Objective:** Understand production server deployment by simulating environments locally using Docker and DevOps practices.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | Docker Fundamentals + Linux Internals | `Dockerfile`, `linux-in-container.md` |
| Day 2 | Docker Compose + Multi-Container Apps | `docker-compose.yml` — React + Node + MongoDB |
| Day 3 | NGINX Reverse Proxy + Load Balancing | `nginx.conf` — round-robin across 2 backend replicas |
| Day 4 | SSL + Self-Signed + mkcert + HTTPS | Certificates + NGINX HTTPS config + `ssl-setup.md` |
| Day 5 | CI-Style Deployment Automation + Capstone | `docker-compose.prod.yml`, `deploy.sh`, `production-guide.md` |

**Skills Gained:**
- Docker images, containers, volumes, networks — full lifecycle management
- Multi-container orchestration with Docker Compose — service discovery via container names
- NGINX as reverse proxy — routing `/api` to internal containers
- Round-robin load balancing — distributing traffic across backend replicas
- SSL/TLS — `mkcert` self-signed certs, HTTPS termination at NGINX, HTTP → HTTPS redirect
- Production hardening — health checks, restart policies, log rotation, `.env` secrets management

---

### Week 6 — Machine Learning Engineering

> **Objective:** Build a production-grade ML system end-to-end — from raw data ingestion and feature engineering, through multi-model training and hyperparameter tuning, to a containerised FastAPI deployment with real-time drift monitoring.

**Dataset:** NF-UQ-NIDS-v2 (Network Intrusion Detection) — 100,000 rows, 46 features, 20 attack classes, 32,986:1 class imbalance ratio.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | Data Pipeline + EDA + Project Architecture | `data_pipeline.py`, `EDA.ipynb`, `DATA-REPORT.md` |
| Day 2 | Feature Engineering + Feature Selection | `build_features.py`, `feature_selector.py`, `FEATURE-ENGINEERING-DOC.md` |
| Day 3 | Model Building + Advanced Training Pipeline | `train.py`, `best_model.pkl`, `MODEL-COMPARISON.md` |
| Day 4 | Hyperparameter Tuning + Explainability + Error Analysis | `tuning.py`, `shap_analysis.py`, `MODEL-INTERPRETATION.md` |
| Day 5 | Model Deployment + Monitoring + MLOps Capstone | `api.py`, `drift_checker.py`, `Dockerfile`, `DEPLOYMENT-NOTES.md` |

**Feature Engineering Pipeline:**

| Stage | Features | Action |
|-------|----------|--------|
| Input (Day 1) | 42 | Cleaned numerical features |
| After Engineering | 144 | +102 new features created |
| After Variance + Correlation Filter | — | Removed near-zero variance + corr > 0.95 |
| **Final Output** | **50** | Ensemble voting selection (6 methods) |

**Model Comparison (CV F1):**

| Model | CV Accuracy | CV F1 | Train Time |
|-------|-------------|-------|------------|
| Logistic Regression | 0.0073 | 0.0105 | 158.2s |
| Random Forest | 0.1420 | 0.1784 | 17.4s |
| Neural Network | 0.3285 | 0.1779 | 51.1s |
| XGBoost | 0.3190 | 0.2262 | 81.5s |
| **LightGBM ** | **0.3172** | **0.2343** | 94.7s |

**API Endpoints (Day 5 Capstone):**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check + uptime |
| `GET` | `/metrics` | Request counts, P95 latency, drift warnings |
| `GET` | `/model/info` | Model version, feature count, class map |
| `POST` | `/predict` | Single prediction with live drift check |
| `POST` | `/predict/batch` | Batch predictions |
| `POST` | `/model/reload` | Hot-reload model from disk |

**Drift Monitoring Coverage:**

| Type | Method | Threshold |
|------|--------|-----------|
| Covariate drift | PSI per feature | PSI > 0.2 |
| Distribution shift | KS test | p < 0.05 |
| Concept drift | Chi-square on labels | p < 0.05 |
| Per-request drift | Z-score (live) | z > threshold |

**Skills Gained:**
- Professional ML pipeline architecture — modular, leakage-free, versioned
- EDA — correlation matrix, class balance, missing value heatmaps, outlier detection (Z-score + IQR)
- Feature engineering — 8 transformer types (log, sqrt, power, interaction, ratio, aggregation, binning, statistical)
- Ensemble feature selection — 6-method voting (Correlation, MI, RFE, Tree importance, Variance, Chi-square)
- Multi-model training with 5-fold cross-validation and sklearn `Pipeline` to prevent leakage
- Bayesian hyperparameter optimization with Optuna TPE sampler (30 trials)
- SHAP `TreeExplainer` for exact Shapley values and feature importance ranking
- FastAPI deployment — UUID request tracking, Pydantic validation, append-only prediction logs, P95 latency tracking
- Dual-layer drift detection — real-time z-score per request + batch PSI/KS in drift checker
- Multi-stage Docker builds for production-ready containerised ML service

---

### Week 7 — GenAI & Multimodal RAG Engineering

> **Objective:** Build a production-grade Enterprise Knowledge Intelligence System supporting Text RAG, Image RAG, SQL QA, Hybrid Retrieval, and Local/Hosted LLMs.

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | Local RAG System + Pipeline Architecture | Ingestion pipeline, FAISS vector DB, `THEORY.md` |
| Day 2 | Advanced Retrieval + Context Engineering | Hybrid retriever (BM25 + semantic), reranker, `RETRIEVAL-STRATEGIES.md` |
| Day 3 | Image RAG (Multimodal) | CLIP embedder, OCR pipeline, multimodal search, `MULTIMODAL-RAG.md` |
| Day 4 | SQL Question Answering System | Text → SQL → Answer pipeline, `SQL-QA-DOC.md` |
| Day 5 | Advanced RAG + Memory + Evaluation Capstone | FastAPI (`/ask`, `/ask-image`, `/ask-sql`), hallucination detection, `DEPLOYMENT-NOTES.md` |

**Real-World Use Cases:**

| Industry | Documents | Images | SQL |
|----------|-----------|--------|-----|
| Banking | Policy manuals | Scanned KYC files | Transaction DB |
| Insurance | Claims PDFs | Damage images | Claims tables |
| Manufacturing | Manuals | Blueprints | Operational DB |

**Skills Gained:**
- End-to-end RAG pipeline — document ingestion, chunking, embedding, retrieval, generation
- Hybrid retrieval — BM25 keyword + semantic vector search with cross-encoder reranking
- Multimodal RAG — CLIP embeddings, Tesseract OCR, BLIP captioning for image search
- SQL QA — natural language → schema-aware SQL → answer with injection-safe execution
- Evaluation — faithfulness scoring, hallucination detection, confidence scoring
- Multi-provider LLM support — local (Mistral, LLaMA, Phi) + hosted (OpenAI, Claude, Gemini)

---

### Week 8 — LLM Fine-Tuning, Quantisation & Optimised Inference

> **Objective:** Train and deploy LLMs on minimal resources — from dataset engineering through fine-tuning, quantisation, and production API deployment.

```
Architecture Understanding → Dataset Engineering → Fine-Tuning → Quantisation → Inference Optimisation → Production API
       (Day 1)                    (Day 1)            (Day 2)       (Day 3)           (Day 4)               (Day 5)
```

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | LLM Architecture + Data Prep | `train.jsonl` (1,000+ samples), `DATASET-ANALYSIS.md` |
| Day 2 | PEFT — LoRA / QLoRA Fine-Tuning | `lora_train.ipynb`, adapter config, `TRAINING-REPORT.md` |
| Day 3 | Quantisation (FP16 → INT8 → INT4 → GGUF) | Quantized models, `QUANTISATION-REPORT.md` |
| Day 4 | Inference Optimisation + Benchmarking | `results.csv`, KV cache benchmarks, `BENCHMARK-REPORT.md` |
| Day 5 | Capstone — Local LLM API | FastAPI server, `Dockerfile`, Streamlit UI, `FINAL-REPORT.md` |

**Quantisation Benchmark:**

| Format | Size | Speed | Quality |
|--------|------|-------|---------|
| FP16 | 100% | Baseline | Baseline |
| INT8 | ~50% | Faster | Minimal loss |
| INT4 | ~25% | Faster | Small loss |
| GGUF q4_0 | ~25% | Fastest (CPU) | Small loss |

**Skills Gained:**
- QLoRA fine-tuning — ~1% trainable parameters on 4-bit base model
- Quantisation — BitsAndBytes INT8/INT4, GGUF via llama.cpp
- Inference optimization — KV caching, streaming, batch inference, prompt compression
- Production LLM API — FastAPI with singleton model loader, multi-turn chat, hot-swap
- Containerized deployment — Dockerfile + docker-compose for LLM serving

---

### Week 9 — Agentic AI & Multi-Agent System Design

> **Objective:** Build autonomous AI systems — from single agents to a full 9-agent production system (NEXUS AI) using AutoGen + local LLMs.

```
Day 1 → 3 Single Agents (Research, Summarizer, Answer)
Day 2 → 4-Agent Orchestration (Planner → Workers → Validator)
Day 3 → 3 Tool-Calling Agents (Code, DB, File)
Day 4 → 3-Layer Memory System (Session + Vector + Long-term)
Day 5 → NEXUS AI (9-Agent Autonomous System — Capstone)
```

| Day | Topic | Key Deliverable |
|-----|-------|----------------|
| Day 1 | Agent Foundations + Message-Based Communication | 3 agents with ReAct pattern, `AGENT-FUNDAMENTALS.md` |
| Day 2 | Multi-Agent Orchestration | 4-agent DAG hierarchy, parallel workers, `FLOW-DIAGRAM.md` |
| Day 3 | Tool-Calling Agents | Code executor, DB agent, File agent, `TOOL-CHAIN.md` |
| Day 4 | Memory Systems | Session + FAISS vector + SQLite long-term, `MEMORY-SYSTEM.md` |
| Day 5 | Capstone — NEXUS AI | 9-agent autonomous system, Streamlit dashboard, `FINAL-REPORT.md` |

**NEXUS AI — 9-Agent Roster:**

| Agent | Role |
|-------|------|
| Orchestrator | Master controller and task router |
| Planner | Decomposes task into DAG execution steps |
| Researcher | Gathers context from memory and tools |
| Coder | Generates Python/SQL/config code |
| Analyst | Processes CSV, runs statistical analysis |
| Critic | Reviews output quality and flags gaps |
| Optimizer | Refines based on Critic feedback |
| Validator | Final accuracy and format check |
| Reporter | Formats and delivers final output |

**Skills Gained:**
- ReAct pattern — Reason + Act agent loop with role isolation
- DAG-based task execution — parallel worker agents with dependency resolution
- Tool calling — Python code execution, SQLite SQL queries, file I/O
- 3-layer memory — session (in-memory), vector (FAISS), long-term (SQLite)
- Self-reflection loop — Critic + Optimizer agents for iterative improvement
- Fully local inference — Ollama with phi3:mini, qwen2:1.5b, tinyllama

---

## Completion Status

| Week | Topic | Status |
|------|-------|--------|
| Week 1 | Engineering Mindset Bootcamp |  Complete |
| Week 2 | Frontend Fundamentals (HTML + CSS + JS) |  Complete |
| Week 3 | Advanced Frontend (Next.js + TailwindCSS) |  Complete |
| Week 4 | Advanced Backend Engineering |  Complete |
| Week 5 | Server Side Foundations with Docker & DevOps |  Complete |
| Week 6 | Machine Learning Engineering |  Complete |
| Week 7 | GenAI & Multimodal RAG Engineering |  Complete |
| Week 8 | LLM Fine-Tuning, Quantisation & Inference |  Complete |
| Week 9 | Agentic AI & Multi-Agent System Design |  Complete |

---

## Repository Structure

```
HESTABIT_TRAINING_PERIOD/
├── WEEK_1_ENGINEERING_MINDSET_BOOTCAMP/
│   ├── DAY_1-SYSTEM_REVERSE_ENGINEERING/
│   ├── DAY_2-NODE_CLI_AND_DATA_PROCESSING/
│   ├── DAY_3-GIT_MASTERY/
│   ├── DAY_4-HTTP_API_FORENSICS/
│   └── DAY_5-AUTOMATION_AND_MINI_CI/
├── WEEK_2_FRONTEND_FUNDAMENTALS/
│   ├── DAY_1-HTML5_SEMANTIC_LAYOUT/
│   ├── DAY_2-CSS_LAYOUT_MASTERY/
│   ├── DAY_3-JS_DOM_MANIPULATION/
│   ├── DAY_4-JS_UTILS_LOCALSTORAGE/
│   └── DAY_5-CAPSTONE_UI_AND_JS_PROJECT/
├── WEEK_3_ADVANCE_FRONTEND_NEXTJS_TAILWIND/
│   ├── DAY_1-TailwindCSS_AND_UI_System_Basics/
│   ├── DAY_2-Tailwind_Advanced_AND_Component_Library/
│   ├── DAY_3-Next.js_Routing_AND_Layout_System/
│   ├── DAY_4-Dynamic_UI_AND_Image_Optimization/
│   └── DAY_5-Capstone_Full_MultiPage_UI/
├── WEEK_4_ADVANCED_BACKEND_ENGINEERING/
│   ├── DAY_1-BACKEND_FOUNDATIONS/
│   ├── DAY_2-DATABASE_MODELING_INDEXING_ADVANCED_CRUD/
│   ├── DAY_3-HIGH_PERFORMANCE_REST_API_ADV_QUERY_ENGINE/
│   ├── DAY_4-SECURITY_VALIDATION_RATE_LIMITING_HARDENING/
│   └── DAY_5-JOB_QUEUES_LOGGING_API_DOCUMENTATION_CAPSTONE/
├── WEEK_5_SERVER_SIDE_DOCKER_DEVOPS/
│   ├── DAY_1-DOCKER_FUNDAMENTALS/
│   ├── DAY_2-DOCKER_COMPOSE_AND_MULTI_CONTAINER_APPS/
│   ├── DAY_3-NGINX_REVERSE_PROXY_AND_LOAD_BALANCING/
│   ├── DAY_4-SSL_SELF_SIGNED_MKCERT_HTTPS/
│   └── DAY_5-CI_STYLE_DEPLOYMENT_AUTOMATION_CAPSTONE/
├── WEEK_6_MACHINE_LEARNING_ENGINEERING/
│   ├── DAY-1-DATA-PIPELINE/
│   ├── DAY-2-FEATURE-ENGINEERING/
│   ├── DAY-3-MODEL-BUILDING/
│   ├── DAY-4-HYPERPARAMETER-TUNING/
│   └── DAY-5-DEPLOYMENT/
├── WEEK_7_GENAI_AND_MULTIMODAL_RAG_ENGINEERING/
│   ├── DAY_1-LOCAL_RAG_SYSTEM/
│   ├── DAY_2-ADVANCED_RETRIEVAL_AND_CONTEXT_ENGINEERING/
│   ├── DAY_3-IMAGE_RAG_MULTIMODAL/
│   ├── DAY_4-SQL_QA_SYSTEM/
│   └── DAY_5-ADVANCED_RAG_CAPSTONE/
├── WEEK_8_LLM_FINE_TUNING/
│   ├── DAY_1-LLM_ARCHITECTURE_AND_DATA_PREP/
│   ├── DAY_2-PEFT_LoRA_QLoRA/
│   ├── DAY_3-QUANTISATION/
│   ├── DAY_4-INFERENCE_OPTIMIZATION/
│   └── DAY_5-CAPSTONE_LOCAL_LLM_API/
└── WEEK_9_AGENTIC_AI_MULTI_AGENT_SYSTEM_DESIGN/
    ├── DAY_1-AGENT_FOUNDATIONS_MESSAGE_BASED_COMMUNICATION/
    ├── DAY_2-MULTI_AGENT_ORCHESTRATION/
    ├── DAY_3-TOOL_CALLING_AGENTS/
    ├── DAY_4-MEMORY_SYSTEMS/
    └── DAY_5-CAPSTONE_NEXUS_AI/
```

---
