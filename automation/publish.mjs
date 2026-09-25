// 一键出刊：预检 → 校验入库 → 测试 → 构建 → 提交 →（可选）推送。任何一步失败即中止。
// 用法：node automation/publish.mjs <刊物ID...> [--date YYYY-MM-DD] [--push] [--allow-history] [--allow-warnings]
import { spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { formatWarning, normalizePriorities } from "../scripts/lib/compiler.js";
import { shanghaiDate } from "../scripts/lib/pipeline.js";
import { validateCandidate } from "../scripts/lib/validation.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const logDir = path.join(rootDir, "automation", "logs");
mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, `${new Date().toISOString().replace(/[:.]/g, "-")}.log`);

function log(message) {
  console.log(message);
  appendFileSync(logFile, `${message}\n`);
}

function abort(step, detail) {
  log(`\n出刊中止（${step}）：${detail}`);
  log("未提交、未推送。日志：" + path.relative(rootDir, logFile));
  process.exit(1);
}

function run(command, args, step) {
  const result = spawnSync(command, args, { cwd: rootDir, encoding: "utf8" });
  appendFileSync(logFile, `$ ${command} ${args.join(" ")}\n${result.stdout ?? ""}${result.stderr ?? ""}\n`);
  if (result.status !== 0) abort(step, (result.stderr || result.stdout || "").trim().split("\n").slice(-5).join("\n"));
  return result.stdout ?? "";
}

function parseArguments(args) {
  const options = { ids: [], date: shanghaiDate(), push: false, allowHistory: false, allowWarnings: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--date") options.date = args[++index];
    else if (argument === "--push") options.push = true;
    else if (argument === "--allow-history") options.allowHistory = true;
    else if (argument === "--allow-warnings") options.allowWarnings = true;
    else if (argument.startsWith("--")) abort("参数", `未知参数 ${argument}`);
    else options.ids.push(argument);
  }
  if (options.ids.length === 0) abort("参数", "至少指定一个刊物 ID，例如 daily-news");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date ?? "")) abort("参数", "--date 必须是 YYYY-MM-DD");
  return options;
}

const options = parseArguments(process.argv.slice(2));
const registry = JSON.parse(readFileSync(path.join(rootDir, "config/publications.json"), "utf8"));
log(`出刊 ${options.ids.join("、")} · ${options.date}${options.push ? " · 完成后推送" : " · 仅本机"}`);

// 1) 预检：原项目的候选稿校验与长度 / 优先级提醒，在写入正式日报之前完成
const candidates = [];
for (const id of options.ids) {
  if (!registry.publicationIds.includes(id)) abort("预检", `${id} 不是已登记的刊物`);
  const candidatePath = path.join(rootDir, "publications", id, "data/candidates", `${options.date}.json`);
  if (!existsSync(candidatePath)) abort("预检", `找不到候选稿 ${path.relative(rootDir, candidatePath)}`);
  let candidate;
  try {
    candidate = await validateCandidate(candidatePath, rootDir);
  } catch (error) {
    abort("预检", `${id} 候选稿不合格：${error.message}`);
  }
  const site = JSON.parse(readFileSync(path.join(rootDir, "publications", id, "config/site.json"), "utf8"));
  const { warnings } = normalizePriorities(candidate, site.priorityLimits);
  if (warnings.length > 0) {
    warnings.forEach((warning) => log(`${id} ${formatWarning(warning)}`));
    if (!options.allowWarnings) abort("预检", `${id} 有 ${warnings.length} 条提醒，修改候选稿后重试（或加 --allow-warnings）`);
  }
  log(`✓ 预检通过：${id}（${candidate.items.length} 条）`);
  candidates.push({ id, candidatePath });
}

// 2) 校验入库：交给原项目的 process-candidate
for (const { id, candidatePath } of candidates) {
  const args = ["scripts/process-candidate.js", "--publication", id, "--candidate", candidatePath, "--mode", "update"];
  if (options.allowHistory) args.push("--allow-history");
  const output = run(process.execPath, args, `入库 ${id}`);
  const result = JSON.parse(output.trim().split("\n").at(-1));
  if (result.result !== "published") abort(`入库 ${id}`, JSON.stringify(result));
  log(`✓ 已入库：${id} 第 ${result.revision} 版（${result.writerResult}）`);
}

// 3) 测试与构建
run("npm", ["test"], "测试");
log("✓ 测试通过");
run("npm", ["run", "build"], "构建");
log("✓ 构建通过");

// 4) 只提交本次的正式日报
const issuePaths = options.ids.map((id) => `publications/${id}/data/issues/${options.date}.json`);
run("git", ["add", "--", ...issuePaths], "提交");
const staged = spawnSync("git", ["diff", "--cached", "--quiet", "--", ...issuePaths], { cwd: rootDir });
if (staged.status === 0) {
  log("正式日报与上次提交相同，无需提交。");
} else {
  run("git", ["commit", "-m", `content(${options.ids.join(", ")}): ${options.date}`, "--", ...issuePaths], "提交");
  log("✓ 已提交");
}

// 5) 推送（推送后网站会自动更新）
if (options.push) {
  run("git", ["push", "origin", "HEAD"], "推送");
  log("✓ 已推送，网站几分钟内更新：https://rich-richer.github.io/");
} else {
  log("未推送（需要发布时加 --push）。");
}
log("日志：" + path.relative(rootDir, logFile));
