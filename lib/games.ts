export async function getGames() {
  const res = await fetch("SEU_LINK_CSV_AQUI");
  const text = await res.text();

  const rows = text.split("\n").slice(1);

  return rows.map((row) => {
    const [name, parental, primary] = row.split(",");

    return {
      name,
      parental: Number(parental),
      primary: Number(primary),
    };
  });
}
