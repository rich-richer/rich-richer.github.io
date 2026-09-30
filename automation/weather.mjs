// 首页天气（data/weather.json）检查：格式不对即中止；不是今天更新的只提醒（规则见 editorial/README.md 第 12 节）
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const WEATHER_PATH = "data/weather.json";

export function checkWeather(rootDir, date) {
  const errors = [];
  const notes = [];
  const file = path.join(rootDir, WEATHER_PATH);
  if (!existsSync(file)) return { errors, notes: ["首页天气文件 data/weather.json 不存在，首页不显示天气"] };
  let weather;
  try {
    weather = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    return { errors: [`data/weather.json 不是合法 JSON：${error.message}`], notes };
  }
  const text = (value) => typeof value === "string" && value.trim() !== "";
  if (!text(weather.city)) errors.push("city 须为城市名");
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/.test(weather.updatedAt ?? "")) errors.push("updatedAt 须为北京时间，如 2026-09-30T07:00:00+08:00");
  if (!text(weather.source?.name) || !/^https?:\/\//.test(weather.source?.url ?? "")) errors.push("source 须有 name 和 http(s) 链接");
  if (weather.note !== undefined && (!text(weather.note) || [...weather.note].length > 60)) errors.push("note 须为 60 字以内的文字");
  const days = Array.isArray(weather.days) ? weather.days : [];
  if (days.length !== 3) errors.push("days 须正好 3 天（今天起）");
  days.forEach((day, index) => {
    const label = `days[${index}]`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date ?? "")) errors.push(`${label}.date 须为 YYYY-MM-DD`);
    else if (index > 0 && Date.parse(day.date) - Date.parse(days[index - 1].date) !== 86400000) errors.push(`${label}.date 须与前一天连续`);
    if (!text(day.weather) || !text(day.wind)) errors.push(`${label} 须有 weather 和 wind`);
    if (!Number.isInteger(day.high) || !Number.isInteger(day.low) || day.high < day.low) errors.push(`${label} 的 high、low 须为整数且 high ≥ low`);
  });
  if (errors.length === 0 && weather.updatedAt.slice(0, 10) < date && days[0].date < date) {
    notes.push(`首页天气最后更新于 ${weather.updatedAt.slice(0, 10)}，本次出刊未更新`);
  }
  return { errors, notes };
}
