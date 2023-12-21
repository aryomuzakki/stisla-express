const index = (req, res) => {
  const title = "Blank Page";
  return res.render('blank', { title, site_name: "stisla-express Template", version: "v0.1" });
}

module.exports = {
  index,
}