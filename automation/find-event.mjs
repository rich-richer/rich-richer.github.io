// 写稿前查重：在最近 N 天所有刊物里查找同一事件，输出其事件编号（本站链接）。
// 用法：node automation/find-event.mjs <关键词或来源链接> [--days 14]
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalLink, daysBefore, loadPublishedItems, normalizeUrl, WINDOW_DAYS } from "./events.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const daysIndex = args.indexOf("--days");
const days = daysIndex >= 0 ? Number(args.splice(daysIndex, 2)[1]) : WINDOW_DAYS;
const query = args.join(" ").trim();
if (!query || !Number.isFinite(days)) {
  console.log("用法：node automation/find-event.mjs <关键词或来源链接> [--days 14]");
  process.exit(1);
}

const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Shanghai" });
const registry = JSON.parse(readFileSync(path.join(rootDir, "config/publications.json"), "utf8"));
const isUrl = /^https?:\/\//.test(query);
const needle = isUrl ? normalizeUrl(query) : query.toLowerCase();
const matches = loadPublishedItems(rootDir, registry.publicationIds, daysBefore(today, days), today).filter(({ item }) =>
  isUrl
    ? item.sources.some((source) => normalizeUrl(source.url) === needle)
    : `${item.title} ${item.brief} ${item.summary}`.toLowerCase().includes(needle));

if (matches.length === 0) {
  console.log(`最近 ${days} 天没有找到「${query}」相关报道，可以写完整报道。`);
} else {
  for (const { publicationId, date, item } of matches) {
    console.log(`${date} ${publicationId}：${item.title}\n  事件编号：${canonicalLink(publicationId, date, item.id)}`);
  }
}
