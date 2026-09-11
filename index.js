/**
 * Generates README.md for the profile repository.
 *
 *   node index.js > README.md
 *
 * Also run by .github/workflows/year-progress.yml on a schedule, which keeps
 * the year-progress bar and the "last updated" line fresh.
 */

const USER = 'NotHimmel'
const SITE = 'https://www.himmel.fun/'
const UTC_OFFSET = 8

/* ---------- year progress ---------- */

const now = new Date()
const year = now.getUTCFullYear()
const yearStart = Date.UTC(year, 0, 1)
const yearEnd = Date.UTC(year + 1, 0, 1)
const progress = (now.getTime() - yearStart) / (yearEnd - yearStart)

function progressBar(width = 28) {
  const filled = Math.round(progress * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

/* ---------- image helpers ---------- */

// readme-typing-svg splits lines on ';'
function typingSvg(lines) {
  return (
    'https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22' +
    '&pause=1200&duration=3200&color=1878F7&center=true&vCenter=true&width=520&height=44' +
    `&lines=${lines.map(encodeURIComponent).join('%3B')}`
  )
}

function badge(text, color, logo) {
  return `https://img.shields.io/badge/${encodeURIComponent(text)}-${color}` +
    `?style=flat-square&logo=${logo}&logoColor=white`
}

// github-profile-summary-cards: one visual system, light/dark via <picture>.
// Cards are natively 340x200 — fixed px keeps the two-up layout from wrapping.
function card(kind, alt, width = 340) {
  const url = (theme) =>
    `https://github-profile-summary-cards.vercel.app/api/cards/${kind}` +
    `?username=${USER}&theme=${theme}&utcOffset=${UTC_OFFSET}`
  return `<picture>
<source media="(prefers-color-scheme: dark)" srcset="${url('github_dark')}">
<source media="(prefers-color-scheme: light)" srcset="${url('github')}">
<img alt="${alt}" src="${url('github')}" width="${width}">
</picture>`
}

/* ---------- content ---------- */

const typing = typingSvg([
  '拉吉塔尼的鹦鹉会笑',
  'Postgres 内核 · 数据库生态',
])

const stack = [
  ['PostgreSQL', '4169E1', 'postgresql'],
  ['C', 'A8B9CC', 'c'],
  ['Rust', 'DEA584', 'rust'],
  ['Go', '00ADD8', 'go'],
  ['TypeScript', '3178C6', 'typescript'],
  ['Vue', '4FC08D', 'vuedotjs'],
  ['Python', '3776AB', 'python'],
  ['Docker', '2496ED', 'docker'],
  ['Linux', 'FCC624', 'linux'],
]
  .map(([name, color, logo]) => `<img src="${badge(name, color, logo)}" alt="${name}">`)
  .join('\n')

const readme = `<div align="center">

<a href="${SITE}"><img src="${typing}" alt="Himmel"></a>

<p>
<a href="${SITE}"><img src="${badge('博客', '1878F7', 'safari')}" alt="blog"></a>
<a href="https://github.com/IvorySQL/IvorySQL"><img src="${badge('IvorySQL', '4169E1', 'postgresql')}" alt="IvorySQL"></a>
<img src="${badge('UTC+8', '2D333B', 'googlemaps')}" alt="timezone">
</p>

</div>

---

### 关于

大部分时间花在 **PostgreSQL 生态**：内核、Oracle 兼容层、CDC 与分析型扩展。

### 正在做

| 项目 | 说明 |
| :-- | :-- |
| [IvorySQL](https://github.com/IvorySQL/IvorySQL) | 开源的 Oracle 兼容 PostgreSQL |
| [clover-site](https://github.com/${USER}/clover-site) | Clover —— Trilium 笔记客户端的站点与支持页 |
| [obsidian-opencode-sidebar](https://github.com/${USER}/obsidian-opencode-sidebar) | 把 opencode 塞进 Obsidian 侧边栏 |
| [n8n-nodes-telegram-channel](https://github.com/${USER}/n8n-nodes-telegram-channel) | n8n 的 Telegram 频道节点 |
| [go-tdx](https://github.com/${USER}/go-tdx) | 通达信行情协议的 Go 实现 |

### 技术栈

<div align="center">

${stack}

</div>

---

<div align="center">

${card('stats', 'GitHub 统计')}
${card('productive-time', '每日提交时段')}

${card('repos-per-language', '仓库语言分布')}
${card('most-commit-language', '提交语言分布')}

<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${USER}/${USER}/output/github-contribution-grid-snake-dark.svg">
<source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${USER}/${USER}/output/github-contribution-grid-snake.svg">
<img alt="贡献图动画" src="https://raw.githubusercontent.com/${USER}/${USER}/output/github-contribution-grid-snake.svg">
</picture>

<sub>${year} 已过 <code>${progressBar()}</code> ${(progress * 100).toFixed(2)}%</sub>

<sub>最后更新 ${now.toISOString().replace('T', ' ').slice(0, 19)} UTC · <a href="https://github.com/${USER}/${USER}/actions/workflows/year-progress.yml">Progress Bar CI</a></sub>

</div>
`

process.stdout.write(readme)
