export function publicationPaths(publicationId) {
  const base = `/p/${publicationId}`;
  return {
    site: `${base}/config/site.json`,
    index: `${base}/data/index.json`,
    issue: (date) => `${base}/data/compiled/${date}.json`,
    submission: (date) => `${base}/data/submissions/${date}.json`,
    latestSubmission: `${base}/data/submissions/latest.json`,
    activeTheme: `${base}/themes/active.json`,
    themePreview: (id) => `/themes/previews/${id}.json`,
  };
}

export function parsePublicationContext(documentRef) {
  const node = documentRef.querySelector("#publication-context");
  if (!node) throw new Error("Missing publication context");
  const context = JSON.parse(node.textContent);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(context.publicationId)) {
    throw new Error("Invalid publication context");
  }
  return context;
}

let paths = {
  site: "",
  index: "",
  issue: () => "",
  submission: () => "",
  latestSubmission: "",
  activeTheme: "",
  themePreview: (id) => `/themes/previews/${id}.json`,
};

let currentItemsById = new Map();
let sourcePanelTrigger = null;
let currentSiteName = "DailyNews";

export function selectDate(search, index) {
  const requested = new URLSearchParams(search).get("date");
  if (!requested) return index.latest;
  return /^\d{4}-\d{2}-\d{2}$/.test(requested) && index.dates.includes(requested)
    ? requested
    : null;
}

export function getAdjacentDates(date, dates) {
  const currentIndex = dates.indexOf(date);
  return {
    previous: currentIndex < dates.length - 1 ? dates[currentIndex + 1] : null,
    next: currentIndex > 0 ? dates[currentIndex - 1] : null,
  };
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}

async function fetchOptionalJson(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}

export function selectThemeRequest(search) {
  const id = new URLSearchParams(search).get("themePreview");
  return id && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ? id : null;
}

async function loadThemeManifest(search) {
  const previewId = selectThemeRequest(search);
  if (previewId) return { manifest: await fetchJson(paths.themePreview(previewId)), preview: true };
  if (document.querySelector("#active-theme")) return { manifest: null, preview: false };
  return { manifest: await fetchOptionalJson(paths.activeTheme), preview: false };
}

function setupPublicationNavigation(context) {
  const selector = document.querySelector("#publication-select");
  selector.addEventListener("change", () => {
    location.assign(selector.value);
  });
  const current = context.publications.find(({ id }) => id === context.publicationId);
  if (!current) throw new Error("Current publication is not registered");
}

function renderSubmissionNotice(status) {
  const notice = document.querySelector("#submission-notice");
  const messages = {
    candidate_ready: "今日候选稿已就绪，等待系统处理。",
    processing: "今日候选稿正在处理。",
    authorization_required: "这份候选稿需要人工授权后才能写入。",
    rejected: "候选稿未通过校验，请检查提交状态。",
  };
  const message = status && messages[status.result];
  notice.hidden = !message;
  notice.textContent = message ?? "";
}

async function loadSubmissionNotice(date = null) {
  const status = await fetchOptionalJson(date ? paths.submission(date) : paths.latestSubmission);
  renderSubmissionNotice(status);
}

