<template>
  <Layout>
    <h1>Tronald Dump</h1>
    <ul v-for="tag in $page.tags.edges" :key="tag.node.id">
      <li>
        <a v-bind:href="'/' + tag.node.id">{{ tag.node.title }}</a>
      </li>
    </ul>
  </Layout>
</template>
<page-query>
query {
  tags: allTag {
    edges {
      node {
        title
        id
      }
    }
  }
}
</page-query>