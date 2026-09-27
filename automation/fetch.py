# 出刊核实用：抓取网页标题、发布时间和正文段落（只读，不写任何文件）
# 用法：python3 automation/fetch.py [--limit=字数] <网址> [<网址> ...]
# 遇到人机验证页（标题含 "Just a moment"）时不要绕过，改用可访问的权威转述并注明「媒体转述」。
import sys, re, html, subprocess

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
limit = 4000
for url in sys.argv[1:]:
    if url.startswith("--limit="):
        limit = int(url.split("=")[1]); continue
    raw = subprocess.run(["curl", "-sL", "--max-time", "25", "-A", UA, url], capture_output=True).stdout
    t = raw.decode("utf-8", "ignore")
    title = re.search(r"(?s)<title[^>]*>(.*?)</title>", t)
    dates = re.findall(r'(?:article:published_time|datePublished|dateCreated|publish(?:ed)?[_-]?date)["\']?\s*(?:content=|:)\s*["\']([^"\']+)', t)
    t = re.sub(r"(?s)<(script|style|nav|header|footer|aside)[^>]*>.*?</\1>", " ", t)
    paras = [html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", p))).strip() for p in re.findall(r"(?s)<(?:p|h1|h2|h3|li)[^>]*>(.*?)</(?:p|h1|h2|h3|li)>", t)]
    paras = [p for p in paras if len(p) > 40]
    print("=== ", url)
    print("TITLE:", html.unescape(title.group(1).strip()) if title else None, "| DATES:", dates[:3])
    print("\n".join(paras)[:limit])
    print()