function relativeLuminance(color) {
  const channels = [1, 3, 5].map((start) => Number.parseInt(color.slice(start, start + 2), 16) / 255);
  const [red, green, blue] = channels.map((value) => (
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function manifestColorScheme(manifest) {
  return manifest.colorScheme
    ?? (relativeLuminance(manifest.colors.background) < 0.36 ? "dark" : "light");
}

async function applyTheme(manifest, preview = false) {
  if (!manifest) return false;
  const stylesheet = document.createElement("link");
  stylesheet.id = preview ? "theme-preview" : "active-theme";
  stylesheet.rel = "stylesheet";
  stylesheet.href = manifest.cssPath;
  const loaded = new Promise((resolve, reject) => {
    stylesheet.addEventListener("load", resolve, { once: true });
    stylesheet.addEventListener("error", () => reject(new Error(`Failed to load ${manifest.cssPath}`)), { once: true });
  });
  document.head.append(stylesheet);
  try {
    await loaded;
  } catch (error) {
    stylesheet.remove();
    throw error;
  }
  const root = document.documentElement;
  for (const [name, value] of Object.entries(manifest.attributes)) root.dataset[name] = value;
  const colorScheme = manifestColorScheme(manifest);
  root.style.colorScheme = colorScheme;
  document.querySelector('meta[name="color-scheme"]')?.setAttribute("content", colorScheme);
  return true;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatPublishedAt(value) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function classifyTitleLength(title) {
  const length = [...title.trim()].length;
  if (length <= 28) return "standard";
  if (length <= 40) return "long";
  return "extra-long";
}

// 本地改动（见 docs/LOCAL_CHANGES.md）：summary 中「EN:」之后的英文段单独显示
function splitEnglish(text) {
  const index = text.indexOf("EN:");
  if (index <= 0) return [text, ""];
  return [text.slice(0, index).trim(), text.slice(index + 3).trim()];
}

function createArticle(item, module, isFirst) {
  const article = element("article", `story story--${module.size}`);
  article.id = item.id;
  article.dataset.size = module.size;
  article.dataset.span = String(module.span);
  article.dataset.mediaVariant = module.mediaVariant ?? "none";
  if (module.size === "large") article.dataset.titleLength = classifyTitleLength(item.title);
  article.style.gridColumn = `span ${module.span}`;

  const heading = element("header", "story__header");
  if (item.category && module.size !== "small") {
    heading.append(element("p", "story__category", item.category));
  }
  heading.append(element(isFirst ? "h1" : "h2", "story__title", item.title));

  const [summaryZh, summaryEn] = splitEnglish(item.summary);
  const summary = element("p", "story__summary", module.size === "large" ? summaryZh : item.brief);
  const body = element("div", "story__body");
  body.append(summary);
  if (summaryEn) {
    const english = element("p", "story__en", summaryEn);
    english.lang = "en";
    body.append(english);
  }
  // 本地改动（见 docs/LOCAL_CHANGES.md）：「展开全文」显示被截断的文字和卡片上没有的字段
  const more = element("div", "story__more");
  more.id = `${item.id}-more`;
  more.hidden = true;
  if (module.size !== "large") more.append(element("p", "story__more-summary", summaryZh));
  if (item.editorial?.selectionReason) {
    more.append(element("p", "story__more-note", `入选理由：${item.editorial.selectionReason}`));
  }
  if (item.sources.length === 1 && item.sources[0].originalTitle) {
    const original = element("p", "story__more-note", "原标题：");
    const originalTitle = element("span", "", item.sources[0].originalTitle);
    originalTitle.lang = "en";
    original.append(originalTitle);
    more.append(original);
  }
  body.append(more);
  let media = null;
  if (item.image && module.mediaVariant && module.mediaVariant !== "none") {
    media = element("figure", "story__media");
    const image = element("img", "story__image");
    image.src = item.image.src;
    image.alt = item.image.alt;
    image.width = item.image.width;
    image.height = item.image.height;
    image.decoding = "async";
    image.loading = isFirst ? "eager" : "lazy";
    if (isFirst) image.fetchPriority = "high";
    if (item.image.src.startsWith("https://")) image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => {
      media.remove();
      article.dataset.mediaVariant = "none";
    }, { once: true });
    const caption = element("figcaption", "story__credit");
    if (item.image.sourceUrl) {
      const credit = element("a", "", item.image.credit);
      credit.href = item.image.sourceUrl;
      credit.target = "_blank";
      credit.rel = "noopener noreferrer";
      caption.append(credit);
    } else {
      caption.textContent = item.image.credit;
    }
    media.append(image, caption);
  }
  const source = element("footer", "story__source");
  const primarySource = item.sources[0];
  const link = element("a", "story__primary-source", `${primarySource.name} ↗`);
  link.href = primarySource.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  source.append(link);
  const expand = element("button", "story__expand", "展开全文");
  expand.type = "button";
  expand.setAttribute("aria-expanded", "false");
  expand.setAttribute("aria-controls", more.id);
  expand.addEventListener("click", () => {
    const expanded = article.classList.toggle("is-expanded");
    more.hidden = !expanded;
    expand.textContent = expanded ? "收起" : "展开全文";
    expand.setAttribute("aria-expanded", String(expanded));
  });
  source.append(expand);
  if (item.sources.length > 1) {
    const sourceCount = element("button", "story__source-count", `查看全部 ${item.sources.length} 个来源`);
    sourceCount.type = "button";
    sourceCount.dataset.itemId = item.id;
    source.append(sourceCount);
  }
  article.append(heading, ...(media ? [media] : []), body, source);
  return article;
}

function createSourceEntry(source, index) {
  const entry = element("li", "source-panel__item");
  entry.append(element("p", "source-panel__role", index === 0 ? "主要来源" : "补充来源"));
  entry.append(element("h3", "source-panel__name", source.name));
  if (source.originalTitle) {
    entry.append(element("p", "source-panel__original-title", source.originalTitle));
  }
  if (source.publishedAt) {
    const published = element("time", "source-panel__published", formatPublishedAt(source.publishedAt));
    published.dateTime = source.publishedAt;
    entry.append(published);
  }
  const originalLink = element("a", "source-panel__link", "打开原文 ↗");
  originalLink.href = source.url;
  originalLink.target = "_blank";
  originalLink.rel = "noopener noreferrer";
  entry.append(originalLink);
  if (source.via) {
    const via = element("p", "source-panel__via", "经由 ");
    const viaLink = element("a", "", source.via.name);
    viaLink.href = source.via.url;
    viaLink.target = "_blank";
    viaLink.rel = "noopener noreferrer";
    via.append(viaLink);
    entry.append(via);
  }
  return entry;
}

function openSourcePanel(item, trigger) {
  const panel = document.querySelector("#source-panel");
  sourcePanelTrigger = trigger;
  panel.querySelector(".source-panel__title").textContent = item.title;
  panel.querySelector(".source-panel__list").replaceChildren(
    ...item.sources.map(createSourceEntry),
  );
  panel.showModal();
  panel.querySelector(".source-panel__close").focus();
}

function closeSourcePanel() {
  const panel = document.querySelector("#source-panel");
  if (panel.open) panel.close();
}

function renderIssue(issue) {
  const content = document.querySelector("#content");
  currentItemsById = new Map(issue.items.map((item) => [item.id, item]));
  let articleIndex = 0;

  const rows = issue.layout.rows.map((row, rowIndex) => {
    const rowElement = element("div", `layout-row${rowIndex === 0 ? " layout-row--first" : ""}`);
    rowElement.dataset.usedCapacity = String(row.usedCapacity);
    rowElement.dataset.row = String(rowIndex + 1);

    for (const module of row.modules) {
      const item = currentItemsById.get(module.itemId);
      if (!item) throw new Error(`Compiled layout references missing item: ${module.itemId}`);
      rowElement.append(createArticle(item, module, articleIndex === 0));
      articleIndex += 1;
    }
    return rowElement;
  });

  content.className = "news-page";
  content.replaceChildren(...rows);
}

function renderStatus(message) {
  const content = document.querySelector("#content");
  content.className = "";
  const status = element("p", "status", message);
  status.setAttribute("role", "status");
  content.replaceChildren(status);
  currentItemsById = new Map();
}

function setupSite(site, hasTheme) {
  currentSiteName = site.name;
  document.documentElement.style.setProperty("--site-accent", site.accentColor);
  if (!hasTheme) document.documentElement.style.setProperty("--color-accent", site.accentColor);

  const name = document.querySelector(".brand__name");
  name.textContent = site.name;
  if (site.logo) {
    const logo = element("img", "brand__logo");
    logo.src = site.logo;
    logo.alt = site.name;
    name.before(logo);
    name.hidden = true;
  }
}

// 本地改动（见 docs/LOCAL_CHANGES.md）：正文上方的刊名报头与日期线
function createNameplate(name) {
  const plate = element("div", "nameplate");
  const dateline = element("p", "nameplate__dateline");
  dateline.append(
    element("span", "nameplate__date"),
    element("span", "nameplate__motto", "事实优先 · 来源可查"),
    element("span", "nameplate__count"),
  );
  const title = element("p", "nameplate__title", name);
  // 按字宽估算刊名长度（中文 1、英文字母 0.6、空格 0.3），样式据此算出放得下的字号
  let length = 0;
  for (const char of name) length += /[⺀-￿]/.test(char) ? 1 : char === " " ? 0.3 : 0.6;
  title.style.setProperty("--title-length", String(Math.max(length, 4)));
  plate.append(element("p", "nameplate__eyebrow", "AIggy Daily Briefing"), title, dateline);
  document.querySelector("#content").before(plate);
}

function updateNameplate(issue) {
  const [year, month, day] = issue.date.split("-").map(Number);
  const weekday = "日一二三四五六"[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  document.querySelector(".nameplate__date").textContent = `${year} 年 ${month} 月 ${day} 日 · 星期${weekday}`;
  document.querySelector(".nameplate__count").textContent = `本期 ${issue.items.length} 条`;
}

function updateNavigation(date, dates) {
  const adjacent = getAdjacentDates(date, dates);
  const current = document.querySelector(".date-nav__current");
  current.dateTime = date;
  current.textContent = date.replaceAll("-", ".");

  for (const direction of ["previous", "next"]) {
    const button = document.querySelector(`[data-direction="${direction}"]`);
    button.disabled = !adjacent[direction];
    button.dataset.date = adjacent[direction] ?? "";
  }
}

function updateDateUrl(date, method) {
  const url = new URL(location.href);
  url.searchParams.set("date", date);
  url.hash = "";
  history[method]({ date }, "", `${url.pathname}${url.search}${url.hash}`);
}

function focusLoadedIssue() {
  const target = document.querySelector("#content h1") ?? document.querySelector("#content");
  target.tabIndex = -1;
  target.dataset.focusOrigin = "programmatic";
  target.addEventListener("blur", () => delete target.dataset.focusOrigin, { once: true });
  target.focus({ preventScroll: true });
}

function focusRequestedItem() {
  if (!location.hash) return;
  let itemId;
  try {
    itemId = decodeURIComponent(location.hash.slice(1));
  } catch {
    itemId = "";
  }
  const target = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(itemId)
    ? document.getElementById(itemId)
    : null;
  if (!target?.classList.contains("story")) {
    document.querySelector("#edition-status").textContent = "未找到指定内容";
    return;
  }
  target.tabIndex = -1;
  target.dataset.focusOrigin = "programmatic";
  target.addEventListener("blur", () => delete target.dataset.focusOrigin, { once: true });
  target.scrollIntoView({ block: "start", behavior: "auto" });
  target.focus({ preventScroll: true });
  document.querySelector("#edition-status").textContent = `${itemId} 内容已定位`;
}

async function loadIssue(date, dates, options = {}) {
  const { historyMethod = null, focusAfterLoad = false, focusHash = false } = options;
  closeSourcePanel();
  window.scrollTo({ top: 0, behavior: "auto" });
  renderStatus("正在加载日报…");

  try {
    const issue = await fetchJson(paths.issue(date));
    renderIssue(issue);
    updateNameplate(issue);
    updateNavigation(date, dates);
    if (historyMethod) updateDateUrl(date, historyMethod);
    document.title = `${date} · ${currentSiteName}`;
    document.querySelector("#edition-status").textContent = `${date} 内容已加载`;
    if (focusHash) focusRequestedItem();
    else if (focusAfterLoad) focusLoadedIssue();
  } catch (error) {
    console.error(error);
    renderStatus("这期日报暂时无法加载");
  }
}

async function start() {
  let site;
  let index;
  let themeRequest;
  const previewId = selectThemeRequest(location.search);
  try {
    const context = parsePublicationContext(document);
    paths = publicationPaths(context.publicationId);
    setupPublicationNavigation(context);
    [site, index, themeRequest] = await Promise.all([
      fetchJson(paths.site),
      fetchJson(paths.index),
      loadThemeManifest(location.search),
    ]);
    await applyTheme(themeRequest.manifest, themeRequest.preview);
  } catch (error) {
    console.error(error);
    renderStatus(previewId ? `主题预览 ${previewId} 加载失败` : "页面暂时无法加载");
    return;
  }

  setupSite(site, Boolean(themeRequest.manifest || document.querySelector("#active-theme")));
  createNameplate(site.name);
  await loadSubmissionNotice();
  const sourcePanel = document.querySelector("#source-panel");
  sourcePanel.querySelector(".source-panel__close").addEventListener("click", closeSourcePanel);
  sourcePanel.addEventListener("close", () => {
    sourcePanelTrigger?.focus();
    sourcePanelTrigger = null;
  });
  document.querySelector("#content").addEventListener("click", (event) => {
    const button = event.target.closest(".story__source-count");
    if (!button) return;
    const item = currentItemsById.get(button.dataset.itemId);
    if (item) openSourcePanel(item, button);
  });
  if (index.dates.length === 0) {
    renderStatus("暂无日报");
    document.title = currentSiteName;
    for (const button of document.querySelectorAll(".date-nav__button")) button.disabled = true;
    return;
  }

  const date = selectDate(location.search, index);
  const requested = new URLSearchParams(location.search).get("date");
  if (requested && !date) {
    renderStatus("这期日报不存在");
    document.title = `未找到日报 · ${currentSiteName}`;
    for (const button of document.querySelectorAll(".date-nav__button")) button.disabled = true;
    return;
  }

  document.querySelector(".date-nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-direction]");
    if (!button || button.disabled) return;
    loadIssue(button.dataset.date, index.dates, { historyMethod: "pushState", focusAfterLoad: true });
  });

  window.addEventListener("popstate", () => {
    const selected = selectDate(location.search, index);
    if (!selected) {
      renderStatus("这期日报不存在");
      return;
    }
    loadIssue(selected, index.dates, { focusAfterLoad: true, focusHash: true });
  });
  window.addEventListener("hashchange", focusRequestedItem);

  await loadIssue(date, index.dates, { focusHash: true });
}

if (typeof document !== "undefined") start();
