export function parseDuration(duration: string) {
  const iso8601DurationRegex =
    /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/;
  const matches = duration.match(iso8601DurationRegex);

  if (!matches) return null;

  // const sign = matches[1] === undefined ? "+" : "-";
  // const years = matches[2] === undefined ? 0 : matches[2];
  // const months = matches[3] === undefined ? 0 : matches[3];
  // const weeks = matches[4] === undefined ? 0 : matches[4];
  // const days = matches[5] === undefined ? 0 : matches[5];
  const hours = matches[6] === undefined ? 0 : +matches[6];
  const minutes = matches[7] === undefined ? 0 : +matches[7];
  const seconds = matches[8] === undefined ? 0 : +matches[8];

  return hours * 3600 + minutes * 60 + seconds;
}
