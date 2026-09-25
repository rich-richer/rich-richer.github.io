# 本仓库对原项目源码的改动登记

本仓库基于 [dingshuxin353/daily-news-app](https://github.com/dingshuxin353/daily-news-app) 二次开发，原则上不改原项目源码。确需改动时逐项登记在这里，方便同步原作者更新（`git merge upstream/main`）时核对和解决冲突。

## 1. 中英对照的英文行（2026-09-25）

**目的**：双语每日新闻每条的 `summary` 以「中文……EN: English……」书写。原页面只给头条显示 `summary`，其余条目只显示 `brief`，英文段看不到；头条的英文段也会被 6 行截断。

**规则**：`summary` 中第一个「EN:」之后的文字视为英文段。没有「EN:」的条目，页面结构和显示完全不变（目前只有双语每日新闻使用）。

| 文件 | 改动 |
| --- | --- |
| `src/app.js` | 新增 `splitEnglish()`；`createArticle()` 在有英文段时，把摘要和英文行包进 `div.story__body`，头条摘要只显示「EN:」之前的中文 |
| `scripts/lib/build-html.js` | `renderHomePublication()`：主页头条同样拆出英文段，另起 `p.home-highlight__en` |
| `styles.css` | 文件末尾新增一段样式（`.story__body`、`.story__en`、`.home-highlight__en` 及手机端规则） |

**合并上游时**：若上游改了 `createArticle()`、主页头条模板或相关样式，保留上游改动后，按上表重新加回这几处；改动都带有「本地改动（见 docs/LOCAL_CHANGES.md）」注释，可直接搜索定位。

**撤回**：`git revert` 对应提交即可，数据不受影响（英文段仍保存在 `summary` 里，只是不再单独显示）。
