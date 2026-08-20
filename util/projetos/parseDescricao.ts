export type ProjectDescriptionSection = {
  title: string;
  lines: string[];
};

export type ParsedProjectDescription = {
  intro: string;
  ideiaGeral: string;
  sections: ProjectDescriptionSection[];
};

const KNOWN_SECTIONS = new Set([
  "ideia geral",
  "objetivos",
  "requisitos",
  "sobre",
  "descrição",
  "descricao",
]);

function isSectionHeader(line: string): string | null {
  const match = line.match(/^([^:]+):\s*$/);
  if (!match) return null;
  const title = match[1].trim();
  if (!KNOWN_SECTIONS.has(title.toLowerCase())) return null;
  return title;
}

function isBulletLine(line: string): boolean {
  return /^[-•*]\s+/.test(line);
}

function stripBullet(line: string): string {
  return line.replace(/^[-•*]\s+/, "").trim();
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "section"; title: string; lines: string[] };

function firstSentence(text: string): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const match = normalized.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return match ? match[0].trim() : normalized;
}

function firstParagraphText(descricao: string): string {
  const paragraph =
    descricao.split(/\n\n+/)[0]?.trim() ||
    descricao
      .split("\n")
      .map((line) => line.trim())
      .find(Boolean) ||
    "";
  return paragraph.replace(/\s+/g, " ").trim();
}

export function getProjectHeroSummary(
  parsed: ParsedProjectDescription,
  descricao: string
): string {
  if (parsed.ideiaGeral) {
    return parsed.ideiaGeral.replace(/\s+/g, " ").trim();
  }

  const firstParagraph =
    firstParagraphText(descricao) || parsed.intro.replace(/\s+/g, " ").trim();

  return firstSentence(firstParagraph);
}

export function getProjectCardSummary(descricao: string): string {
  const parsed = parseProjectDescription(descricao);
  const source =
    parsed.ideiaGeral ||
    parsed.intro.split("\n").map((line) => line.trim()).find(Boolean) ||
    descricao;

  return firstSentence(source.replace(/\s+/g, " "));
}

function parseUnstructuredBlocks(intro: string): ContentBlock[] {
  const lines = intro.split("\n").map((line) => line.trim()).filter(Boolean);
  const blocks: ContentBlock[] = [];
  let paragraphLines: string[] = [];
  let listTitle: string | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
    paragraphLines = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({
      type: "section",
      title: listTitle || "Detalhes",
      lines: [...listItems],
    });
    listItems = [];
    listTitle = null;
  };

  for (const line of lines) {
    const numbered = line.match(/^\d+:\s*(.+)$/);
    if (numbered) {
      flushParagraph();
      listItems.push(numbered[1].trim());
      continue;
    }

    if (/linhas de ação/i.test(line)) {
      flushParagraph();
      flushList();
      listTitle = line.replace(/\.\s*$/, "");
      continue;
    }

    if (listItems.length > 0) {
      flushList();
    }

    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export function getProjectContentBlocks(
  parsed: ParsedProjectDescription
): ContentBlock[] {
  if (parsed.ideiaGeral) {
    const blocks: ContentBlock[] = [];
    if (parsed.intro) blocks.push({ type: "paragraph", text: parsed.intro });
    for (const section of parsed.sections) {
      blocks.push({
        type: "section",
        title: section.title,
        lines: section.lines,
      });
    }
    return blocks;
  }

  if (parsed.sections.length > 0) {
    const blocks: ContentBlock[] = [];
    if (parsed.intro) blocks.push({ type: "paragraph", text: parsed.intro });
    for (const section of parsed.sections) {
      blocks.push({
        type: "section",
        title: section.title,
        lines: section.lines,
      });
    }
    return blocks;
  }

  if (parsed.intro) return parseUnstructuredBlocks(parsed.intro);
  return [];
}

export function parseProjectDescription(descricao: string): ParsedProjectDescription {
  if (!descricao?.trim()) {
    return { intro: "", ideiaGeral: "", sections: [] };
  }

  const blocks: { title: string | null; lines: string[] }[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (!currentLines.length) return;
    blocks.push({ title: currentTitle, lines: [...currentLines] });
    currentLines = [];
  };

  for (const rawLine of descricao.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const sectionTitle = isSectionHeader(line);
    if (sectionTitle) {
      flush();
      currentTitle = sectionTitle;
      continue;
    }

    currentLines.push(line);
  }

  flush();

  const introBlock = blocks.find((block) => block.title === null);
  const intro = introBlock?.lines.join(" ").trim() ?? "";

  const ideiaGeralBlock = blocks.find(
    (block) => block.title?.toLowerCase() === "ideia geral"
  );
  const ideiaGeral = ideiaGeralBlock?.lines.join(" ").trim() ?? "";

  const sections = blocks
    .filter(
      (block) =>
        block.title !== null && block.title.toLowerCase() !== "ideia geral"
    )
    .map((block) => ({
      title: block.title as string,
      lines: block.lines.map(stripBullet).filter(Boolean),
    }));

  return { intro, ideiaGeral, sections };
}

export function formatProjectDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR");
}

export { isBulletLine, stripBullet };
