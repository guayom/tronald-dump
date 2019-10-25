<template>
  <Layout>
    <h1 v-html="$page.tag.title" />
    <ul v-for="edge in $page.quotes.edges" :key="edge.node.id">
      <li>
        <small>{{ edge.node.created_at }}</small>
        <h2>{{ edge.node.value }}</h2>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query ($id: ID!, $title: String! ){
  tag(id: $id) {
    title
    id
  }
  quotes: allQuote(filter: {tag: {eq: $title}}) {
    edges {
      node {
        tag
        id
        value
        created_at
      }
    }
  }
}
</page-query>