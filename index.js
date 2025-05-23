const thisYear = new Date().getFullYear()
const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
const progressBarOfThisYear = generateProgressBar()

function generateProgressBar() {
    const progressBarCapacity = 30
    const passedProgressBarIndex = parseInt(progressOfThisYear * progressBarCapacity)
    const progressBar =
      '█'.repeat(passedProgressBarIndex) +
      '▁'.repeat(progressBarCapacity - passedProgressBarIndex)
    return `{ ${progressBar} }`
}

const readme = `\
### Hi there 👋

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=1878F7&width=435&lines=%E6%8B%89%E5%90%89%E5%A1%94%E5%B0%BC%E7%9A%84%E9%B9%A6%E9%B9%89%E4%BC%9A%E7%AC%91)](https://git.io/typing-svg)

⏳ Year progress ${progressBarOfThisYear} ${(progressOfThisYear * 100).toFixed(2)} %

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/NotHimmel/NotHimmel/output/github-contribution-grid-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/NotHimmel/NotHimmel/output/github-contribution-grid-snake.svg">
  <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/NotHimmel/NotHimmel/output/github-contribution-grid-snake.svg">
</picture>

![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=NotHimmel&show_icons=true&theme=buefy)

[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=NotHimmel&layout=compact)](https://github.com/anuraghazra/github-readme-stats)

![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=NotHimmel&theme=minimal)

---

⏰ Updated on ${new Date().toUTCString()}

![Progress Bar CI](https://github.com/NotHimmel/NotHimmel/workflows/Progress%20Bar%20CI/badge.svg)\
`

console.log(readme)
