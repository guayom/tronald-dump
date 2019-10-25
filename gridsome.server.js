const axios = require("axios");

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

module.exports = function(api) {
  api.loadSource(async actions => {
    const tagsCollection = actions.addCollection("Tag");
    const quotesCollection = actions.addCollection("Quote");

    const { data } = await axios.get(`https://api.tronalddump.io/tag`);
    const tags = data._embedded;

    for (const tag of tags) {
      tagsCollection.addNode({
        id: slugify(tag),
        title: tag
      });
      const tagUrl = `https://api.tronalddump.io/tag/${encodeURI(tag)}`;
      const { data } = await axios.get(tagUrl);
      const quotes = data._embedded.tags;

      for (const quote of quotes) {
        quotesCollection.addNode({
          tag: tag,
          appeared_at: quote.appeared_at,
          created_at: quote.created_at,
          quote_id: quote.quote_id,
          updated_at: quote.updated_at,
          value: quote.value
        });
      }
    }
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
