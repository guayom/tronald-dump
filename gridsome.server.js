const axios = require("axios");
var slugify = require("slugify");

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
};
