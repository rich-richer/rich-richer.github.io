// 跨刊物事件去重：同一事件只由一个刊物刊登完整报道，其他刊物写短摘要并链接过去。
// 事件编号 = 完整报道的本站链接：https://rich-richer.github.io/p/<刊物>/?date=<日期>#<条目 id>
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const SITE = "https://rich-richer.github.io";
export const WINDOW_DAYS = 14;

export function canonicalLink(publicationId, date, itemId) {
  return `${SITE}/p/${publicationId}/?date=${date}#${itemId}`;
}

export function normalizeUrl(url) {
  return url.replace(/[?#].*$/, "").replace(/\/$/, "").toLowerCase();
}

export function isSiteLink(url) {
  return url.startsWith(`${SITE}/`);
}

export function daysBefore(date, days) {
  const time = Date.parse(`${date}T00:00:00Z`) - days * 86400000;
  return new Date(time).toISOString().slice(0, 10);
}

// 读取所有刊物在 [since, until] 日期范围内已发布的条目
export function loadPublishedItems(rootDir, publicationIds, since, until) {
  const items = [];
  for (const publicationId of publicationIds) {
    const dir = path.join(rootDir, "publications", publicationId, "data/issues");
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/.test(name)).sort()) {
      const date = file.slice(0, 10);
      if (date < since || date > until) continue;
      const issue = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
      for (const item of issue.items) items.push({ publicationId, date, item });
    }
  }
  return items;
}

// 两条内容互相引用本站链接（任一方指向另一方的完整报道）即视为已处理的「摘要 + 链接」
export function linksTo(entry, target) {
  const anchor = `/p/${target.publicationId}/`;
  return entry.item.sources.some((source) => isSiteLink(source.url) && source.url.includes(anchor) && source.url.endsWith(`#${target.item.id}`));
}

// 返回同一事件被不同刊物重复完整报道的冲突：共用外部来源、且双方都没有链接到对方
export function findDuplicateEvents(newEntries, publishedEntries) {
  const conflicts = [];
  const pool = [...publishedEntries, ...newEntries];
  for (const entry of newEntries) {
    for (const source of entry.item.sources) {
      if (isSiteLink(source.url)) continue;
      const url = normalizeUrl(source.url);
      for (const other of pool) {
        if (other === entry || other.publicationId === entry.publicationId) continue;
        if (!other.item.sources.some((s) => !isSiteLink(s.url) && normalizeUrl(s.url) === url)) continue;
        if (linksTo(entry, other) || linksTo(other, entry)) continue;
        conflicts.push({ entry, other, url: source.url });
      }
    }
  }
  return conflicts;
}
