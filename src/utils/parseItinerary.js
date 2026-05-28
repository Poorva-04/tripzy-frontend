export const parseItinerary = (text = "") => {
  try {
    const parsed = typeof text === "string" ? JSON.parse(text) : text;
    const dayList =
      parsed?.days ||
      parsed?.itinerary ||
      parsed?.dailyPlan ||
      parsed?.travelPlan ||
      parsed?.plan;

    if (Array.isArray(dayList)) {
      return dayList.map((day, index) => {
        if (typeof day === "string") {
          return { title: `Day ${index + 1}`, items: [day] };
        }

        const title = day.day || day.title || day.date || `Day ${index + 1}`;
        const items = [];

        Object.entries(day).forEach(([key, value]) => {
          if (["day", "title", "date"].includes(key)) return;
          if (Array.isArray(value)) {
            items.push(`${labelize(key)}: ${value.join(", ")}`);
          } else if (value && typeof value === "object") {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              items.push(`${labelize(nestedKey)}: ${formatValue(nestedValue)}`);
            });
          } else if (value) {
            items.push(`${labelize(key)}: ${value}`);
          }
        });

        return { title: String(title), items };
      });
    }

    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed).map(([key, value]) => ({
        title: labelize(key),
        items: Array.isArray(value)
          ? value.map(formatValue)
          : typeof value === "object" && value
            ? Object.entries(value).map(([nestedKey, nestedValue]) => `${labelize(nestedKey)}: ${formatValue(nestedValue)}`)
            : [formatValue(value)],
      }));
    }
  } catch {
    // Plain text itineraries fall through to line parsing.
  }

  const lines = String(text)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const sections = [];

  lines.forEach((line) => {
    const cleaned = line.replace(/^[-*]\s*/, "");
    const isHeading = /^day\s*\d+/i.test(cleaned) || /^#+\s*day\s*\d+/i.test(cleaned);

    if (isHeading || !sections.length) {
      sections.push({
        title: cleaned.replace(/^#+\s*/, ""),
        items: isHeading ? [] : [cleaned],
      });
      return;
    }

    sections[sections.length - 1].items.push(cleaned);
  });

  return sections.filter((section) => section.title || section.items.length);
};

const labelize = (value = "") =>
  String(value)
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (value) => {
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, nestedValue]) => `${labelize(key)}: ${formatValue(nestedValue)}`)
      .join("; ");
  }
  return String(value ?? "");
};