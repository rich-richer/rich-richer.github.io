// 版面检查：按 automation/layout.json 核对候选稿的栏目、条数和头条（规则来自各刊手册）
import { readFileSync } from "node:fs";

const rules = JSON.parse(readFileSync(new URL("./layout.json", import.meta.url), "utf8"));

// 返回 { errors, notes }：errors 须改稿后重跑；notes 只提醒，须写进出刊报告
export function checkLayout(publicationId, items) {
  const rule = rules[publicationId];
  const errors = [];
  const notes = [];
  if (!rule) return { errors, notes };
  const count = (category) => items.filter((item) => item.category === category).length;
  const unknown = [...new Set(items.map((item) => item.category).filter((category) => !rule.categories.includes(category)))];
  if (unknown.length > 0) errors.push(`栏目「${unknown.join("、")}」不在手册中（可用：${rule.categories.join("、")}）`);
  for (const [category, min] of Object.entries(rule.required ?? {})) {
    if (count(category) < min) errors.push(`${category} ${count(category)}/${min} 条`);
  }
  for (const [category, min] of Object.entries(rule.expected ?? {})) {
    if (count(category) < min) notes.push(`${category} ${count(category)} 条，少于手册建议的 ${min} 条`);
  }
  const lead = items.find((item) => item.editorial.priority === "lead");
  if (lead && rule.lead && !rule.lead.includes(lead.category)) errors.push(`头条须属于 ${rule.lead.join(" 或 ")}，现为 ${lead.category}`);
  if (lead && rule.leadPrefix && !lead.summary.startsWith(rule.leadPrefix)) errors.push(`头条 summary 须以「${rule.leadPrefix}」开头`);
  if (rule.total && (items.length < rule.total[0] || items.length > rule.total[1])) notes.push(`共 ${items.length} 条，手册建议 ${rule.total[0]}–${rule.total[1]} 条`);
  return { errors, notes };
}
