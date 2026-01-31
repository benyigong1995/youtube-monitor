# 全网内容监控中心 (Universal Content Monitor) 📡

> Master G 的 Vibe Coding 专属项目。

**当前状态:** 第一阶段 (YouTube) ✅

这是一个自动化的情报管线，旨在监控多种内容源，提取核心信息，并利用 AI 生成高信噪比的摘要（如行动指南、新闻简报、深度思维导图等）。

## 🌟 核心特性 (Pro Features)

*   **数据库驱动**: 采用 SQLite 持久化存储，比 JSON 文件更稳定可靠。
*   **Docker 化**: 包含 `Dockerfile`，支持一键容器化部署。
*   **配置解耦**: 支持 `.env` 环境变量管理敏感信息。
*   **多模态智能分析**:
    *   `huberman_protocol`: 提取科学机制与可执行的行动指南。
    *   `news_commentary`: 剥离事实与观点，提炼核心论据。
    *   `lex_podcast`: 捕捉长对话中的哲学思考与洞见。

## 🚀 快速开始

### 本地运行

1.  安装依赖:
    ```bash
    npm install
    ```
2.  配置环境变量 (可选):
    ```bash
    cp .env.example .env
    ```
3.  检查更新:
    ```bash
    node check.js
    ```

### Docker 运行

```bash
docker build -t ucm .
docker run -v $(pwd)/data:/app/data ucm
```

## 🛠️ 工具集

- **check.js**: 扫描所有频道的新内容。
- **get_transcript.js**: 获取视频/文章原文。
- **mark_read.js**: 手动标记某条内容为已读。

## 📂 项目结构

- `src/rss.js`: RSS 抓取器。
- `src/db.js`: SQLite 数据库层 (存放在 `data/monitor.db`)。
- `src/prompts.js`: LLM 提示词库。
